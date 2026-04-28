import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/book/:id" element={<BookDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/sell" element={<AddBookPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
