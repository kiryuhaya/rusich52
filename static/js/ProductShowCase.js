function ProductShowcase() {
    const categories = [
    { 
        name: "Рюкзаки", 
        image: "/images/backpacks.jpg",
        description: "Усиленные модели с модульной системой"
    },
    // ... другие категории
    ];

    return (
    <section className="py-16 bg-gray-100/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-12">Наши продукты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
        {categories.map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div>
                <h3 className="text-white text-xl font-bold">{item.name}</h3>
                <p className="text-gray-300 mt-2">{item.description}</p>
                <button className="mt-3 text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
                    Подробнее
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
    </section>
    )
}