import React, { useState } from 'react';

const Register = ({ onNavigateLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulasi network request lambat
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
        // Simulasi berhasil, langsung back ke login
        onNavigateLogin();
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-rose-50/30 font-sans text-stone-800">
            {/* Background Gradients Soft & Menarik (Pastel Rose, Peach, Mint) */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-teal-100/40 to-rose-200/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-rose-200/50 to-orange-100/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-gradient-to-b from-blue-100/30 to-transparent rounded-full blur-[80px] pointer-events-none" />

            {/* Form Container */}
            <div className="w-full max-w-md p-6 relative z-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(251,113,133,0.15)] border border-white">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100/50 shadow-inner mb-4 relative group cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <svg className="w-8 h-8 text-rose-500 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-rose-600 tracking-tight">Buat Akun Baru</h1>
                        <p className="text-stone-500 font-medium mt-1 text-sm">Mulai perjalanan bisnis Anda bersama Ayra-Wear</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Area Input Nama */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-600 ml-1 block uppercase tracking-wider">Nama Lengkap</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-stone-300 group-focus-within:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ayra Fashion"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-2 rounded-2xl text-stone-800 font-medium placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all border-stone-100 focus:border-rose-400 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input Field */}
                        <div className="space-y-1">
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
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-2 rounded-2xl text-stone-800 font-medium placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all border-stone-100 focus:border-rose-400 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-stone-600 ml-1 block uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-stone-300 group-focus-within:text-rose-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Minimal 6 karakter"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border-2 rounded-2xl text-stone-800 font-medium placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all border-stone-100 focus:border-rose-400 focus:bg-white"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email || !password || !name}
                            className={`w-full py-4 mt-6 rounded-2xl font-bold flex justify-center items-center gap-2 transition-all duration-300 relative overflow-hidden group ${isLoading || !email || !password || !name ? 'bg-stone-100 text-stone-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-rose-500 to-orange-400 text-white hover:from-rose-600 hover:to-orange-500 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5'}`}
                        >
                            {!(!email || !password || !name || isLoading) && (
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 group-hover:opacity-100" />
                            )}

                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <span>Daftar Akun</span>
                            )}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-stone-100 text-center text-stone-500 text-sm font-medium">
                        Sudah punya akun?{' '}
                        <button onClick={onNavigateLogin} className="text-rose-500 font-bold hover:text-rose-600 hover:underline transition-all">
                            Masuk di sini
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

export default Register;