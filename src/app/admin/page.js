'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, CheckCircle2, ChevronLeft, Building2 } from 'lucide-react';
import '@/styles/globals.css'; // Ensure globals are loaded

export default function AdminPage() {
    const { allThemes, availableThemes, setAvailableThemes } = useTheme();

    // Mock company list for the admin panel
    const [companies] = useState([
        { id: 1, name: 'Pizzaria do João', plan: 'Pro', active: true },
        { id: 2, name: 'Burger & Co', plan: 'Básico', active: true },
        { id: 3, name: 'Açaí Paradise', plan: 'Premium', active: true },
        { id: 4, name: 'Ocean View Hostel', plan: 'Premium', active: false },
    ]);

    const [selectedCompany, setSelectedCompany] = useState(companies[0]);

    // Handle toggling theme availability for the selected company
    // Note: Since this is purely frontend demo, we are just storing it in the global context/localStorage
    // In a real app, this would make an API call to update the specific company's allowed themes
    const toggleTheme = (themeKey) => {
        let newAvailable;
        if (availableThemes.includes(themeKey)) {
            // Don't allow removing the last theme
            if (availableThemes.length <= 1) return;
            newAvailable = availableThemes.filter(k => k !== themeKey);
        } else {
            newAvailable = [...availableThemes, themeKey];
        }
        setAvailableThemes(newAvailable);
        localStorage.setItem('availableThemes', JSON.stringify(newAvailable));
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f8fafc', fontFamily: 'var(--font-family)' }}>
            {/* Admin Header */}
            <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
                        <Shield size={24} color="white" />
                    </div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Super Admin</h1>
                </div>
                <Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem' }}>
                    <ChevronLeft size={16} /> Voltar ao App
                </Link>
            </header>

            <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>

                {/* Companies List */}
                <div>
                    <h2 style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Empresas ({companies.length})
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {companies.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedCompany(c)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px',
                                    background: selectedCompany.id === c.id ? '#1e293b' : 'transparent',
                                    border: selectedCompany.id === c.id ? '1px solid #3b82f6' : '1px solid #334155',
                                    borderRadius: '12px',
                                    color: '#f8fafc',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ background: '#334155', padding: '8px', borderRadius: '8px' }}><Building2 size={18} /></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Plano {c.plan}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Company Settings */}
                <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', padding: '32px' }}>
                    <div style={{ borderBottom: '1px solid #334155', paddingBottom: '24px', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.5rem', margin: '0 0 8px 0' }}>{selectedCompany.name}</h2>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Gerencie os módulos e temas liberados para esta empresa.</p>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#e2e8f0' }}>Temas / Segmentos Liberados</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '24px' }}>
                        Selecione quais segmentos de negócio esta empresa pode acessar. As opções marcadas aparecerão no menu de Configurações da empresa.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {Object.entries(allThemes).map(([key, theme]) => {
                            const isEnabled = availableThemes.includes(key);
                            return (
                                <div
                                    key={key}
                                    onClick={() => toggleTheme(key)}
                                    style={{
                                        background: isEnabled ? `${theme.color}15` : '#0f172a',
                                        border: isEnabled ? `2px solid ${theme.color}` : '2px solid #334155',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        transition: 'all 0.2s ease',
                                        position: 'relative',
                                        opacity: isEnabled ? 1 : 0.6
                                    }}
                                >
                                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>{theme.icon}</div>
                                    <div style={{ fontWeight: 600, color: isEnabled ? '#f8fafc' : '#94a3b8' }}>{theme.name}</div>
                                    {isEnabled && (
                                        <div style={{ position: 'absolute', top: '12px', right: '12px', color: theme.color }}>
                                            <CheckCircle2 size={20} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', color: '#93c5fd', fontSize: '0.85rem' }}>
                        <strong>Nota de Demonstração:</strong> Como estamos em ambiente restrito, as alterações acima afetam o estado global do frontend e serão refletidas imediatamente no painel da empresa selecionada, habilitando ou ocultando os temas na Sidebar e nas Configurações de Aparência.
                    </div>
                </div>

            </div>
        </div>
    );
}
