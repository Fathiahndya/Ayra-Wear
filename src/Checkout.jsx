import React, { useState } from 'react';
import { supabase } from './supabase';

const Checkout = ({ cart, total, zakat, onBack, onNavigateOrders, onClearCart, onRemoveItem, onUpdateQuantity }) => {
    const [step, setStep] = useState(1); // 1: Info Pengiriman, 2: Pembayaran

    // Step 1 State
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [courier, setCourier] = useState('JNE');

    // Step 2 State
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');

    const ongkir = courier === 'JNE' ? 15000 : courier === 'SiCepat' ? 12000 : 25000;
    const finalTotal = total + zakat + ongkir;

    const handleNextStep = () => {
        if (!name || !phone || !address) {
            setError('Mohon lengkapi semua data pengiriman.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handlePayment = async () => {
        if (!paymentMethod) return;

        setIsProcessing(true);
        setError('');

        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) throw new Error('Sesi anda telah habis. Silakan login kembali.');

            // 1. Simpan Transaksi Utama (Dengan data tambahan pengiriman)
            const { data: transaction, error: txnError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    total_amount: finalTotal,
                    zakat_amount: zakat,
                    payment_method: paymentMethod,
                    shipping_name: name,
                    shipping_address: address,
                    courier: courier
                })
                .select()
                .single();

            if (txnError) throw txnError;

            // 2. Siapkan data rincian pesanan
            const itemsToInsert = cart.map(item => ({
                transaction_id: transaction.id,
                product_name: item.variant ? `${item.name} (${item.variant})` : item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            }));

            // 3. Simpan rincian pesanan
            const { error: itemsError } = await supabase
                .from('transaction_items')
                .insert(itemsToInsert);

            if (itemsError) throw itemsError;

            onClearCart(); // Bersihkan keranjang belanja setelah sukses
            setIsPaid(true);

        } catch (err) {
            console.error('Error saat checkout:', err);
            setError(err.message || 'Terjadi kesalahan saat menyimpan pesanan.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isPaid) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
                <div className="absolute top-0 -inset-x-20 h-96 bg-gradient-to-b from-rose-100/60 to-transparent blur-3xl opacity-60 pointer-events-none" />

                <div className="max-w-md w-full bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(251,113,133,0.1)] border border-stone-100 relative z-10 text-center animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 text-rose-500 mb-6 shadow-inner ring-4 ring-white">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>

                    <h1 className="text-2xl font-black text-stone-800 mb-2 tracking-tight">Pesanan Berhasil!</h1>
                    <p className="text-stone-500 mb-8 text-sm leading-relaxed">Terima kasih banyak. Kami sedang menyiapkan paket Anda untuk dikirim via {courier}.</p>

                    <button onClick={onBack} className="w-full bg-stone-800 text-white py-3.5 rounded-xl font-bold hover:bg-rose-500 hover:shadow-lg transition-all shadow-md">
                        Kembali ke Belanja
                    </button>
                    <button onClick={onNavigateOrders} className="w-full mt-3 bg-white border-2 border-stone-800 text-stone-800 py-3.5 rounded-xl font-bold hover:bg-stone-50 transition-all active:scale-[0.98]">
                        Lihat Status Pesanan
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 font-sans pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-100 p-4 sm:px-6 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button onClick={() => step === 2 ? setStep(1) : onBack()} className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="font-bold text-lg text-stone-800 tracking-tight">Pengiriman & Pembayaran</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start animate-in fade-in duration-500">

                {/* Format Form */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Ringkasan Keranjang Kecil (Mobile only) */}
                    <div className="bg-white p-5 rounded-3xl border border-stone-100 shadow-sm lg:hidden mb-6">
                        <h3 className="font-bold text-stone-800 mb-4 flex justify-between">
                            Daftar Pesanan <span className="text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md text-sm">{cart.length} item</span>
                        </h3>
                        <div className="space-y-3">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.variant}`} className="flex gap-3 pb-3 border-b border-stone-50 last:border-0 last:pb-0">
                                    <img src={item.image_url || '/images/placeholder.png'} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-stone-50 border border-stone-100" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-stone-800 text-sm leading-tight line-clamp-2 pr-2">{item.name}</h4>
                                            <button onClick={() => onRemoveItem(item.id, item.variant)} className="text-stone-300 hover:text-red-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mt-0.5">{item.variant}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-1 border border-stone-100">
                                                <button onClick={() => onUpdateQuantity(item.id, item.variant, -1)} className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-800">-</button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.variant, 1)} className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-stone-800">+</button>
                                            </div>
                                            <span className="font-bold text-rose-500 text-sm">Rp {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {step === 1 ? (
                        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-stone-800 text-white font-bold flex items-center justify-center text-sm shadow-md">1</div>
                                <h2 className="text-xl font-black text-stone-800">Alamat Pengiriman</h2>
                            </div>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>
                            )}

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-500 mb-1.5 ml-1">Nama Lengkap Penerima</label>
                                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-400 focus:bg-white transition-colors" placeholder="Cth: Nisa Sabyan" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-stone-500 mb-1.5 ml-1">Nomor WhatsApp Aktif</label>
                                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-400 focus:bg-white transition-colors" placeholder="Cth: 081234567890" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-1.5 ml-1">Alamat Lengkap (Jalan, RT/RW, Kecamatan)</label>
                                    <textarea value={address} onChange={e => setAddress(e.target.value)} rows="3" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-400 focus:bg-white transition-colors resize-none" placeholder="Cth: Jl. Melati Kav. 24, RT 01/RW 02..."></textarea>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-500 mb-3 ml-1 mt-4">Pilih Ekspedisi</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['JNE', 'SiCepat', 'Gosend'].map(c => (
                                            <button
                                                key={c} onClick={() => setCourier(c)}
                                                className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${courier === c ? 'border-rose-400 bg-rose-50 text-rose-600 shadow-sm' : 'border-stone-100 text-stone-500 hover:border-stone-300'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleNextStep} className="w-full mt-8 bg-stone-800 text-white py-4 rounded-xl font-bold shadow-md hover:bg-stone-700 transition-colors flex justify-center items-center gap-2">
                                Lanjut ke Pembayaran <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-stone-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-sm shadow-md">2</div>
                                <h2 className="text-xl font-black text-rose-600">Pilih Pembayaran</h2>
                            </div>

                            <div className="mb-6 p-4 bg-stone-50 border border-stone-100 rounded-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-rose-100 to-transparent rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2" />
                                <p className="text-xs font-bold text-stone-400 mb-1">Kirim Ke</p>
                                <p className="font-bold text-stone-800 text-sm mb-0.5">{name} <span className="font-normal text-stone-500">({phone})</span></p>
                                <p className="text-xs text-stone-500 line-clamp-1">{address}</p>
                                <p className="text-xs font-bold text-rose-500 mt-2">Kurir: {courier}</p>
                                <button onClick={() => setStep(1)} className="absolute top-4 right-4 text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100 hover:bg-rose-100 transition-colors">Ubah</button>
                            </div>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>
                            )}

                            <div className="space-y-3">
                                {[
                                    { id: 'QRIS', name: 'QRIS (Bayar Instan)', icon: '📱', desc: 'Gopay, OVO, Dana, LinkAja' },
                                    { id: 'Bank Transfer', name: 'Transfer Bank (Semua Bank)', icon: '🏦', desc: 'Bisa transfer dari bank manapun' },
                                    { id: 'COD', name: 'Bayar di Tempat (COD)', icon: '📦', desc: 'Bayar saat paket sampai' }
                                ].map((method) => (
                                    <label key={method.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === method.id ? 'border-rose-400 bg-rose-50/50 shadow-sm' : 'border-stone-100 hover:border-rose-200 bg-white'}`}>
                                        <div className="w-12 h-12 rounded-xl bg-white border border-stone-100 flex items-center justify-center mr-4 shadow-sm text-xl">
                                            {method.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-stone-800 text-sm">{method.name}</h4>
                                            <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">{method.desc}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'border-rose-500 bg-rose-500' : 'border-stone-300'}`}>
                                            {paymentMethod === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                        </div>
                                        <input type="radio" className="hidden" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Ringkasan Belanja (Desktop & Sticky Bottom Mobile) */}
                <div className="lg:col-span-2 relative">
                    <div className="hidden lg:block bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm sticky top-24 mb-6">
                        <h3 className="font-bold text-stone-800 mb-4 pb-4 border-b border-stone-50">Daftar Pesanan ({cart.length})</h3>
                        <div className="space-y-4 max-h-64 overflow-y-auto mb-4 pr-2">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.variant}`} className="flex gap-3 group">
                                    <img src={item.image_url || '/images/placeholder.png'} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-stone-50 border border-stone-100 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-stone-800 text-[11px] line-clamp-1 pr-1">{item.name}</h4>
                                            <button onClick={() => onRemoveItem(item.id, item.variant)} className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-stone-400 uppercase tracking-tight">{item.variant}</p>
                                        <div className="flex justify-between items-center mt-1">
                                            <div className="flex items-center gap-1.5 bg-stone-50 rounded-md p-0.5 px-2 border border-stone-100 scale-90 -ml-1">
                                                <button onClick={() => onUpdateQuantity(item.id, item.variant, -1)} className="text-[10px] text-stone-400 hover:text-stone-800">-</button>
                                                <span className="text-[10px] font-bold min-w-[8px] text-center">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.variant, 1)} className="text-[10px] text-stone-400 hover:text-stone-800">+</button>
                                            </div>
                                            <p className="font-bold text-rose-500 text-[11px]">Rp {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-stone-800 text-white p-6 sm:p-8 lg:rounded-[2rem] rounded-t-[2rem] shadow-2xl lg:shadow-md fixed bottom-0 left-0 w-full lg:sticky lg:top-auto z-50">
                        <h3 className="font-bold text-stone-300 text-sm mb-4">Ringkasan Pembayaran</h3>

                        <div className="space-y-2 text-sm text-stone-300 mb-4">
                            <div className="flex justify-between"><span>Subtotal Produk</span><span className="font-mono">Rp {total.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span>Ongkos Kirim ({courier})</span><span className="font-mono">Rp {ongkir.toLocaleString()}</span></div>
                            <div className="flex justify-between items-center text-orange-300/80"><span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>Estimasi Zakat</span><span className="font-mono text-xs">Rp {zakat.toLocaleString()}</span></div>
                        </div>

                        <div className="flex justify-between items-end border-t border-stone-600/50 pt-4 mb-5">
                            <span className="text-stone-300 text-sm">Total Tagihan</span>
                            <span className="text-2xl font-black text-white font-mono tracking-tight">Rp {finalTotal.toLocaleString()}</span>
                        </div>

                        {step === 2 && (
                            <button
                                onClick={handlePayment}
                                disabled={!paymentMethod || isProcessing}
                                className={`w-full py-4 rounded-xl font-bold transition-all text-base flex justify-center items-center gap-2 group relative overflow-hidden
                                    ${!paymentMethod || isProcessing ? 'bg-stone-700 text-stone-500 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:shadow-[0_0_20px_rgba(251,113,133,0.4)] hover:-translate-y-0.5'}`}
                            >
                                {paymentMethod && !isProcessing && <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />}
                                {isProcessing ? 'Memproses...' : 'Selesaikan Pembayaran'}
                                {!isProcessing && paymentMethod && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14 M12 5l7 7-7 7" /></svg>}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
