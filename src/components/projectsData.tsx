import React from 'react';

// ─── Panel content helper components ─────────────────────────────────────────
// These are only used inside the dark panel — styled for dark background

function Code({ children, accent = '#c8f565' }: { children: React.ReactNode; accent?: string }) {
  return (
    <code
      style={{
        background: `${accent}12`,
        border: `1px solid ${accent}25`,
        color: accent,
        padding: '0.05rem 0.4rem',
        borderRadius: '4px',
        fontSize: '0.8em',
        fontFamily: '"DM Mono", ui-monospace, monospace',
        fontWeight: 500,
      }}
    >
      {children}
    </code>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>{children}</strong>;
}

function SolutionBox({ label = 'Solución', accent = '#c8f565', children }: { label?: string; accent?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '0.875rem', padding: '0.875rem 1rem', background: `${accent}0a`, border: `1px solid ${accent}22`, borderLeft: `3px solid ${accent}`, borderRadius: '0 0.5rem 0.5rem 0' }}>
      <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: accent, marginBottom: '0.375rem', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function Note({ variant = 'warning', children }: { variant?: 'warning' | 'danger' | 'info'; children: React.ReactNode }) {
  const colors = {
    warning: { border: '#f59e0b', text: '#fbbf24', bg: 'rgba(245,158,11,0.07)' },
    danger:  { border: '#ef4444', text: '#f87171', bg: 'rgba(239,68,68,0.07)'  },
    info:    { border: '#3b82f6', text: '#60a5fa', bg: 'rgba(59,130,246,0.07)' },
  };
  const c = colors[variant];
  return (
    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.875rem', background: c.bg, border: `1px solid ${c.border}35`, borderLeft: `3px solid ${c.border}`, borderRadius: '0 0.375rem 0.375rem 0', fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function Steps({ items, accent = '#65c8f5' }: { items: Array<[string, React.ReactNode]>; accent?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.875rem 0' }}>
      {items.map(([num, content], i) => (
        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.65 }}>
          <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${accent}15`, border: `1px solid ${accent}35`, color: accent, fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
            {num}
          </span>
          <span>{content}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Architecture Diagram Components ─────────────────────────────────────────

function DiagramLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      {children}
      <div style={{ flex: 1, height: '1px', background: '#334155' }} />
    </div>
  );
}

function ServiceNode({ icon, name, sublabel, badge, badgeColor = '#64748b' }: { icon: string; name: string; sublabel: string; badge: string; badgeColor?: string }) {
  return (
    <div style={{ flexShrink: 0, background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1rem 1.125rem', minWidth: '110px', textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>{icon}</div>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>{name}</div>
      <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.2rem' }}>{sublabel}</div>
      <span style={{ display: 'inline-block', marginTop: '0.375rem', fontSize: '0.58rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: `${badgeColor}18`, color: badgeColor }}>{badge}</span>
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0.25rem', paddingTop: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        <div style={{ width: '24px', height: '1px', background: '#334155' }} />
        <div style={{ width: 0, height: 0, borderLeft: '5px solid #334155', borderTop: '3px solid transparent', borderBottom: '3px solid transparent' }} />
      </div>
      <div style={{ fontSize: '0.55rem', color: '#475569', marginTop: '0.3rem', fontFamily: '"DM Mono", monospace', whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  );
}

const BioLinkStoreDiagram = () => (
  <div>
    <DiagramLabel>Infraestructura · flujo de request</DiagramLabel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.75rem', paddingRight: '1rem', marginRight: '-1rem' }}>
      <ServiceNode icon="☁️" name="Cloudflare" sublabel="DNS + Proxy" badge="CDN edge" badgeColor="#94a3b8" />
      <FlowArrow label="HTTPS" />
      <ServiceNode icon="▲" name="Vercel" sublabel="Next.js 14" badge="Frontend / SSR" badgeColor="#c8f565" />
      <FlowArrow label="JWT Bearer" />
      <ServiceNode icon="🦁" name="Koyeb" sublabel="NestJS API" badge="REST Backend" badgeColor="#c8f565" />
      <FlowArrow label="Prisma ORM" />
      <ServiceNode icon="🔷" name="Supabase" sublabel="PostgreSQL" badge="DB + Auth" badgeColor="#65c8f5" />
    </div>

    <div style={{ marginTop: '1.25rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1rem 1.25rem' }}>
      <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.875rem' }}>Auth Flow</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[
          ['1', 'User hace login → Supabase Auth valida credenciales'],
          ['2', 'Supabase emite JWT signed'],
          ['3', 'Next.js almacena token en cookie httpOnly'],
          ['4', 'Cada request al API de NestJS lleva Bearer JWT'],
          ['5', 'NestJS valida firma con Supabase JWT secret'],
        ].map(([n, label]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.75rem' }}>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(200,245,101,0.12)', border: '1px solid rgba(200,245,101,0.3)', color: '#c8f565', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.05rem' }}>{n}</span>
            <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {[
        { icon: '📧', name: 'Resend', desc: 'Emails transaccionales (welcome, reset password). Disparado desde NestJS service con SDK TypeScript + React Email templates.' },
        { icon: '🗃️', name: 'Prisma ORM', desc: 'Schema-first. Migrations versionadas. Typesafe queries en el API de NestJS.' },
        { icon: '🏪', name: 'Multi-tenant routing', desc: 'Cada tienda resuelve por slug. /[store-slug] → lookup vendor → render plantilla dinámica.' },
      ].map(({ icon, name, desc }) => (
        <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem' }}>
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
          <div>
            <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.2rem' }}>{name}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RepuestosOrienteDiagram = () => (
  <div>
    <DiagramLabel>Cadena de roles y precios</DiagramLabel>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 0, alignItems: 'center', marginBottom: '1.25rem' }}>
      {[
        { color: '#65c8f5', icon: '🏭', name: 'Mayorista', desc: 'Distribuidor principal. Acceso canal B2B exclusivo.', perms: ['✓ Publica con precio mayorista', '✓ Ve otros mayoristas', '✗ Sin precios retail'] },
        null,
        { color: '#c8f565', icon: '🏪', name: 'Minorista', desc: 'Compra al mayorista. Vende al público con su margen.', perms: ['✓ Compra al mayorista (B2B)', '✓ Define precio al público', '✗ Sin canal mayorista'] },
        null,
        { color: '#64748b', icon: '🧑‍💼', name: 'Público', desc: 'Solo catálogo de minoristas con precios retail.', perms: ['✓ Busca por referencia', '✓ Catálogo retail', '✗ Sin precios B2B'] },
      ].map((item, i) => {
        if (!item) {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', padding: '0 0.375rem' }}>
              <span style={{ color: '#475569', fontSize: '1.1rem' }}>→</span>
              <span style={{ fontSize: '0.58rem', color: '#65c8f5', textAlign: 'center', lineHeight: 1.3 }}>define precio</span>
            </div>
          );
        }
        return (
          <div key={item.name} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.375rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: item.color, marginBottom: '0.25rem' }}>{item.name}</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b', lineHeight: 1.5, marginBottom: '0.625rem' }}>{item.desc}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', textAlign: 'left', fontSize: '0.62rem' }}>
              {item.perms.map(p => (
                <div key={p} style={{ color: p.startsWith('✓') ? '#86efac' : '#475569', opacity: p.startsWith('✗') ? 0.5 : 1, textDecoration: p.startsWith('✗') ? 'line-through' : 'none' }}>{p}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>

    <div style={{ background: 'rgba(101,200,245,0.06)', border: '1px solid rgba(101,200,245,0.2)', borderLeft: '3px solid #65c8f5', borderRadius: '0 8px 8px 0', padding: '0.875rem 1.125rem', fontSize: '0.825rem', color: '#cbd5e1', lineHeight: 1.7 }}>
      <strong style={{ color: '#65c8f5' }}>Django Middleware · Role Validation</strong>
      <br />
      Cada request pasa por <code style={{ background: 'rgba(101,200,245,0.1)', color: '#65c8f5', padding: '0.05rem 0.35rem', borderRadius: '4px', fontSize: '0.78em', fontFamily: '"DM Mono", monospace' }}>RoleMiddleware</code> → extrae el rol de la DB → decide qué querysets exponer. El <code style={{ background: 'rgba(101,200,245,0.1)', color: '#65c8f5', padding: '0.05rem 0.35rem', borderRadius: '4px', fontSize: '0.78em', fontFamily: '"DM Mono", monospace' }}>PricingSerializer</code> retorna el campo de precio correcto. Los tres precios nunca se exponen en el mismo response.
    </div>

    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#334155', borderRadius: '10px', overflow: 'hidden' }}>
      {[
        { title: 'Frontend', dot: '#65c8f5', items: ['⚛️ React · SPA', '🔥 Firebase · Hosting', '🔐 Firebase Auth'] },
        { title: 'Backend', dot: '#c8f565', items: ['🐍 Django REST · API', '🛡️ Role Middleware', '🚀 Render · Deploy'] },
        { title: 'Datos', dot: '#f5c865', items: ['🔷 Supabase · PostgreSQL', '☁️ Cloudflare R2 · Media', '🐳 Docker · Dev env'] },
      ].map(({ title, dot, items }) => (
        <div key={title} style={{ background: '#0f172a', padding: '1rem' }}>
          <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot }} />
            {title}
          </div>
          {items.map(item => <div key={item} style={{ fontSize: '0.75rem', color: '#94a3b8', padding: '0.15rem 0' }}>{item}</div>)}
        </div>
      ))}
    </div>
  </div>
);

const EagleKitDiagram = () => (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '1rem', alignItems: 'start' }}>
      <div>
        <DiagramLabel>Core</DiagramLabel>
        <div style={{ background: '#0f172a', border: '1px solid rgba(245,200,101,0.35)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ background: 'rgba(245,200,101,0.08)', borderBottom: '1px solid rgba(245,200,101,0.2)', padding: '0.625rem 0.875rem', fontWeight: 700, fontSize: '0.8rem', color: '#f5c865', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            🦅 eaglekit
          </div>
          <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {[
              ['🔌', 'PluginLoader', 'importlib · auto-scan'],
              ['📋', 'PluginBase', 'clase base extensible'],
              ['🗂️', 'ProjectRegistry', 'proyectos + aliases'],
              ['📌', 'Context', 'proyecto activo'],
              ['💾', 'Storage', 'SQLite / JSON'],
            ].map(([icon, name, sub]) => (
              <div key={name} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #334155', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span style={{ fontSize: '0.875rem' }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{name}</div>
                  <div style={{ color: '#475569', fontSize: '0.6rem' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <DiagramLabel>Plugin loader · auto-discovery</DiagramLabel>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ background: '#060d1a', borderBottom: '1px solid #334155', padding: '0.5rem 0.875rem', fontSize: '0.7rem', color: '#64748b' }}>
              <strong style={{ color: '#f5c865' }}>PluginLoader</strong> · escanea al iniciar
            </div>
            <div style={{ padding: '0.875rem', fontFamily: '"DM Mono", monospace', fontSize: '0.72rem', lineHeight: 2 }}>
              <span style={{ color: '#f5c865' }}>~/.eaglekit/</span><br />
              {'├── '}<span style={{ color: '#f5c865' }}>plugins/</span><br />
              {'│   ├── '}<span style={{ color: '#c8f565' }}>my_plugin.py</span>   <span style={{ color: '#475569', fontSize: '0.62rem' }}>← auto-detected</span><br />
              {'│   └── '}<span style={{ color: '#c8f565' }}>deploy_tools.py</span> <span style={{ color: '#475569', fontSize: '0.62rem' }}>← auto-detected</span><br />
              {'├── '}<span style={{ color: '#94a3b8' }}>config.toml</span><br />
              {'└── '}<span style={{ color: '#94a3b8' }}>registry.json</span>
            </div>
          </div>
        </div>

        <div>
          <DiagramLabel>PluginBase · contrato de extensión</DiagramLabel>
          <div style={{ background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem', fontFamily: '"DM Mono", monospace', fontSize: '0.72rem', lineHeight: 2, color: '#64748b', whiteSpace: 'pre' as const }}>
            <span style={{ color: '#c084fc' }}>class</span> <span style={{ color: '#65c8f5' }}>PluginBase</span>:{'\n'}
            {'  '}name: <span style={{ color: '#65c8f5' }}>str</span>{'           '}<span style={{ color: '#334155' }}># nombre del plugin</span>{'\n'}
            {'  '}commands: <span style={{ color: '#65c8f5' }}>list</span>{'      '}<span style={{ color: '#334155' }}># comandos que expone</span>{'\n\n'}
            {'  '}<span style={{ color: '#c084fc' }}>def</span> <span style={{ color: '#c8f565' }}>register</span>(self, ctx):{'\n'}
            {'      '}<span style={{ color: '#334155' }}># acceso al contexto compartido</span>{'\n'}
            {'      ...'}{'\n\n'}
            <span style={{ color: '#c084fc' }}>class</span> <span style={{ color: '#65c8f5' }}>DeployPlugin</span>(<span style={{ color: '#65c8f5' }}>PluginBase</span>):{'\n'}
            {'  '}name = <span style={{ color: '#f5c865' }}>"deploy"</span>
          </div>
        </div>
      </div>
    </div>

    <div style={{ marginTop: '1.25rem' }}>
      <DiagramLabel>Comandos implementados</DiagramLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '0.5rem' }}>
        {[
          ['eagle add <path>', 'Registra un proyecto con su ruta y alias.'],
          ['eagle remove <alias>', 'Elimina un proyecto del registry.'],
          ['eagle cd <alias>', 'Cambia al directorio del proyecto.'],
          ['eagle status', 'Estado del proyecto activo.'],
          ['eagle todo add', 'Agrega una tarea al proyecto.'],
          ['eagle todo remove', 'Elimina una tarea por ID.'],
          ['eagle todo edit', 'Edita una tarea existente.'],
          ['eagle deploy <env>', 'Ejecuta el script de deploy.'],
        ].map(([cmd, desc]) => (
          <div key={cmd} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.75rem' }}>
            <div style={{ fontSize: '0.68rem', color: '#f5c865', marginBottom: '0.25rem', fontWeight: 600, fontFamily: '"DM Mono", monospace' }}>{cmd}</div>
            <div style={{ fontSize: '0.65rem', color: '#475569', lineHeight: 1.5 }}>{desc}</div>
            <span style={{ display: 'inline-block', marginTop: '0.375rem', fontSize: '0.58rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(200,245,101,0.1)', color: '#c8f565', fontFamily: '"DM Mono", monospace' }}>live</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VenekambioDiagram = () => (
  <div>
    <DiagramLabel>Cliente puro · 4 APIs paralelas · Bs como pivote</DiagramLabel>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.75rem', paddingRight: '1rem', marginRight: '-1rem' }}>
      <ServiceNode icon="🇻🇪" name="dolarapi" sublabel="BCV · EUR · MON" badge="3 oficiales" badgeColor="#65c8f5" />
      <FlowArrow label="Future.wait" />
      <ServiceNode icon="📱" name="Cliente" sublabel="Flutter / Nuxt" badge="sin backend" badgeColor="#E87722" />
      <FlowArrow label="Future.wait" />
      <ServiceNode icon="₿" name="criptoya" sublabel="USDT · ETH" badge="2 P2P" badgeColor="#c8f565" />
    </div>

    <div style={{ marginTop: '1.25rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1rem 1.25rem' }}>
      <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.875rem' }}>Conversión triangulada · una entrada, todas las tasas</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[
          ['1', <span key="1">Usuario teclea monto + elige moneda base (ej. <code style={{ background: 'rgba(232,119,34,0.1)', color: '#E87722', padding: '0.05rem 0.35rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '0.85em' }}>250 USDT</code>)</span>],
          ['2', <span key="2">El motor triangula <code style={{ background: 'rgba(232,119,34,0.1)', color: '#E87722', padding: '0.05rem 0.35rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '0.85em' }}>from → Bs → to</code> contra <strong style={{ color: '#e2e8f0' }}>RatesSnapshot</strong> inmutable</span>],
          ['3', <span key="3">Render paralelo en 6 monedas: <strong style={{ color: '#e2e8f0' }}>Bs · BCV · EUR · MON · USDT · ETH</strong></span>],
          ['4', <span key="4">Hero card destacada para la base + chip strip secundario con las otras 5 ya calculadas</span>],
          ['5', <span key="5">Sin scroll, sin tabs, sin segundo tap</span>],
        ].map(([n, label]) => (
          <div key={String(n)} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', fontSize: '0.75rem' }}>
            <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)', color: '#E87722', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.05rem' }}>{n}</span>
            <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#334155', borderRadius: '10px', overflow: 'hidden' }}>
      {[
        { title: 'App móvil', dot: '#E87722', items: ['📱 Flutter · Material 3', '🦦 Riverpod · state mgmt', '💾 SharedPreferences'] },
        { title: 'Landing web', dot: '#c8f565', items: ['🟢 Nuxt 4 · SSG', '📘 TypeScript estricto', '☁️ CDN estático'] },
        { title: 'Operación', dot: '#65c8f5', items: ['🚫 Sin backend', '💸 $0/mes', '🔒 Privacy by design'] },
      ].map(({ title, dot, items }) => (
        <div key={title} style={{ background: '#0f172a', padding: '1rem' }}>
          <div style={{ fontSize: '0.6rem', color: '#64748b', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot }} />
            {title}
          </div>
          {items.map(item => <div key={item} style={{ fontSize: '0.75rem', color: '#94a3b8', padding: '0.15rem 0' }}>{item}</div>)}
        </div>
      ))}
    </div>

  </div>
);

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Metric { value: string; label: string; }
export interface Challenge { num: string; title: string; subtitle: string; body: React.ReactNode; }
export interface Decision { question: string; answer: React.ReactNode; }
export interface RetroItem { decision: string; would: React.ReactNode; }
export interface ProjectLink { text: string; href: string; primary: boolean; isMailto?: boolean; isCodeRequest?: boolean; }

export interface ProjectData {
  id: string;
  index: string;
  status: string;
  statusType: 'live' | 'beta' | 'wip';
  title: string;
  typeLabels: string[];
  description: string;
  stackPills: string[];
  color: string;
  tag: { text: string; bg: string; color: string };
  subtitle: string;
  problem: string;
  metrics: Metric[];
  challenges: Challenge[];
  decisions: Decision[];
  decisionsNote?: React.ReactNode;
  afterDecisions?: React.ReactNode;
  afterChallenges?: React.ReactNode;
  retrospective: RetroItem[];
  afterRetro?: React.ReactNode;
  links: ProjectLink[];
  diagram: React.ReactNode;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS: ProjectData[] = [
  {
    id: 'biolinkstore',
    index: '01',
    status: 'Live en producción',
    statusType: 'live',
    title: 'BioLinkStore',
    typeLabels: ['SaaS', 'Multi-tenant', 'eCommerce'],
    description: 'Plataforma SaaS que convierte un link en una tienda. Diseñado para vendedores en LATAM que necesitan presencia digital sin fricción técnica ni inversión inicial.',
    stackPills: ['Next.js', 'NestJS', 'Supabase', 'Prisma', 'Vercel', 'Koyeb'],
    color: '#c8f565',
    tag: { text: 'SaaS · Live', bg: 'rgba(200,245,101,0.12)', color: '#c8f565' },
    subtitle: 'Una sola URL que convierte tu catálogo en una tienda. Diseñado para vendedores que necesitan presencia digital sin fricción técnica. Construido con presupuesto cero, sin sacrificar arquitectura.',
    problem: 'Los vendedores en Venezuela y LATAM tienen sus productos en WhatsApp, sin una vitrina digital accesible. Crear una tienda propia requiere tiempo, dinero y conocimiento técnico. BioLinkStore resuelve esto en minutos: el usuario elige una plantilla, sube productos y comparte su link.',
    metrics: [
      { value: '< 5min', label: 'Setup time' },
      { value: 'Multi-tenant', label: 'Arquitectura' },
      { value: '3', label: 'Clientes en pipeline' },
    ],
    diagram: <BioLinkStoreDiagram />,
    challenges: [
      {
        num: '01',
        title: 'Multi-tenancy con aislamiento manual de datos',
        subtitle: 'Single schema · storeId como única barrera de aislamiento',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El sistema maneja múltiples stores bajo el <Strong>mismo schema de PostgreSQL</Strong> — no schema-per-tenant. Cada query en toda la aplicación debe llevar <Code accent="#c8f565">storeId</Code> como filtro obligatorio. Si se omite en una sola query, se exponen datos de un tenant a otro <Strong>sin ningún error explícito</Strong>.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Prisma no tiene RLS nativo. El aislamiento se garantiza con dos capas: <Code accent="#c8f565">StoreOwnerGuard</Code> valida que el usuario sea dueño del store, y los repositorios reciben siempre el <Code accent="#c8f565">storeId</Code> como parámetro explícito. Si cualquiera falla, no hay red de seguridad debajo.</p>
            <Note variant="warning">Complejidad sostenida · requiere disciplina en cada nuevo repositorio</Note>
          </>
        ),
      },
      {
        num: '02',
        title: 'Matching de variantes de producto con JSON',
        subtitle: 'combination como objeto JSON · sin índice eficiente',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El modelo <Code accent="#c8f565">ProductVariant</Code> almacena las combinaciones de atributos como JSON: <Code accent="#c8f565">{'{ "Color": "Negro", "Talla": "M" }'}</Code>. Es flexible, pero cuando el cliente selecciona atributos en el storefront hay que hacer <Strong>matching exacto del objeto JSON</Strong> contra los registros en base de datos para encontrar la variante correcta, calcular el precio ajustado y verificar stock — sin un índice que puedas usar eficientemente.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El problema escala en complejidad con el número de atributos: un producto con 3 atributos y 4 valores cada uno genera 64 combinaciones posibles que el sistema tiene que resolver en tiempo de request sin traer todo el catálogo a memoria.</p>
            <Note variant="warning">Costo en queries · difícil de indexar · migración de datos si se renombra un atributo</Note>
          </>
        ),
      },
      {
        num: '03',
        title: 'Supabase pgBouncer + Prisma en producción',
        subtitle: 'El error que no da error · proceso colgado sin stacktrace',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.85 }}>Este es probablemente el problema más interesante porque <Strong>no aparece en desarrollo</Strong>, no da un error claro, y la documentación de ambos lados lo menciona pero no explica el efecto completo en un setup real.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.85 }}>pgBouncer en modo Transaction Pooling <Strong>no mantiene estado de sesión entre queries</Strong>. Prisma usa prepared statements por defecto, que sí requieren estado de sesión. El resultado: <Code accent="#c8f565">prisma migrate deploy</Code> cuelga indefinidamente porque intenta adquirir un advisory lock que pgBouncer nunca puede mantener. Sin timeout, sin error, sin stacktrace — el proceso simplemente no avanza.</p>
            <SolutionBox label="Solución · tres capas simultáneas" accent="#c8f565">
              Agregar <Code accent="#c8f565">directUrl</Code> en el schema de Prisma apuntando al puerto 5432 directo (para migraciones), <Code accent="#c8f565">?pgbouncer=true</Code> en el <Code accent="#c8f565">DATABASE_URL</Code> (para queries en runtime), y correr las migraciones desde local porque el puerto 5432 es inaccesible desde el entorno de build de Koyeb. Cada pieza necesaria por una razón distinta.
            </SolutionBox>
            <Note variant="danger">El más costoso en tiempo · ~5 min por ciclo de build · sin mensajes de error útiles</Note>
          </>
        ),
      },
      {
        num: '04',
        title: 'Session handling en OAuth callback cross-origin',
        subtitle: 'Race condition entre AuthProvider y callback page',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El redirect final de Google OAuth viene hacia el backend, y el backend tiene que redirigir al frontend con los tokens. El problema: los tokens no pueden ir en el body de un redirect 302, así que van en <Strong>query params de la URL</Strong> — exponiéndolos en el historial del browser y en logs de servidor.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>La complejidad real está en el timing: el frontend recibe los tokens en una página nueva, tiene que guardarlos, cargar el usuario y navegar — todo antes de que el usuario note la redirección. El <Code accent="#c8f565">AuthProvider</Code> ya está mounted (envuelve toda la app), lo que crea una <Strong>race condition potencial</Strong> entre el estado del contexto y la página de callback que necesita usarlo.</p>
            <SolutionBox accent="#c8f565">
              <Code accent="#c8f565">loginWithTokens</Code> como método del contexto, con un <Code accent="#c8f565">ref</Code> para prevenir ejecuciones dobles del <Code accent="#c8f565">useEffect</Code> en React Strict Mode.
            </SolutionBox>
          </>
        ),
      },
    ],
    decisions: [
      {
        question: 'NestJS en Koyeb separado del frontend, en vez de API Routes de Next.js',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El proyecto tiene <Strong>guards globales, interceptores, filtros de excepciones, estrategias de Passport, módulos Redis y storage abstraction</Strong> — una arquitectura que asume un servidor HTTP de larga vida con inyección de dependencias real. Meter eso en API Routes de Next.js significaría perder el contenedor DI de NestJS o emularlo manualmente.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>La segunda razón es de escala: el frontend puede deployarse en Vercel con edge CDN global sin afectar al backend, y el backend puede escalar horizontalmente de forma independiente. En un SaaS multi-tenant donde distintos stores pueden tener picos de tráfico no correlacionados, esa separación importa.</p>
            <Note variant="warning">Trade-off asumido: CORS y latencia de red entre servicios — que apareció en producción y costó tiempo resolver.</Note>
          </>
        ),
      },
      {
        question: 'Resend sobre Supabase Email o SendGrid',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Supabase Email está diseñado para emails transaccionales <Strong>nativos de Supabase Auth</Strong> — funciona bien si el auth es 100% Supabase, pero el proyecto usa JWT propio con NestJS/Passport. SendGrid es sólido pero su setup (rate limits por tipo de email, configuración de dominio, curva inicial) no vale la pena para el volumen actual.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>Resend tiene un <Strong>SDK de TypeScript de primera clase</Strong>, soporte nativo para React Email en templates, y setup de dominio directo. Para emails transaccionales simples (reset, notificaciones), da el 90% del resultado con el 20% de la configuración.</p>
          </>
        ),
      },
      {
        question: 'Prisma sobre Drizzle o TypeORM',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>TypeORM tiene <Strong>problemas conocidos con TypeScript strict mode</Strong> y su sistema de decoradores genera inconsistencias difíciles de debuggear. Drizzle es excelente pero al momento de iniciar el proyecto su ecosistema de migraciones era menos maduro.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Prisma da <Strong>type-safety end-to-end</Strong> desde el schema hasta las queries, el cliente generado es predecible, y las migraciones son deterministas.</p>
            <Note variant="warning">El trade-off — que apareció en producción — es que Prisma asume conexiones directas y no está optimizado para poolers como pgBouncer sin configuración explícita. Es un problema conocido pero que solo se manifiesta en un setup específico de Supabase en producción.</Note>
          </>
        ),
      },
      {
        question: 'StorageProvider abstraction desde el día uno',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Se implementó una interfaz <Code accent="#c8f565">StorageProvider</Code> con dos implementaciones: <Strong>local</Strong> (para desarrollo) y <Strong>S3-compatible</Strong> (para producción). La decisión fue no acoplarse a ningún proveedor desde el inicio.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>En un SaaS donde cada store sube sus propias imágenes, el proveedor de storage es una decisión de negocio que puede cambiar por costos o features. Con la abstracción lista, cambiar de local a S3 a Cloudinary es cambiar una variable de entorno, no refactorizar servicios.</p>
          </>
        ),
      },
    ],
    decisionsNote: (
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        background: 'rgba(200,245,101,0.04)',
        border: '1px solid rgba(200,245,101,0.12)',
        borderRadius: '0.75rem',
        padding: '1rem 1.125rem',
        fontSize: '0.8rem',
        color: '#94a3b8',
        lineHeight: 1.75,
      }}>
        <span style={{ color: '#c8f565', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', flexShrink: 0, paddingTop: '0.15rem', letterSpacing: '0.05em' }}>//</span>
        <span>El constraint principal de este proyecto fue <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>presupuesto cero</strong>. Cada decisión de infraestructura tenía que maximizar capacidad técnica dentro del free tier. Esto hace que el stack sea una demostración de conocimiento del ecosistema, no solo de preferencia.</span>
      </div>
    ),
    retrospective: [
      { decision: 'Aislamiento por storeId manual en cada repo', would: <span><Strong>Row Level Security nativo de PostgreSQL.</Strong> Una política a nivel de tabla hace el aislamiento imposible de saltear independientemente del ORM. Con Supabase esto es natural — soportado de primera clase.</span> },
      { decision: 'ProductVariant.combination como JSON', would: <span>Tabla intermedia <Strong>ProductVariantAttribute</Strong> con filas por cada par atributo-valor. Indexable, consultable con SQL estándar, sin migración de datos JSON si se renombra un atributo.</span> },
      { decision: 'Refresh tokens en tabla PostgreSQL', would: <span><Strong>Redis con TTL automático.</Strong> Elimina escrituras frecuentes en PostgreSQL, la expiración la maneja el store solo sin jobs de limpieza, lecturas O(1).</span> },
      { decision: 'AuthProvider monolítico (tokens + sesión + navegación)', would: <span>Separar en <Strong>TokenManager</Strong> (storage/refresh), <Strong>SessionProvider</Strong> (estado del usuario) y dejar la navegación post-login en cada flujo específico. Más testeable, menos acoplado.</span> },
      { decision: 'Estructura de carpetas por tipo (components/, lib/)', would: <span>Estructura <Strong>por dominio</Strong>: <Code accent="#c8f565">features/auth/</Code>, <Code accent="#c8f565">features/store/</Code>, <Code accent="#c8f565">features/products/</Code>. El mismo principio de cohesión que usa el backend con sus módulos NestJS.</span> },
    ],
    links: [
      { text: 'Ver en vivo', href: 'https://biolinkstore.com', primary: true },
      { text: 'Código disponible a solicitud', href: '', primary: false, isCodeRequest: true },
    ],
  },

  {
    id: 'repuestosoriente',
    index: '02',
    status: 'Beta · cargando catálogo',
    statusType: 'beta',
    title: 'RepuestosOriente',
    typeLabels: ['Marketplace', 'B2B + B2C', 'Automotive'],
    description: 'Marketplace de repuestos automotrices con lógica de precios diferenciados por rol. Ecosistema de dos capas: mayoristas venden a minoristas, minoristas al público. $0/mes en producción.',
    stackPills: ['Django REST', 'React', 'Firebase', 'Supabase', 'Cloudflare R2', 'Render'],
    color: '#65c8f5',
    tag: { text: 'Marketplace · Beta', bg: 'rgba(101,200,245,0.12)', color: '#65c8f5' },
    subtitle: 'Marketplace B2B/B2C de repuestos automotrices con lógica de precios por rol, órdenes multi-vendedor y arquitectura de $0/mes en producción real.',
    problem: 'El mercado de repuestos automotrices opera fragmentado: mayoristas y minoristas trabajan en canales desconectados sin visibilidad de inventario. Este marketplace unifica la cadena de distribución con una plataforma donde los precios y el acceso cambian según el rol del comprador.',
    metrics: [
      { value: '3 roles', label: 'Tipos de usuario' },
      { value: 'B2B+B2C', label: 'Modelo de negocio' },
      { value: '$0/mes', label: 'Infra en producción' },
    ],
    diagram: <RepuestosOrienteDiagram />,
    challenges: [
      {
        num: '01',
        title: 'Soft delete con cascade manual',
        subtitle: 'Introspección de _meta · detección de ciclos · restore inverso',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Django hace hard delete por defecto. Reemplazarlo con soft delete (marcar <Code accent="#65c8f5">deleted_at</Code>) parece simple, pero el problema real es la <Strong>cascada</Strong>: cuando borras un padre, Django eliminaría los hijos con SQL. Tuve que reimplementar esa lógica en Python.</p>
            <Steps accent="#65c8f5" items={[
              ['1', <span key="1">Introspección de <Code accent="#65c8f5">_meta.related_objects</Code> para encontrar relaciones FK en runtime</span>],
              ['2', <span key="2"><Strong>CASCADE</Strong> → soft delete en cadena, <Strong>SET_NULL</Strong> → nullear el campo, <Strong>ManyToMany</Strong> → limpiar la relación</span>],
              ['3', <span key="3">Referencias circulares (A→B→A): resuelto con <Code accent="#65c8f5">_deletion_context: set()</Code> que rastrea objetos ya siendo eliminados</span>],
              ['4', <span key="4"><Code accent="#65c8f5">restore()</Code> con cascade inverso: restaurar el padre debe restaurar los hijos borrados junto con él</span>],
              ['5', <span key="5">Dos managers por modelo: <Code accent="#65c8f5">objects</Code> filtra <Code accent="#65c8f5">deleted_at__isnull=True</Code>, <Code accent="#65c8f5">all_objects</Code> sin filtro — afecta queries en todo el sistema</span>],
            ]} />
            <Note variant="info">El código más sofisticado del proyecto · también el más frágil</Note>
          </>
        ),
      },
      {
        num: '02',
        title: 'Sistema de roles multi-nivel con permisos por objeto',
        subtitle: 'Vendedor · Mayorista · Public · has_permission vs has_object_permission',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El rol de vendedor no vive en <Code accent="#65c8f5">User</Code> sino en <Code accent="#65c8f5">Profile.is_seller</Code>. Verificar si alguien puede crear un producto requiere <Code accent="#65c8f5">request.user.profile.is_seller</Code> — un JOIN implícito en cada request. Si el profile no existe por un bug de migración o registro incompleto, el sistema explota. Cada permission class necesita <Code accent="#65c8f5">hasattr(request.user, 'profile')</Code> como guardia.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El permiso opera en dos niveles distintos que DRF maneja separado:</p>
            <Steps accent="#65c8f5" items={[
              ['A', <span key="A"><Strong>Nivel vista</Strong>: ¿puede el usuario hacer esta acción en general? (<Code accent="#65c8f5">is_seller or is_staff</Code>) → <Code accent="#65c8f5">has_permission()</Code></span>],
              ['B', <span key="B"><Strong>Nivel objeto</Strong>: ¿puede operar sobre este objeto específico? (<Code accent="#65c8f5">product.seller == request.user</Code>) → <Code accent="#65c8f5">has_object_permission()</Code></span>],
            ]} />
            <p style={{ margin: '0.75rem 0 0.75rem', lineHeight: 1.75 }}>La particularidad: DRF solo llama <Code accent="#65c8f5">has_object_permission</Code> en <Strong>retrieve/update/delete</Strong>, no en list/create. Entender ese comportamiento requirió depuración — list sin filtro de objeto podría exponer productos de otros vendedores si el permiso se implementa mal.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
              {[
                { color: '#65c8f5', name: 'Mayorista', perms: ['✓ Canal B2B exclusivo', '✓ Ve otros mayoristas', '✗ Sin acceso retail'] },
                { color: '#c8f565', name: 'Minorista', perms: ['✓ Compra al mayorista', '✓ Vende al público', '✗ Sin canal mayorista'] },
                { color: '#64748b', name: 'Público', perms: ['✓ Catálogo retail', '✗ Sin B2B', '✗ Sin precios mayorista'] },
              ].map((role) => (
                <div key={role.name} style={{ background: '#0f172a', border: `1px solid #334155`, borderRadius: '10px', padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: role.color, marginBottom: '0.5rem' }}>{role.name}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.65rem' }}>
                    {role.perms.map((p) => (
                      <div key={p} style={{ color: p.startsWith('✓') ? '#86efac' : '#475569', opacity: p.startsWith('✗') ? 0.5 : 1, textDecoration: p.startsWith('✗') ? 'line-through' : 'none' }}>{p}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ),
      },
      {
        num: '03',
        title: 'Órdenes multi-vendedor con splitting atómico',
        subtitle: 'Un checkout · N órdenes · validación todo-o-nada',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El marketplace permite comprar productos de distintos vendedores en un solo checkout. Una "compra" genera <Strong>N órdenes independientes</Strong>, una por vendedor. Toda la operación vive en una transacción atómica: si cualquier validación falla, no se crean órdenes parciales.</p>
            <Steps accent="#65c8f5" items={[
              ['1', <span key="1">Agrupar productos del carrito por <Code accent="#65c8f5">product.seller.id</Code> con <Code accent="#65c8f5">defaultdict</Code></span>],
              ['2', <span key="2">Validar cada producto antes de crear nada: stock suficiente, producto no pausado, comprador ≠ vendedor del producto</span>],
              ['3', <span key="3">Crear múltiples registros <Code accent="#65c8f5">Order</Code> en una sola transacción atómica</span>],
              ['4', <span key="4"><Strong>Snapshot de precios</Strong>: el <Code accent="#65c8f5">OrderItem</Code> guarda <Code accent="#65c8f5">price</Code>, <Code accent="#65c8f5">original_price</Code> y <Code accent="#65c8f5">discount</Code> en el momento de la compra — si el vendedor cambia el precio después, la orden histórica no se ve afectada</span>],
            ]} />
            <SolutionBox label="Arquitectura aplicada" accent="#65c8f5">
              Responsabilidad única por clase: <Code accent="#65c8f5">ProductValidator</Code>, <Code accent="#65c8f5">AddressService</Code>, <Code accent="#65c8f5">OrderCreator</Code>, coordinados por <Code accent="#65c8f5">OrdersBo</Code>. Es el único módulo del proyecto con esta arquitectura — lo que se convirtió en una inconsistencia (ver retrospectiva).
            </SolutionBox>
          </>
        ),
      },
      {
        num: '04',
        title: 'Auth dual: email o username en Django',
        subtitle: 'Backend custom · cadena de autenticación · el orden importa',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Django autentica por username por defecto. Los usuarios esperan entrar con email. La solución fue un <Code accent="#65c8f5">EmailOrUsernameBackend</Code> custom registrado en <Code accent="#65c8f5">AUTHENTICATION_BACKENDS</Code>.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>El detalle crítico es el <Strong>orden de la cadena</Strong>: primero intenta por email, si no existe intenta por username. Si ambos fallan, retorna <Code accent="#65c8f5">None</Code> — no lanza excepción — para que Django continúe con el siguiente backend. Lanzar excepción cortaría la cadena e impediría que otros backends autentiquen.</p>
          </>
        ),
      },
      {
        num: '05',
        title: 'Deploy: Supabase + Render y el problema IPv6',
        subtitle: 'Network is unreachable · solución con Transaction Pooler',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Render free tier <Strong>no soporta IPv6</Strong>. El direct connection de Supabase (<Code accent="#65c8f5">db.xxx.supabase.co</Code>) resuelve a IPv6 → <Code accent="#65c8f5">Network is unreachable</Code>. Sin mensaje de error claro.</p>
            <SolutionBox accent="#65c8f5">
              Cambiar al Transaction Pooler de Supabase (<Code accent="#65c8f5">aws-1-us-east-2.pooler.supabase.com:6543</Code>) que usa IPv4, y agregar <Code accent="#65c8f5">DISABLE_SERVER_SIDE_CURSORS: True</Code> porque el Transaction Pooler no mantiene estado — el mismo patrón del pgBouncer de BioLinkStore, en un stack diferente.
            </SolutionBox>
            <Note variant="warning">Problema sin error explícito · documentación de Render y Supabase no lo menciona en conjunto</Note>
          </>
        ),
      },
    ],
    decisions: [
      {
        question: 'Django + DRF y no FastAPI',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El proyecto tiene modelo relacional complejo: usuarios, perfiles, productos, variantes, órdenes, carrito, wishlist. El <Strong>ORM de Django elimina cientos de líneas</Strong>: migraciones automáticas, permisos por objeto, filtros con django-filter y Admin panel desde el primer día.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>FastAPI gana en throughput puro, pero para un marketplace donde el tiempo de request está en queries a BD, esa diferencia no se manifiesta. Para un proyecto con constraint de tiempo, Django gana por productividad.</p>
          </>
        ),
      },
      {
        question: 'JWT propio con simplejwt y no Firebase Auth ni Auth0',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Firebase Auth y Auth0 tienen límites de <Strong>Monthly Active Users (MAU)</Strong>. Si el marketplace escala, ese costo escala con él. Un sistema JWT propio con simplejwt no tiene ese límite — 10 usuarios o 10,000 cuestan igual: $0.</p>
            <Note variant="warning">Trade-off: la gestión de tokens es responsabilidad propia. Los refresh tokens en PostgreSQL en vez de Redis es una decisión que hoy haría diferente.</Note>
          </>
        ),
      },
    ],
    afterDecisions: (
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(200,245,101,0.05)', borderBottom: '1px solid rgba(200,245,101,0.12)', padding: '0.6rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#c8f565', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: '"DM Mono", monospace' }}>//</span> Stack completo a $0/mes · cada decisión justificada
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: '#334155' }}>
          {[
            { service: 'Django + DRF', cost: '$0 · licencia BSD', why: 'ORM + permisos + admin + migraciones desde el día uno.' },
            { service: 'Supabase', cost: '$0 · 500MB DB siempre activa', why: 'PostgreSQL real con pooling incluido. Sin cold starts. RDS cobra desde día uno.' },
            { service: 'Cloudflare R2', cost: '$0 · 10GB + egress gratuito', why: 'S3 cobra por egress. Las imágenes de productos se leen mucho. R2 integra idéntico a S3Boto3.' },
            { service: 'Render', cost: '$0 · deploy automático', why: 'CI/CD con cada push a main. HTTPS incluido. Heroku eliminó su free tier en 2022.' },
            { service: 'Firebase Hosting', cost: '$0 · CDN global', why: 'SPA estática de React con CDN global. Sin configuración de infraestructura.' },
            { service: 'Whitenoise', cost: '$0 · sin CDN extra', why: 'Sirve estáticos desde Django con hash y cache agresivo. Elimina un bucket adicional.' },
          ].map((item) => (
            <div key={item.service} style={{ background: '#0f172a', padding: '0.875rem 1rem' }}>
              <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#e2e8f0', marginBottom: '0.2rem' }}>{item.service}</div>
              <div style={{ fontSize: '0.6rem', color: '#c8f565', marginBottom: '0.3rem' }}>{item.cost}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', lineHeight: 1.55 }}>{item.why}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    afterRetro: (
      <div style={{ marginTop: '0.5rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(245,101,101,0.07)', borderBottom: '1px solid rgba(245,101,101,0.18)', padding: '0.5rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#f87171' }}>
          Bug documentado · OrderItem.get_total()
        </div>
        <div style={{ padding: '0.875rem 1rem', fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.75 }}>
          <Strong>Doble división por 100.</Strong> Si <code style={{ color: '#f56565', background: 'rgba(245,101,101,0.1)', padding: '0.05rem 0.35rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '0.85em' }}>discount=20</code>, el método calcula <code style={{ color: '#f56565', background: 'rgba(245,101,101,0.1)', padding: '0.05rem 0.35rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '0.85em' }}>20/100 = 0.2</code>, luego <code style={{ color: '#f56565', background: 'rgba(245,101,101,0.1)', padding: '0.05rem 0.35rem', borderRadius: '4px', fontFamily: '"DM Mono", monospace', fontSize: '0.85em' }}>0.2/100 = 0.002</code>. El descuento aplicado es <Strong>0.2% en vez de 20%</Strong>.
          <code style={{ display: 'block', background: 'rgba(245,101,101,0.06)', border: '1px solid rgba(245,101,101,0.15)', borderRadius: '6px', padding: '0.6rem 0.8rem', margin: '0.5rem 0', fontSize: '0.7rem', color: '#f56565', fontFamily: '"DM Mono", monospace', whiteSpace: 'pre' as const }}>
def get_total(self):
    discount = self.discount / 100
    return (self.original_price * self.quantity) - (
        (self.original_price * self.quantity) * discount / 100  # ← /100 de más
    )</code>
          El método existe pero no se usa en <Code accent="#65c8f5">OrdersBo</Code> (que calcula correctamente), por lo que no afecta las órdenes reales. Es código incorrecto que podría usarse en el futuro si alguien asume que está validado.
        </div>
      </div>
    ),
    retrospective: [
      { decision: 'Soft delete con cascade manual en Python', would: <span><Strong>Hard delete normal con tabla de auditoría solo donde importa.</Strong> El soft delete causa queries lentas, puede violar constraints únicos con registros "borrados", y el restore en cascade es una operación peligrosa. Para un marketplace, el historial de órdenes ya actúa como audit trail.</span> },
      { decision: 'Profile.is_seller como campo de rol', would: <span>Mover <Code accent="#65c8f5">is_seller</Code> al modelo User directamente, o usar <Strong>django.contrib.auth.models.Group</Strong> que está diseñado exactamente para esto — sin JOINs implícitos ni riesgo de profile inexistente.</span> },
      { decision: 'price + original_price + discount como campos separados', would: <span>Un campo <Strong>price</Strong> (precio final) y <Strong>compare_at_price</Strong> (precio tachado). El descuento es un campo calculado. Nada impide que <Code accent="#65c8f5">price {'>'} original_price</Code> — la inconsistencia es silenciosa.</span> },
      { decision: 'Arquitectura BO/Service solo en el módulo Orders', would: <span>O aplicar el patrón <Strong>en todo el proyecto</Strong>, o simplificarlo a lógica en serializers/views. <Strong>La consistencia vale más que la sofisticación puntual</Strong>.</span> },
      { decision: 'Sin paginación global por defecto', would: <span><Strong>DEFAULT_PAGINATION_CLASS</Strong> en <Code accent="#65c8f5">base.py</Code> desde el primer día. Con 1000+ productos en catálogo, devolver todos los registros es un problema de rendimiento que crece solo.</span> },
    ],
    links: [
      { text: 'Ver demo', href: 'https://ecommerce-antonio-2025.web.app/', primary: true },
      { text: 'Código disponible a solicitud', href: '', primary: false, isCodeRequest: true },
    ],
  },

  {
    id: 'eaglekit',
    index: '03',
    status: 'Open Source · activo',
    statusType: 'wip',
    title: 'EagleKit',
    typeLabels: ['CLI Framework', 'Plugin System', 'DevTools'],
    description: 'CLI extensible en Python con arquitectura de plugins. Centraliza tareas repetitivas: deploys, tests, mensajes, automatizaciones y scripts de proyecto.',
    stackPills: ['Python', 'Typer', 'Rich', 'SQLite', 'importlib', 'Git hooks'],
    color: '#f5c865',
    tag: { text: 'CLI · Open Source', bg: 'rgba(245,200,101,0.12)', color: '#f5c865' },
    subtitle: 'CLI extensible con sistema de plugins, gestión de proyectos y sincronización de branches con cherry-pick. La parte más compleja fue la coordinación entre hooks de Git como procesos separados.',
    problem: 'En proyectos con múltiples entornos, flujos de deploy y scripts dispersos, el tiempo perdido en tareas repetitivas es enorme. EagleKit surgió de la frustración personal: unificar todos esos scripts en una CLI coherente, extensible y autodocumentada.',
    metrics: [
      { value: 'Plugin', label: 'Arquitectura' },
      { value: 'pip install', label: 'Distribución' },
      { value: 'SQLite', label: 'State storage' },
    ],
    diagram: <EagleKitDiagram />,
    challenges: [
      {
        num: '01',
        title: 'Coordinación entre hooks de Git como procesos separados',
        subtitle: 'commit-msg → post-commit · sin memoria compartida · tolerancia a abortos',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Añadir un prefijo <Code accent="#f5c865">[1][branch]</Code> al commit parece simple. Se convierte en un problema de coordinación entre dos procesos que <Strong>no comparten memoria</Strong>.</p>
            <div style={{ margin: '0.875rem 0', background: '#0a0f1e', border: '1px solid #334155', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '0.5rem 0.875rem', borderBottom: '1px solid #334155', fontSize: '0.65rem', color: '#64748b' }}>
                <strong style={{ color: '#f5c865' }}>Flujo real</strong> · dos procesos sin estado compartido
              </div>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', padding: '0.875rem', gap: 0 }}>
                {['commit-msg\nantes de finalizar', '→', 'usuario decide\nguarda o aborta', '→', 'post-commit\nhash disponible'].map((item, i) =>
                  item === '→' ? (
                    <span key={i} style={{ color: '#475569', padding: '0 0.5rem', fontSize: '1rem' }}>→</span>
                  ) : (
                    <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.4rem 0.6rem', fontSize: '0.7rem', textAlign: 'center' as const, flexShrink: 0, fontFamily: '"DM Mono", monospace' }}>
                      {item.split('\n').map((line, j) => (
                        <div key={j} style={{ color: j === 0 ? '#f5c865' : '#64748b' }}>{line}</div>
                      ))}
                    </div>
                  )
                )}
              </div>
              <div style={{ margin: '0 0.875rem 0.875rem', padding: '0.6rem 0.875rem', background: 'rgba(245,101,101,0.06)', border: '1px solid rgba(245,101,101,0.15)', borderRadius: '6px', fontSize: '0.78rem', color: '#94a3b8', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#f56565' }}>!</span> Si el usuario aborta después de que commit-msg ya incrementó el contador, queda un hueco. Sin diseño explícito, el estado queda corrupto.
              </div>
            </div>
            <SolutionBox accent="#f5c865">
              SQLite con <Code accent="#f5c865">INSERT ... ON CONFLICT DO UPDATE SET next_seq = next_seq + 1</Code> garantiza atomicidad. El sistema se diseñó para ser <Strong>tolerante a huecos</Strong>: los commits se identifican por <Code accent="#f5c865">logical_id</Code> (<Code accent="#f5c865">auth:3</Code>), no por secuencia consecutiva.
            </SolutionBox>
          </>
        ),
      },
      {
        num: '02',
        title: 'git config como canal de mensajes entre hooks',
        subtitle: 'Cherry-pick cross-branch · señalización entre procesos · sin archivos temporales',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Al hacer <Code accent="#f5c865">ek flow push</Code>, internamente es un <Code accent="#f5c865">git cherry-pick</Code>. El commit <Code accent="#f5c865">[3][auth-qa]</Code> en la rama destino debe ser <Code accent="#f5c865">[3][auth-prod]</Code>. El hook <Code accent="#f5c865">commit-msg</Code> tiene que decidir si es un commit nuevo o una sincronización.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', margin: '0.875rem 0' }}>
              {[
                { label: 'Descartado', name: 'ENV vars', color: '#f56565', desc: 'No sobreviven entre procesos separados.' },
                { label: 'Descartado', name: '.git/pending file', color: '#f56565', desc: 'Queda huérfano si el commit se aborta.' },
                { label: 'Solución', name: 'git config --local', color: '#c8f565', desc: 'Persistente, atómico, se limpia con config_unset.' },
              ].map(({ label, name, color, desc }) => (
                <div key={name} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '0.75rem', fontSize: '0.72rem' }}>
                  <div style={{ fontSize: '0.58rem', color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{label}</div>
                  <div style={{ color, fontWeight: 600, marginBottom: '0.25rem', fontFamily: '"DM Mono", monospace' }}>{name}</div>
                  <div style={{ color: '#64748b', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
            <Note variant="info">El mismo patrón que usan nvm, pyenv y direnv — re-descubierto por necesidad</Note>
          </>
        ),
      },
      {
        num: '03',
        title: 'post-rewrite hook para amend y rebase',
        subtitle: 'Hashes fantasma · stdin como protocolo · UPDATE atómico',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Si el usuario hace <Code accent="#f5c865">git commit --amend</Code> o <Code accent="#f5c865">git rebase</Code>, Git reescribe los hashes. Sin el <Code accent="#f5c865">post-rewrite</Code> hook, la DB tendría <Strong>hashes fantasma</Strong> que ya no existen. <Code accent="#f5c865">ek flow push</Code> intentaría cherry-pickear commits inexistentes.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>Git pasa los pares <Code accent="#f5c865">old_hash → new_hash</Code> por stdin. El hook lee línea por línea y ejecuta <Code accent="#f5c865">UPDATE commits SET hash = ? WHERE hash = ?</Code> en una transacción para cada par.</p>
            <Note variant="info">El reto que "casi se me pasa" — los edge cases del amend no aparecen en el happy path</Note>
          </>
        ),
      },
      {
        num: '04',
        title: 'Plugin loader con importlib — tres capas del problema',
        subtitle: 'Python 3.9 vs 3.10+ · carga en tiempo de import · contrato del entry point',
        body: (
          <>
            <Steps accent="#f5c865" items={[
              ['1', <span key="1"><Strong>Compatibilidad Python 3.9/3.10+</Strong>: la API cambió. En 3.10+ hay <Code accent="#f5c865">entry_points().select(group=...)</Code>, en 3.9 es un dict. Se resolvió con <Code accent="#f5c865">hasattr(eps, 'select')</Code> en runtime.</span>],
              ['2', <span key="2"><Strong>Carga en tiempo de import</Strong>: un plugin roto puede matar todo el CLI. El <Code accent="#f5c865">try/except</Code> granular hace que un plugin mal escrito muestre un warning, no un traceback de 50 líneas.</span>],
              ['3', <span key="3"><Strong>Contrato implícito del entry point</Strong>: importlib no garantiza que <Code accent="#f5c865">register_func</Code> sea callable. El check <Code accent="#f5c865">if not callable(register_func)</Code> existe porque en producción el error era <Code accent="#f5c865">'module' object is not callable</Code>.</span>],
            ]} />
            <SolutionBox label="Detalle no obvio" accent="#f5c865">
              Los mensajes del plugin loader iban a <Code accent="#f5c865">stdout</Code>. Eso rompía pipelines como <Code accent="#f5c865">ek list | grep myproject</Code>. Mover todo a <Code accent="#f5c865">Console(stderr=True)</Code> fue un cambio pequeño con impacto grande en usabilidad.
            </SolutionBox>
          </>
        ),
      },
      {
        num: '05',
        title: 'Colisión silenciosa de subcomandos en Typer',
        subtitle: 'Dos plugins · mismo nombre · el segundo gana · sin error',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Typer no detecta conflictos cuando dos plugins registran el mismo subcomando. Si dos plugins llaman <Code accent="#f5c865">app.add_typer(sub, name="flow")</Code>, el segundo sobrescribe al primero <Strong>silenciosamente</Strong>.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Esto se descubrió en testing cuando <Strong>tracker</Strong> y <Strong>mirror</Strong> eran plugins separados — si ambos se registraban como <Code accent="#f5c865">ek sync</Code>, uno desaparecía sin error ni warning. La solución fue unificarlos en un único plugin <Strong>Flow</Strong>, pero el loader todavía no tiene detección de colisiones de nombres.</p>
            <Note variant="danger">Bug latente · no afecta la instalación estándar · sí afecta plugins de terceros · está en el backlog como edge case documentado</Note>
          </>
        ),
      },
    ],
    afterChallenges: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(245,200,101,0.06)', border: '1px solid rgba(245,200,101,0.18)', borderRadius: '12px', padding: '1.125rem 1.25rem' }}>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🦅</span>
        <div style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.75 }}>
          <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#f5c865', fontSize: '0.92rem' }}>"El 80% del tiempo de debugging fue en escenarios de borde."</em>
          <br />
          <span style={{ color: '#94a3b8' }}>Diseñar para el happy path tomó un día. Diseñar para que nada se rompa cuando el usuario aborta un commit a la mitad, hace amend, o un cherry-pick conflictúa en el quinto de cinco commits — eso tomó semanas. La complejidad real de una CLI no está en los comandos sino en la resiliencia.</span>
        </div>
      </div>
    ),
    decisions: [
      {
        question: 'SQLite en vez de JSON para el Flow plugin — una migración real',
        answer: (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'center', margin: '0.875rem 0' }}>
              <div style={{ background: 'rgba(245,101,101,0.06)', border: '1px solid rgba(245,101,101,0.15)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                <div style={{ color: '#f56565', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem', fontFamily: '"DM Mono", monospace' }}>JSON (v2)</div>
                Race conditions en hooks · queries cruzadas requieren leer dos archivos · tres archivos para un push atómico
              </div>
              <div style={{ padding: '0 0.75rem', color: '#334155', fontSize: '1.2rem', textAlign: 'center' }}>→</div>
              <div style={{ background: 'rgba(200,245,101,0.06)', border: '1px solid rgba(200,245,101,0.15)', borderRadius: '8px', padding: '0.75rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                <div style={{ color: '#c8f565', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.375rem', fontFamily: '"DM Mono", monospace' }}>SQLite (actual)</div>
                WAL mode resuelve race conditions · queries cruzadas con SQL e índices · transacción única para cherry-pick
              </div>
            </div>
            <p style={{ margin: 0, lineHeight: 1.75 }}>SQLite vive en <Code accent="#f5c865">.git/eaglekit/flow.db</Code> — viene incluido en Python. Sin servidor, sin dependencia externa.</p>
          </>
        ),
      },
      {
        question: 'Plugin separado y no todo en el core',
        answer: (
          <p style={{ margin: 0, lineHeight: 1.75 }}>El core es un gestor de proyectos genérico. El tracking con cherry-pick es un flujo específico. Si estuviera en el core, cualquier usuario que solo quiere <Code accent="#f5c865">ek add .</Code> y <Code accent="#f5c865">ek list</Code> cargaría hooks Git, SQLite y lógica de cherry-pick que nunca usaría. La separación además forzó una disciplina: Flow no puede importar nada del core directamente — toda comunicación por convenciones de filesystem.</p>
        ),
      },
      {
        question: 'Dos entry points (ek y ek-core) con un wrapper shell',
        answer: (
          <p style={{ margin: 0, lineHeight: 1.75 }}>Una limitación real de Python: <Strong>no puedes hacer <Code accent="#f5c865">cd</Code> desde un subproceso</Strong>. El wrapper shell intercepta <Code accent="#f5c865">ek cd &lt;proyecto&gt;</Code>, obtiene la ruta con <Code accent="#f5c865">ek-core cd --path</Code>, y ejecuta el <Code accent="#f5c865">cd</Code> real en el shell padre. El mismo patrón que usan <Code accent="#f5c865">nvm</Code>, <Code accent="#f5c865">pyenv</Code> y <Code accent="#f5c865">direnv</Code>.</p>
        ),
      },
      {
        question: 'Clean Architecture en Flow pero no en el core',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Flow tiene <Code accent="#f5c865">domain/entities.py</Code>, <Code accent="#f5c865">application/use_cases/</Code>, <Code accent="#f5c865">infrastructure/repositories/</Code>, <Code accent="#f5c865">presentation/commands.py</Code>. El core tiene <Code accent="#f5c865">cli.py</Code> con todo.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}>La razón fue pragmática: <Strong>el core empezó como un script que creció</Strong>. Flow se diseñó desde cero ya conociendo los errores del core. La inconsistencia entre ambos es el problema real — y está documentada en la retrospectiva como la deuda técnica más importante del proyecto.</p>
          </>
        ),
      },
    ],
    retrospective: [
      { decision: 'cli.py monolítico de 2500+ líneas', would: <span>Módulos por responsabilidad: <Strong>commands/projects.py</Strong>, <Strong>commands/tasks.py</Strong>, <Strong>commands/todos.py</Strong>. Las funciones helper <Code accent="#f5c865">_load_todos()</Code>, <Code accent="#f5c865">_save_todos()</Code> en el mismo scope global hacen cualquier cambio de persistencia un ejercicio de búsqueda en 2500 líneas.</span> },
      { decision: 'Registry como Dict[str, Any] sin tipado', would: <span>Un <Strong>@dataclass Registry</Strong> con entidades tipadas. Exactamente como Flow tiene <Code accent="#f5c865">Commit</Code>, <Code accent="#f5c865">BranchLink</Code>, <Code accent="#f5c865">FlowConfig</Code>. El core debería tener el mismo nivel de modelado para su propio dominio.</span> },
      { decision: 'CREATE TABLE IF NOT EXISTS sin migraciones', would: <span>Una tabla <Strong>schema_version</Strong> y migraciones secuenciales. Sin esto, un usuario con <Code accent="#f5c865">flow.db</Code> existente nunca recibe columnas nuevas del esquema.</span> },
      { decision: 'Hooks no testeables unitariamente', would: <span><Code accent="#f5c865">commit_msg.run()</Code> recibiendo <Code accent="#f5c865">GitService</Code> y la conexión DB como parámetros. Hoy es imposible testear la lógica del hook sin un repositorio Git real.</span> },
      { decision: 'logical_id derivado del nombre de branch', would: <span>Generar el <Strong>logical_id una sola vez al crear el commit y almacenarlo</Strong>. Si cambias el sufijo de <Code accent="#f5c865">-qa</Code> a <Code accent="#f5c865">/qa</Code>, todos los IDs existentes quedan en formato mixto con los nuevos.</span> },
    ],
    links: [
      { text: 'Ver en GitHub', href: 'https://github.com/antoniojosev/eaglekit', primary: true },
    ],
  },

  {
    id: 'venekambio',
    index: '04',
    status: 'Live · app en aprobación de Play Store',
    statusType: 'live',
    title: 'Venekambio',
    typeLabels: ['Calculadora cambiaria', 'Mobile + Web', 'Multi-currency'],
    description: 'Calculadora cambiaria multi-tasa para el comerciante venezolano. Una sola entrada, todas las tasas a la vez. Construida con un presupuesto cercano a $0 y operada al mismo nivel.',
    stackPills: ['Flutter', 'Riverpod', 'Nuxt 4 SSG', 'TypeScript', 'GA4', 'CDN estático'],
    color: '#E87722',
    tag: { text: 'Calculator · Live', bg: 'rgba(232,119,34,0.12)', color: '#E87722' },
    subtitle: 'Calculadora cambiaria multi-tasa para el comerciante venezolano. Una sola entrada, todas las tasas a la vez. Sin login, sin servidor, $0/mes operativo.',
    problem: 'En cualquier establecimiento venezolano se manejan varias tasas a la vez. El comerciante informal compra mercancía a paralelo (USDT) y vende a BCV; el cliente paga en bolívares y mentalmente compara contra BCV para validar si vale la pena. Las apps existentes resuelven una conversión a la vez (A → B), obligando a repetir tres o cuatro veces. En caja, frente al cliente, ese flujo no sobrevive a la fricción real.',
    metrics: [
      { value: '$0/mes', label: 'OPEX en producción' },
      { value: '6 monedas', label: 'Multi-currency' },
      { value: 'Sin backend', label: 'Cliente puro' },
    ],
    diagram: <VenekambioDiagram />,
    challenges: [
      {
        num: '01',
        title: 'Multi-tasa simultánea — una entrada, todas las tasas en paralelo',
        subtitle: 'Snapshot inmutable · render paralelo · sin segundo tap',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Lo que parece simple — <em>"convertir Bs a USDT"</em> — se vuelve insuficiente cuando se observa cómo se hace un cálculo cambiario real en Venezuela.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El comerciante informal compra mercancía al <Strong>paralelo (USDT)</Strong> y debe vender al <Strong>BCV</Strong>, que es el dólar de referencia legal del país. Para no perder ganancia, necesita saber frente al cliente y en segundos: <em>"si cobro este precio en bolívares, ¿cuánto me queda en USDT después del cambio?"</em> — y a veces <em>"¿cuánto sería en EUR para acercar el precio a mi tasa de compra?"</em>. El cliente, por su parte, ve el precio en Bs, lo compara mentalmente contra el BCV para validar si vale la pena, y si tiene ahorros en USDT calcula cuánto debe cambiar para alcanzar ese monto. Es el <Strong>top 5 de casos de uso diario</Strong> de un cálculo cambiario en Venezuela, y ocurre en cada caja, kiosko y mercado.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Las apps existentes resuelven una conversión a la vez: A → B. Eso obliga al usuario a repetir la operación tres o cuatro veces, o a saltar entre tabs. En caja, frente al cliente, ninguno de esos flujos sobrevive a la fricción real.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>La calculadora de Venekambio no produce un resultado, produce un snapshot.</Strong> Cuando el usuario teclea un monto y elige una moneda base, el motor corre la conversión en paralelo contra las 6 monedas soportadas (Bs, BCV, EUR, MON, USDT, ETH) a partir de un mismo <Code accent="#E87722">RatesSnapshot</Code> inmutable.</p>
            <div style={{ margin: '0.875rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto' }}>
              <div style={{ color: '#64748b', marginBottom: '0.4rem' }}>// web/composables/useConvert.ts</div>
              <div><span style={{ color: '#c084fc' }}>const</span> results = currencies.map(<span style={{ color: '#65c8f5' }}>(code)</span> {'=>'}</div>
              <div>{'  '}convert(value, baseCode, code, snapshot.asRateMap())</div>
              <div>)</div>
            </div>
            <div style={{ margin: '0.5rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto' }}>
              <div style={{ color: '#64748b', marginBottom: '0.4rem' }}>// app/lib/core/conversion/convert.dart</div>
              <div><span style={{ color: '#c084fc' }}>final</span> results = visibleCodes.map(</div>
              <div>{'  '}<span style={{ color: '#65c8f5' }}>(code)</span> {'=>'} convert(value, baseCode, code, snap),</div>
              <div>).toList();</div>
            </div>
            <p style={{ margin: '0.75rem 0', lineHeight: 1.75 }}>La conversión es pura, triangulada por <Strong>Bs como pivote universal</Strong> (<Code accent="#E87722">from → Bs → to</Code>): sin estado, idempotente, replicada de forma idéntica en TypeScript (Nuxt) y Dart (Flutter). Calcular 6 resultados frente a 1 es coste computacional marginal — el coste real está en el fetch inicial de las 4 APIs públicas, que ocurre una sola vez por sesión y se mantiene en memoria.</p>
            <SolutionBox accent="#E87722">
              El usuario hace UN cálculo y ve TODAS las tasas en pantalla a la vez. Un display hero para la moneda destacada, un chip strip secundario con las otras ya calculadas. Sin scroll, sin tabs, sin segundo tap.
            </SolutionBox>
            <Note variant="warning">Trade-off: la pantalla muestra simultáneamente más números que cualquier competidor. Se compensa con jerarquía visual fuerte y filtrado opcional desde Settings — el usuario apaga las monedas que no usa.</Note>
          </>
        ),
      },
      {
        num: '02',
        title: 'Modelo Rate dual — una tasa, dos tipos de fuente',
        subtitle: 'buy/sell solo en P2P · bsPerUnit como valor canónico',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Lo que parece simple — <em>"modelar una tasa de cambio"</em> — se vuelve más interesante cuando se observa que las 6 monedas soportadas no funcionan igual.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El BCV publica un decreto del banco central: un solo número, sin spread. Lo mismo el EUR oficial y el "Monitor" paralelo. Las monedas P2P (USDT, ETH) no son números, son libros de órdenes: existe un <Strong>bid</Strong> real y un <Strong>ask</Strong> real, y la diferencia entre ambos es información útil para el usuario que va a operar.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Si el modelo trata todas las tasas igual, una de dos cosas pasa: o pierdes el spread real del P2P aplastándolo a un único promedio, o inventas un spread fantasma para el BCV donde no existe. Las dos son malas — la primera por información, la segunda por honestidad con el dato.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>La decisión fue un tipo <Code accent="#E87722">Rate</Code> único con tres lados</Strong> (<Code accent="#E87722">buy</Code>, <Code accent="#E87722">sell</Code>, <Code accent="#E87722">avg</Code>) <Strong>y un campo separado <Code accent="#E87722">bsPerUnit</Code> como valor canónico para conversión.</Strong> Para fuentes oficiales el modelo asigna <Code accent="#E87722">avg = buy = sell</Code>. Para P2P guarda <Code accent="#E87722">buy</Code> y <Code accent="#E87722">sell</Code> reales del libro y calcula <Code accent="#E87722">avg = (buy+sell)/2</Code>.</p>
            <div style={{ margin: '0.875rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre' as const }}>
              <span style={{ color: '#64748b' }}>// web/types/rate.ts</span>{'\n'}
              <span style={{ color: '#c084fc' }}>export interface</span> <span style={{ color: '#65c8f5' }}>Rate</span> {'{'}{'\n'}
              {'  '}code: <span style={{ color: '#65c8f5' }}>CurrencyCode</span>      <span style={{ color: '#475569' }}>// 'BS' | 'BCV' | 'EUR' | 'USDT' | 'ETH' | 'MON'</span>{'\n'}
              {'  '}bsPerUnit: <span style={{ color: '#65c8f5' }}>number</span>       <span style={{ color: '#475569' }}>// Valor canónico para conversión</span>{'\n'}
              {'  '}buy: <span style={{ color: '#65c8f5' }}>number</span>             <span style={{ color: '#475569' }}>// Bid real (P2P) o avg (oficial)</span>{'\n'}
              {'  '}sell: <span style={{ color: '#65c8f5' }}>number</span>            <span style={{ color: '#475569' }}>// Ask real (P2P) o avg (oficial)</span>{'\n'}
              {'  '}avg: <span style={{ color: '#65c8f5' }}>number</span>{'\n'}
              {'  '}history7d: <span style={{ color: '#65c8f5' }}>number</span>[]{'\n'}
              {'  '}timestamp: <span style={{ color: '#65c8f5' }}>number</span>{'\n'}
              {'}'}
            </div>
            <div style={{ margin: '0.5rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre' as const }}>
              <span style={{ color: '#64748b' }}>// app/lib/domain/entities/rate.dart</span>{'\n'}
              <span style={{ color: '#c084fc' }}>enum</span> <span style={{ color: '#65c8f5' }}>RateSide</span> {'{ buy, sell, avg }'}{'\n\n'}
              <span style={{ color: '#c084fc' }}>class</span> <span style={{ color: '#65c8f5' }}>Rate</span> {'{'}{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>final</span> <span style={{ color: '#65c8f5' }}>double</span> bsPerUnit;{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>final</span> <span style={{ color: '#65c8f5' }}>double</span> buy, sell, avg;{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>final</span> List{'<'}<span style={{ color: '#65c8f5' }}>double</span>{'>'} history7d;{'\n\n'}
              {'  '}<span style={{ color: '#65c8f5' }}>double</span> valueFor(<span style={{ color: '#65c8f5' }}>RateSide</span> side) ={'>'}{'\n'}
              {'      '}side == RateSide.buy ? buy{'\n'}
              {'      '}: side == RateSide.sell ? sell : avg;{'\n'}
              {'}'}
            </div>
            <p style={{ margin: '0.75rem 0', lineHeight: 1.75 }}>Encima del modelo va <Strong>Bs como pivote universal</Strong>. Toda conversión triangula <Code accent="#E87722">from → Bs → to</Code> usando <Code accent="#E87722">bsPerUnit</Code>. Esto evita una matriz n×n de pares (6 monedas serían 30 conversiones); con un solo valor por moneda contra Bs basta. Cinco líneas, sin estado, idempotente, con guard contra <Code accent="#E87722">division by zero</Code> cuando una tasa falla en su fetch.</p>
            <SolutionBox accent="#E87722">
              El modelo respeta cómo funciona cada fuente real (P2P con spread, oficial sin spread) sin pretender uniformidad falsa. La conversión queda triangulada en una función pura replicada idéntica entre TypeScript (Nuxt) y Dart (Flutter).
            </SolutionBox>
            <Note variant="warning">Trade-off: el código de conversión está duplicado entre Dart y TS. Un package compartido cross-language sería overkill — exigiría build pipeline solo para 5 líneas y rompería $0 OPEX. El campo <Code accent="#E87722">history7d</Code> hoy es un placeholder hasta tener fuente con histórico real (ver retrospectiva).</Note>
          </>
        ),
      },
      {
        num: '03',
        title: 'Diseño para baja literacia digital',
        subtitle: 'Sin login · sin formularios · números siempre legibles',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Lo que parece simple — <em>"una calculadora de tasas"</em> — se vuelve un problema de diseño cuando el usuario no es un dev probando una herramienta, sino un comerciante de mercado que nunca ha instalado una app antes.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El público objetivo en Venezuela tiene tres rasgos que no son negociables al diseñar: <Strong>resistencia previa a herramientas digitales</Strong>, <Strong>baja experiencia con interfaces</Strong>, y en muchos casos <Strong>dificultad para leer textos largos</Strong>. Una app pensada para developers y otra pensada para este usuario son dos productos distintos. Cualquier paso de fricción — un onboarding de tres pantallas, un formulario de registro, un menú anidado — es razón suficiente para que el usuario cierre la app y no vuelva.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Las decisiones de producto se tomaron con ese filtro:</p>
            <Steps accent="#E87722" items={[
              ['1', <span key="1"><Strong>Sin login, sin cuentas, sin onboarding.</Strong> El usuario abre la app y la primera pantalla es la calculadora con tasas ya cargadas. Todo el estado vive local: <Code accent="#E87722">SharedPreferences</Code> en Flutter, <Code accent="#E87722">localStorage</Code> en Nuxt. Cero fricción de entrada y $0 de OPEX en servicios de auth.</span>],
              ['2', <span key="2"><Strong>Sin formularios complejos.</Strong> No hay textfields para "introducir el monto"; hay un keypad numérico grande directo bajo el display. El módulo de Pago Móvil (4 datos: banco, cédula, teléfono, nombre) tampoco usa validaciones que interrumpan.</span>],
              ['3', <span key="3"><Strong>Números siempre legibles.</Strong> El display hero parte de 64 px en app y <Code accent="#E87722">clamp(38px, 4.5vw, 52px)</Code> responsive en web, y baja por escala (0.82× y 0.7× como piso) cuando el resultado se alarga. Nunca queda truncado.</span>],
              ['4', <span key="4"><Strong>Tap targets ≥ 44 × 44 px</Strong> (52 × 52 en "Modo grande" opcional). Es el mínimo que documenta WCAG 2.5.5 Target Size y que aplican Material Design y Apple HIG. Tiene base normativa, no es decisión arbitraria.</span>],
              ['5', <span key="5"><Strong>Contraste AA garantizado por paleta.</Strong> Los tokens base (<Code accent="#E87722">ink #1A1613</Code> sobre <Code accent="#E87722">bg #FAF6F0</Code>) cumplen WCAG AA antes de elegir componentes. Se eligió ya cumpliendo, no se "validó después".</span>],
            ]} />
            <div style={{ margin: '0.875rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre' as const }}>
              <span style={{ color: '#64748b' }}>// app/lib/presentation/widgets/display_number.dart</span>{'\n'}
              <span style={{ color: '#c084fc' }}>static</span> <span style={{ color: '#65c8f5' }}>double</span> scaleFor(<span style={{ color: '#65c8f5' }}>String</span> formatted) {'{'}{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>final</span> len = formatted.length;{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>if</span> (len {'>'} 12) <span style={{ color: '#c084fc' }}>return</span> 0.7;{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>if</span> (len {'>'} 9) <span style={{ color: '#c084fc' }}>return</span> 0.82;{'\n'}
              {'  '}<span style={{ color: '#c084fc' }}>return</span> 1;{'\n'}
              {'}'}
            </div>
            <SolutionBox accent="#E87722">
              La app no exige al usuario aprender nada para que el primer cálculo sea exitoso. Abre, teclea, ve el resultado en todas las tasas a la vez. Cero pasos previos, cero registros, cero menús que descubrir.
            </SolutionBox>
            <Note variant="info">Trade-off: la interfaz tiene menos features visibles que un competidor convencional. No hay historial gráfico, alertas push, social features ni perfil. Es deliberado — cada feature adicional es una superficie nueva que el usuario tiene que aprender. Tutorial educativo, ayuda con videos y tasa manual están en Roadmap v1.</Note>
          </>
        ),
      },
      {
        num: '04',
        title: 'Sin backend — 4 APIs paralelas con fallback graceful',
        subtitle: 'Cliente puro frente a fuentes inestables · privacy by design',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Lo que parece simple — <em>"mostrar las tasas de cambio actuales"</em> — se vuelve interesante cuando se observa que las tasas no vienen de una fuente, vienen de cuatro, ninguna controlada por mí, ninguna con SLA público:</p>
            <Steps accent="#E87722" items={[
              ['•', <span key="a"><Code accent="#E87722">ve.dolarapi.com/v1/cotizaciones</Code> → BCV USD oficial, EUR oficial</span>],
              ['•', <span key="b"><Code accent="#E87722">ve.dolarapi.com/v1/dolares/paralelo</Code> → Monitor (MON)</span>],
              ['•', <span key="c"><Code accent="#E87722">criptoya.com/api/binancep2p/USDT/VES/1</Code> → USDT P2P</span>],
              ['•', <span key="d"><Code accent="#E87722">criptoya.com/api/binancep2p/ETH/VES/1</Code> → ETH P2P</span>],
            ]} />
            <p style={{ margin: '0.875rem 0 0.75rem', lineHeight: 1.75 }}>La construcción tradicional sería un backend propio que agregue las cuatro fuentes, las normalice, las cachee y exponga un único endpoint estable. Pero ese backend significa un servidor 24/7, pipeline de deploy, capa de auth/rate-limiting, DB para histórico, y por encima de todo: <Strong>OPEX recurrente</Strong>. Para una app cuyo público objetivo es venezolano y de bajo poder adquisitivo, ese costo recurrente convierte al producto en algo que necesita monetizarse para sobrevivir, y la monetización agrega más fricción al que menos puede asumirla.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>La decisión fue eliminar el backend completo.</Strong> El cliente — tanto la app Flutter como el landing Nuxt — consume las 4 APIs directamente, en paralelo, en cada apertura.</p>
            <div style={{ margin: '0.875rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.875rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre' as const }}>
              <span style={{ color: '#64748b' }}>// app/lib/data/repositories/remote_rates_repository.dart</span>{'\n'}
              <span style={{ color: '#c084fc' }}>final</span> results = <span style={{ color: '#c084fc' }}>await</span> Future.wait([{'\n'}
              {'  '}_safeGet(_dolarApiCotizaciones),{'\n'}
              {'  '}_safeGet(_dolarApiParalelo),{'\n'}
              {'  '}_safeGet(_criptoyaUsdt),{'\n'}
              {'  '}_safeGet(_criptoyaEth),{'\n'}
              ], eagerError: <span style={{ color: '#f5c865' }}>false</span>);
            </div>
            <p style={{ margin: '0.75rem 0', lineHeight: 1.75 }}><Code accent="#E87722">_safeGet</Code> envuelve cada fetch en <Code accent="#E87722">try/catch</Code> con timeout de 5 s y devuelve <Code accent="#E87722">null</Code> si la fuente falla, sin propagar el error al resto. Si BCV cae pero USDT responde, el snapshot llega con USDT poblado y BCV en <Code accent="#E87722">0</Code> — la UI marca la moneda sin tasa como deshabilitada en vez de mostrar un error de pantalla completa.</p>
            <SolutionBox accent="#E87722">
              Sin backend significa $0 de OPEX, privacy by design (no hay servidor recolectando ni perfilando peticiones), y sin punto único de falla — si una API cae, las otras siguen sirviendo al usuario. La latencia inicial al primer cálculo es ligeramente más alta que con un endpoint cacheado, pero el fetch ocurre una sola vez por sesión y se mantiene en memoria.
            </SolutionBox>
            <Note variant="warning">Trade-off: sin retry automático ni exponential backoff (decisión consciente — un retry largo es peor que un valor 0 con toggle visible para reintentar). Sin sincronización cross-user. Sin offline mode robusto si la primera apertura falla por completo.</Note>
          </>
        ),
      },
      {
        num: '05',
        title: 'APK directo desde el dominio oficial',
        subtitle: 'Distribución paralela mientras la app pasa review · sin servidor adicional',
        body: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Lo que parece simple — <em>"publicar la app en Google Play"</em> — se vuelve un problema de timing cuando se mira el calendario real: la app está actualmente en periodo de aprobación de la Play Store, y ese proceso puede tomar días o semanas. Mientras tanto, el landing ya está live, los usuarios potenciales ya están entrando, y necesitan una vía concreta para usar la app desde el primer día.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Necesitaba un canal paralelo que cumpliera dos cosas: <Strong>cubrir la ventana de espera de la review</Strong>, y <Strong>mantenerse después como alternativa permanente</Strong> al canal de Play Store una vez la aprobación llegue.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>La decisión fue servir el APK directo desde el dominio oficial.</Strong> El archivo vive como static asset en el build de Nuxt:</p>
            <div style={{ margin: '0.5rem 0', background: '#060c16', border: '1px solid #334155', borderRadius: '10px', padding: '0.7rem 1rem', fontFamily: '"DM Mono", monospace', fontSize: '0.72rem', color: '#E87722' }}>
              /web/public/downloads/venekambio-latest.apk
              <span style={{ color: '#475569', marginLeft: '0.875rem' }}>(49 MB)</span>
            </div>
            <p style={{ margin: '0.75rem 0', lineHeight: 1.75 }}>URL pública estable: <Code accent="#E87722">venekambio.com/downloads/venekambio-latest.apk</Code>. Servido por el mismo CDN/hosting estático que el landing — sin servidor adicional, sin pipeline aparte. La confianza viene del dominio: <Code accent="#E87722">venekambio.com</Code> es la marca que el usuario ya está visitando, no un repositorio de terceros.</p>
            <SolutionBox accent="#E87722">
              Distribución inmediata desde el día uno, sin esperar review, $0 de infraestructura adicional, y un canal de fallback permanente. Cuando la app esté aprobada en Play Store, el APK directo sigue disponible para los usuarios que prefieran descargar fuera de la tienda o que estén en regiones con menos cobertura del store oficial.
            </SolutionBox>
            <Note variant="warning">Trade-off: el usuario tiene que activar "Instalar desde fuentes desconocidas" la primera vez. Sin auto-update OTA — al liberar v1.1, el usuario regresa a la web a descargar el nuevo APK. La versión visible en UI ("Android · v1.0") hoy está hardcodeada — el chequeo de versión, la detección Android automática y el flujo de auto-update están en Roadmap v1.</Note>
          </>
        ),
      },
    ],
    afterChallenges: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: 'rgba(232,119,34,0.06)', border: '1px solid rgba(232,119,34,0.18)', borderRadius: '12px', padding: '1.125rem 1.25rem' }}>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🇻🇪</span>
        <div style={{ fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.75 }}>
          <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#E87722', fontSize: '0.92rem' }}>"En caja, frente al cliente, el flujo no sobrevive a la fricción real."</em>
          <br />
          <span style={{ color: '#94a3b8' }}>Cada decisión técnica del producto pasa por el mismo filtro: <strong style={{ color: '#e2e8f0' }}>¿esto sirve a un comerciante venezolano que necesita ver cuatro tasas en dos segundos?</strong> Si la respuesta no es directa, la decisión está mal planteada.</span>
        </div>
      </div>
    ),
    decisions: [
      {
        question: '¿Por qué Flutter para la app móvil?',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>La app tenía dos requisitos no negociables: tiene que sentirse fluida en hardware modesto (muchos usuarios venezolanos usan dispositivos económicos), y tiene que cubrir Android <Strong>e iOS</Strong> desde una sola codebase porque mantener dos plataformas nativas paralelas es OPEX que rompe el principio de $0.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>Nativo</Strong> (Kotlin + Swift) quedó descartado por costo: dos codebases, dos ciclos de release, dos sets de bugs. Para un equipo de uno, no es sostenible.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>React Native</Strong> fue una opción viable. Lo descarté por dos razones: el bridge JS añade overhead que se nota en hardware modesto (justo el segmento de mi público objetivo), y la UI de Venekambio depende fuertemente de control fino sobre tipografía, escalas dinámicas y micro-animaciones — cosas que se pueden hacer en RN, pero con más fricción que en Flutter, donde cada widget es propio y no se traduce a <Code accent="#E87722">UIView</Code> o <Code accent="#E87722">ViewGroup</Code> debajo.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}><Strong>Flutter ganó</Strong> por compilación AOT a binario nativo (rendimiento sostenido en teléfonos económicos), un set de widgets propio que da control total sobre la jerarquía visual, y experiencia previa propia con el stack — no estaba aprendiendo el stack a la par del proyecto.</p>
            <Note variant="warning">Trade-off: la app pesa 49 MB, más que su equivalente RN o nativo. Para distribución vía APK directo es algo a vigilar, pero el peso viene del engine de Flutter incluido en el binario y es coste fijo de la decisión, no algo que crezca con features.</Note>
          </>
        ),
      },
      {
        question: '¿Por qué Nuxt 4 SSG en lugar de SPA o SSR?',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>El landing tenía tres metas claras: rankear en buscadores en consultas como <em>"calculadora BCV"</em> o <em>"cambio Bs USDT"</em>, cargar rápido en redes venezolanas (que no siempre son las más estables), y respetar el principio de <Strong>$0 OPEX</Strong>.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>SPA quedó descartado</Strong> por SEO. Una SPA sirve HTML vacío al primer load y depende de JavaScript ejecutado en cliente para renderizar el contenido. Los crawlers manejan JS, sí, pero con latencias y tasas de éxito menores que para HTML estático. Para un producto que necesita encontrarse orgánicamente, dejar el SEO al azar del JS rendering no es opción.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>SSR fue la otra alternativa real.</Strong> La descarté por una razón directa: SSR requiere servidor 24/7, y eso rompe $0 OPEX. No hay contenido server-side personalizado que justifique pagar un servidor — las tasas se fetchean del lado cliente y no hay datos privados del usuario que requieran render protegido.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}><Strong>SSG ganó</Strong> porque combina las dos mejores propiedades de las otras opciones sin sus costos: HTML pre-rendereado en build (SEO óptimo, TTFB mínimo) servido por CDN gratuito (Netlify, Cloudflare Pages), y reactividad cliente para la calculadora interactiva — que no necesita pre-rendering porque depende de input de usuario en tiempo real.</p>
            <Note variant="warning">Trade-off: el contenido marketing del landing solo se actualiza al re-buildear y re-deployar. Para una página con cambios mensuales, no diarios, es coste aceptable y se compensa con CI automático en Netlify cuando hay push a <Code accent="#E87722">main</Code>.</Note>
          </>
        ),
      },
      {
        question: '¿Por qué dos stacks (Dart + TS) en lugar de unificar?',
        answer: (
          <>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}>Existían tres caminos para no tener stack dual: hacerlo todo en Flutter (incluyendo Flutter Web para el landing), hacerlo todo en TypeScript (con una PWA como app móvil), o mantener stacks separados.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>Flutter Web para el landing</Strong> se descartó por SEO. Flutter Web renderiza por defecto con CanvasKit, que pinta pixels sobre canvas en vez de generar DOM real — los crawlers ven una página vacía. El renderer alternativo HTML genera DOM, pero el bundle inicial sigue siendo pesado y el TTI no compite con un landing SSG plano. Para una superficie cuyo trabajo principal es ser encontrada, Flutter Web pierde.</p>
            <p style={{ margin: '0 0 0.75rem', lineHeight: 1.75 }}><Strong>PWA en lugar de app nativa</Strong> se descartó por dos cosas. Primero, PWA en Android sigue teniendo limitaciones reales en storage local, integración con el launcher y performance en hardware modesto. Segundo, una PWA exige al usuario "agregar a pantalla de inicio" desde el navegador para que aparezca como app — para alguien con baja experiencia digital, ese paso adicional es la misma fricción que un onboarding largo. La app nativa simplemente aparece en el launcher después de instalar el APK.</p>
            <p style={{ margin: 0, lineHeight: 1.75 }}><Strong>Stack dual ganó</Strong> porque cada superficie usa la herramienta que mejor le sienta: Flutter para móvil donde control fino sobre la UI y rendimiento AOT importan, Nuxt SSG para web donde SEO y velocidad de carga importan.</p>
            <Note variant="warning">Trade-off: la lógica de conversión se replica en Dart y TS (5 líneas, sin estado, idempotente). Un package compartido cross-language sería overkill — exigiría build pipeline solo para mantener sincronizadas 5 líneas, y rompe $0 OPEX. La duplicación es deuda consciente y barata.</Note>
          </>
        ),
      },
    ],
    decisionsNote: (
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
        background: 'rgba(232,119,34,0.04)',
        border: '1px solid rgba(232,119,34,0.12)',
        borderRadius: '0.75rem',
        padding: '1rem 1.125rem',
        fontSize: '0.8rem',
        color: '#94a3b8',
        lineHeight: 1.75,
      }}>
        <span style={{ color: '#E87722', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', flexShrink: 0, paddingTop: '0.15rem', letterSpacing: '0.05em' }}>//</span>
        <span>La decisión transversal que articula este case study es eliminar OPEX recurrente. Cada decisión arquitectónica que viene a continuación se evaluó también con el filtro: <strong style={{ color: '#e2e8f0', fontWeight: 600 }}>"¿esto exige un servicio mensual?"</strong>. Si la respuesta era sí y existía alternativa razonable, se optó por la alternativa.</span>
      </div>
    ),
    afterDecisions: (
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(232,119,34,0.05)', borderBottom: '1px solid rgba(232,119,34,0.12)', padding: '0.6rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#E87722', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: '"DM Mono", monospace' }}>//</span> Stack completo a $0/mes · cada decisión justificada
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1px', background: '#334155' }}>
          {[
            { service: 'Hosting web', cost: '$0 · CDN estático', why: 'Nuxt 4 SSG → HTML pre-rendereado servido por Netlify/Cloudflare Pages free tier. Sin servidor 24/7.' },
            { service: 'Backend', cost: '$0 · no existe', why: 'Cliente puro. Las 4 APIs públicas se consumen directo desde Flutter y Nuxt en cada apertura.' },
            { service: 'Base de datos', cost: '$0 · local', why: 'SharedPreferences en Flutter, localStorage en Nuxt. Settings e historial viven en el dispositivo del usuario.' },
            { service: 'Tasas FX', cost: '$0 · APIs públicas', why: 'dolarapi.com (BCV, EUR, MON) y criptoya.com (USDT P2P, ETH P2P). Sin auth, sin API key.' },
            { service: 'Distribución móvil', cost: '$0 · static asset', why: 'APK servido desde /public/downloads/ del propio landing. Sin Play Store fee mientras pasa review.' },
            { service: 'Analytics', cost: '$0 · GA4 free', why: 'Plugin Nuxt cliente con DNT respetado y anonymize_ip. Solo en producción.' },
            { service: 'Auth / cuentas', cost: '$0 · no existe', why: 'No hay login, no hay perfiles. Toda la fricción de auth eliminada por diseño.' },
          ].map((item) => (
            <div key={item.service} style={{ background: '#0f172a', padding: '0.875rem 1rem' }}>
              <div style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#e2e8f0', marginBottom: '0.2rem' }}>{item.service}</div>
              <div style={{ fontSize: '0.6rem', color: '#E87722', marginBottom: '0.3rem' }}>{item.cost}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', lineHeight: 1.55 }}>{item.why}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0.7rem 1rem', borderTop: '1px solid #334155', background: 'rgba(232,119,34,0.03)', fontSize: '0.7rem', color: '#64748b', lineHeight: 1.6 }}>
          Único costo recurrente: el dominio <Code accent="#E87722">venekambio.com</Code> (~$10/año vía registrar). El resto del stack opera permanentemente en tiers gratuitos sin techo de uso relevante para el tamaño actual del producto.
        </div>
      </div>
    ),
    retrospective: [
      { decision: 'history7d publicado en UI como placeholder (7 copias del avg)', would: <span><Strong>No exponerlo en UI hasta tener el dato real.</Strong> Esconder un placeholder visual en producto vivo crea expectativa que el dato no cumple — preferible no mostrar el chart de 7 días que mostrar uno plano que no informa.</span> },
      { decision: 'Versión del APK hardcodeada como string en UI ("Android · v1.0")', would: <span>Leer del <Code accent="#E87722">versionName</Code> del Android manifest en build time. Hoy hay <Strong>riesgo de drift</Strong> entre lo que la UI muestra y la versión efectivamente instalada — es trivial de causar y silencioso de detectar.</span> },
      { decision: 'Función convert() y modelo Rate sin tests unitarios', would: <span>Agregarlos <Strong>desde el primer commit</Strong>. Es código puro, idempotente y triangulado por Bs — el caso ideal para tests automatizados. Hoy depende de validación manual en UI, que escala mal cuando se sumen más monedas o lados (<Code accent="#E87722">buy/sell/avg</Code>).</span> },
    ],
    afterRetro: (
      <div style={{ marginTop: '0.5rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(232,119,34,0.07)', borderBottom: '1px solid rgba(232,119,34,0.18)', padding: '0.5rem 1rem', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#E87722', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: '"DM Mono", monospace' }}>//</span> Roadmap v1 / v2 · deuda consciente y evolución natural
        </div>
        <div style={{ padding: '0.5rem 0' }}>
          {[
            { v: 'v1', name: 'Tutorial wizard educativo (app + landing)', why: 'Cada capa adicional debía esperar a que el producto probara primero su valor mínimo. Con uso real en mano, la curva de descubrimiento se atenderá explícitamente.' },
            { v: 'v1', name: 'Sección de ayuda con videos + imágenes claras', why: 'Contenido pedagógico para baja literacia digital exige formato visual (video, ilustraciones) y storytelling. Se construye con cuidado o no se construye.' },
            { v: 'v1', name: 'Tasa manual configurable o API personalizada', why: 'Las 4 APIs públicas cubren los casos comunes. La tasa manual resuelve casos avanzados (comerciantes con tasa interna propia) y habilita integraciones futuras.' },
            { v: 'v1', name: 'history7d real desde fuente con histórico', why: 'Implementado como placeholder hasta encontrar fuente pública que exponga histórico real sin romper $0 OPEX.' },
            { v: 'v1', name: 'Detección Android automática para promo de descarga', why: 'Hoy el botón de descarga es siempre visible; la detección de UA permite resaltarlo en mobile Android y ocultarlo en iOS / desktop. Esfuerzo bajo, UX más afinada.' },
            { v: 'v1', name: 'GA tracking en la app (hoy solo web)', why: 'La implementación dual exige cuidado con client_id consistente entre superficies para correlacionar el embudo landing → APK descargado → app abierta.' },
            { v: 'v2', name: 'Auto-update OTA del APK', why: 'Hoy el usuario regresa a la web a descargar. Auto-update vía in-app update API requiere canal propio o servicio externo — se evalúa contra el principio de $0 OPEX.' },
          ].map((item) => (
            <div key={item.name} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: '0.75rem', padding: '0.625rem 1rem', borderTop: '1px solid rgba(51,65,85,0.5)' }}>
              <span style={{ fontSize: '0.62rem', fontFamily: '"DM Mono", monospace', color: item.v === 'v1' ? '#E87722' : '#94a3b8', background: item.v === 'v1' ? 'rgba(232,119,34,0.1)' : 'rgba(148,163,184,0.08)', borderRadius: '4px', padding: '0.15rem 0.4rem', textAlign: 'center', alignSelf: 'flex-start', marginTop: '0.1rem', height: 'fit-content' }}>{item.v}</span>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.2rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.55 }}>{item.why}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid #334155', fontSize: '0.68rem', color: '#64748b', lineHeight: 1.6, fontStyle: 'italic' }}>
          La priorización v1 vs v2 responde a impacto en la experiencia del usuario nuevo, no al esfuerzo técnico. Tutorial, ayuda visual y tasa manual entran primero porque atacan la fricción específica del público objetivo.
        </div>
      </div>
    ),
    links: [
      { text: 'Ver web', href: 'https://www.venekambio.com', primary: true },
      { text: 'Descargar APK', href: 'https://www.venekambio.com/downloads/venekambio-latest.apk', primary: false },
    ],
  },
];
