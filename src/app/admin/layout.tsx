'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                {children}
            </div>
        );
    }

    const menuItems = [
        { label: 'Новости', href: '/admin/news', icon: '📰' },
        { label: 'Мероприятия', href: '/admin/events', icon: '📅' },
        { label: 'Партнеры', href: '/admin/partners', icon: '🤝' },
        { label: 'Состав', href: '/admin/members', icon: '👥' },
        { label: 'Заявки', href: '/admin/requests', icon: '📩' },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8f9fc] font-sans text-gray-900">
            <aside className="w-80 bg-[#0f172a] text-white flex flex-col fixed inset-y-0 z-50 shadow-2xl">
                <div className="p-10 border-b border-slate-800/50">
                    <h1 className="text-3xl font-extrabold tracking-wider text-blue-500">STUD<span className="text-white">IU</span></h1>
                    <p className="text-xs text-slate-500 mt-2 uppercase tracking-[0.2em] font-bold">Admin Panel</p>
                </div>

                <nav className="flex-1 p-6 space-y-3 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <span className={`text-2xl transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{item.icon}</span>
                                <span className="font-bold text-lg tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8 border-t border-slate-800/50">
                    <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="font-medium text-lg">На сайт</span>
                    </Link>
                </div>
            </aside>

            <main className="ml-80 flex-1 p-10 xl:p-16 overflow-x-hidden">
                <div className="max-w-[1920px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
