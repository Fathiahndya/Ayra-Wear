import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

const Profile = ({ user, onBack, onLogout }) => {
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'wishlist', 'settings'
    const [wishlists, setWishlists] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // Fetch orders
                const { data: orderData } = await supabase
                    .from('transactions')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (orderData) setOrders(orderData);

                // Fetch wishlists
                const { data: wishlistData } = await supabase
                    .from('wishlists')
                    .select('id, product_id, products(id, name, price, image_url, category)')
                    .eq('user_id', user.id);

                if (wishlistData) setWishlists(wishlistData.filter(w => w.products));
            }
        };
        fetchData();
    }, [user]);

    const handleLogout = async () => {
        onLogout();
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-100 p-4 sm:px-6">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="font-bold text-lg text-stone-800 tracking-tight">Akun Saya</h1>
                    <div className="w-10"></div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6">
                {/* Profile Card */}
                <div className="bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl p-6 mb-8 shadow-lg shadow-rose-200 text-white relative flex items-center gap-5 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shrink-0 shadow-inner">
                        <span className="text-3xl font-black">{user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight drop-shadow-sm line-clamp-1">{user?.user_metadata?.full_name || 'Pelanggan Ayra'}</h2>
                        <p className="text-rose-50 font-medium text-sm opacity-90 truncate max-w-[200px] sm:max-w-xs">{user?.email || ''}</p>
                        <span className="inline-block mt-2 px-2.5 py-1 bg-white/20 rounded-md text-[10px] uppercase tracking-wider font-bold border border-white/20">Member Premium</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-stone-100 mb-6">
                    <button onClick={() => setActiveTab('orders')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>Riwayat Pesanan</button>
                    <button onClick={() => setActiveTab('wishlist')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'wishlist' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>Wishlist</button>
                    <button onClick={() => setActiveTab('settings')} className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-stone-800 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}>Pengaturan</button>
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <div className="text-center py-10 text-stone-500">Belum ada riwayat pesanan.</div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4 pb-4 border-b border-stone-50">
                                            <div>
                                                <p className="text-xs font-bold text-stone-400 mb-1">{new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                <h3 className="font-bold text-stone-800">TRX-{String(order.id).padStart(5, '0')}</h3>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                Sukses
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="text-left">
                                                <p className="text-xs text-stone-400 font-medium mb-0.5">Kurir: {order.courier}</p>
                                                <p className="text-sm font-medium text-stone-500">{order.shipping_name}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-stone-400 font-medium mb-0.5">Total Belanja</p>
                                                <p className="text-lg font-black text-rose-500 tracking-tight">Rp {order.total_amount.toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <button className="w-full mt-4 py-2.5 bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-600 rounded-xl font-bold text-sm transition-colors border border-stone-100/50">Lacak Pengiriman</button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === 'wishlist' && (
                        wishlists.length === 0 ? (
                            <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm text-center flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                </div>
                                <h3 className="font-bold text-stone-800 text-lg mb-2">Wishlist Masih Kosong</h3>
                                <p className="text-stone-500 text-sm max-w-xs leading-relaxed">Simpan produk impian Anda di sini agar tidak kesulitan mencarinya lagi nanti.</p>
                                <button onClick={() => { setActiveTab('orders'); onBack(); }} className="mt-6 px-6 py-2.5 bg-stone-800 text-white rounded-xl font-bold text-sm hover:bg-rose-500 transition-colors shadow-md">Mulai Belanja</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {wishlists.map(item => (
                                    <div key={item.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex flex-col">
                                        <div className="aspect-square bg-stone-50 flex items-center justify-center p-4 relative">
                                            <img src={item.products.image_url || '/images/placeholder.png'} alt={item.products.name} className="object-contain w-full h-full" />
                                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">{item.products.category}</span>
                                            <h3 className="font-bold text-stone-800 text-sm leading-tight mb-2 line-clamp-1">{item.products.name}</h3>
                                            <span className="text-rose-500 font-black text-sm tracking-tight">Rp {item.products.price.toLocaleString()}</span>
                                            <button className="w-full mt-3 py-2 bg-stone-900 hover:bg-rose-500 text-white rounded-xl font-bold text-xs transition-colors">Beli Sekarang</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                            <div className="p-4 sm:p-5 border-b border-stone-50 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 group-hover:text-rose-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-stone-800 text-sm">Informasi Akun</h4>
                                        <p className="text-xs text-stone-400 font-medium">Ubah nama email & nomor HP</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-stone-300 group-hover:text-stone-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </div>

                            <div className="p-4 sm:p-5 border-b border-stone-50 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 group-hover:text-rose-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-bold text-stone-800 text-sm">Daftar Alamat</h4>
                                        <p className="text-xs text-stone-400 font-medium">Atur alamat pengiriman rumah</p>
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-stone-300 group-hover:text-stone-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </div>

                        </div>
                    )}
                </div>

                {/* Always Visible Logout (Bottom) */}
                <div className="mt-8 border-t border-stone-100 pt-8 mb-12">
                    <button onClick={handleLogout} className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        Keluar dari Akun (Logout)
                    </button>
                    <p className="text-center text-stone-400 text-[10px] mt-4 font-medium uppercase tracking-widest">Ayra-Wear v1.0.0</p>
                </div>
            </main>
        </div>
    );
};

export default Profile;
