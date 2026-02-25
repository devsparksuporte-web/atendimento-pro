'use client';

import { useState } from 'react';
import { Search, Filter, Package, ChefHat, Truck, CheckCircle2, Eye, X } from 'lucide-react';

const allOrders = [
    { id: '#1042', cliente: 'Maria Silva', itens: '2x Pizza Margherita', valor: 'R$ 89,90', status: 'entregue', hora: '19:45', data: '25/02/2026', pagamento: 'PIX' },
    { id: '#1041', cliente: 'João Santos', itens: '1x Combo Burger + Fritas', valor: 'R$ 45,90', status: 'entrega', hora: '19:30', data: '25/02/2026', pagamento: 'Cartão' },
    { id: '#1040', cliente: 'Ana Costa', itens: '3x Açaí 500ml', valor: 'R$ 59,70', status: 'preparando', hora: '19:20', data: '25/02/2026', pagamento: 'PIX' },
    { id: '#1039', cliente: 'Pedro Oliveira', itens: '1x Pizza Calabresa G', valor: 'R$ 49,90', status: 'recebido', hora: '19:15', data: '25/02/2026', pagamento: 'Dinheiro' },
    { id: '#1038', cliente: 'Lucas Mendes', itens: '2x Smash Burger', valor: 'R$ 67,80', status: 'entregue', hora: '19:00', data: '25/02/2026', pagamento: 'Cartão' },
    { id: '#1037', cliente: 'Carla Ferreira', itens: '1x Açaí 1L + Granola', valor: 'R$ 32,90', status: 'entregue', hora: '18:45', data: '25/02/2026', pagamento: 'PIX' },
    { id: '#1036', cliente: 'Roberto Alves', itens: '1x Pizza Portuguesa M', valor: 'R$ 39,90', status: 'entregue', hora: '18:30', data: '25/02/2026', pagamento: 'Cartão' },
    { id: '#1035', cliente: 'Fernanda Lima', itens: '3x Burger Bacon', valor: 'R$ 95,70', status: 'entregue', hora: '18:15', data: '25/02/2026', pagamento: 'PIX' },
];

const statusConfig = {
    recebido: { label: 'Recebido', badge: 'badge-info', icon: Package },
    preparando: { label: 'Preparando', badge: 'badge-warning', icon: ChefHat },
    entrega: { label: 'Saiu p/ Entrega', badge: 'badge-primary', icon: Truck },
    entregue: { label: 'Entregue', badge: 'badge-success', icon: CheckCircle2 },
};

const statusSteps = ['recebido', 'preparando', 'entrega', 'entregue'];

export default function PedidosPage() {
    const [filter, setFilter] = useState('todos');
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filtered = allOrders.filter(o => {
        if (filter !== 'todos' && o.status !== filter) return false;
        if (search && !o.cliente.toLowerCase().includes(search.toLowerCase()) && !o.id.includes(search)) return false;
        return true;
    });

    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Pedidos</h1>
                <p className="page-description">Gerencie todos os pedidos do seu estabelecimento</p>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="search-bar" style={{ flex: 1, maxWidth: '360px' }}>
                    <Search size={18} />
                    <input placeholder="Buscar pedido ou cliente..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div className="tabs" style={{ marginBottom: 0 }}>
                    {[{ k: 'todos', l: 'Todos' }, { k: 'recebido', l: 'Recebidos' }, { k: 'preparando', l: 'Preparando' }, { k: 'entrega', l: 'Em Entrega' }, { k: 'entregue', l: 'Entregues' }].map(f => (
                        <button key={f.k} className={`tab ${filter === f.k ? 'active' : ''}`} onClick={() => setFilter(f.k)}>{f.l}</button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="card" style={{ padding: 0 }}>
                <div className="table-container" style={{ border: 'none' }}>
                    <table className="data-table">
                        <thead><tr><th>Pedido</th><th>Data</th><th>Cliente</th><th>Itens</th><th>Pagamento</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
                        <tbody>
                            {filtered.map(o => {
                                const st = statusConfig[o.status];
                                return (
                                    <tr key={o.id}>
                                        <td style={{ fontWeight: 600 }}>{o.id}</td>
                                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{o.data}<br /><span style={{ fontSize: '0.75rem' }}>{o.hora}</span></td>
                                        <td>{o.cliente}</td>
                                        <td style={{ color: 'var(--text-secondary)', maxWidth: '200px' }}>{o.itens}</td>
                                        <td><span className="badge badge-neutral">{o.pagamento}</span></td>
                                        <td style={{ fontWeight: 600 }}>{o.valor}</td>
                                        <td><span className={`badge ${st.badge}`}>{st.label}</span></td>
                                        <td><button className="btn btn-ghost btn-sm" onClick={() => setSelectedOrder(o)}><Eye size={16} /></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Pedido {selectedOrder.id}</h2>
                            <button className="modal-close" onClick={() => setSelectedOrder(null)}><X size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div><strong>Cliente:</strong> {selectedOrder.cliente}</div>
                                <div><strong>Data:</strong> {selectedOrder.data} {selectedOrder.hora}</div>
                            </div>
                            <div><strong>Itens:</strong> {selectedOrder.itens}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div><strong>Pagamento:</strong> {selectedOrder.pagamento}</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedOrder.valor}</div>
                            </div>
                            {/* Status Pipeline */}
                            <div style={{ marginTop: '8px' }}>
                                <strong style={{ fontSize: '0.85rem' }}>Status do Pedido:</strong>
                                <div className="status-pipeline" style={{ marginTop: '12px' }}>
                                    {statusSteps.map((step, i) => {
                                        const idx = statusSteps.indexOf(selectedOrder.status);
                                        const Icon = statusConfig[step].icon;
                                        return (
                                            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {i > 0 && <div className={`status-connector ${i <= idx ? 'completed' : ''}`}></div>}
                                                <div className={`status-step ${i === idx ? 'active' : i < idx ? 'completed' : ''}`}>
                                                    <Icon size={14} /> {statusConfig[step].label}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
