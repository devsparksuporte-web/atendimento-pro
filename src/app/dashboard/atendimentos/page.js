'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, Phone, MoreVertical } from 'lucide-react';

const conversations = [
    { id: 1, name: 'Maria Silva', msg: 'Quero uma pizza grande...', time: '19:45', unread: 2, avatar: 'MS' },
    { id: 2, name: 'João Santos', msg: 'Meu pedido já saiu?', time: '19:30', unread: 0, avatar: 'JS' },
    { id: 3, name: 'Ana Costa', msg: 'Tem açaí de 700ml?', time: '19:20', unread: 1, avatar: 'AC' },
    { id: 4, name: 'Pedro Oliveira', msg: 'Qual o tempo de entrega?', time: '19:15', unread: 0, avatar: 'PO' },
    { id: 5, name: 'Lucas Mendes', msg: 'Obrigado! Pedido ótimo!', time: '19:00', unread: 0, avatar: 'LM' },
    { id: 6, name: 'Carla Ferreira', msg: 'Vocês aceitam PIX?', time: '18:45', unread: 3, avatar: 'CF' },
];

const messages = [
    { id: 1, text: 'Olá! Bem-vindo ao Atendimento Pro 🎉', sent: false, time: '19:40' },
    { id: 2, text: 'Oi! Quero fazer um pedido', sent: true, time: '19:41' },
    { id: 3, text: 'Claro! Qual sabor de pizza você deseja?', sent: false, time: '19:41' },
    { id: 4, text: 'Quero uma pizza grande de margherita', sent: true, time: '19:42' },
    { id: 5, text: 'Ótima escolha! 🍕 Pizza Margherita Grande — R$ 44,90. Deseja adicionar borda recheada? (+R$ 8,00)', sent: false, time: '19:42' },
    { id: 6, text: 'Sim, borda de catupiry!', sent: true, time: '19:43' },
    { id: 7, text: 'Perfeito! Seu pedido:\n🍕 1x Pizza Margherita G + Borda Catupiry\n💰 Total: R$ 52,90\n\nConfirma o pedido?', sent: false, time: '19:44' },
];

export default function AtendimentosPage() {
    const [activeChat, setActiveChat] = useState(1);
    const [inputMsg, setInputMsg] = useState('');

    return (
        <div className="page-content">
            <div className="page-header">
                <h1 className="page-title">Atendimentos</h1>
                <p className="page-description">Gerencie conversas do WhatsApp em tempo real</p>
            </div>
            <div className="chat-layout">
                {/* Chat List */}
                <div className="chat-list">
                    <div className="chat-list-header">
                        <input className="chat-search" placeholder="🔍 Buscar conversa..." />
                    </div>
                    {conversations.map(c => (
                        <div key={c.id} className={`chat-item ${activeChat === c.id ? 'active' : ''}`} onClick={() => setActiveChat(c.id)}>
                            <div className="chat-item-avatar">{c.avatar}</div>
                            <div className="chat-item-details">
                                <div className="chat-item-name">{c.name}</div>
                                <div className="chat-item-msg">{c.msg}</div>
                            </div>
                            <div className="chat-item-meta">
                                <span className="chat-item-time">{c.time}</span>
                                {c.unread > 0 && <span className="chat-unread">{c.unread}</span>}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Chat Window */}
                <div className="chat-window">
                    <div className="chat-window-header">
                        <div className="chat-item-avatar" style={{ width: '38px', height: '38px' }}>MS</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Maria Silva</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>● Online</div>
                        </div>
                        <button className="header-icon-btn" style={{ border: 'none', background: 'none' }}><Phone size={18} /></button>
                        <button className="header-icon-btn" style={{ border: 'none', background: 'none' }}><MoreVertical size={18} /></button>
                    </div>
                    <div className="chat-messages">
                        {messages.map(m => (
                            <div key={m.id} className={`chat-message ${m.sent ? 'sent' : 'received'}`}>
                                <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
                                <div className="chat-message-time">{m.time}</div>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input-area">
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Paperclip size={20} /></button>
                        <input className="chat-input" placeholder="Digite uma mensagem..." value={inputMsg} onChange={e => setInputMsg(e.target.value)} />
                        <button className="chat-send-btn"><Send size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
