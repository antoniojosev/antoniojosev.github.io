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
];
