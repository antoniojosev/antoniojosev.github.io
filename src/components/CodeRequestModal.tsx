import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface CodeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: string;
  accent: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const BG     = '#0f172a';
const SURFACE = '#1e293b';
const BORDER  = '#334155';
const TEXT    = '#f1f5f9';
const MUTED   = '#94a3b8';
const MUTED2  = '#64748b';

export default function CodeRequestModal({ isOpen, onClose, project, accent }: CodeRequestModalProps) {
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError]   = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 50);
    } else {
      setName(''); setEmail(''); setReason('');
      setStatus('idle'); setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !reason.trim()) return;

    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/.netlify/functions/send-code-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), reason: reason.trim(), project }),
      });

      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
      setError('No se pudo enviar. Intenta de nuevo o escríbeme directo a antoniovila.dev@gmail.com');
    }
  };

  if (!isOpen) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: '10px',
    padding: '0.625rem 0.875rem',
    fontSize: '0.875rem',
    color: TEXT,
    outline: 'none',
    fontFamily: '"DM Mono", ui-monospace, monospace',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.65rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: MUTED2,
    marginBottom: '0.375rem',
    fontFamily: '"DM Mono", ui-monospace, monospace',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 201,
          width: 'min(480px, calc(100vw - 2rem))',
          background: BG,
          border: `1px solid ${BORDER}`,
          borderTop: `3px solid ${accent}`,
          borderRadius: '16px',
          boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${accent}15`,
          animation: 'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, marginBottom: '0.25rem', fontFamily: '"DM Mono", monospace' }}>
              Solicitar código
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: TEXT, fontFamily: '"Syne", sans-serif' }}>
              {project}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = TEXT; (e.currentTarget as HTMLButtonElement).style.color = TEXT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER; (e.currentTarget as HTMLButtonElement).style.color = MUTED; }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <CheckCircle size={40} style={{ color: accent, margin: '0 auto 1rem', display: 'block' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: TEXT, fontFamily: '"Syne", sans-serif', marginBottom: '0.5rem' }}>
                Solicitud enviada
              </div>
              <div style={{ fontSize: '0.825rem', color: MUTED, lineHeight: 1.7 }}>
                Te respondo en menos de 24h con acceso al repositorio.
              </div>
              <button
                onClick={onClose}
                style={{ marginTop: '1.5rem', padding: '0.625rem 1.5rem', borderRadius: '999px', background: accent, border: 'none', color: '#0f172a', fontSize: '0.825rem', fontWeight: 700, cursor: 'pointer', fontFamily: '"DM Mono", monospace' }}
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.65, padding: '0.75rem 1rem', background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '10px' }}>
                Cuéntame brevemente tu interés y te comparto acceso al repo.
              </div>

              <div>
                <label style={labelStyle}>Nombre</label>
                <input
                  ref={nameRef}
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>

              <div>
                <label style={labelStyle}>¿Por qué te interesa el código?</label>
                <textarea
                  required
                  placeholder="Cuéntame brevemente tu contexto o lo que quieres revisar..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '96px', lineHeight: 1.65 }}
                  onFocus={e => (e.currentTarget.style.borderColor = accent)}
                  onBlur={e => (e.currentTarget.style.borderColor = BORDER)}
                />
              </div>

              {status === 'error' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', padding: '0.75rem 1rem', background: 'rgba(245,101,101,0.07)', border: '1px solid rgba(245,101,101,0.2)', borderRadius: '8px', fontSize: '0.78rem', color: '#f87171', lineHeight: 1.6 }}>
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading' || !name.trim() || !email.trim() || !reason.trim()}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: status === 'loading' ? `${accent}80` : accent,
                  color: '#0f172a',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: '"DM Mono", ui-monospace, monospace',
                  transition: 'opacity 0.2s',
                  opacity: (!name.trim() || !email.trim() || !reason.trim()) ? 0.5 : 1,
                }}
              >
                {status === 'loading' ? (
                  <>
                    <span style={{ width: '14px', height: '14px', border: '2px solid #0f172a40', borderTop: '2px solid #0f172a', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Enviar solicitud
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 12px)) } to { opacity: 1; transform: translate(-50%, -50%) } }
        @keyframes spin    { to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}
