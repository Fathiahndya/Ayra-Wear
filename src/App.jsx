import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import POSInput from './POSInput';
import Checkout from './Checkout';

function App() {
    const [view, setView] = useState('login'); // 'login', 'register', 'pos', 'checkout'

    // State for checkout details
    const [checkoutDetails, setCheckoutDetails] = useState({ cart: [], total: 0, zakat: 0 });

    const handleLogin = () => setView('pos');

    const handleCheckout = (cart, total, zakat) => {
        setCheckoutDetails({ cart, total, zakat });
        setView('checkout');
    };

    const handleBackToPos = () => {
        setCheckoutDetails({ cart: [], total: 0, zakat: 0 });
        setView('pos');
    };

    return (
        <div className="App">
            {view === 'login' && <Login onLogin={handleLogin} onNavigateRegister={() => setView('register')} />}
            {view === 'register' && <Register onNavigateLogin={() => setView('login')} />}
            {view === 'pos' && <POSInput onCheckout={handleCheckout} />}
            {view === 'checkout' && (
                <Checkout
                    cart={checkoutDetails.cart}
                    total={checkoutDetails.total}
                    zakat={checkoutDetails.zakat}
                    onBack={handleBackToPos}
                />
            )}
        </div>
    );
}

export default App;