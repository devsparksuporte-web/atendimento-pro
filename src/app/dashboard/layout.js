'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Sidebar from '@/components/Sidebar';
import { Menu, Bell, Search } from 'lucide-react';

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-card)',
                gap: '24px'
            }}>
                <div className="logo-icon animate-pulse" style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px'
                }}>
                    <Search size={32} color="white" />
                </div>
                <div style={{ color: 'var(--gray-500)', fontWeight: 600 }}>Carregando seu painel...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)' }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <header className="app-header">
                <div className="header-left">
                    <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu size={24} />
                    </button>
                    <div className="search-bar" style={{ minWidth: '260px' }}>
                        <Search size={18} />
                        <input placeholder="Buscar pedidos, clientes..." />
                    </div>
                </div>
                <div className="header-right">
                    <button className="header-icon-btn">
                        <Bell size={20} />
                        <span className="notification-dot"></span>
                    </button>
                    <div className="user-avatar" style={{
                        width: '36px',
                        height: '36px',
                        fontSize: '0.8rem',
                        background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                        color: 'white',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                    </div>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default function DashboardLayout({ children }) {
    return (
        <DashboardShell>{children}</DashboardShell>
    );
}
