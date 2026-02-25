'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Building2, Palette, Webhook, Shield, CreditCard, CheckCircle2, MessageSquare, Zap, Database, Link2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ConfiguracoesPage() {
    const { businessType, setBusinessType, themes } = useTheme();
    const { user, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('empresa');

    if (authLoading) return <div className="page-content">Carregando configurações...</div>;

    const empresa = user?.empresa || {};

    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Configurações</h1>
                <p className="page-description">Personalize seu sistema e gerencie integrações</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)' }}>
                {/* Settings Nav */}
                <div className="card" style={{ padding: '8px', height: 'fit-content' }}>
                    {[
                        { k: 'empresa', l: 'Empresa', icon: Building2 },
                        { k: 'tema', l: 'Aparência', icon: Palette },
                        { k: 'integracoes', l: 'Integrações', icon: Webhook },
                        { k: 'planos', l: 'Planos', icon: CreditCard },
                        { k: 'whitelabel', l: 'White Label', icon: Shield },
                    ].map(t => {
                        const Icon = t.icon;
                        return (
                            <button key={t.k} className={`nav-item ${activeTab === t.k ? 'active' : ''}`} onClick={() => setActiveTab(t.k)}>
                                <Icon size={18} /> {t.l}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div>
                    {activeTab === 'empresa' && (
                        <div className="card">
                            <h3 className="card-title" style={{ marginBottom: '24px' }}>Dados da Empresa</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                                <div className="form-group"><label className="form-label">Nome da Empresa</label><input className="form-input" defaultValue={empresa.nome || ''} style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">CNPJ</label><input className="form-input" defaultValue={empresa.cnpj || ''} style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">Telefone</label><input className="form-input" defaultValue={empresa.telefone || ''} style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue={empresa.email || ''} style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">Endereço</label><input className="form-input" defaultValue={empresa.endereco || ''} style={{ borderRadius: '12px' }} /></div>
                                <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Salvar Alterações</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tema' && (
                        <div className="card">
                            <h3 className="card-title" style={{ marginBottom: '8px' }}>Tipo de Negócio & Tema</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>O tema do sistema muda automaticamente conforme o tipo do seu negócio</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                                {Object.entries(themes).map(([key, theme]) => (
                                    <div
                                        key={key}
                                        onClick={() => setBusinessType(key)}
                                        style={{
                                            padding: '24px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center',
                                            border: businessType === key ? `2px solid ${theme.color}` : '2px solid var(--border-color)',
                                            background: businessType === key ? `${theme.color}08` : 'var(--bg-card)',
                                            transition: 'all var(--transition-base)',
                                        }}
                                    >
                                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{theme.icon}</div>
                                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{theme.name}</div>
                                        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: theme.color, margin: '8px auto 0' }}></div>
                                        {businessType === key && (
                                            <div style={{ marginTop: '12px' }}><span className="badge badge-success"><CheckCircle2 size={12} /> Ativo</span></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'integracoes' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div className="integration-card">
                                <div className="integration-icon whatsapp"><MessageSquare size={28} /></div>
                                <div className="integration-info">
                                    <div className="integration-name">WhatsApp Business API</div>
                                    <div className="integration-desc">Conecte seu WhatsApp para atendimento automático</div>
                                </div>
                                <button className="btn btn-primary btn-sm">Conectar</button>
                            </div>
                            <div className="integration-card">
                                <div className="integration-icon webhook"><Link2 size={28} /></div>
                                <div className="integration-info">
                                    <div className="integration-name">Webhooks</div>
                                    <div className="integration-desc">Receba notificações de eventos em tempo real</div>
                                </div>
                                <button className="btn btn-secondary btn-sm">Configurar</button>
                            </div>
                            <div className="integration-card">
                                <div className="integration-icon supabase"><Database size={28} /></div>
                                <div className="integration-info">
                                    <div className="integration-name">Supabase</div>
                                    <div className="integration-desc">Banco de dados e autenticação do sistema</div>
                                </div>
                                <span className="badge badge-success">Conectado</span>
                            </div>
                            <div className="integration-card">
                                <div className="integration-icon n8n"><Zap size={28} /></div>
                                <div className="integration-info">
                                    <div className="integration-name">n8n Automações</div>
                                    <div className="integration-desc">Crie fluxos de automação personalizados</div>
                                </div>
                                <button className="btn btn-secondary btn-sm">Configurar</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'planos' && (
                        <div className="pricing-grid">
                            {[
                                { nome: 'Básico', preco: 'R$ 97', features: ['Até 100 pedidos/mês', '1 atendente', 'Cardápio digital', 'Suporte por email'] },
                                { nome: 'Pro', preco: 'R$ 197', featured: true, features: ['Até 500 pedidos/mês', '5 atendentes', 'Cardápio + Promoções', 'WhatsApp API', 'Relatórios avançados', 'Suporte prioritário'] },
                                { nome: 'Premium', preco: 'R$ 397', features: ['Pedidos ilimitados', 'Atendentes ilimitados', 'Todas as integrações', 'API personalizada', 'White label', 'Gerente de conta'] },
                            ].map((p, i) => (
                                <div key={i} className={`pricing-card ${p.featured ? 'featured' : ''}`}>
                                    <div className="pricing-name">{p.nome}</div>
                                    <div className="pricing-price">{p.preco}<span>/mês</span></div>
                                    <ul className="pricing-features">
                                        {p.features.map((f, j) => (
                                            <li key={j}><CheckCircle2 size={16} /> {f}</li>
                                        ))}
                                    </ul>
                                    <button className={`btn btn-block ${p.featured ? 'btn-primary' : 'btn-secondary'}`}>
                                        {p.featured ? 'Plano Atual' : 'Selecionar'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'whitelabel' && (
                        <div className="card">
                            <h3 className="card-title" style={{ marginBottom: '8px' }}>Configurações White Label</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Personalize a aparência do sistema com sua marca</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                                <div className="form-group"><label className="form-label">Nome do Sistema</label><input className="form-input" defaultValue="Atendimento Pro" style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">URL do Logo</label><input className="form-input" placeholder="https://suaempresa.com/logo.png" style={{ borderRadius: '12px' }} /></div>
                                <div className="form-group"><label className="form-label">Cor Primária</label><input type="color" defaultValue="#22c55e" style={{ width: '60px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} /></div>
                                <div className="form-group"><label className="form-label">Domínio Personalizado</label><input className="form-input" placeholder="app.suaempresa.com" style={{ borderRadius: '12px' }} /></div>
                                <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Salvar Configurações</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
