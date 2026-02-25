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
        <div className="page-content animate-fade-in" style={{ padding: 'var(--space-6)' }}>
            <div className="page-header" style={{ marginBottom: 'var(--space-10)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div className="badge badge-primary">Painel de Controle</div>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gray-300)' }}></div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                </div>
                <h1 className="page-title" style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Dashboard</h1>
                <p className="page-description" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                    Bem-vindo de volta! Aqui está o que está acontecendo na sua **{currentTheme.name}** {currentTheme.icon}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid" style={{
                display: 'grid',
                gap: 'var(--space-6)',
                marginBottom: 'var(--space-10)'
            }}>
                {[
                    { label: 'Atendimentos Ativos', val: '12', change: '+8%', icon: MessageCircle, color: 'blue' },
                    { label: 'Pedidos Hoje', val: '48', change: '+12%', icon: ShoppingBag, color: 'green' },
                    { label: 'Faturamento Mensal', val: 'R$ 18.4k', change: '+15%', icon: DollarSign, color: 'yellow' },
                    { label: 'Clientes Total', val: '342', change: '+23 novos', icon: Users, color: 'primary' },
                ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={i} className="stat-card" style={{ animation: `slideUp 0.6s ease forwards ${i * 0.1}s`, opacity: 0 }}>
                            <div className={`stat-icon ${s.color}`} style={{
                                borderRadius: '14px',
                                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)'
                            }}>
                                <Icon size={24} strokeWidth={2.5} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-label">{s.label}</div>
                                <div className="stat-value" style={{ letterSpacing: '-0.02em' }}>{s.val}</div>
                                <div className="stat-change up" style={{ fontWeight: 600 }}>
                                    <TrendingUp size={14} strokeWidth={3} /> {s.change}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chart + Active Orders */}
            <div className="grid-2" style={{
                display: 'grid',
                gap: 'var(--space-8)',
                marginBottom: 'var(--space-10)'
            }}>
                <div className="card" style={{ padding: 'var(--space-8)' }}>
                    <div className="card-header" style={{ marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 className="card-title" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Fluxo de Pedidos</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Performance semanal vs período anterior</p>
                        </div>
                        <div className="chart-filters" style={{ background: 'var(--gray-100)', padding: '4px', borderRadius: '10px' }}>
                            {['7d', '30d', '90d'].map(f => (
                                <button key={f}
                                    className={`btn btn-sm ${chartFilter === f ? 'btn-primary' : 'btn-ghost'}`}
                                    style={{ padding: '6px 16px', borderRadius: '8px', boxShadow: chartFilter === f ? 'var(--shadow-sm)' : 'none' }}
                                    onClick={() => setChartFilter(f)}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="6 6" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)', fontWeight: 500 }} dx={-10} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: 'none',
                                    boxShadow: 'var(--shadow-xl)',
                                    padding: '12px 16px'
                                }}
                            />
                            <Area type="monotone" dataKey="pedidos" stroke="var(--primary)" strokeWidth={3} fill="url(#colorPedidos)" animationDuration={1500} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Active Orders */}
                <div className="card" style={{ padding: '32px' }}>
                    <div className="card-header" style={{ marginBottom: '24px' }}>
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ color: 'var(--primary)', background: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)', padding: '8px', borderRadius: '10px' }}>
                                <Clock size={20} />
                            </div>
                            Em Andamento
                        </h3>
                        <span className="badge badge-primary">{activeOrders.length} novos</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {activeOrders.map(order => {
                            const st = statusConfig[order.status];
                            const Icon = st.icon;
                            return (
                                <div key={order.id} style={{
                                    padding: '20px',
                                    background: 'var(--gray-50)',
                                    borderRadius: '18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    border: '1px solid var(--border-color)',
                                    transition: 'transform 0.2s ease'
                                }}
                                    className="order-item-hover"
                                >
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        background: '#ffffff', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        <Icon size={22} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{order.cliente}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{order.itens}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className={`badge ${st.badge}`} style={{ padding: '4px 10px' }}>{st.label}</span>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 600 }}>{order.tempo}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="btn btn-secondary btn-block" style={{ marginTop: '24px', borderRadius: '12px' }}>Ver Cozinha</button>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div className="card-header" style={{ padding: '32px 32px 24px' }}>
                    <div>
                        <h3 className="card-title">Últimos Lançamentos</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Histórico detalhado das últimas 24 horas</p>
                    </div>
                    <a href="/dashboard/pedidos" className="btn btn-secondary btn-sm" style={{ borderRadius: '10px' }}>Exportar Dados</a>
                </div>
                <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
                    <table className="data-table">
                        <thead style={{ background: 'var(--gray-50)' }}>
                            <tr>
                                <th style={{ paddingLeft: '32px' }}>ID Pedido</th><th>Cliente</th><th>Resumo</th><th>Total</th><th>Status</th><th style={{ paddingRight: '32px' }}>Horário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(o => {
                                const st = statusConfig[o.status];
                                return (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 700, paddingLeft: '32px', color: 'var(--primary)' }}>{o.id}</td>
                                        <td style={{ fontWeight: 600 }}>{o.cliente}</td>
                                        <td style={{ color: 'var(--text-secondary)' }}>{o.itens}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--gray-900)' }}>{o.valor}</td>
                                        <td><span className={`badge ${st.badge}`}>{st.label}</span></td>
                                        <td style={{ color: 'var(--text-secondary)', paddingRight: '32px' }}>{o.hora}</td>
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
