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
    <div className="login-page" style={{
      background: 'radial-gradient(circle at top right, hsl(var(--gray-50)), #ffffff)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Dynamic Background Elements */}
      <div className="login-bg-shapes" style={{ opacity: 0.6 }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.07, borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--accent)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%' }}></div>

        {/* Floating Icons with refined styling */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', fontSize: '48px', animation: 'float 10s ease-in-out infinite' }}>🍕</div>
        <div style={{ position: 'absolute', top: '20%', right: '20%', fontSize: '42px', animation: 'float 8s ease-in-out infinite reverse' }}>🍔</div>
        <div style={{ position: 'absolute', bottom: '25%', left: '20%', fontSize: '38px', animation: 'float 12s ease-in-out infinite 1s' }}>🍧</div>
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', fontSize: '44px', animation: 'float 9s ease-in-out infinite 2s' }}>🥤</div>
      </div>

      <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1, animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="card" style={{ padding: '48px', border: '1px solid hsla(var(--gray-200), 0.5)', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)' }}>
          {/* Logo Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              borderRadius: '16px',
              boxShadow: '0 8px 16px hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.25)',
              marginBottom: '20px'
            }}>
              <MessageSquare size={28} color="white" />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'hsl(var(--gray-900))', letterSpacing: '-0.02em' }}>
              Atendimento <span style={{ color: 'var(--primary)' }}>Pro</span>
            </h1>
            <p style={{ color: 'hsl(var(--gray-500))', marginTop: '8px', fontSize: '0.95rem' }}>Automacão inteligente para seu negócio</p>
          </div>

          <form className="login-form" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label className="form-label">Email Corporativo</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--gray-400))' }} />
                <input
                  type="email"
                  className="form-input"
                  placeholder="exemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '48px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Senha</label>
                <a href="#" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>Esqueceu?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--gray-400))' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '48px', paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'hsl(var(--gray-400))', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: '8px' }}>
              Acessar Painel
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'hsl(var(--gray-500))', marginTop: '8px' }}>
              Novo por aqui? <a href="/cadastro" style={{ color: 'var(--primary)', fontWeight: 700 }}>Criar conta grátis</a>
            </div>
          </form>
        </div>

        <p style={{ marginTop: '40px', fontSize: '0.85rem', color: 'hsl(var(--gray-400))', textAlign: 'center' }}>
          &copy; 2024 <strong>Atendimento Pro</strong>. Feito para crescer seu negócio.
        </p>
      </div>
    </div>
  );

}
