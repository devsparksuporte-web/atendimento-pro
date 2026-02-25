'use client';

import { useState } from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, Banknote, QrCode } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
    { mes: 'Jan', receita: 12400 }, { mes: 'Fev', receita: 15800 }, { mes: 'Mar', receita: 14200 },
    { mes: 'Abr', receita: 18400 }, { mes: 'Mai', receita: 16900 }, { mes: 'Jun', receita: 21200 },
];

const paymentData = [
    { name: 'PIX', value: 45, color: '#22c55e' },
    { name: 'Cartão', value: 35, color: '#3b82f6' },
    { name: 'Dinheiro', value: 15, color: '#f59e0b' },
    { name: 'Outros', value: 5, color: '#8b5cf6' },
];

const transactions = [
    { id: 1, desc: 'Pedido #1042 — Maria Silva', valor: 'R$ 89,90', tipo: 'entrada', metodo: 'PIX', data: '25/02' },
    { id: 2, desc: 'Pedido #1041 — João Santos', valor: 'R$ 45,90', tipo: 'entrada', metodo: 'Cartão', data: '25/02' },
    { id: 3, desc: 'Fornecedor — Laticínios', valor: 'R$ 340,00', tipo: 'saida', metodo: 'Transferência', data: '25/02' },
    { id: 4, desc: 'Pedido #1040 — Ana Costa', valor: 'R$ 59,70', tipo: 'entrada', metodo: 'PIX', data: '25/02' },
    { id: 5, desc: 'Pedido #1038 — Lucas Mendes', valor: 'R$ 67,80', tipo: 'entrada', metodo: 'Cartão', data: '25/02' },
];

export default function FinanceiroPage() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Financeiro</h1>
                <p className="page-description">Acompanhe receitas, despesas e formas de pagamento</p>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="stat-card">
                    <div className="stat-icon green"><DollarSign size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Receita do Mês</div>
                        <div className="stat-value">R$ 18.4k</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +15%</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon blue"><ArrowUpRight size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Entradas Hoje</div>
                        <div className="stat-value">R$ 1.250</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +8%</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon red"><ArrowDownRight size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Saídas do Mês</div>
                        <div className="stat-value">R$ 4.2k</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon yellow"><Banknote size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Ticket Médio</div>
                        <div className="stat-value">R$ 42,50</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +5%</div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid-2" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="chart-container">
                    <div className="chart-header"><h3 className="chart-title">Receita Mensal</h3></div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip formatter={v => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']} contentStyle={{ borderRadius: '12px' }} />
                            <Bar dataKey="receita" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-container">
                    <div className="chart-header"><h3 className="chart-title">Formas de Pagamento</h3></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <ResponsiveContainer width="50%" height={220}>
                            <PieChart>
                                <Pie data={paymentData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                                    {paymentData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {paymentData.map(p => (
                                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: p.color }}></div>
                                    <span style={{ fontSize: '0.875rem' }}>{p.name}</span>
                                    <span style={{ fontWeight: 600, marginLeft: 'auto' }}>{p.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <div className="card">
                <div className="card-header"><h3 className="card-title">Últimas Transações</h3></div>
                <div className="table-container" style={{ border: 'none' }}>
                    <table className="data-table">
                        <thead><tr><th>Descrição</th><th>Data</th><th>Método</th><th>Valor</th></tr></thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>{t.desc}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{t.data}</td>
                                    <td><span className="badge badge-neutral">{t.metodo}</span></td>
                                    <td style={{ fontWeight: 600, color: t.tipo === 'entrada' ? 'var(--success)' : 'var(--danger)' }}>
                                        {t.tipo === 'entrada' ? '+' : '-'}{t.valor}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
