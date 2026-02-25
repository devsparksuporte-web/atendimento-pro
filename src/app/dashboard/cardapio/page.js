'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

/* ========== PIZZARIA DATA ========== */
const pizzaFlavors = [
    { id: 1, nome: 'Margherita', desc: 'Molho de tomate, mozzarella, manjericão fresco', categoria: 'Clássicas', preco: '44.90', tamanhos: ['P', 'M', 'G', 'GG'], bordas: ['Sem borda', 'Catupiry', 'Cheddar'], ativo: true },
    { id: 2, nome: 'Calabresa', desc: 'Calabresa, cebola, azeitonas, mozzarella', categoria: 'Clássicas', preco: '42.90', tamanhos: ['P', 'M', 'G', 'GG'], bordas: ['Sem borda', 'Catupiry'], ativo: true },
    { id: 3, nome: 'Quatro Queijos', desc: 'Mozzarella, provolone, parmesão, gorgonzola', categoria: 'Especiais', preco: '52.90', tamanhos: ['M', 'G', 'GG'], bordas: ['Sem borda', 'Catupiry', 'Cheddar'], ativo: true },
    { id: 4, nome: 'Frango com Catupiry', desc: 'Frango desfiado, catupiry, milho, mozzarella', categoria: 'Tradicionais', preco: '46.90', tamanhos: ['P', 'M', 'G', 'GG'], bordas: ['Sem borda', 'Catupiry'], ativo: true },
    { id: 5, nome: 'Portuguesa', desc: 'Presunto, ovo, cebola, azeitonas, ervilha', categoria: 'Tradicionais', preco: '45.90', tamanhos: ['P', 'M', 'G'], bordas: ['Sem borda'], ativo: false },
];

const pizzaPromocoes = [
    { id: 1, nome: 'Terça da Pizza', desc: 'Todas as pizzas G com 20% OFF', ativo: true },
    { id: 2, nome: 'Combo Família', desc: '2 Pizzas G + Refrigerante 2L por R$ 89,90', ativo: true },
];

/* ========== HAMBURGUERIA DATA ========== */
const burgerItems = {
    lanches: [
        { id: 1, nome: 'Smash Burger', ingredientes: 'Blend 150g, queijo cheddar, cebola caramelizada, molho especial', preco: '32.90', ativo: true },
        { id: 2, nome: 'Bacon Burger', ingredientes: 'Blend 180g, bacon crocante, queijo prato, alface, tomate', preco: '36.90', ativo: true },
        { id: 3, nome: 'Classic Burger', ingredientes: 'Blend 150g, queijo, alface, tomate, picles, molho', preco: '29.90', ativo: true },
    ],
    adicionais: [
        { id: 4, nome: 'Bacon Extra', preco: '5.00', ativo: true },
        { id: 5, nome: 'Queijo Cheddar', preco: '4.00', ativo: true },
        { id: 6, nome: 'Ovo', preco: '3.00', ativo: true },
    ],
    combos: [
        { id: 7, nome: 'Combo Smash', ingredientes: 'Smash Burger + Fritas + Refrigerante', preco: '45.90', ativo: true },
        { id: 8, nome: 'Combo Duplo', ingredientes: '2x Smash Burger + Fritas G + 2 Refris', preco: '79.90', ativo: true },
    ],
    bebidas: [
        { id: 9, nome: 'Coca-Cola 350ml', preco: '6.00', ativo: true },
        { id: 10, nome: 'Suco Natural', preco: '8.00', ativo: true },
        { id: 11, nome: 'Milkshake', preco: '14.90', ativo: true },
    ],
};

/* ========== AÇAITERIA DATA ========== */
const acaiData = {
    tamanhos: [
        { id: 1, nome: '300ml', preco: '16.90', ativo: true },
        { id: 2, nome: '500ml', preco: '22.90', ativo: true },
        { id: 3, nome: '700ml', preco: '28.90', ativo: true },
        { id: 4, nome: '1 Litro', preco: '36.90', ativo: true },
    ],
    complementos: [
        { id: 5, nome: 'Granola', preco: '2.00', ativo: true },
        { id: 6, nome: 'Leite em Pó', preco: '2.50', ativo: true },
        { id: 7, nome: 'Paçoca', preco: '3.00', ativo: true },
        { id: 8, nome: 'Leite Condensado', preco: '3.00', ativo: true },
        { id: 9, nome: 'Nutella', preco: '5.00', ativo: true },
    ],
    frutas: [
        { id: 10, nome: 'Banana', preco: '2.00', ativo: true },
        { id: 11, nome: 'Morango', preco: '3.00', ativo: true },
        { id: 12, nome: 'Kiwi', preco: '3.50', ativo: true },
        { id: 13, nome: 'Manga', preco: '2.50', ativo: true },
    ],
    caldas: [
        { id: 14, nome: 'Chocolate', preco: '2.00', ativo: true },
        { id: 15, nome: 'Morango', preco: '2.00', ativo: true },
        { id: 16, nome: 'Caramelo', preco: '2.50', ativo: true },
    ],
};

/* ========== HOSTEL DATA ========== */
const hostelData = {
    acomodacoes: [
        { id: 1, nome: 'Quarto Compartilhado (8 Camas)', desc: 'Cama em dormitório misto com ar-condicionado, locker individual e cortina de privacidade.', preco: '65.00', ativo: true },
        { id: 2, nome: 'Quarto Compartilhado Feminino (6 Camas)', desc: 'Exclusivo para mulheres, banheiro interno, ar-condicionado.', preco: '75.00', ativo: true },
        { id: 3, nome: 'Quarto Privativo Standard', desc: 'Cama de casal, banheiro privativo, TV e frigobar.', preco: '220.00', ativo: true },
        { id: 4, nome: 'Suíte Master Ocean View', desc: 'Vista pro mar, varanda, cama king, banheira.', preco: '380.00', ativo: true },
    ],
    servicos: [
        { id: 5, nome: 'Café da Manhã Completo', desc: 'Buffet servido das 7h às 10h.', preco: '35.00', ativo: true },
        { id: 6, nome: 'Aluguel de Toalha Extra', desc: 'Toalha de banho extra.', preco: '10.00', ativo: true },
        { id: 7, nome: 'Lavanderia (Por Cesto)', desc: 'Lavagem e secagem.', preco: '40.00', ativo: true },
        { id: 8, nome: 'Transfer Aeroporto', desc: 'Venda por trecho.', preco: '120.00', ativo: true },
    ],
    experiencias: [
        { id: 9, nome: 'Passeio de Escuna', desc: 'Saída às 9h, duração de 5 horas.', preco: '150.00', ativo: true },
        { id: 10, nome: 'Trilha Guiada na Mata', desc: 'Guia local, duração de 3 horas.', preco: '80.00', ativo: true },
        { id: 11, nome: 'Aula de Surf (2 horas)', desc: 'Equipamento incluso.', preco: '120.00', ativo: true },
    ],
};

function ItemCard({ item, showIngredients }) {
    return (
        <div className="menu-item-card">
            <div className="menu-item-image">
                <span>{item.nome.charAt(0)}</span>
            </div>
            <div className="menu-item-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div className="menu-item-name">{item.nome}</div>
                    <label className="toggle-switch">
                        <input type="checkbox" defaultChecked={item.ativo} />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
                {(item.desc || item.ingredientes) && <div className="menu-item-desc">{item.desc || item.ingredientes}</div>}
                {item.tamanhos && (
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {item.tamanhos.map(t => <span key={t} className="badge badge-neutral">{t}</span>)}
                    </div>
                )}
                <div className="menu-item-footer">
                    <div className="menu-item-price">R$ {item.preco}</div>
                    <div className="menu-item-actions">
                        <button className="btn btn-ghost btn-sm"><Edit2 size={14} /></button>
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}><Trash2 size={14} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SimpleItemRow({ item }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--gray-50)', borderRadius: '12px' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.nome}</div>
            </div>
            <div style={{ fontWeight: 600, color: 'var(--primary)' }}>R$ {item.preco}</div>
            <label className="toggle-switch">
                <input type="checkbox" defaultChecked={item.ativo} />
                <span className="toggle-slider"></span>
            </label>
            <button className="btn btn-ghost btn-sm"><Edit2 size={14} /></button>
        </div>
    );
}

/* ========== PIZZARIA MODULE ========== */
function PizzariaModule() {
    const [tab, setTab] = useState('sabores');
    return (
        <>
            <div className="tabs">
                {[{ k: 'sabores', l: '🍕 Sabores' }, { k: 'tamanhos', l: '📏 Tamanhos' }, { k: 'bordas', l: '🧀 Bordas' }, { k: 'promocoes', l: '🎉 Promoções' }].map(t => (
                    <button key={t.k} className={`tab ${tab === t.k ? 'active' : ''}`} onClick={() => setTab(t.k)}>{t.l}</button>
                ))}
            </div>
            {tab === 'sabores' && (
                <div className="menu-grid">{pizzaFlavors.map(i => <ItemCard key={i.id} item={i} />)}</div>
            )}
            {tab === 'tamanhos' && (
                <div className="card"><div className="card-header"><h3 className="card-title">Tamanhos Disponíveis</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {['P - Pequena (4 fatias)', 'M - Média (6 fatias)', 'G - Grande (8 fatias)', 'GG - Gigante (12 fatias)'].map((t, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--gray-50)', borderRadius: '12px' }}>
                                <div style={{ fontWeight: 600, flex: 1 }}>{t}</div>
                                <label className="toggle-switch"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {tab === 'bordas' && (
                <div className="card"><div className="card-header"><h3 className="card-title">Bordas</h3><button className="btn btn-primary btn-sm"><Plus size={14} /> Nova Borda</button></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[{ n: 'Sem Borda', p: '0.00' }, { n: 'Catupiry', p: '8.00' }, { n: 'Cheddar', p: '8.00' }, { n: 'Cream Cheese', p: '10.00' }].map((b, i) => (
                            <SimpleItemRow key={i} item={{ nome: b.n, preco: b.p, ativo: true }} />
                        ))}
                    </div>
                </div>
            )}
            {tab === 'promocoes' && (
                <div className="card"><div className="card-header"><h3 className="card-title">Promoções Ativas</h3><button className="btn btn-primary btn-sm"><Plus size={14} /> Nova Promoção</button></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {pizzaPromocoes.map(p => (
                            <div key={p.id} style={{ padding: '16px', background: 'var(--primary-50)', borderRadius: '12px', border: '1px solid var(--primary-100)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div><div style={{ fontWeight: 600 }}>{p.nome}</div><div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.desc}</div></div>
                                    <span className="badge badge-success">Ativa</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

/* ========== HAMBURGUERIA MODULE ========== */
function HamburgueriaModule() {
    const [tab, setTab] = useState('lanches');
    const data = burgerItems[tab] || [];
    return (
        <>
            <div className="tabs">
                {[{ k: 'lanches', l: '🍔 Lanches' }, { k: 'adicionais', l: '➕ Adicionais' }, { k: 'combos', l: '🎁 Combos' }, { k: 'bebidas', l: '🥤 Bebidas' }].map(t => (
                    <button key={t.k} className={`tab ${tab === t.k ? 'active' : ''}`} onClick={() => setTab(t.k)}>{t.l}</button>
                ))}
            </div>
            {(tab === 'lanches' || tab === 'combos') ? (
                <div className="menu-grid">{data.map(i => <ItemCard key={i.id} item={i} />)}</div>
            ) : (
                <div className="card">
                    <div className="card-header"><h3 className="card-title">{tab === 'adicionais' ? 'Adicionais' : 'Bebidas'}</h3><button className="btn btn-primary btn-sm"><Plus size={14} /> Adicionar</button></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {data.map(i => <SimpleItemRow key={i.id} item={i} />)}
                    </div>
                </div>
            )}
        </>
    );
}

/* ========== AÇAITERIA MODULE ========== */
function AcaiteriaModule() {
    const [tab, setTab] = useState('tamanhos');
    const data = acaiData[tab] || [];
    return (
        <>
            <div className="tabs">
                {[{ k: 'tamanhos', l: '📏 Tamanhos' }, { k: 'complementos', l: '🥣 Complementos' }, { k: 'frutas', l: '🍓 Frutas' }, { k: 'caldas', l: '🍫 Caldas' }].map(t => (
                    <button key={t.k} className={`tab ${tab === t.k ? 'active' : ''}`} onClick={() => setTab(t.k)}>{t.l}</button>
                ))}
            </div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h3>
                    <button className="btn btn-primary btn-sm"><Plus size={14} /> Adicionar</button>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {tab === 'tamanhos' ? 'Defina os tamanhos disponíveis para o açaí' : 'Os clientes podem selecionar múltiplos itens nos pedidos'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.map(i => <SimpleItemRow key={i.id} item={i} />)}
                </div>
            </div>
        </>
    );
}

/* ========== HOSTEL MODULE ========== */
function HostelModule() {
    const [tab, setTab] = useState('acomodacoes');
    const data = hostelData[tab] || [];
    return (
        <>
            <div className="tabs">
                {[{ k: 'acomodacoes', l: '🛏️ Acomodações' }, { k: 'servicos', l: '🛎️ Serviços Extras' }, { k: 'experiencias', l: '🏄‍♂️ Experiências / Passeios' }].map(t => (
                    <button key={t.k} className={`tab ${tab === t.k ? 'active' : ''}`} onClick={() => setTab(t.k)}>{t.l}</button>
                ))}
            </div>

            {tab === 'acomodacoes' ? (
                <div className="menu-grid">{data.map(i => <ItemCard key={i.id} item={i} />)}</div>
            ) : (
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{tab === 'servicos' ? 'Serviços Extras' : 'Experiências / Passeios'}</h3>
                        <button className="btn btn-primary btn-sm"><Plus size={14} /> Adicionar</button>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        {tab === 'servicos'
                            ? 'Ofereça conveniências adicionais para a estadia do hóspede.'
                            : 'Atividades e parcerias para melhorar a experiência no hostel.'}
                    </p>
                    <div className="menu-grid">{data.map(i => <ItemCard key={i.id} item={i} />)}</div>
                </div>
            )}
        </>
    );
}

export default function CardapioPage() {
    const { businessType, currentTheme } = useTheme();

    return (
        <div className="page-content">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="page-title">{businessType === 'hostel' ? 'Acomodações e Serviços' : 'Cardápio'} — {currentTheme.icon} {currentTheme.name}</h1>
                    <p className="page-description">Gerencie os {businessType === 'hostel' ? 'quartos, serviços e passeios oferecidos' : 'itens do seu cardápio'}</p>
                </div>
                <button className="btn btn-primary"><Plus size={18} /> Novo Item</button>
            </div>

            {businessType === 'pizzaria' && <PizzariaModule />}
            {businessType === 'hamburgueria' && <HamburgueriaModule />}
            {businessType === 'acaiteria' && <AcaiteriaModule />}
            {businessType === 'hostel' && <HostelModule />}
        </div>
    );
}
