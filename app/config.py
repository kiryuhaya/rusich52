# config.py
import os

UPLOAD_FOLDER = 'images'
DATA_FOLDER = 'data'
PRODUCTS_FILE = f'{DATA_FOLDER}/products.json'
CATEGORIES_FILE = f'{DATA_FOLDER}/categories.json'
ORDERS_FILE = f'{DATA_FOLDER}/orders.json'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

BOT_TOKEN = '8373064766:AAHTj2-J3CdvT9GUWTVLRB91gNL2PLBSVq8'
CHAT_ID = '5516410719'

CORS_ORIGINS = [
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://rusich52.onrender.com"
    "https://detectorofai.ru" #надо изменить, нужно для тестов
]

# Получаем абсолютный путь к корневой папке проекта
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Путь к app/
PROJECT_ROOT = os.path.dirname(BASE_DIR)              # Путь к rusichbygrok/
