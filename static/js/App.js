const CartContext = React.createContext();

function App() {
  const [cart, setCart] = React.useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  return (
    <CartContext.Provider value={cart}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="content-wrapper flex-grow">
          <Hero />
          <ProductShowcase />
          <Benefits />
          <FactsPreview />
        </main>
        <footer className="bg-gray-900 text-white py-4">
          <div className="container mx-auto text-center">
            <p>© 2025 Русич. Все права защищены.</p>
            <p>Контакты: <a href="mailto:info@rusichgear.ru" className="hover:text-blue-300 transition-colors">info@rusichgear.ru</a> | <a href="tel:+79991234567" className="hover:text-blue-300 transition-colors">+7 (999) 123-45-67</a></p>
          </div>
        </footer>
      </div>
    </CartContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));