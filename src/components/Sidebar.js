'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import {
    LayoutDashboard, MessageCircle, Users, ShoppingBag,
    UtensilsCrossed, DollarSign, BarChart3, Settings,
    MessageSquare, LogOut, ChevronDown, Check, Shield
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
    const { businessType, setBusinessType, currentTheme, themes } = useTheme();
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
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="logo-icon">
                            <MessageSquare size={22} />
                        </div>
                        <div className="logo-text">Atendimento <span>Pro</span></div>
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
                                padding: '10px 12px',
                                background: 'var(--primary-50)',
                                border: '1.5px solid var(--primary-100)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-family)',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: 'var(--primary)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <span style={{ fontSize: '20px' }}>{currentTheme.icon}</span>
                            <span style={{ flex: 1, textAlign: 'left' }}>{currentTheme.name}</span>
                            <ChevronDown size={16} style={{
                                transition: 'transform 0.2s ease',
                                transform: modeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            }} />
                        </button>

                        {modeOpen && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 6px)',
                                left: 0,
                                right: 0,
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 200,
                                overflow: 'hidden',
                                animation: 'slideDown 0.15s ease',
                            }}>
                                <div style={{ padding: '6px' }}>
                                    {Object.entries(themes).map(([key, theme]) => (
                                        <button
                                            key={key}
                                            onClick={() => handleSelectMode(key)}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '10px 12px',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontFamily: 'var(--font-family)',
                                                fontSize: '0.85rem',
                                                fontWeight: businessType === key ? 600 : 400,
                                                color: businessType === key ? theme.color : 'var(--text-primary)',
                                                background: businessType === key ? `${theme.color}10` : 'transparent',
                                                transition: 'all 0.15s ease',
                                            }}
                                            onMouseEnter={e => { if (businessType !== key) e.target.style.background = 'var(--bg-hover)'; }}
                                            onMouseLeave={e => { if (businessType !== key) e.target.style.background = 'transparent'; }}
                                        >
                                            <span style={{ fontSize: '20px' }}>{theme.icon}</span>
                                            <span style={{ flex: 1, textAlign: 'left' }}>{theme.name}</span>
                                            {businessType === key && <Check size={16} style={{ color: theme.color }} />}
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: theme.color }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">Menu Principal</div>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`} onClick={onClose}>
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer" style={{ padding: '0', borderTop: '1px solid var(--border-color)' }}>
                    {/* Admin Panel Link */}
                    <div style={{ padding: '8px' }}>
                        <Link href="/admin" style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px',
                            borderRadius: '8px', color: '#64748b', fontSize: '0.8rem', fontWeight: 600,
                            textDecoration: 'none', background: '#f1f5f9', cursor: 'pointer', transition: 'all 0.2s ease', border: '1px dashed #cbd5e1'
                        }}>
                            <Shield size={16} /> Admin Panel
                        </Link>
                    </div>

                    <div className="user-info" style={{ margin: '8px', borderRadius: '12px' }}>
                        <div className="user-avatar">JP</div>
                        <div className="user-details">
                            <div className="user-name">João Pizza</div>
                            <div className="user-role">Administrador</div>
                        </div>
                        <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />
                    </div>
                </div>
            </aside>
        </>
    );
}
