'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Sidebar from '@/components/Sidebar';
import { Menu, Bell, Search } from 'lucide-react';

function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
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
                    <div className="user-avatar" style={{ width: '36px', height: '36px', fontSize: '0.8rem' }}>JP</div>
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
        <ThemeProvider>
            <DashboardShell>{children}</DashboardShell>
        </ThemeProvider>
    );
}
