// Контекст для корзины (для согласованности с другими страницами)
const CartContext = React.createContext();

function Header() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [catalogOpen, setCatalogOpen] = React.useState(false);
    const cart = React.useContext(CartContext); // Доступ к контексту корзины

    return (
    <header className="header-container text-white sticky top-0 z-50 py-2">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-2">
            {/* Логотип и название */}
            <div className="header-item flex-1 md:flex-none">
            <a href="/" className="flex items-center">
                <img 
                src="/images/logo.png" 
                alt="Логотип Русич - тактическое снаряжение" 
                className="h-10 mr-3"
                />
                <h1 className="text-xl font-bold hidden sm:block">Русич</h1>
            </a>
            </div>

            {/* Основное меню и поиск */}
            <div className="header-item flex-1 hidden md:flex items-center justify-between gap-4">
            <nav className="flex-1">
                <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-blue-300 transition-colors">Главная</a></li>
                <li><a href="/products" className="hover:text-blue-300 transition-colors">Продукция</a></li>
                <li><a href="/cart" className="hover:text-blue-300 transition-colors">Корзина</a></li>                    
                <li><a href="/facts" className="hover:text-blue-300 transition-colors">Факты</a></li>
                <li><a href="/contacts" className="hover:text-blue-300 transition-colors">Контакты</a></li>
                </ul>
            </nav>

            <form className="ml-4">
                <div className="relative">
                <input 
                    type="text" 
                    placeholder="Поиск..." 
                    className="bg-gray-700 text-white px-3 py-1 rounded-md w-40 focus:w-52 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                    <path d="M7.5 13.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14.5 14.5l-3-3"/>
                    </svg>
                </button>
                </div>
            </form>
            </div>

            {/* Иконки и телефон */}
            <div className="header-item flex-1 md:flex-none">
            <div className="flex items-center justify-end gap-4 w-full">
                <a href="tel:+79991234567" className="hidden md:block text-sm hover:text-blue-300 whitespace-nowrap transition-colors">
                +7 (999) 123-45-67
                </a>
                
                <div className="flex items-center gap-3">                    
                <a href="/cart" className="relative p-1 hover:text-blue-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                    </span>
                </a>

                {/* Бургер-меню для мобильных */}
                <button 
                    className="md:hidden p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* Мобильное меню */}
        <div className={`md:hidden mt-2 ${menuOpen ? 'block' : 'hidden'}`}>
            <div className="header-item p-4">
            <nav>
                <ul className="space-y-3">
                <li><a href="/" className="block hover:text-blue-300 transition-colors">Главная</a></li>
                <li><a href="/products" className="block hover:text-blue-300 transition-colors">Продукция</a></li>
                <li><a href="/facts" className="block hover:text-blue-300 transition-colors">Интересные факты</a></li>
                <li><a href="/contacts" className="block hover:text-blue-300 transition-colors">Контакты</a></li>
                <li>
                    <form>
                    <div className="relative mt-2">
                        <input 
                        type="text" 
                        placeholder="Поиск..." 
                        className="bg-gray-700 text-white px-3 py-1 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                            <path d="M7.5 13.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14.5 14.5l-3-3"/>
                        </svg>
                        </button>
                    </div>
                    </form>
                </li>
                </ul>
            </nav>
            </div>
        </div>
        </div>
    </header>
    );
}