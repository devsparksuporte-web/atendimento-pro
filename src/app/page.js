'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="login-page" style={{ background: 'linear-gradient(135deg, #fef7ed 0%, #fff5ee 50%, #fef2e8 100%)' }}>
      {/* Decorative food illustrations */}
      <div className="login-bg-shapes">
        <div style={{ position: 'absolute', top: '5%', left: '8%', fontSize: '80px', opacity: 0.15, transform: 'rotate(-15deg)', animation: 'float 18s ease-in-out infinite' }}>🍕</div>
        <div style={{ position: 'absolute', top: '15%', right: '10%', fontSize: '70px', opacity: 0.15, transform: 'rotate(10deg)', animation: 'float 15s ease-in-out infinite reverse' }}>🍔</div>
        <div style={{ position: 'absolute', bottom: '20%', left: '5%', fontSize: '60px', opacity: 0.15, transform: 'rotate(-5deg)', animation: 'float 20s ease-in-out infinite 2s' }}>☕</div>
        <div style={{ position: 'absolute', bottom: '10%', right: '8%', fontSize: '75px', opacity: 0.15, transform: 'rotate(15deg)', animation: 'float 16s ease-in-out infinite 1s' }}>🍧</div>
        <div style={{ position: 'absolute', top: '40%', left: '15%', fontSize: '50px', opacity: 0.1, animation: 'float 22s ease-in-out infinite 3s' }}>🥤</div>
        <div style={{ position: 'absolute', top: '60%', right: '15%', fontSize: '55px', opacity: 0.1, animation: 'float 19s ease-in-out infinite 4s' }}>🍟</div>
        <div style={{ position: 'absolute', top: '8%', left: '40%', fontSize: '45px', opacity: 0.12, animation: 'float 17s ease-in-out infinite 1s' }}>💬</div>
        <div style={{ position: 'absolute', bottom: '5%', left: '35%', fontSize: '65px', opacity: 0.12, animation: 'float 21s ease-in-out infinite 2s' }}>📦</div>
        {/* Warm gradient shapes */}
        <div className="shape shape-1" style={{ background: '#f97316', opacity: 0.05 }}></div>
        <div className="shape shape-2" style={{ background: '#22c55e', opacity: 0.04 }}></div>
        <div className="shape shape-3" style={{ background: '#eab308', opacity: 0.04 }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Top food illustration cluster */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '-20px', zIndex: 2 }}>
          <span style={{ fontSize: '40px', animation: 'float 4s ease-in-out infinite' }}>🍕</span>
          <div style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '16px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(34,197,94,0.3)' }}>
            <MessageSquare size={28} color="white" />
          </div>
          <span style={{ fontSize: '40px', animation: 'float 4s ease-in-out infinite 1s' }}>🍔</span>
        </div>

        <div className="login-card" style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)' }}>
          {/* Logo */}
          <div className="login-logo">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '12px', padding: '8px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(34,197,94,0.25)' }}>
                <MessageSquare size={22} color="white" />
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937' }}>
                Atendimento <span style={{ color: '#22c55e' }}>Pro</span>
              </h1>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#374151', marginTop: '16px' }}>Entre em sua conta</p>
          </div>

          <form className="login-form" onSubmit={handleLogin} style={{ gap: '20px' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, color: '#374151' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '42px', padding: '14px 14px 14px 42px', borderRadius: '12px', border: '1.5px solid #e5e7eb' }}
                />
              </div>
            </div>

            {/* Senha */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, color: '#374151' }}>Senha</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '42px', paddingRight: '80px', padding: '14px 80px 14px 42px', borderRadius: '12px', border: '1.5px solid #e5e7eb' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-family)', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {/* Esqueci senha */}
            <div style={{ textAlign: 'right' }}>
              <a href="#" style={{ color: '#22c55e', fontSize: '0.875rem', fontWeight: 500 }}>Esqueceu sua senha?</a>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="btn btn-block btn-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', padding: '16px', boxShadow: '0 4px 14px rgba(34,197,94,0.3)', border: 'none' }}
            >
              Entrar
            </button>

            {/* Divider */}
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#9ca3af' }}>
              Não tem uma conta? <a href="/cadastro" style={{ color: '#22c55e', fontWeight: 600 }}>Cadastre sua empresa!</a>
            </div>

            {/* Botão Cadastro */}
            <button
              type="button"
              onClick={() => router.push('/cadastro')}
              className="btn btn-block"
              style={{ background: 'transparent', border: '2px solid #22c55e', color: '#22c55e', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', padding: '14px' }}
            >
              Cadastro
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ marginTop: '32px', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center' }}>
          © 2024 <strong>Atendimento Pro</strong>. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
