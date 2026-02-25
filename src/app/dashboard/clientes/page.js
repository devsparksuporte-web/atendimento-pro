'use client';

import { useState } from 'react';
import { Search, Plus, Phone, Mail, MapPin, ShoppingBag, MoreHorizontal } from 'lucide-react';

const customers = [
    { id: 1, nome: 'Maria Silva', tel: '(11) 99999-1111', email: 'maria@email.com', pedidos: 28, gasto: 'R$ 1.420,00', ultimo: 'Hoje', avatar: 'MS' },
    { id: 2, nome: 'João Santos', tel: '(11) 99999-2222', email: 'joao@email.com', pedidos: 15, gasto: 'R$ 890,50', ultimo: 'Hoje', avatar: 'JS' },
    { id: 3, nome: 'Ana Costa', tel: '(11) 99999-3333', email: 'ana@email.com', pedidos: 42, gasto: 'R$ 2.180,00', ultimo: 'Ontem', avatar: 'AC' },
    { id: 4, nome: 'Pedro Oliveira', tel: '(11) 99999-4444', email: 'pedro@email.com', pedidos: 8, gasto: 'R$ 420,00', ultimo: '3 dias', avatar: 'PO' },
    { id: 5, nome: 'Lucas Mendes', tel: '(11) 99999-5555', email: 'lucas@email.com', pedidos: 21, gasto: 'R$ 1.050,00', ultimo: 'Hoje', avatar: 'LM' },
    { id: 6, nome: 'Carla Ferreira', tel: '(11) 99999-6666', email: 'carla@email.com', pedidos: 35, gasto: 'R$ 1.890,00', ultimo: '2 dias', avatar: 'CF' },
];

export default function ClientesPage() {
    const [search, setSearch] = useState('');
    const filtered = customers.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="page-content">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">Clientes</h1>
                    <p className="page-description">{customers.length} clientes cadastrados</p>
                </div>
                <button className="btn btn-primary"><Plus size={18} /> Novo Cliente</button>
            </div>

            <div className="filter-bar">
                <div className="search-bar" style={{ flex: 1, maxWidth: '400px' }}>
                    <Search size={18} />
                    <input placeholder="Buscar cliente..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="grid-3">
                {filtered.map(c => (
                    <div key={c.id} className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div className="user-avatar" style={{ width: '48px', height: '48px', fontSize: '1rem' }}>{c.avatar}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{c.nome}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Último pedido: {c.ultimo}</div>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm"><MoreHorizontal size={16} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {c.tel}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={14} /> {c.email}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{c.pedidos}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pedidos</div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>{c.gasto}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Gasto</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
