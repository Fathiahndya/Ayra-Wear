import React, { useState } from 'react';
import { supabase } from './supabase';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import ProductDetail from './ProductDetail';
import Checkout from './Checkout';
import Profile from './Profile';

function App() {
    const [view, setView] = useState('login');

    // Global E-commerce State
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [user, setUser] = useState(null);

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user && view === 'login') setView('home');
        });

        return () => subscription.unsubscribe();
    }, [view]);

    // Safety redirect: If no user and not on auth pages, go to login
    React.useEffect(() => {
        if (!user && (view === 'home' || view === 'profile' || view === 'checkout' || view === 'product-detail')) {
            setView('login');
        }
    }, [user, view]);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const zakat = total * 0.025;

    const handleLogin = () => setView('home');
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setCart([]);
        setUser(null);
        setView('login');
    };

    const handleAddToCart = (product) => {
        setCart(prev => {
            const variantId = product.variant || 'default';
            const existing = prev.find(item => item.id === product.id && (item.variant || 'default') === variantId);

            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && (item.variant || 'default') === variantId)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const handleRemoveFromCart = (productId, variant) => {
        setCart(prev => prev.filter(item => !(item.id === productId && (item.variant || 'default') === (variant || 'default'))));
    };

    const handleUpdateQuantity = (productId, variant, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId && (item.variant || 'default') === (variant || 'default')) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setView('product-detail');
    };

    return (
        <div className="App">
            {view === 'login' && <Login onLogin={handleLogin} onNavigateRegister={() => setView('register')} />}
            {view === 'register' && <Register onNavigateLogin={() => setView('login')} />}

            {view === 'home' && (
                <Home
                    onViewProduct={handleViewProduct}
                    onAddToCart={handleAddToCart}
                    cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                    onNavigateProfile={() => setView('profile')}
                    onNavigateCart={() => setView('checkout')}
                />
            )}

            {view === 'product-detail' && (
                <ProductDetail
                    product={selectedProduct}
                    onAddToCart={handleAddToCart}
                    onBack={() => setView('home')}
                />
            )}

            {view === 'checkout' && (
                <Checkout
                    cart={cart}
                    total={total}
                    zakat={zakat}
                    onBack={() => setView('home')}
                    onNavigateOrders={() => setView('profile')}
                    onClearCart={() => setCart([])}
                    onRemoveItem={handleRemoveFromCart}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            )}

            {view === 'profile' && (
                <Profile
                    user={user}
                    onBack={() => setView('home')}
                    onLogout={handleLogout}
                />
            )}
        </div>
    );
}

export default App;