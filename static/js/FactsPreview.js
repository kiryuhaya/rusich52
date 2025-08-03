function FactsPreview() {
    const facts = [
    {
        title: "Прочность",
        description: "Наши рюкзаки выдерживают нагрузку до 50 кг благодаря усиленным швам."
    },
    {
        title: "Материалы",
        description: "Мы используем водоотталкивающие ткани для защиты в любых условиях."
    },
    {
        title: "Дизайн",
        description: "Каждая деталь продумана для максимального удобства в полевых условиях."
    }
    ];

    return (
    <section className="container mx-auto py-8 relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Интересные факты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.slice(0, 3).map((fact, index) => (
            <div key={index} className="fact-card border border-gray-700 p-4 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2">{fact.title}</h3>
            <p className="text-gray-300">{fact.description}</p>
            </div>
        ))}
        </div>
        <div className="text-center mt-6">
        <a href="/facts" className="inline-block px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            Все факты →
        </a>
        </div>
    </section>
    );
}