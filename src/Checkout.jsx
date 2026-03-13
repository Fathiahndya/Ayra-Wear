import React, { useState } from 'react';

const Checkout = ({ cart, total, zakat, onBack }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        if (!paymentMethod) return;

        setIsProcessing(true);
        // Simulasi proses pembayaran
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsProcessing(false);
        setIsPaid(true);
    };

    if (isPaid) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 font-sans relative overflow-hidden">
                <div className="absolute top-0 -inset-x-20 h-96 bg-gradient-to-b from-rose-100/60 to-transparent blur-3xl opacity-60 pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-[40rem] h-[40rem] bg-orange-100/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

                <div className="max-w-xl w-full bg-white/90 backdrop-blur-xl p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(251,113,133,0.1)] border border-stone-100 relative z-10 text-center animate-in fade-in zoom-in duration-500">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-rose-50 to-orange-50 text-rose-500 mb-8 shadow-inner ring-4 ring-white relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-rose-500 mb-4 tracking-tight">Alhamdulillah!</h1>
                    <p className="text-stone-600 mb-2 text-lg font-bold">Pembayaran berhasil menggunakan {paymentMethod}.</p>
                    <p className="text-stone-400 mb-8 font-medium italic text-sm">Amanah telah ditunaikan. Semoga membawa keberkahan.</p>

                    <button
                        onClick={onBack}
                        className="w-full sm:w-auto px-10 bg-gradient-to-r from-rose-400 to-orange-400 text-white py-4 rounded-xl font-bold hover:from-rose-500 hover:to-orange-500 transition-all duration-300 shadow-[0_8px_20px_0_rgb(251,113,133,0.25)] hover:-translate-y-0.5 mt-4 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                        <span className="flex items-center justify-center gap-2">
                            Kembali ke Dashboard POS
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
            {/* Soft Background Decor */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-rose-100/40 to-transparent blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-teal-50/40 to-transparent blur-3xl opacity-60 pointer-events-none" />

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">

                {/* Kolom Kiri: Rincian Pesanan */}
                <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgb(251,113,133,0.05)] border border-stone-100 flex flex-col lg:h-auto lg:max-h-[85vh]">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100 shrink-0">
                        <button onClick={onBack} className="p-2 hover:bg-rose-50 text-stone-500 hover:text-rose-500 rounded-full transition-colors bg-stone-50 border border-stone-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <h2 className="text-2xl font-black text-stone-800 tracking-tight">Ringkasan Checkout</h2>
                    </div>

                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-3 -mr-3 flex-grow mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-stone-50/80 p-3 sm:p-4 rounded-xl border border-transparent hover:border-rose-100 transition-colors">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-rose-50/50 flex-shrink-0 shadow-sm border border-stone-200/50">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 pr-2">
                                    <h4 className="font-bold text-stone-800 truncate text-sm sm:text-base leading-tight">{item.name}</h4>
                                    <p className="text-xs sm:text-sm text-stone-500 mt-1">{item.quantity} x <span className="text-rose-500 font-bold">Rp {item.price.toLocaleString()}</span></p>
                                </div>
                                <div className="font-mono font-black text-rose-500 text-sm sm:text-base border border-rose-100/50 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                                    Rp {(item.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-rose-50/50 to-orange-50/50 rounded-2xl p-5 border border-rose-100/50 shrink-0 shadow-inner">
                        <div className="flex justify-between items-center mb-3 text-stone-500 font-medium pb-3 border-b border-rose-100/50">
                            <span>Subtotal Produk</span>
                            <span className="font-mono font-bold text-stone-700">Rp {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-5 text-stone-500 font-medium pb-4 border-b border-rose-100/50">
                            <span className="flex items-center gap-1.5 text-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                Estimasi Zakat
                            </span>
                            <span className="text-orange-500 italic font-mono font-bold scale-95">Rp {zakat.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-stone-800 uppercase tracking-widest opacity-80 mb-1">Total Tunai</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-black text-2xl sm:text-3xl tracking-tight">Rp {total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Kolom Kanan: Pembayaran */}
                <div className="bg-white/95 backdrop-blur-3xl p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(251,113,133,0.1)] border border-white flex flex-col lg:h-auto lg:max-h-[85vh]">
                    <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center gap-2 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                        Pilih Metode Pembayaran
                    </h3>

                    <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-3 -mr-3 mb-6">
                        {/* Pilihan: QRIS */}
                        <label className={`flex items-start p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'QRIS' ? 'border-rose-400 bg-rose-50/50 shadow-md shadow-rose-500/5' : 'border-stone-100 hover:border-rose-200 bg-white hover:bg-stone-50'}`}>
                            <div className={`w-12 h-12 rounded-xl shadow-sm border flex items-center justify-center mr-4 shrink-0 transition-all ${paymentMethod === 'QRIS' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-rose-400 border-stone-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1a2 2 0 0 0 2-2V7" /><path d="M21 12v.01" /></svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-stone-800 mb-0.5">QRIS</h4>
                                <p className="text-sm text-stone-500 font-medium">Gopay, OVO, ShopeePay, DANA</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${paymentMethod === 'QRIS' ? 'border-rose-500 bg-rose-500' : 'border-stone-200 bg-white'}`}>
                                {paymentMethod === 'QRIS' && <div className="w-2 h-2 border-2 border-white rounded-full bg-white scale-50" />}
                            </div>
                            <input type="radio" className="hidden" name="payment" value="QRIS" checked={paymentMethod === 'QRIS'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        </label>

                        {/* Pilihan: Transfer Bank */}
                        <label className={`flex items-start p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'Transfer Bank' ? 'border-rose-400 bg-rose-50/50 shadow-md shadow-rose-500/5' : 'border-stone-100 hover:border-rose-200 bg-white hover:bg-stone-50'}`}>
                            <div className={`w-12 h-12 rounded-xl shadow-sm border flex items-center justify-center mr-4 shrink-0 transition-all ${paymentMethod === 'Transfer Bank' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-rose-400 border-stone-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M3 10h18" /><path d="M5 6l7-3 7 3" /><path d="M4 10v11" /><path d="M20 10v11" /><path d="M8 14v3" /><path d="M12 14v3" /><path d="M16 14v3" /></svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-stone-800 mb-0.5">Transfer Bank</h4>
                                <p className="text-sm text-stone-500 font-medium">BSI, Mandiri, BCA, BNI</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${paymentMethod === 'Transfer Bank' ? 'border-rose-500 bg-rose-500' : 'border-stone-200 bg-white'}`}>
                                {paymentMethod === 'Transfer Bank' && <div className="w-2 h-2 border-2 border-white rounded-full bg-white scale-50" />}
                            </div>
                            <input type="radio" className="hidden" name="payment" value="Transfer Bank" checked={paymentMethod === 'Transfer Bank'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        </label>

                        {/* Pilihan: Tunai */}
                        <label className={`flex items-start p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${paymentMethod === 'Tunai' ? 'border-rose-400 bg-rose-50/50 shadow-md shadow-rose-500/5' : 'border-stone-100 hover:border-rose-200 bg-white hover:bg-stone-50'}`}>
                            <div className={`w-12 h-12 rounded-xl shadow-sm border flex items-center justify-center mr-4 shrink-0 transition-all ${paymentMethod === 'Tunai' ? 'bg-rose-500 text-white border-rose-500' : 'bg-white text-rose-400 border-stone-100'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-stone-800 mb-0.5">Tunai / Cash</h4>
                                <p className="text-sm text-stone-500 font-medium">Bayar langsung di kasir toko</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${paymentMethod === 'Tunai' ? 'border-rose-500 bg-rose-500' : 'border-stone-200 bg-white'}`}>
                                {paymentMethod === 'Tunai' && <div className="w-2 h-2 border-2 border-white rounded-full bg-white scale-50" />}
                            </div>
                            <input type="radio" className="hidden" name="payment" value="Tunai" checked={paymentMethod === 'Tunai'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        </label>
                    </div>

                    <div className="shrink-0 pt-2">
                        <button
                            onClick={handlePayment}
                            disabled={!paymentMethod || isProcessing}
                            className={`w-full py-4 sm:py-5 rounded-2xl font-bold transition-all duration-300 text-lg flex justify-center items-center gap-2 relative overflow-hidden group
                                ${!paymentMethod
                                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed shadow-none'
                                    : isProcessing
                                        ? 'bg-orange-400 text-white cursor-wait'
                                        : 'bg-gradient-to-r from-rose-400 to-orange-400 text-white hover:from-rose-500 hover:to-orange-500 shadow-[0_8px_20px_0_rgb(251,113,133,0.25)] hover:shadow-[0_12px_25px_0_rgb(251,113,133,0.35)] hover:-translate-y-1'
                                }`}
                        >
                            {/* Inner shine effect */}
                            {!(!paymentMethod || isProcessing) && (
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                            )}

                            {isProcessing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Konfirmasi Tagihan
                                    {paymentMethod && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                </>
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

export default Checkout;
