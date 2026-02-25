'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import {
    LayoutDashboard, MessageCircle, Users, ShoppingBag,
    UtensilsCrossed, DollarSign, BarChart3, Settings,
    MessageSquare, LogOut, ChevronDown, Check, Shield,
    Sun, Moon
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Atendimentos', href: '/dashboard/atendimentos', icon: MessageCircle },
    { label: 'Clientes', href: '/dashboard/clientes', icon: Users },
    { label: 'Pedidos', href: '/dashboard/pedidos', icon: ShoppingBag },
    { label: 'Cardápio', href: '/dashboard/cardapio', icon: UtensilsCrossed },
    { label: 'Financeiro', href: '/dashboard/financeiro', icon: DollarSign },
    { label: 'Relatórios', href: '/dashboard/relatorios', icon: BarChart3 },
    { label: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const { businessType, setBusinessType, currentTheme, themes, appearance, toggleAppearance } = useTheme();
    const [modeOpen, setModeOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setModeOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectMode = (key) => {
        setBusinessType(key);
        setModeOpen(false);
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{ borderRight: '1px solid hsla(var(--gray-200), 0.5)' }}>
                <div className="sidebar-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '20px', padding: '32px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="logo-icon" style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            boxShadow: '0 4px 12px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2)'
                        }}>
                            <MessageSquare size={20} color="white" />
                        </div>
                        <div className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            Atendimento <span style={{ color: 'var(--primary)' }}>Pro</span>
                        </div>
                    </div>

                    {/* Mode Selector Dropdown */}
                    <div ref={dropdownRef} style={{ position: 'relative' }}>
                        <button
                            onClick={() => setModeOpen(!modeOpen)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 14px',
                                background: 'var(--gray-50)',
                                border: '1.5px solid hsla(var(--gray-200), 0.8)',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                            className="mode-toggle-hover"
                        >
                            <span style={{ fontSize: '20px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{currentTheme.icon}</span>
                            <span style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontSize: '0.85rem', color: 'var(--gray-900)' }}>{currentTheme.name}</span>
                            <ChevronDown size={16} style={{
                                color: 'var(--gray-400)',
                                transition: 'transform 0.3s ease',
                                transform: modeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }} />
                        </button>

                        {modeOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: 0,
                                right: 0,
                                background: 'var(--bg-card)',
                                border: '1px solid hsla(var(--gray-200), 0.8)',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-xl)',
                                zIndex: 200,
                                overflow: 'hidden',
                                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}>
                                <div style={{ padding: '8px' }}>
                                    {Object.entries(themes).map(([key, theme]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleSelectMode(key)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px',
                                                border: 'none',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                background: businessType === key ? 'var(--gray-50)' : 'transparent',
                                                transition: 'all 0.2s ease',
                                            }}
                                            className="theme-option-hover"
                                        >
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                background: theme.color + '15', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                                            }}>
                                                {theme.icon}
                                            </div>
                                            <span style={{
                                                flex: 1, textAlign: 'left', fontSize: '0.85rem',
                                                fontWeight: businessType === key ? 700 : 500,
                                                color: businessType === key ? 'var(--gray-900)' : 'var(--gray-600)'
                                            }}>{theme.name}</span>
                                            {businessType === key && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="sidebar-nav" style={{ padding: '0 16px' }}>
                    <div style={{ padding: '0 12px 12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Principal</div>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClose} style={{ borderRadius: '12px', marginBottom: '4px' }}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span style={{ fontWeight: isActive ? 700 : 500 }}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer" style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid hsla(var(--gray-200), 0.5)' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <Link href="/admin" style={{
                            flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '12px',
                            borderRadius: '12px', color: 'var(--gray-500)', fontSize: '0.85rem', fontWeight: 600,
                            textDecoration: 'none', background: 'var(--gray-50)', border: '1px solid hsla(var(--gray-200), 0.8)',
                            transition: 'all 0.2s ease', overflow: 'hidden'
                        }}>
                            <Shield size={16} /> Admin
                        </Link>
                        <button
                            onClick={toggleAppearance}
                            style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: 'var(--gray-50)', border: '1px solid hsla(var(--gray-200), 0.8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'var(--gray-600)', transition: 'all 0.2s ease'
                            }}
                        >
                            {appearance === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </div>

                    <div className="user-info" style={{
                        padding: '12px', background: 'var(--gray-50)', borderRadius: '14px',
                        border: '1px solid hsla(var(--gray-200), 0.8)', display: 'flex', alignItems: 'center', gap: '12px'
                    }}>
                        <div className="user-avatar" style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                            color: 'white', fontWeight: 700, fontSize: '0.8rem'
                        }}>JP</div>
                        <div className="user-details" style={{ flex: 1 }}>
                            <div className="user-name" style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--gray-900)' }}>João Pizza</div>
                            <div className="user-role" style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Dono</div>
                        </div>
                        <ChevronDown size={14} style={{ color: 'var(--gray-400)' }} />
                    </div>
                </div>
            </aside>
        </>
    );
}
