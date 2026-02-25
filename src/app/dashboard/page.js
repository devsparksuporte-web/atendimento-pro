'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle, ShoppingBag, DollarSign, Users, TrendingUp, TrendingDown, Package, Clock, ChefHat, Truck, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
    { dia: 'Seg', pedidos: 32 }, { dia: 'Ter', pedidos: 45 },
    { dia: 'Qua', pedidos: 38 }, { dia: 'Qui', pedidos: 52 },
    { dia: 'Sex', pedidos: 68 }, { dia: 'Sáb', pedidos: 85 },
    { dia: 'Dom', pedidos: 72 },
];

const recentOrders = [
    { id: '#1042', cliente: 'Maria Silva', itens: '2x Pizza Margherita', valor: 'R$ 89,90', status: 'entregue', hora: '19:45' },
    { id: '#1041', cliente: 'João Santos', itens: '1x Combo Burger + Fritas', valor: 'R$ 45,90', status: 'entrega', hora: '19:30' },
    { id: '#1040', cliente: 'Ana Costa', itens: '3x Açaí 500ml', valor: 'R$ 59,70', status: 'preparando', hora: '19:20' },
    { id: '#1039', cliente: 'Pedro Oliveira', itens: '1x Pizza Calabresa G', valor: 'R$ 49,90', status: 'recebido', hora: '19:15' },
    { id: '#1038', cliente: 'Lucas Mendes', itens: '2x Smash Burger', valor: 'R$ 67,80', status: 'entregue', hora: '19:00' },
];

const statusConfig = {
    recebido: { label: 'Recebido', badge: 'badge-info', icon: Package },
    preparando: { label: 'Preparando', badge: 'badge-warning', icon: ChefHat },
    entrega: { label: 'Saiu p/ Entrega', badge: 'badge-primary', icon: Truck },
    entregue: { label: 'Entregue', badge: 'badge-success', icon: CheckCircle2 },
};

const activeOrders = [
    { id: '#1041', cliente: 'João Santos', itens: '1x Combo Burger + Fritas', status: 'entrega', tempo: '25 min' },
    { id: '#1040', cliente: 'Ana Costa', itens: '3x Açaí 500ml', status: 'preparando', tempo: '10 min' },
    { id: '#1039', cliente: 'Pedro Oliveira', itens: '1x Pizza Calabresa G', status: 'recebido', tempo: '2 min' },
];

export default function DashboardPage() {
    const { currentTheme } = useTheme();
    const [chartFilter, setChartFilter] = useState('7d');

    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Dashboard</h1>
                <p className="page-description">Visão geral do seu negócio — {currentTheme.icon} {currentTheme.name}</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="stat-card animate-in">
                    <div className="stat-icon blue"><MessageCircle size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Atendimentos Ativos</div>
                        <div className="stat-value">12</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +8% esta semana</div>
                    </div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.1s' }}>
                    <div className="stat-icon green"><ShoppingBag size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Pedidos Hoje</div>
                        <div className="stat-value">48</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +12% vs ontem</div>
                    </div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.2s' }}>
                    <div className="stat-icon yellow"><DollarSign size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Faturamento Mensal</div>
                        <div className="stat-value">R$ 18.4k</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +15% vs mês anterior</div>
                    </div>
                </div>
                <div className="stat-card animate-in" style={{ animationDelay: '0.3s' }}>
                    <div className="stat-icon primary"><Users size={24} /></div>
                    <div className="stat-content">
                        <div className="stat-label">Clientes Cadastrados</div>
                        <div className="stat-value">342</div>
                        <div className="stat-change up"><TrendingUp size={14} /> +23 novos</div>
                    </div>
                </div>
            </div>

            {/* Chart + Active Orders */}
            <div className="grid-2" style={{ marginBottom: 'var(--space-8)' }}>
                <div className="chart-container">
                    <div className="chart-header">
                        <h3 className="chart-title">Pedidos por Dia</h3>
                        <div className="chart-filters">
                            {['7d', '30d', '90d'].map(f => (
                                <button key={f} className={`chart-filter-btn ${chartFilter === f ? 'active' : ''}`} onClick={() => setChartFilter(f)}>{f}</button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="dia" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }} />
                            <Area type="monotone" dataKey="pedidos" stroke="var(--primary)" strokeWidth={2.5} fill="url(#colorPedidos)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Active Orders */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} /> Pedidos em Andamento</h3>
                        <span className="badge badge-primary">{activeOrders.length} ativos</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeOrders.map(order => {
                            const st = statusConfig[order.status];
                            const Icon = st.icon;
                            return (
                                <div key={order.id} style={{ padding: '16px', background: 'var(--gray-50)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-50)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon size={20} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{order.id} — {order.cliente}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{order.itens}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className={`badge ${st.badge}`}>{st.label}</span>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{order.tempo}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Pedidos Recentes</h3>
                    <a href="/dashboard/pedidos" className="btn btn-sm btn-secondary">Ver todos</a>
                </div>
                <div className="table-container" style={{ border: 'none' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Pedido</th><th>Cliente</th><th>Itens</th><th>Valor</th><th>Status</th><th>Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(o => {
                                const st = statusConfig[o.status];
                                return (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 600 }}>{o.id}</td>
                                        <td>{o.cliente}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{o.itens}</td>
                                        <td style={{ fontWeight: 600 }}>{o.valor}</td>
                                        <td><span className={`badge ${st.badge}`}>{st.label}</span></td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{o.hora}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
