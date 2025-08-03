function Benefits() {
    const benefits = [
    {
        icon: "⏱️",
        title: "Сроки производства",
        text: "От 7 рабочих дней для стандартных изделий"
    },
    {
        icon: "💪",
        title: "Качество продукции",
        text: "Является приоритетом для нас. Стремимся предоставлять продукцию, которая отвечает самым высоким стандартам."
    },
    {
        icon: "🚚",
        title: "Доставка товара",
        text: "Осуществляем доставку по всей территории Российской Федерации."
    },
    // ... другие преимущества
    ];

    return (
    <section className="py-16">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
            </div>
            ))}
        </div>
        </div>
    </section>
    )
}   