function Hero() {
    return (
    <section className="py-16 relative">
        <div className="container mx-auto px-4">
        <div className="welcome-container text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Добро пожаловать в Русич</h2>
            <p className="text-lg mb-8 text-gray-300">Качественное тактическое снаряжение для профессионалов и энтузиастов.</p>
            <a
            href="/products"
            className="product-btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
            Перейти к продукции
            </a>
        </div>
        </div>
    </section>
    );
}