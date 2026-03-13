import React, { useState } from 'react';

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

        // Simulasi network request lambat
        await new Promise(resolve => setTimeout(resolve, 800));

        if (email === 'admin@ayra.com' && password === '123456') {
            onLogin();
        } else {
            setError('Email atau Password tidak valid. Coba lagi.');
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
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100/50 shadow-inner mb-5 relative group cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <svg className="w-10 h-10 text-rose-500 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.809c0-.816-.31-1.597-.86-2.176l-3.23-3.39c-.55-.579-1.3-.906-2.11-.906h-5.96c-.81 0-1.56.327-2.11.906L2.86 7.633c-.55.579-.86 1.36-.86 2.176V21m17.63-12.72L21 6.5C19.86 5.5 18 5.5 18 5.5s-1.86 0-3 1-3 1-3 1" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-black text-rose-600 tracking-tight">Ayra-Wear</h1>
                        <p className="text-stone-500 font-medium mt-2 text-sm">Selamat Datang Kembali</p>
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
                        <button onClick={onNavigateRegister} className="text-rose-500 font-bold hover:text-rose-600 hover:underline transition-all">
                            Daftar Sekarang
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6 text-stone-400 text-xs font-medium">
                    Email: <span className="font-bold text-stone-500">admin@ayra.com</span> - Pass: <span className="font-bold text-stone-500">123456</span>
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