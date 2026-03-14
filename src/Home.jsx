import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const Home = ({ onViewProduct, onAddToCart, cartCount, onNavigateCart, onNavigateProfile }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Semua');

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("Mulai mengambil data produk dari Supabase...");
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) {
                    console.error("Supabase Error Object:", error);
                    throw error;
                }

                console.log("Berhasil mendapat data:", data);
                setProducts(data || []);
            } catch (error) {
                console.error('Pesan Error:', error.message);
                alert('Gagal mengambil data produk: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['Semua', 'Pakaian Wanita', 'Pakaian Pria', 'Aksesoris', 'Anak'];

    // Filter products
    const filteredProducts = products.filter(p => {
        if (!p) return false;
        const pName = p.name || '';
        const pCategory = p.category || '';

        const matchCategory = activeCategory === 'Semua' || pCategory === activeCategory;
        const matchSearch = pName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="min-h-screen relative overflow-hidden font-sans pb-24 text-stone-800 bg-rose-50/50">
            {/* Soft, blended gradient backgrounds matching Auth pages logic but more prominent */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-teal-100/60 to-rose-200/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-rose-200/60 to-orange-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-[80px] pointer-events-none" />


            {/* Header / Navbar */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-100 shadow-sm px-4 py-4 sm:px-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* New Brand Logo: Elegant Boutique */}
                        <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center border border-stone-200 shadow-sm">
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-rose-400" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 4 C9 4 7 6 7 9 C7 11 9 12 12 14 C15 12 17 11 17 9 C17 6 15 4 12 4 Z M12 4 L12 2" />
                                <path d="M5 13 L2 18 L22 18 L19 13 M8 18 L8 22 M16 18 L16 22" strokeWidth="0.5"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl sm:text-2xl text-stone-800 flex items-center gap-1.5 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                <span className="font-semibold italic">Ayra</span>
                                <span className="font-black text-rose-500">Wear</span>
                            </div>
                            <div className="text-[7.5px] tracking-[0.25em] text-stone-400 uppercase font-black mt-1 ml-0.5">Premium Syar'i</div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-md hidden sm:block relative">
                        <input
                            type="text"
                            placeholder="Cari koleksi terbaru..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-stone-100/50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                        />
                        <svg className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Cart Button */}
                        <button onClick={onNavigateCart} className="relative w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors text-stone-600 hover:text-rose-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        {/* Profile Button */}
                        <button onClick={onNavigateProfile} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-rose-100 flex items-center justify-center transition-all text-stone-600 group-hover:text-rose-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <span className="text-xs font-bold text-stone-600 group-hover:text-rose-600 hidden sm:block">Akun Saya</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Search Bar */}
            <div className="p-4 sm:hidden bg-white">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari koleksi terbaru..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-stone-100/50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl text-sm font-medium transition-all outline-none"
                    />
                    <svg className="absolute left-3.5 top-3.5 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">

                {/* Hero Banner */}
                <div className="relative w-full h-48 sm:h-64 bg-gradient-to-r from-rose-400 to-orange-300 rounded-3xl overflow-hidden shadow-lg shadow-rose-200 mb-8 flex items-center px-8">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-600 opacity-10 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />

                    <div className="relative z-10 w-full md:w-2/3">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider uppercase mb-3 border border-white/30">Koleksi Ramadhan</span>
                        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2 drop-shadow-sm">Tampil Anggun di Hari Raya</h2>
                        <p className="text-rose-50 font-medium text-sm sm:text-base max-w-sm">Dapatkan diskon eksklusif 20% untuk semua koleksi Syar'i Premium terbaru.</p>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scroll-bar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${activeCategory === cat
                                ? 'bg-stone-800 text-white shadow-md'
                                : 'bg-white text-stone-500 border border-stone-200 hover:border-rose-300 hover:text-rose-500'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredProducts.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-stone-400 font-medium">
                            <p>Produk tidak ditemukan.</p>
                        </div>
                    ) : (
                        filteredProducts.map(p => (
                            <div key={p.id} className="bg-white group rounded-[2rem] border border-stone-100 hover:border-rose-200/50 shadow-sm hover:shadow-2xl hover:shadow-rose-200/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer" onClick={() => onViewProduct(p)}>

                                {/* Image Container */}
                                <div className="aspect-[4/5] bg-stone-50 relative overflow-hidden flex items-center justify-center p-4">
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                    <img src={p.image_url || '/images/placeholder.png'} alt={p.name} className="object-cover w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" />

                                    {/* Wishlist Heart */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); /* Add logic for wishlist */ }}
                                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-300 hover:text-rose-500 hover:bg-rose-50 hover:scale-110 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-20"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white relative z-20">
                                    {/* Category Pill */}
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-100 text-stone-500 uppercase tracking-widest">{p.category}</span>
                                    </div>
                                    
                                    <h3 className="font-bold text-stone-800 text-sm sm:text-base leading-snug mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors duration-300">{p.name}</h3>

                                    <div className="mt-auto flex items-end justify-between pt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-stone-400 font-medium mb-0.5">Harga</span>
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-black text-base sm:text-lg tracking-tight">Rp {p.price.toLocaleString()}</span>
                                        </div>

                                        {/* Add to Cart Gradient Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                                            className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl sm:rounded-[1rem] flex items-center justify-center transition-all shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-105 active:scale-95"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <style>{`
                .hide-scroll-bar::-webkit-scrollbar { display: none; }
                .hide-scroll-bar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Home;
