import React, { useState } from 'react';

const POSInput = ({ onCheckout }) => {
    // Cart is now an array of objects like { id, name, price, quantity, image }
    const [cart, setCart] = useState([]);
    const products = [
        { id: 1, name: 'Gamis Ayra Premium', price: 250000, image: '/images/gamis.png' },
        { id: 2, name: 'Khimar Syar\'i', price: 120000, image: '/images/khimar.png' },
        { id: 3, name: 'Koko Eksklusif', price: 185000, image: '/images/koko.png' },
        { id: 4, name: 'Tunik Modern Rose', price: 195000, image: '/images/tunik.png' },
        { id: 5, name: 'Mukena Sutra Lace', price: 320000, image: '/images/mukena.png' },
        { id: 6, name: 'Sajadah Travel Premium', price: 85000, image: '/images/sajadah.png' },
    ];

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const decrementQuantity = (productId) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const zakat = total * 0.025; // Kalkulator Zakat Otomatis

    return (
        <div className="min-h-screen bg-stone-50 p-4 sm:p-6 font-sans relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-rose-100/40 to-transparent blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-teal-50/40 to-transparent blur-3xl opacity-60 pointer-events-none" />

            {/* Header Profesional */}
            <div className="relative z-10 flex justify-between items-center mb-6 sm:mb-8 bg-gradient-to-r from-rose-400 via-rose-300 to-orange-300 p-5 rounded-2xl text-white shadow-[0_8px_30px_rgb(251,113,133,0.25)] border border-rose-200/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/40 shadow-inner">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.809c0-.816-.31-1.597-.86-2.176l-3.23-3.39c-.55-.579-1.3-.906-2.11-.906h-5.96c-.81 0-1.56.327-2.11.906L2.86 7.633c-.55.579-.86 1.36-.86 2.176V21m17.63-12.72L21 6.5C19.86 5.5 18 5.5 18 5.5s-1.86 0-3 1-3 1-3 1" />
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm">Ayra-Wear POS</h1>
                </div>
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap ml-2 flex items-center gap-1.5 hover:bg-white/30 transition-colors cursor-default">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" /></svg>
                    Audit Syariah Active
                </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Grid Produk */}
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {products.map(p => (
                        <div key={p.id} onClick={() => addToCart(p)} className="bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-[0_12px_40px_-10px_rgb(251,113,133,0.15)] cursor-pointer border border-stone-100/80 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group">
                            <div className="h-32 sm:h-48 w-full rounded-xl mb-4 flex items-center justify-center overflow-hidden bg-rose-50/50 relative">
                                <img src={p.image} alt={p.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-rose-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                    <div className="bg-white/95 text-rose-600 font-bold px-4 py-2 rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-md flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        Tambah
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-stone-700 text-sm sm:text-base leading-tight pl-1">{p.name}</h3>
                            <p className="text-rose-500 font-black mt-1.5 text-sm sm:text-base pl-1">Rp {p.price.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                {/* Ringkasan Transaksi */}
                <div className="bg-white/95 backdrop-blur-2xl p-5 sm:p-7 rounded-[2rem] shadow-[0_10px_40px_-10px_rgb(251,113,133,0.1)] border border-stone-100 flex flex-col h-full lg:sticky lg:top-6 lg:max-h-[85vh]">
                    <h2 className="text-xl font-black mb-5 pb-4 border-b border-stone-100 text-stone-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                        Keranjang Amanah
                    </h2>

                    <div className="space-y-3 mb-6 flex-1 min-h-[250px] overflow-y-auto custom-scrollbar pr-3 -mr-3">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-stone-300 italic pt-10">
                                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300"><path d="m6 2 8 8.5-4 5 6 6.5" /><path d="m15.5 8.5-3.5 3.5" /></svg>
                                </div>
                                <span className="font-medium text-stone-400">Keranjang masih kosong</span>
                                <span className="text-xs text-stone-400 mt-1">Silakan pilih produk di sebelah kiri</span>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center text-sm text-stone-700 font-medium bg-stone-50/80 p-3 rounded-2xl border border-transparent hover:border-rose-100 hover:bg-rose-50/50 transition-all gap-3 sm:gap-2 group">
                                    <div className="flex flex-col flex-1 pl-1">
                                        <span className="font-bold text-stone-800 leading-tight">{item.name}</span>
                                        <span className="text-orange-500 font-mono text-xs mt-0.5">Rp {item.price.toLocaleString()}</span>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                        {/* Kuantitas Control */}
                                        <div className="flex items-center bg-white border border-stone-200/80 rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] overflow-hidden">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); decrementQuantity(item.id); }}
                                                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                                            </button>
                                            <span className="w-8 text-center font-bold text-stone-700 bg-stone-50/50 h-8 flex items-center justify-center">{item.quantity}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="font-mono font-bold text-rose-500 w-20 text-right">Rp {(item.price * item.quantity).toLocaleString()}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                                className="text-stone-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors focus:outline-none"
                                                title="Hapus Produk"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-5 border-t border-stone-100 space-y-4 shrink-0 bg-white">
                        <div className="flex justify-between font-black text-lg text-stone-800">
                            <span>Total</span>
                            <span className="text-rose-500 text-xl font-mono tracking-tight">Rp {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium bg-gradient-to-r from-orange-50/50 to-rose-50/50 p-3 rounded-xl border border-rose-100/50">
                            <span className="flex items-center gap-1.5 text-stone-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                <span>Zakat Mal (2.5%)</span>
                            </span>
                            <span className="text-stone-600 font-mono font-bold">Rp {zakat.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => onCheckout(cart, total, zakat)}
                            disabled={cart.length === 0}
                            className={`w-full py-4 rounded-2xl mt-1 font-bold transition-all duration-300 text-base flex justify-center items-center gap-2 group relative overflow-hidden ${cart.length === 0 ? 'bg-stone-100 text-stone-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-rose-400 to-orange-400 text-white hover:from-rose-500 hover:to-orange-500 shadow-[0_8px_20px_0_rgb(251,113,133,0.25)] hover:shadow-[0_12px_25px_0_rgb(251,113,133,0.35)] hover:-translate-y-0.5'}`}
                        >
                            {/* Inner shine effect */}
                            {cart.length > 0 && (
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                            )}
                            Selesaikan Tagihan
                            {cart.length > 0 && (
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #fecdd3; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #fda4af; }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default POSInput;