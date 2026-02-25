'use client';

import { FileText, Download, Calendar, TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const reports = [
    { icon: ShoppingBag, title: 'Relatório de Pedidos', desc: 'Análise detalhada de pedidos por período', color: 'var(--info)' },
    { icon: DollarSign, title: 'Relatório Financeiro', desc: 'Receitas, despesas e lucro por período', color: 'var(--success)' },
    { icon: Users, title: 'Relatório de Clientes', desc: 'Novos clientes, recorrência e comportamento', color: 'var(--primary)' },
    { icon: TrendingUp, title: 'Relatório de Performance', desc: 'Métricas de atendimento e satisfação', color: 'var(--warning)' },
    { icon: FileText, title: 'Relatório de Cardápio', desc: 'Itens mais vendidos e menos populares', color: 'var(--danger)' },
    { icon: Calendar, title: 'Relatório Semanal', desc: 'Resumo completo da semana', color: 'var(--gray-600)' },
];

export default function RelatoriosPage() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Relatórios</h1>
                <p className="page-description">Gere e exporte relatórios detalhados do seu negócio</p>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="form-group" style={{ minWidth: '180px' }}>
                    <select className="form-select" style={{ borderRadius: '12px' }}>
                        <option>Últimos 7 dias</option>
                        <option>Últimos 30 dias</option>
                        <option>Último trimestre</option>
                        <option>Período personalizado</option>
                    </select>
                </div>
            </div>

            <div className="grid-3">
                {reports.map((r, i) => {
                    const Icon = r.icon;
                    return (
                        <div key={i} className="card" style={{ cursor: 'pointer', transition: 'all var(--transition-base)' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${r.color}15`, color: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>{r.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.desc}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Gerar Relatório</button>
                                <button className="btn btn-secondary btn-sm"><Download size={14} /></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
