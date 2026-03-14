import React, { useState } from 'react';
import { supabase } from './supabase';

const Login = ({ onLogin, onNavigateRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                if (signInError.message.includes('Invalid login credentials')) {
                    throw new Error('Email atau Password tidak valid. Coba lagi.');
                }
                throw signInError;
            }

            // Jika berhasil
            onLogin();

        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat masuk. Coba lagi nanti.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 font-sans text-stone-800">
            {/* Background Gradients Soft & Menarik (Pastel Rose, Peach, Mint) */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-rose-300/40 to-orange-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-pink-300/40 to-rose-300/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gradient-to-b from-orange-200/40 to-transparent rounded-full blur-[80px] pointer-events-none" />

            {/* Login Card Container */}
            <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(251,113,133,0.15)] border border-white">

                    {/* Header Logo Area */}
                    <div className="text-center mb-8 flex flex-col items-center">
                        {/* New Brand Logo: Elegant Boutique */}
                        <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center border border-stone-200 shadow-inner group py-2 mb-4">
                            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-rose-400" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 4 C9 4 7 6 7 9 C7 11 9 12 12 14 C15 12 17 11 17 9 C17 6 15 4 12 4 Z M12 4 L12 2" />
                                <path d="M5 13 L2 18 L22 18 L19 13 M8 18 L8 22 M16 18 L16 22" strokeWidth="0.5"/>
                            </svg>
                        </div>
                        <div className="flex flex-col items-center mb-6">
                            <div className="text-4xl text-stone-800 flex items-center gap-2 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                <span className="font-semibold italic">Ayra</span>
                                <span className="font-black text-rose-500">Wear</span>
                            </div>
                            <div className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-black mt-2">Premium Syar'i</div>
                        </div>

                        <h1 className="text-2xl font-black text-stone-800 tracking-tight">Selamat Datang Kembali</h1>
                        <p className="text-stone-500 font-medium mt-1 text-sm">Silakan masuk ke akun Ayra-Wear Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-stone-600 ml-1 block uppercase tracking-wider">Alamat Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-stone-300 group-focus-within:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-2 rounded-2xl text-stone-800 font-medium placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all border-stone-100 focus:border-rose-400 focus:bg-white hover:border-rose-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-stone-600 ml-1 block uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-stone-300 group-focus-within:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-2 rounded-2xl text-stone-800 font-medium placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all border-stone-100 focus:border-rose-400 focus:bg-white hover:border-rose-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Remember Me & Error */}
                        <div className="flex items-center justify-between mt-2">
                            <label className="flex items-center cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5 mr-2">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="appearance-none w-5 h-5 border-2 border-stone-200 rounded-md checked:bg-rose-500 checked:border-rose-500 transition-colors cursor-pointer"
                                    />
                                    <svg className={`absolute w-3 h-3 text-white pointer-events-none transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <span className="text-sm font-medium text-stone-500 group-hover:text-stone-700 transition-colors">Ingat Saya</span>
                            </label>

                            <a href="#" className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors">Lupa Password?</a>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1 bg-red-50 p-3 rounded-xl border border-red-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className={`w-full py-4 mt-2 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all duration-300 relative overflow-hidden group ${isLoading || !email || !password ? 'bg-stone-100 text-stone-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:from-rose-600 hover:to-orange-500 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5'}`}
                        >
                            {!(!email || !password || isLoading) && (
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                            )}

                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Memverifikasi...</span>
                                </>
                            ) : (
                                <span>Masuk ke Dashboard</span>
                            )}
                        </button>
                    </form>

                    {/* Footer Info / Daftar */}
                    <div className="mt-8 pt-6 border-t border-stone-100 text-center text-stone-500 text-sm font-medium">
                        Belum punya akun?{' '}
                        <button onClick={onNavigateRegister} type="button" className="text-rose-500 font-bold hover:text-rose-600 hover:underline transition-all">
                            Daftar Sekarang
                        </button>
                    </div>
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

export default Login;