import React, { useState } from 'react';
import { supabase } from './supabase';

const ProductDetail = ({ product, onBack, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('L');
    const [selectedColor, setSelectedColor] = useState('Sesuai Gambar');
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    const sizes = ['S', 'M', 'L', 'XL'];

    // Measurement Data
    const getSizeData = () => {
        if (product.category === 'Pakaian Wanita') return {
            title: 'Panduan Ukuran Gamis/Wanita',
            headers: ['Ukuran', 'Lingkar Dada (LD)', 'Panjang Baju', 'Lengan'],
            rows: [
                ['S', '94 cm', '135 cm', '55 cm'],
                ['M', '100 cm', '138 cm', '56 cm'],
                ['L', '106 cm', '140 cm', '57 cm'],
                ['XL', '112 cm', '142 cm', '58 cm']
            ]
        };
        if (product.category === 'Pakaian Pria') return {
            title: 'Panduan Ukuran Koko/Pria',
            headers: ['Ukuran', 'Lingkar Dada (LD)', 'Panjang Baju', 'Bahu'],
            rows: [
                ['S', '104 cm', '72 cm', '44 cm'],
                ['M', '108 cm', '74 cm', '46 cm'],
                ['L', '114 cm', '76 cm', '48 cm'],
                ['XL', '120 cm', '78 cm', '50 cm']
            ]
        };
        if (product.category === 'Anak') return {
            title: 'Panduan Ukuran Anak',
            headers: ['Ukuran', 'Usia (Estimasi)', 'LD', 'Panjang'],
            rows: [
                ['S', '2-4 Tahun', '64 cm', '75 cm'],
                ['M', '5-7 Tahun', '72 cm', '85 cm'],
                ['L', '8-10 Tahun', '80 cm', '100 cm'],
                ['XL', '11-12 Tahun', '88 cm', '115 cm']
            ]
        };
        return {
            title: 'Panduan Ukuran Aksesoris',
            headers: ['Tipe', 'Panjang', 'Lebar', 'Keterangan'],
            rows: [
                ['Standar', 'All Size', 'All Size', 'Menyesuaikan bentuk']
            ]
        };
    };

    const sizeGuide = getSizeData();

    // Dynamic Colors based on category
    const getColors = () => {
        if (product.category === 'Pakaian Pria') return ['Sesuai Gambar', 'Navy', 'Hitam', 'Abu-abu', 'Putih'];
        if (product.category === 'Pakaian Wanita') return ['Sesuai Gambar', 'Rose', 'Emerald', 'Maroon', 'Nude'];
        if (product.category === 'Anak') return ['Sesuai Gambar', 'Pink', 'Biru Muda', 'Kuning', 'Hijau'];
        return ['Sesuai Gambar', 'Hitam', 'Putih', 'Gold'];
    };

    const colors = getColors();

    // Dynamic Features based on category
    const getFeatures = () => {
        if (product.category === 'Pakaian Wanita') return [
            'Bahan: Premium Silk / Cerruti Soft',
            'Jahitan butik super rapi',
            'Wudhu & Busui friendly',
            'Efek flowy & tidak menerawang'
        ];
        if (product.category === 'Pakaian Pria') return [
            'Bahan: Cotton Toyobo / Linen Premium',
            'Jahitan butik super rapi',
            'Kerah Mandarin (Sianghai)',
            'Wudhu friendly'
        ];
        if (product.category === 'Anak') return [
            'Bahan: 100% Cotton Combed (Adem)',
            'Warna ceria tidak mudah luntur',
            'Desain nyaman untuk bergerak',
            'Kancing/Resleting aman untuk anak'
        ];
        return [
            'Bahan: Premium Quality Material',
            'Jahitan butik super rapi',
            'Eksklusif Ayra-Wear packaging',
            'Garansi kualitas produk'
        ];
    };

    const features = getFeatures();
    const [isSavingWishlist, setIsSavingWishlist] = useState(false);

    const handleAddToWishlist = async () => {
        setIsSavingWishlist(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Silakan login terlebih dahulu untuk menyimpan ke Wishlist');
                return;
            }

            const { error } = await supabase
                .from('wishlists')
                .insert({ user_id: user.id, product_id: product.id });

            if (error) throw error;
            alert('Produk berhasil ditambahkan ke Wishlist! ❤️');
        } catch (error) {
            console.error('Gagal menambah ke wishlist:', error);
            alert('Gagal menyimpannya: ' + error.message);
        } finally {
            setIsSavingWishlist(false);
        }
    };

    const handleAddToCart = () => {
        // Pass customized product to cart
        onAddToCart({
            ...product,
            variant: `${selectedSize} - ${selectedColor}`,
            quantity: quantity
        });

        // Return to home after adding
        onBack();
    };

    return (
        <div className="min-h-screen bg-white font-sans pb-24">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-100 p-4 sm:px-6">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-50 hover:bg-rose-50 text-stone-600 hover:text-rose-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="font-bold text-lg text-stone-800 tracking-tight">Detail Produk</h1>
                    <div className="w-10"></div> {/* Spacer */}
                </div>
            </header>

            <main className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-12 md:py-8 items-start">

                {/* Image Section */}
                <div className="w-full aspect-[4/5] md:aspect-square bg-stone-50 flex items-center justify-center p-8 md:rounded-[2.5rem] relative">
                    <img src={product.image_url || '/images/placeholder.png'} alt={product.name} className="object-contain w-full h-full drop-shadow-2xl" />
                    <button
                        onClick={handleAddToWishlist}
                        disabled={isSavingWishlist}
                        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-300 hover:text-rose-500 hover:scale-110 transition-all shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isSavingWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    </button>
                </div>

                {/* Details Section */}
                <div className="p-5 sm:px-6 md:px-0 mt-2">
                    <div className="mb-2">
                        <span className="inline-block px-3 py-1 bg-stone-100 rounded-lg text-xs font-bold text-stone-500 uppercase tracking-widest">{product.category}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-stone-800 leading-tight mb-3">{product.name}</h2>
                    <p className="text-3xl font-base text-rose-500 font-black mb-6 tracking-tight">Rp {product.price.toLocaleString()}</p>

                    <div className="h-px w-full bg-stone-100 mb-6"></div>

                    {/* Size Selection */}
                    <div className="mb-6">
                        <h4 className="font-bold text-stone-700 mb-3 flex justify-between items-center">
                            Pilih Ukuran
                            <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="text-rose-500 font-bold text-sm hover:text-rose-600 transition-colors flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-full"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                Panduan Ukuran
                            </button>
                        </h4>
                        <div className="flex gap-3">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-14 h-12 rounded-xl font-bold transition-all ${selectedSize === size ? 'bg-stone-800 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-800'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-8">
                        <h4 className="font-bold text-stone-700 mb-3">Pilihan Warna</h4>
                        <div className="flex flex-wrap gap-2">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${selectedColor === color ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm' : 'bg-white border border-stone-200 text-stone-500 hover:border-rose-200'}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-stone-100 mb-6"></div>

                    {/* Description */}
                    <div className="mb-8">
                        <h4 className="font-bold text-stone-700 mb-2">Deskripsi Produk</h4>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            {product.description || `Koleksi premium dari Ayra-Wear yang dirancang khusus untuk kenyamanan Anda beraktivitas seharian. Memberikan kesan elegan dan eksklusif di setiap kesempatan.`}
                        </p>
                        <ul className="text-stone-500 text-sm mt-3 space-y-1.5 pl-0">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

            {/* Size Guide Modal */}
            {isSizeGuideOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsSizeGuideOpen(false)}
                    ></div>
                    <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-stone-800">{sizeGuide.title}</h3>
                                <button
                                    onClick={() => setIsSizeGuideOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-rose-100 hover:text-rose-500 transition-all"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-stone-100">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-stone-50 text-stone-400 text-[10px] font-black uppercase tracking-widest border-b border-stone-100">
                                            {sizeGuide.headers.map((header, i) => (
                                                <th key={i} className="px-4 py-4">{header}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-50">
                                        {sizeGuide.rows.map((row, i) => (
                                            <tr key={i} className="hover:bg-rose-50/30 transition-colors">
                                                {row.map((cell, j) => (
                                                    <td key={j} className={`px-4 py-4 text-sm font-bold ${j === 0 ? 'text-stone-800' : 'text-stone-500 font-medium'}`}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-stone-200 shrink-0">
                                        <span className="text-lg">💡</span>
                                    </div>
                                    <p className="text-xs text-stone-500 leading-relaxed pt-1">
                                        <span className="font-bold text-stone-700 block mb-0.5">Catatan Penting:</span>
                                        Toleransi ukuran ±1-2 cm karena proses produksi masal. Pastikan mengukur sebelum memesan agar pas di badan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky Bottom Bar for Add to Cart */}
            <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-stone-100 p-4 sm:p-5 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex gap-4">
                    {/* Quantity Control */}
                    <div className="flex items-center bg-stone-50 border border-stone-200/80 rounded-2xl overflow-hidden shrink-0 h-14">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
                        </button>
                        <span className="w-10 text-center font-bold text-stone-800">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gradient-to-r from-rose-500 to-orange-400 hover:from-rose-600 hover:to-orange-500 text-white rounded-2xl h-14 font-bold text-base shadow-[0_8px_20px_0_rgb(251,113,133,0.3)] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Masukkan Keranjang
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
