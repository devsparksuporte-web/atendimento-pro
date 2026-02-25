'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Building2, Hash, Briefcase, Phone, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function CadastroPage() {
    const router = useRouter();
    const [form, setForm] = useState({ nome: '', cnpj: '', tipo: 'pizzaria', telefone: '', email: '', senha: '' });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('businessType', form.tipo);
        localStorage.setItem('companyName', form.nome);
        router.push('/dashboard');
    };

    return (
        <div className="register-page" style={{ background: 'linear-gradient(135deg, #fef7ed 0%, #fff5ee 50%, #fef2e8 100%)' }}>
            <div className="login-bg-shapes">
                <div style={{ position: 'absolute', top: '10%', right: '10%', fontSize: '70px', opacity: 0.12, animation: 'float 18s ease-in-out infinite' }}>🍕</div>
                <div style={{ position: 'absolute', bottom: '15%', left: '8%', fontSize: '60px', opacity: 0.12, animation: 'float 15s ease-in-out infinite reverse' }}>🍔</div>
                <div style={{ position: 'absolute', top: '50%', right: '5%', fontSize: '55px', opacity: 0.1, animation: 'float 20s ease-in-out infinite 2s' }}>🍧</div>
            </div>

            <div className="register-card" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                {/* Back */}
                <button onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-family)', marginBottom: '20px' }}>
                    <ArrowLeft size={16} /> Voltar ao login
                </button>

                {/* Logo */}
                <div className="login-logo" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
                        <div style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={22} color="white" />
                        </div>
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1f2937' }}>Atendimento <span style={{ color: '#22c55e' }}>Pro</span></h1>
                    </div>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#374151', marginTop: '12px' }}>Cadastre sua empresa</p>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '4px' }}>Comece a automatizar seus atendimentos hoje</p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nome da Empresa</label>
                        <div style={{ position: 'relative' }}>
                            <Building2 size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input className="form-input" placeholder="Ex: Pizzaria do João" value={form.nome} onChange={e => update('nome', e.target.value)} required style={{ paddingLeft: '42px', borderRadius: '12px' }} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">CNPJ</label>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input className="form-input" placeholder="00.000.000/0001-00" value={form.cnpj} onChange={e => update('cnpj', e.target.value)} style={{ paddingLeft: '42px', borderRadius: '12px' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tipo de Negócio</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }} />
                                <select className="form-select" value={form.tipo} onChange={e => update('tipo', e.target.value)} style={{ paddingLeft: '42px', borderRadius: '12px', appearance: 'none' }}>
                                    <option value="pizzaria">🍕 Pizzaria</option>
                                    <option value="hamburgueria">🍔 Hamburgueria</option>
                                    <option value="acaiteria">🍧 Açaiteria</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Telefone</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input className="form-input" placeholder="(00) 00000-0000" value={form.telefone} onChange={e => update('telefone', e.target.value)} style={{ paddingLeft: '42px', borderRadius: '12px' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input type="email" className="form-input" placeholder="seu@email.com" value={form.email} onChange={e => update('email', e.target.value)} required style={{ paddingLeft: '42px', borderRadius: '12px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                            <input type="password" className="form-input" placeholder="Mínimo 8 caracteres" value={form.senha} onChange={e => update('senha', e.target.value)} required style={{ paddingLeft: '42px', borderRadius: '12px' }} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-block btn-lg" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', padding: '16px', boxShadow: '0 4px 14px rgba(34,197,94,0.3)', border: 'none', marginTop: '8px' }}>
                        Criar Conta
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#9ca3af' }}>
                        Já tem uma conta? <a href="/" style={{ color: '#22c55e', fontWeight: 600 }}>Faça login</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
