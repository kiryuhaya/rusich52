from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import json
import os
import requests
from werkzeug.utils import secure_filename
import traceback
import bleach

# Импорт настроек
from .config import (
    UPLOAD_FOLDER, DATA_FOLDER, PRODUCTS_FILE, CATEGORIES_FILE, ORDERS_FILE,
    ALLOWED_EXTENSIONS, BOT_TOKEN, CHAT_ID, CORS_ORIGINS, BASE_DIR, PROJECT_ROOT
)

app = Flask(__name__,
            template_folder=os.path.join(PROJECT_ROOT, 'templates'), 
            static_folder=os.path.join(PROJECT_ROOT, 'static'))       
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources={r"/*": {"origins": CORS_ORIGINS}})

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def read_json(file_path):
    if not os.path.exists(file_path):
        write_json(file_path, [])
        return []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []
    except Exception as e:
        print(f"Ошибка при чтении {file_path}: {e}")
        raise

def write_json(file_path, data):
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Ошибка при записи в {file_path}: {e}")
        raise

def send_telegram_message(text: str):
    try:
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        params = {
            'chat_id': CHAT_ID,
            'text': text,
            'parse_mode': 'Markdown'
        }
        response = requests.post(url, params=params)
        if response.status_code != 200:
            print(f"Telegram API error {response.status_code}: {response.text}")
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при отправке в Telegram: {e}")
        return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/products')
def products():
    return send_from_directory(os.path.join(PROJECT_ROOT, 'templates'), 'products.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/contacts')
def contacts():
    return render_template('contacts.html')

@app.route('/facts')
def facts():
    return render_template('facts.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(PROJECT_ROOT, 'images'), filename)

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(PROJECT_ROOT, 'static'), filename)

@app.route('/send-order', methods=['POST'])
def send_order():
    try:
        data = request.json
        name = bleach.clean(data.get('name', 'Не указано'))
        phone = bleach.clean(data.get('phone', 'Не указано'))
        email = bleach.clean(data.get('email', 'Не указано'))
        address = bleach.clean(data.get('address', 'Не указано'))
        comments = bleach.clean(data.get('comments', ''))
        items = data.get('items', [])
        total = data.get('total', 0)

        if not items:
            return jsonify({'status': 'error', 'message': 'Список товаров обязателен'}), 400

        message = (
            "Новый заказ:\n"
            f"Имя: {name}\n"
            f"Телефон: {phone}\n"
            f"Email: {email}\n"
            f"Адрес: {address}\n"
            f"Комментарии: {comments}\n"
            f"Товары:\n{chr(10).join(items)}\n"
            f"Итого: {total} ₽"
        )

        orders = read_json(ORDERS_FILE)
        new_order = {
            'id': max([order['id'] for order in orders], default=0) + 1,
            'name': name,
            'phone': phone,
            'email': email,
            'address': address,
            'comments': comments,
            'items': items,
            'total': total,
            'timestamp': data.get('timestamp', '')
        }
        orders.append(new_order)
        write_json(ORDERS_FILE, orders)

        send_telegram_message(message)

        return jsonify({'status': 'success'})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/send-contact', methods=['POST'])
def send_contact():
    try:
        data = request.json
        name = bleach.clean(data.get('name', 'Не указано'))
        email = bleach.clean(data.get('email', 'Не указано'))
        message = bleach.clean(data.get('message', ''))
        timestamp = data.get('timestamp', '')

        contact_message = (
            "Новое сообщение:\n"
            f"Имя: {name}\n"
            f"Email: {email}\n"
            f"Сообщение: {message}\n"
            f"Дата: {timestamp}"
        )

        send_telegram_message(contact_message)

        return jsonify({'status': 'success', 'message': 'Сообщение отправлено'})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'status': 'error', 'message': str(e)}), 500
    
@app.route('/products-data', methods=['GET'])
def get_products():
    try:
        return jsonify(read_json(PRODUCTS_FILE))
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/categories', methods=['GET'])
def get_categories():
    try:
        return jsonify(read_json(CATEGORIES_FILE))
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/add-product', methods=['POST'])
def add_product():
    try:
        name = bleach.clean(request.form.get('name'))
        category_id = request.form.get('category_id')
        price = request.form.get('price')
        description = bleach.clean(request.form.get('description'))
        file = request.files.get('image')

        if not all([name, category_id, price, description, file]):
            return jsonify({'status': 'error', 'message': 'Все поля обязательны'}), 400

        try:
            category_id = int(category_id)
            price = float(price)
        except ValueError:
            return jsonify({'status': 'error', 'message': 'Некорректный формат цены или категории'}), 400

        if not allowed_file(file.filename):
            return jsonify({'status': 'error', 'message': 'Недопустимый формат изображения'}), 400

        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        products = read_json(PRODUCTS_FILE)
        categories = read_json(CATEGORIES_FILE)
        category = next((c for c in categories if c['id'] == category_id), None)
        if not category:
            return jsonify({'status': 'error', 'message': 'Категория не найдена'}), 400

        new_product = {
            'id': max([p['id'] for p in products], default=0) + 1,
            'category_id': category_id,
            'name': name,
            'image': f'images/{filename}',
            'price': price,
            'description': description,
            'category': category['name']
        }
        products.append(new_product)
        write_json(PRODUCTS_FILE, products)
        return jsonify({'status': 'success', 'message': 'Товар добавлен'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/add-category', methods=['POST'])
def add_category():
    try:
        name = bleach.clean(request.json.get('name'))
        if not name:
            return jsonify({'status': 'error', 'message': 'Название обязательно'}), 400

        categories = read_json(CATEGORIES_FILE)
        new_category = {
            'id': max([c['id'] for c in categories], default=0) + 1,
            'name': name
        }
        categories.append(new_category)
        write_json(CATEGORIES_FILE, categories)
        return jsonify({'status': 'success', 'message': 'Категория добавлена'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(DATA_FOLDER, exist_ok=True)
    app.run(debug=True, port=5000)
