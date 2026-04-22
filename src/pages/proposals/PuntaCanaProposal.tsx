import { useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ClipboardList,
  Download,
  Linkedin,
  Mail,
  MessageCircle,
  Ship,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { track } from '../../lib/track';

const PDF_PATH = '/Propuesta-PuntaCana-AntonioVila.pdf';
const SOURCE   = 'proposal-puntacana';

const VALIDITY = '22 May 2026';

function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const prevTitle = document.title;
    document.title = 'Propuesta · Punta Cana — Antonio Vila';
    return () => {
      document.head.removeChild(meta);
      document.title = prevTitle;
    };
  }, []);
}

export default function PuntaCanaProposal() {
  useNoIndex();

  useEffect(() => {
    track(SOURCE, 'view');
  }, []);

  return (
    <div className="min-h-dvh bg-[#0a0a0b] text-[#e8e8ec] font-sans antialiased">
      <HeroSection />
      <ResumenSection />
      <EntendimientoSection />
      <StackSection />
      <MatchingSection />
      <AlcanceSection />
      <TimelineSection />
      <InversionSection />
      <CasosSection />
      <PorqueYoSection />
      <FaqSection />
      <ContactoSection />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col justify-between border-b border-white/5 px-6 py-16 md:px-12 md:py-20 print:min-h-0 print:justify-start"
    >
      <div className="mx-auto mb-20 flex w-full max-w-5xl flex-col items-start md:mb-12 print:mb-6">
        <div className="inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border border-teal-400/30 bg-teal-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-teal-400 md:text-[11px]">
          <span className="size-1.5 shrink-0 rounded-full bg-teal-400" aria-hidden />
          <span className="md:hidden">Privada · Hasta {VALIDITY}</span>
          <span className="hidden md:inline">Propuesta privada · Válida hasta {VALIDITY}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-[#6b6b7a]">
            <span>01 · Propuesta</span>
            <span className="size-1 rounded-full bg-[#6b6b7a]" aria-hidden />
            <span>por <span className="text-[#e8e8ec]">Antonio Vila</span></span>
          </div>
          <h1 className="text-balance font-serif text-5xl font-light leading-[1.05] md:text-7xl lg:text-8xl">
            Plataforma de Reservas
            <br />
            <span className="italic text-teal-400">embarcaciones</span> · Punta Cana
          </h1>
          <p className="text-pretty mt-8 max-w-2xl text-lg text-[#a0a0a8] md:text-xl">
            De prototipo a producción en 3–4 semanas. Arquitectura que escala
            sin explotar costos — Supabase, Vercel y serverless con infra
            inicial cercana a cero.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-4">
          <HeroStat label="Stack"       value="Supabase + Vercel" />
          <HeroStat label="Timeline"    value="3–4 semanas"        sub="full-time" />
          <HeroStat label="Inversión"   value="desde $3,500"       sub="USD fijo" />
          <HeroStat label="Infra mes 1" value="~$25"               sub="Supabase Pro" />
        </div>

        <div className="text-sm text-[#6b6b7a]">
          Preparada para quien publicó el brief de{' '}
          <span className="text-[#e8e8ec]">alquiler de embarcaciones en Punta Cana</span>
          {' '}— full stack senior con 6+ años construyendo SaaS en producción.
        </div>
      </div>

      <div className="no-print mx-auto mt-12 flex w-full max-w-5xl items-center gap-3 font-mono text-xs uppercase tracking-wider text-[#6b6b7a]">
        <ArrowDown className="size-3.5" aria-hidden />
        Seguir leyendo
      </div>
    </section>
  );
}

// ─── Resumen (02) ─────────────────────────────────────────────────────────────

const COMMITMENTS = [
  {
    title: 'Código tuyo desde día 1',
    body:  'Repo en tu cuenta de GitHub, acceso compartido desde el kickoff.',
  },
  {
    title: 'Pagos 40 · 30 · 30',
    body:  '40% al arrancar · 30% al cerrar matching · 30% al deploy final.',
  },
  {
    title: '2 semanas de soporte',
    body:  'Bug fixes post-launch incluidos en el precio Core.',
  },
  {
    title: 'Calls semanales de 30 min',
    body:  'Avance real con demo navegable — no status reports por escrito.',
  },
  {
    title: 'Infra a tu nombre',
    body:  'Supabase, Vercel, dominio y credenciales — todo queda tuyo.',
  },
  {
    title: 'Entrega transferible',
    body:  'Docs + 1h de walkthrough en video. Otro dev senior retoma sin fricción.',
  },
];

function ResumenSection() {
  return (
    <section
      id="resumen"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          02 · De un vistazo
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Seis compromisos concretos
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Lo que diferencia esta propuesta de "alguien que te hace una web":
          reglas claras y accountability desde el kickoff.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <Check className="size-4 shrink-0 text-teal-400" aria-hidden />
                <div className="font-serif text-lg text-[#e8e8ec]">
                  {c.title}
                </div>
              </div>
              <p className="text-pretty text-sm text-[#a0a0a8]">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Entendimiento del brief (03) ─────────────────────────────────────────────

const UNDERSTOOD = [
  'Prototipo 80% listo en HTML/CSS/JS → se mantiene y extiende, no se reescribe',
  'Quiz-based matching ya existe en el frontend → evaluamos en la call si se refactoriza o se mueve a backend',
  'Sistema de leads de doble camino: email automático al cliente + notificación interna (email o WhatsApp)',
  'Preferencia serverless → Supabase + Vercel encaja natural, sin overhead de infra',
  'Migración a React es opcional — solo si aporta arquitectura, no por moda',
  'Buscas criterio técnico, no ejecución pura — eso define cómo trabajo',
];

const OBSERVATIONS = [
  '"Evaluar la lógica de matching" puede ir desde revisar lo existente hasta rediseñarla — calibramos en la call viendo el código real.',
  'No mencionas pagos — asumo lead capture, no reservas automáticas. Si quieres booking real con disponibilidad y Stripe, está como add-on modular.',
  'Punta Cana atrae turismo internacional — si inglés ya está en el prototipo o lo necesitas pronto, multiidioma vale desde el inicio.',
];

function EntendimientoSection() {
  return (
    <section
      id="entendimiento"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          03 · Lo que leí
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Tu brief en mis palabras
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Lo leo como un prototipo probado que necesita backend real, lógica
          de recomendación sólida y operación diaria — no una web, un sistema.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
              Lo que entendí
            </div>
            <ul className="mt-6 space-y-4">
              {UNDERSTOOD.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-[#e8e8ec]">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
                  <span className="text-pretty">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-teal-400/30 bg-teal-400/[0.04] p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
                Para validar en la call
              </div>
              <ul className="mt-5 space-y-4">
                {OBSERVATIONS.map((o) => (
                  <li
                    key={o}
                    className="text-pretty text-sm text-[#a0a0a8]"
                  >
                    <span className="mr-2 text-teal-400" aria-hidden>—</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-[#0a0a0b] p-5">
      <div className="font-mono text-[10px] uppercase tracking-wider text-[#6b6b7a]">
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl font-light tabular-nums text-[#e8e8ec] md:text-3xl">
        {value}
      </div>
      {sub && (
        <div className="mt-1 text-xs text-[#6b6b7a]">
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── Stack (04) ───────────────────────────────────────────────────────────────

const STACK = [
  {
    category:  'Frontend',
    name:      'HTML/CSS/JS existente',
    reasoning: 'No reinventar lo que ya funciona. El prototipo validó la UX — mantenerlo libera tiempo para lo que sí mueve la aguja (backend + matching).',
    discarded: 'Full rewrite a Next.js: innecesario para un prototipo probado. Queda como add-on modular si luego aporta arquitectura.',
  },
  {
    category:  'Backend + DB',
    name:      'Supabase',
    reasoning: 'Postgres real, RLS para seguridad por fila, Auth, Storage y Edge Functions en una sola capa. Costos predecibles, sin lock-in severo (es Postgres estándar).',
    discarded: 'Airtable: no escala con matching ni multi-tenancy. Firebase: Firestore no relacional complica el modelo de embarcaciones con atributos variables.',
  },
  {
    category:  'Emails transaccionales',
    name:      'Resend',
    reasoning: 'API limpia, templates en React, deliverability alta. Gratis hasta 3,000 emails/mes, luego $20/mes.',
    discarded: 'SendGrid: UI legacy y más caro a volumen bajo. AWS SES: setup de dominio toma más tiempo y no aporta a este scope.',
  },
  {
    category:  'WhatsApp',
    name:      'Business Cloud API (Meta)',
    reasoning: 'Oficial de Meta, API directa, templates aprobables. Gratis hasta 1,000 conversaciones/mes — suficiente para volumen inicial de leads.',
    discarded: 'Twilio: cobra desde el primer mensaje. Sobrecoste innecesario hasta que el volumen justifique migrar.',
  },
  {
    category:  'Deploy',
    name:      'Vercel',
    reasoning: 'SSL auto, previews por branch, edge network global, dominio custom sencillo. Integración nativa con Next.js si luego migramos.',
    discarded: 'Netlify: equivalente técnicamente, pero Vercel tiene ventaja si escalamos el frontend. Self-host: overhead que no aporta a este tamaño.',
  },
];

function StackSection() {
  return (
    <section
      id="stack"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          04 · Stack propuesto
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Cinco decisiones con criterio
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Cada pieza tiene un porqué y una alternativa que consideré y
          descarté. Sin moda, sin overhead.
        </p>

        <ul className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {STACK.map((item) => (
            <li
              key={item.name}
              className="grid gap-4 py-8 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
                  {item.category}
                </div>
                <div className="mt-2 font-serif text-2xl font-light text-[#e8e8ec]">
                  {item.name}
                </div>
              </div>
              <div>
                <p className="text-pretty text-sm text-[#e8e8ec]">
                  {item.reasoning}
                </p>
                <p className="text-pretty mt-3 text-xs text-[#6b6b7a]">
                  <span className="font-mono uppercase tracking-wider text-[#6b6b7a]">
                    Descartado:{' '}
                  </span>
                  {item.discarded}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Matching (05) ────────────────────────────────────────────────────────────

const MATCHING_INPUTS = [
  {
    Icon:     ClipboardList,
    title:    'Quiz',
    subtitle: 'Respuestas del usuario',
  },
  {
    Icon:     Ship,
    title:    'Embarcaciones',
    subtitle: 'Catálogo en Supabase',
  },
  {
    Icon:     SlidersHorizontal,
    title:    'Pesos',
    subtitle: 'Ajustables desde admin',
  },
];

const ENGINE_STEPS = [
  'Normaliza respuestas en vector de features',
  'Hard filter: capacidad · fecha · precio',
  'Scoring ponderado por dimensión',
  'Ranking + fallback si no hay match',
];

const DIMENSIONS = [
  { name: 'Capacidad',          weight: 0.25, note: 'Hard filter + exactitud' },
  { name: 'Presupuesto',        weight: 0.20, note: 'Hard filter + proximidad' },
  { name: 'Tipo de embarcación', weight: 0.20, note: 'Yate / lancha / catamarán' },
  { name: 'Duración',           weight: 0.15, note: 'Horas o día completo' },
  { name: 'Actividades',        weight: 0.15, note: 'Snorkel · pesca · fiesta · tour' },
  { name: 'Nivel de lujo',      weight: 0.05, note: 'Tie-breaker' },
];

function MatchingSection() {
  return (
    <section
      id="matching"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          05 · Lógica de matching
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Scoring transparente, pesos ajustables
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          No es "recomendación mágica con IA". Es un pipeline auditable
          que puedes explicar al cliente y ajustar sin tocar código.
        </p>

        {/* Architecture diagram */}
        <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-12">
          {/* Inputs row — horizontal stacked on mobile, grid on desktop */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {MATCHING_INPUTS.map(({ Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 md:flex-col md:gap-0 md:p-5 md:text-center"
              >
                <Icon
                  className="size-5 shrink-0 text-[#a0a0a8] md:mx-auto md:size-6"
                  aria-hidden
                />
                <div className="md:mt-3">
                  <div className="font-serif text-base text-[#e8e8ec] md:text-lg">
                    {title}
                  </div>
                  <div className="text-xs text-[#6b6b7a] md:mt-1">
                    {subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Converge arrow */}
          <div className="my-6 flex justify-center">
            <ArrowDown className="size-6 text-teal-400" aria-hidden />
          </div>

          {/* Engine box */}
          <div className="mx-auto max-w-xl rounded-2xl border border-teal-400/40 bg-teal-400/[0.06] p-6 md:p-8">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="size-4 text-teal-400" aria-hidden />
              <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
                Matching Engine
              </div>
            </div>
            <ol className="mt-5 space-y-2.5">
              {ENGINE_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-[#e8e8ec]">
                  <span className="font-mono tabular-nums text-teal-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-pretty">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Output arrow */}
          <div className="my-6 flex justify-center">
            <ArrowDown className="size-6 text-teal-400" aria-hidden />
          </div>

          {/* Output box */}
          <div className="mx-auto max-w-xl rounded-xl border border-white/5 bg-white/[0.02] p-5 text-center">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
              Output
            </div>
            <div className="mt-2 font-serif text-xl text-[#e8e8ec]">
              5 mejores matches + por qué te los recomendamos
            </div>
            <div className="mt-3 font-mono text-xs text-[#a0a0a8]">
              "Cabe tu grupo de 8 · dentro de tu presupuesto · ideal para snorkel"
            </div>
          </div>
        </div>

        {/* Dimensions table */}
        <div className="mt-10">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Dimensiones y pesos por defecto
          </div>
          <p className="mt-2 max-w-2xl text-sm text-[#a0a0a8]">
            Punto de partida razonable. Cada peso editable en milisegundos
            desde el panel admin — cambio efectivo sin redeploy.
          </p>
          <ul className="mt-6 divide-y divide-white/5 border-y border-white/5">
            {DIMENSIONS.map((d) => (
              <li
                key={d.name}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-3 md:grid-cols-[1fr_auto_1fr]"
              >
                <span className="text-sm text-[#e8e8ec]">{d.name}</span>
                <span className="font-mono tabular-nums text-sm text-teal-400">
                  {d.weight.toFixed(2)}
                </span>
                <span className="col-span-2 text-xs text-[#6b6b7a] md:col-span-1 md:text-right">
                  {d.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Extensibility callout */}
        <div className="mt-8 rounded-2xl border border-teal-400/30 bg-teal-400/[0.04] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
            Extensible
          </div>
          <p className="text-pretty mt-3 text-sm text-[#a0a0a8]">
            Con telemetría de conversión (quiz → reserva) los pesos pueden
            ajustarse con datos reales. A/B testing básico sobre el scoring
            aumenta el match rate con el tiempo, sin cambios de código.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Alcance (06) ─────────────────────────────────────────────────────────────

const ENTREGABLES = [
  'Repositorio GitHub con código y README',
  'Schema Supabase: embarcaciones, leads, quiz_responses, matching_config, admin_users',
  'Integración del quiz existente con la DB',
  'Admin panel: CRUD de embarcaciones + editor de pesos del matching',
  'Flujo de leads end-to-end (submit → DB → email al cliente → notificación interna)',
  'Deploy en Vercel con dominio configurado + SSL',
  'Variables de entorno documentadas en un runbook',
  'Walkthrough de 1h grabado en video (cómo operar el admin y qué hacer cuando algo falla)',
];

const FUERA_DE_CORE = [
  { name: 'Sistema de pagos (Stripe)',        note: 'Core = lead capture, no reservas con pago. Add-on: +$800.' },
  { name: 'Calendario de disponibilidad',      note: 'Core usa disponible/no boolean. Add-on: +$600.' },
  { name: 'Migración completa a Next.js',      note: 'Se mantiene el frontend actual. Add-on: +$1,200.' },
  { name: 'Multiidioma ES / EN',              note: 'Site queda en español. Add-on: +$400.' },
  { name: 'Login/auth para usuarios finales',  note: 'Solo lead capture, no cuenta de usuario.' },
  { name: 'Rediseño visual o nueva UX',       note: 'Trabajo sobre el diseño existente sin modificarlo.' },
  { name: 'Contenido (fotos, textos, datos)',  note: 'Lo proveés tú. Yo integro lo que me pases.' },
  { name: 'Compra del dominio',                note: 'Lo compras a tu nombre; yo configuro DNS + SSL.' },
];

const CHANGE_ORDER_RULES = [
  'Cualquier ajuste fuera del scope de Core entra como change order',
  'Rate: $45 USD/hora, con estimación previa por escrito antes de ejecutar',
  'Mínimo 2h por change order (overhead de contexto + testing)',
  'Aprobación por email/WhatsApp antes de tocar código',
  'Solicitudes pequeñas de un mismo sprint se bundlean en un solo change order',
];

function AlcanceSection() {
  return (
    <section
      id="alcance"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          06 · Alcance
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Qué entrego, qué no, cómo manejamos cambios
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Claridad desde el día uno. Sin ambigüedades que se traduzcan en
          discusiones a mitad del proyecto.
        </p>

        {/* Two-column: entregables vs fuera de core */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {/* Entregables */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
            <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
              Entregables Core
            </div>
            <p className="mt-2 text-sm text-[#a0a0a8]">
              Lo que recibes al cierre del proyecto.
            </p>
            <ul className="mt-6 space-y-3">
              {ENTREGABLES.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-[#e8e8ec]">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
                  <span className="text-pretty">{e}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fuera de Core */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
              Fuera de Core
            </div>
            <p className="mt-2 text-sm text-[#a0a0a8]">
              Lo que <span className="text-[#e8e8ec]">no</span> construyo —
              disponible como add-on modular si lo necesitas.
            </p>
            <ul className="mt-6 space-y-4">
              {FUERA_DE_CORE.map((f) => (
                <li key={f.name}>
                  <div className="text-sm text-[#e8e8ec]">{f.name}</div>
                  <div className="text-pretty mt-1 text-xs text-[#6b6b7a]">
                    {f.note}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Change orders */}
        <div className="mt-12 rounded-2xl border border-teal-400/30 bg-teal-400/[0.04] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
            Cambios durante el desarrollo
          </div>
          <p className="mt-3 max-w-2xl text-sm text-[#a0a0a8]">
            Los proyectos vivos generan solicitudes nuevas. Reglas claras para
            que no se vuelvan fricción:
          </p>
          <ul className="mt-6 space-y-3">
            {CHANGE_ORDER_RULES.map((r) => (
              <li key={r} className="flex gap-3 text-sm text-[#e8e8ec]">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
                <span className="text-pretty">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline (07) ────────────────────────────────────────────────────────────

const SPRINTS = [
  {
    n:          1,
    title:      'Fundaciones',
    week:       'Semana 1',
    tasks: [
      'Kickoff + acceso a repos y servicios',
      'Supabase: schema, RLS, migrations',
      'Integración del frontend existente con la DB',
      'Sistema de leads: submit → DB → email automático (Resend)',
      'Gestión de WhatsApp Business Cloud (verification Meta arranca aquí)',
    ],
    deliverable: 'El quiz guarda leads y dispara email automático al cliente.',
  },
  {
    n:          2,
    title:      'Matching + Admin',
    week:       'Semana 2',
    tasks: [
      'Lógica de matching completa (normalize, filter, score, fallback)',
      'Panel admin: CRUD de embarcaciones',
      'Editor de pesos del matching en tiempo real',
      'Notificaciones internas (email + WhatsApp) con template diferenciado',
    ],
    deliverable: 'El quiz devuelve top 5 con razones. Admin puede editar embarcaciones y ajustar pesos.',
  },
  {
    n:          3,
    title:      'Deploy + Handover',
    week:       'Semana 3',
    tasks: [
      'QA end-to-end + refinamiento de edge cases',
      'Deploy producción en Vercel, dominio + SSL',
      'Runbook: env vars, cómo operar el admin, qué hacer si falla',
      'Walkthrough grabado de 1h',
    ],
    deliverable: 'Site en producción. Tú sabes operarlo sin mí.',
  },
];

const TIMELINE_ASSUMPTIONS = [
  'Feedback tuyo en 24–48h durante el desarrollo',
  'Acceso al prototipo actual desde el kickoff',
  'Gestión de WhatsApp Business Cloud iniciada en sprint 1 (Meta verification 1–3 días)',
  'Contenido (fotos y datos de embarcaciones) disponible antes de sprint 3',
  'Bloqueantes del lado cliente extienden el timeline proporcionalmente — se comunica en la call semanal',
];

function TimelineSection() {
  return (
    <section
      id="timeline"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          07 · Timeline
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          3–4 semanas full-time · 5–6 part-time
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Entrega incremental en tres sprints. Cada sprint cierra con un
          entregable funcional que se puede demo en la call semanal.
        </p>

        {/* Sprint cards */}
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {SPRINTS.map((s) => (
            <li
              key={s.n}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
                  Sprint {String(s.n).padStart(2, '0')}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
                  {s.week}
                </div>
              </div>
              <div className="mt-3 font-serif text-2xl font-light text-[#e8e8ec]">
                {s.title}
              </div>

              <ul className="mt-6 space-y-2.5">
                {s.tasks.map((t) => (
                  <li key={t} className="flex gap-2.5 text-xs text-[#a0a0a8]">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-teal-400/60" aria-hidden />
                    <span className="text-pretty">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/5 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#6b6b7a]">
                  Entregable
                </div>
                <p className="text-pretty mt-1 text-xs text-[#e8e8ec]">
                  {s.deliverable}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Assumptions box */}
        <div className="mt-10 rounded-2xl border border-teal-400/30 bg-teal-400/[0.04] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
            Supuestos del timeline
          </div>
          <p className="mt-3 max-w-2xl text-sm text-[#a0a0a8]">
            Este calendario asume condiciones estándar de un proyecto
            colaborativo. Si no se cumplen, el timeline se extiende
            proporcionalmente — transparente, sin renegociación.
          </p>
          <ul className="mt-6 space-y-3">
            {TIMELINE_ASSUMPTIONS.map((a) => (
              <li key={a} className="flex gap-3 text-sm text-[#e8e8ec]">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
                <span className="text-pretty">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Inversión ────────────────────────────────────────────────────────────────

const CORE_BULLETS = [
  'Supabase: schema, RLS, integración con el frontend existente',
  'Sistema de leads: DB + email automático + notificación interna (WhatsApp Cloud API)',
  'Lógica de matching completa con pesos ajustables desde panel',
  'Admin CRUD de embarcaciones (campos básicos + disponibilidad boolean)',
  'Deploy Vercel con dominio, SSL y previews por branch',
  'Documentación + 1 hora de walkthrough en video',
  '2 semanas de soporte post-launch (bug fixes, no features nuevas)',
];

const FULL_BULLETS = [
  'Todo lo de Core',
  'Calendario de disponibilidad por embarcación',
  'Sistema de pagos con Stripe',
  'Migración completa a Next.js (SSR, rutas dinámicas)',
  'Multiidioma ES / EN con detección automática',
];

const ADDONS = [
  { name: 'Calendario de disponibilidad',      price: '+$600'   },
  { name: 'Sistema de pagos con Stripe',        price: '+$800'   },
  { name: 'Migración completa a Next.js',       price: '+$1,200' },
  { name: 'Multiidioma ES / EN',                price: '+$400'   },
];

const INFRA = [
  { name: 'Supabase Pro',         cost: '~$25/mes',  note: 'Recomendado desde día 1 (free tier auto-pausa tras 7 días)' },
  { name: 'Vercel Hobby',         cost: '$0',        note: 'Pro $20/mes si necesitas analytics de equipo' },
  { name: 'Resend',               cost: '$0',        note: 'Hasta 3,000 emails/mes' },
  { name: 'WhatsApp Business Cloud', cost: '$0',     note: 'Hasta 1,000 conversaciones/mes' },
  { name: 'Dominio',              cost: '~$15/año',  note: 'Pagado directo por ti, no por mí' },
];

function InversionSection() {
  return (
    <section
      id="inversion"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          08 · Inversión
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Dos formas de cerrar
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Paquete fijo por proyecto o por hora. Ambos incluyen repo desde día
          uno, documentación completa y 2 semanas de soporte post-launch.
        </p>

        {/* Tier cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <TierCard
            tier="Core"
            price="$3,500"
            sub="USD fijo · scope del brief"
            bullets={CORE_BULLETS}
          />
          <TierCard
            tier="Full Stack"
            price="$6,000"
            sub="USD fijo · todo incluido"
            bullets={FULL_BULLETS}
            emphasized
          />
        </div>

        {/* Add-ons */}
        <div className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Add-ons modulares
          </div>
          <p className="mt-2 max-w-xl text-sm text-[#a0a0a8]">
            Si prefieres Core y sumar solo lo que necesites — puedes mezclar cualquier combinación.
          </p>
          <ul className="mt-6 divide-y divide-white/5">
            {ADDONS.map((a) => (
              <li
                key={a.name}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="text-[#e8e8ec]">{a.name}</span>
                <span className="font-mono tabular-nums text-teal-400">
                  {a.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hourly alternative */}
        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Alternativa por hora
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-serif text-3xl font-light tabular-nums">
              $45 <span className="text-xl text-[#6b6b7a]">USD/hora</span>
            </span>
            <span className="font-mono text-sm tabular-nums text-[#a0a0a8]">
              Estimado 75–90h = $3,375 – $4,050
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm text-[#6b6b7a]">
            Preferible si prevés cambios de alcance durante el desarrollo. Cap
            de 100h sin aprobación previa por escrito.
          </p>
        </div>

        {/* Flexibility box */}
        <div className="mt-6 rounded-2xl border border-teal-400/30 bg-teal-400/[0.04] p-6 md:p-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-teal-400">
            Flexibilidad
          </div>
          <dl className="mt-6 space-y-6">
            <FlexRule
              title="Ajusto scope, no rate"
              body="Si tienes un budget fijo, dime el número y armo el paquete que cabe — con prioridades claras y lo que queda para una fase 2."
            />
            <FlexRule
              title="Timeline extendido = descuento real"
              body="Si puedes esperar 6–8 semanas en vez de 3, bajo 10–15% porque puedo intercalar con otros proyectos."
            />
            <FlexRule
              title="Milestone mínimo: $2,800"
              body="Debajo de eso el scope ya no es coherente con el tier senior que ofrezco. Si tu budget es menor, probablemente necesitas otro perfil."
            />
          </dl>
        </div>

        {/* Infra costs */}
        <div className="mt-12">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Costos de infraestructura (pagados directo por ti)
          </div>
          <ul className="mt-4 divide-y divide-white/5 border-t border-white/5">
            {INFRA.map((i) => (
              <li
                key={i.name}
                className="flex flex-col gap-1 py-3 text-sm md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#e8e8ec]">{i.name}</span>
                  <span className="font-mono tabular-nums text-teal-400">
                    {i.cost}
                  </span>
                </div>
                <span className="text-xs text-[#6b6b7a] md:max-w-sm md:text-right">
                  {i.note}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TierCard({
  tier,
  price,
  sub,
  bullets,
  emphasized = false,
}: {
  tier: string;
  price: string;
  sub: string;
  bullets: string[];
  emphasized?: boolean;
}) {
  const border = emphasized ? 'border-teal-400/40' : 'border-white/5';
  const bg     = emphasized ? 'bg-teal-400/[0.04]' : 'bg-white/[0.02]';
  return (
    <div className={`rounded-2xl border ${border} ${bg} p-6 md:p-8`}>
      <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
        {tier}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-5xl font-light tabular-nums md:text-6xl">
          {price}
        </span>
      </div>
      <div className="mt-1 text-sm text-[#6b6b7a]">{sub}</div>

      <ul className="mt-8 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3 text-sm text-[#e8e8ec]">
            <Check className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
            <span className="text-pretty">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlexRule({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <dt className="font-serif text-lg text-[#e8e8ec]">{title}</dt>
      <dd className="text-pretty mt-1 text-sm text-[#a0a0a8]">{body}</dd>
    </div>
  );
}

// ─── Casos de estudio (09) ────────────────────────────────────────────────────

const CASOS = [
  {
    id:          'biolinkstore',
    name:        'BioLinkStore',
    tags:        ['SaaS', 'Multi-tenant', 'eCommerce'],
    description: 'Plataforma SaaS que convierte un link en una tienda. Diseñado para vendedores en LATAM que necesitan presencia digital sin fricción técnica ni inversión inicial.',
    metrics: [
      { value: '< 5min',       label: 'Setup time' },
      { value: 'Multi-tenant', label: 'Arquitectura' },
      { value: '3',            label: 'Clientes en pipeline' },
    ],
    stack:  ['Next.js', 'NestJS', 'Supabase', 'Prisma', 'Vercel', 'Koyeb'],
    href:   '/#case/biolinkstore',
  },
  {
    id:          'repuestosoriente',
    name:        'RepuestosOriente',
    tags:        ['Marketplace', 'B2B + B2C', 'Automotive'],
    description: 'Marketplace de repuestos automotrices con lógica de precios diferenciados por rol. Ecosistema de dos capas: mayoristas venden a minoristas, minoristas al público.',
    metrics: [
      { value: '3 roles',  label: 'Tipos de usuario' },
      { value: 'B2B + B2C', label: 'Modelo de negocio' },
      { value: '$0/mes',   label: 'Infra en producción' },
    ],
    stack:  ['Django REST', 'React', 'Firebase', 'Supabase', 'Cloudflare R2', 'Render'],
    href:   '/#case/repuestosoriente',
  },
];

function CasosSection() {
  return (
    <section
      id="casos"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          09 · Casos de estudio
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Dos sistemas que construí con el mismo enfoque
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Arquitectura serverless con infra cercana a $0 no es teoría.
          Productos reales en producción — yo los diseñé, los construí y los
          mantengo. Cada uno tiene un caso de estudio completo con
          problema, arquitectura, decisiones técnicas y retrospectiva.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CASOS.map((c) => (
            <CaseCard key={c.id} caso={c} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs text-[#6b6b7a]">
          Los casos de estudio viven en mi portafolio principal y abren en
          pestaña nueva — volvés a la propuesta sin perder tu lugar.
        </p>
      </div>
    </section>
  );
}

function CaseCard({
  caso,
}: {
  caso: (typeof CASOS)[number];
}) {
  return (
    <a
      href={caso.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(SOURCE, 'case_click', { case: caso.id })}
      className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-150 hover:border-teal-400/40 md:p-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {caso.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#a0a0a8]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 font-serif text-3xl font-light text-[#e8e8ec]">
            {caso.name}
          </div>
        </div>
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#a0a0a8] transition-colors duration-150 group-hover:border-teal-400/60 group-hover:text-teal-400"
          aria-hidden
        >
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Description */}
      <p className="text-pretty mt-5 text-sm text-[#a0a0a8]">
        {caso.description}
      </p>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {caso.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
          >
            <div className="font-serif text-base font-light tabular-nums text-teal-400">
              {m.value}
            </div>
            <div className="mt-1 text-[10px] leading-tight text-[#6b6b7a]">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Stack pills */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/5 pt-5">
        {caso.stack.map((s) => (
          <span
            key={s}
            className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-[#6b6b7a]"
          >
            {s}
          </span>
        ))}
      </div>

      {/* CTA label */}
      <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-teal-400">
        Abrir caso de estudio
        <ArrowUpRight className="size-3" aria-hidden />
      </div>
    </a>
  );
}

// ─── Por qué yo (10) ──────────────────────────────────────────────────────────

const RELEVANCIA = [
  {
    from:  'Red social deportiva con streaming en vivo',
    title: 'Matching con scoring ponderado',
    body:  'Pipeline de recomendación bajo alta concurrencia: features de usuario, scoring multi-dimensional, ranking en tiempo real. La misma arquitectura base del quiz de Punta Cana.',
  },
  {
    from:  'BioLinkStore — SaaS multi-tenant',
    title: 'Admin panels + CRUD por vertical',
    body:  'Paneles diferenciados para 4 tipos de negocio, cada uno con flujos de conversión propios. El CRUD de embarcaciones + editor de pesos es el mismo patrón.',
  },
  {
    from:  'RepuestosOriente — marketplace B2B/B2C',
    title: 'Lógica diferenciada por rol',
    body:  'Permisos y pricing que cambian según el usuario. Base sólida si luego quieres precios por temporada, canal o tipo de cliente.',
  },
];

const PRINCIPIOS = [
  {
    title: 'Comunicación proactiva',
    body:  'Te aviso antes de bloquearme, no al día siguiente. Si algo no está claro, pregunto el mismo día — no acumulo dudas para la call.',
  },
  {
    title: 'Sin overengineering',
    body:  'No construyo lo que no pediste. No agrego abstracciones para casos que no existen. YAGNI aplicado con criterio.',
  },
  {
    title: 'Documentar mientras construyo',
    body:  'El runbook se actualiza cada sprint, no el último día. En la handover no hay sorpresas ni "déjame buscar dónde quedó esto".',
  },
  {
    title: 'Ownership después del deploy',
    body:  'El proyecto es tuyo desde el día uno. Mi trabajo es dejarte con capacidad de operarlo sin mí — incluso si otro dev lo retoma.',
  },
];

function PorqueYoSection() {
  return (
    <section
      id="porque"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          10 · Por qué yo
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Senior que piensa, propone y ejecuta
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          6+ años construyendo SaaS, marketplaces y sistemas con lógica de
          recomendación en producción. Foco en arquitectura que escala sin
          explotar costos y código que el siguiente dev puede retomar sin
          fricción.
        </p>

        {/* Relevance cards */}
        <div className="mt-14">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Experiencia directamente aplicable
          </div>
          <p className="mt-2 max-w-2xl text-sm text-[#a0a0a8]">
            No hablo de "lo que he aprendido" — hablo de patrones que ya
            construí y están corriendo en producción.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {RELEVANCIA.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="font-mono text-[10px] uppercase tracking-wider text-teal-400">
                  De — {r.from}
                </div>
                <div className="mt-4 font-serif text-xl font-light text-[#e8e8ec]">
                  {r.title}
                </div>
                <p className="text-pretty mt-3 text-sm text-[#a0a0a8]">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Principles */}
        <div className="mt-14">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
            Cómo trabajo
          </div>
          <p className="mt-2 max-w-2xl text-sm text-[#a0a0a8]">
            Cuatro principios concretos, no adjetivos vacíos.
          </p>
          <dl className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
            {PRINCIPIOS.map((p) => (
              <div
                key={p.title}
                className="border-l-2 border-teal-400/60 pl-5"
              >
                <dt className="font-serif text-lg text-[#e8e8ec]">
                  {p.title}
                </dt>
                <dd className="text-pretty mt-2 text-sm text-[#a0a0a8]">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ (11) ─────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: '¿Cuándo puedes empezar?',
    a: 'Si cierras esta semana, arranco el lunes siguiente. Tengo capacidad para tomar un proyecto de este scope sin conflicto con otros compromisos activos.',
  },
  {
    q: '¿Trabajas con contrato?',
    a: 'Siempre. Un acuerdo por escrito (PDF firmado) con scope, milestones, precio, propiedad del código y condiciones de cancelación. Lo redacto yo, lo revisas, y solo entonces se paga el primer milestone.',
  },
  {
    q: '¿Cómo se maneja el pago?',
    a: 'Preferencia: cripto (Binance Pay, USDT o USDC) — más rápido, menos fricción de divisas, ideal para LatAm y Caribe. Segunda opción: USD vía Wise o transferencia internacional. Otros métodos se pueden acordar mutuamente; la única excepción es PayPal. Los milestones 40 · 30 · 30 protegen a ambas partes: yo no arranco sin primer pago, tú no pagas todo sin ver entregables.',
  },
  {
    q: '¿Quién es dueño del código y de los servicios?',
    a: 'Tú, desde el pago final. El repo vive en tu cuenta de GitHub desde el día uno, y los servicios (Supabase, Vercel, dominio) están a tu nombre también. Lo que pagas es mi tiempo; lo que queda es 100% tuyo.',
  },
  {
    q: '¿Qué pasa después de las 2 semanas de soporte incluido?',
    a: 'Soporte extendido disponible a $45 USD/hora en bloques de 10h. Alternativa: tomás el código y lo operás con tu equipo — la documentación y el walkthrough están diseñados exactamente para eso.',
  },
  {
    q: '¿Y si quiero cambiar de dev a mitad del proyecto?',
    a: 'Handover clean, sin candados técnicos. Código en GitHub desde día uno, runbook actualizado cada sprint, arquitectura documentada. Pagas lo entregado hasta ese punto y tomás el código. Zero lock-in.',
  },
];

function FaqSection() {
  return (
    <section
      id="faq"
      className="border-b border-white/5 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-teal-400">
          11 · Preguntas frecuentes
        </div>
        <h2 className="text-balance font-serif text-4xl font-light md:text-5xl">
          Lo que normalmente preguntan
        </h2>
        <p className="text-pretty mt-6 max-w-2xl text-[#a0a0a8]">
          Respuestas directas a las preguntas que cualquier cliente serio se
          hace antes de cerrar. Si falta alguna, va a la call.
        </p>

        <dl className="mt-12 divide-y divide-white/5 border-y border-white/5">
          {FAQ.map((item) => (
            <div key={item.q} className="grid gap-3 py-7 md:grid-cols-[1fr_2fr] md:gap-10">
              <dt className="font-serif text-lg font-light text-[#e8e8ec] md:text-xl">
                {item.q}
              </dt>
              <dd className="text-pretty text-sm text-[#a0a0a8]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ─── Contacto (12) ────────────────────────────────────────────────────────────

const WA_MESSAGE = 'Hola Antonio, vi tu propuesta de Punta Cana y me interesa conversar.';

const CONTACT_CARDS = [
  {
    Icon:    MessageCircle,
    label:   'WhatsApp',
    display: '+58 412 583 4984',
    href:    `https://wa.me/584125834984?text=${encodeURIComponent(WA_MESSAGE)}`,
    cta:     'Abrir WhatsApp',
  },
  {
    Icon:    Mail,
    label:   'Email',
    display: 'vila.antoniojose@gmail.com',
    href:    `mailto:vila.antoniojose@gmail.com?subject=${encodeURIComponent('Propuesta Punta Cana')}`,
    cta:     'Escribir email',
  },
  {
    Icon:    Linkedin,
    label:   'LinkedIn',
    display: '/in/antonio-vila',
    href:    'https://www.linkedin.com/in/antonio-vila/',
    cta:     'Conectar',
  },
];

function ContactoSection() {
  return (
    <section id="contacto" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="font-mono text-xs uppercase tracking-wider text-teal-400">
          12 · Contacto
        </div>
        <h2 className="text-balance mt-4 font-serif text-5xl font-light leading-[1.05] md:text-7xl lg:text-8xl">
          Hablemos.
        </h2>
        <p className="text-pretty mt-8 max-w-2xl text-lg text-[#a0a0a8] md:text-xl">
          Elige el canal que prefieras. Respondo en máximo 24h —
          normalmente el mismo día.
        </p>

        {/* Contact cards */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {CONTACT_CARDS.map((c) => (
            <ContactCard key={c.label} {...c} />
          ))}
        </div>

        {/* PDF download */}
        <div className="no-print mt-10 flex flex-col items-start gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
              Offline / para archivo
            </div>
            <div className="mt-1 max-w-md text-sm text-[#a0a0a8]">
              Descarga la propuesta completa como PDF para revisarla luego
              o compartirla con tu equipo.
            </div>
          </div>
          <a
            href={PDF_PATH}
            download
            onClick={() => track(SOURCE, 'pdf_download')}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/[0.06] px-5 py-3 font-mono text-xs uppercase tracking-wider text-teal-400 transition-colors duration-150 hover:bg-teal-400/[0.12]"
          >
            <Download className="size-4" aria-hidden />
            Descargar PDF
          </a>
        </div>

        {/* Aside info row */}
        <div className="mt-14 grid gap-8 border-t border-white/5 pt-10 md:grid-cols-3">
          <AsideItem label="Validez"             value={`Hasta ${VALIDITY}`} />
          <AsideItem label="Zona horaria"        value="GMT−4 · Venezuela" />
          <AsideItem label="Tiempo de respuesta" value="Máx. 24h" />
        </div>

        {/* Sign-off */}
        <div className="mt-14 border-t border-white/5 pt-10">
          <div className="font-serif text-3xl font-light text-[#e8e8ec] md:text-4xl">
            Antonio Vila
          </div>
          <div className="mt-1 text-sm text-[#a0a0a8]">
            Full Stack Senior
          </div>
          <a
            href="https://antoniovila.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-teal-400 hover:underline"
          >
            antoniovila.dev
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  Icon,
  label,
  display,
  href,
  cta,
}: {
  Icon:    React.ElementType;
  label:   string;
  display: string;
  href:    string;
  cta:     string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(SOURCE, 'contact_click', { channel: label.toLowerCase() })}
      className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors duration-150 hover:border-teal-400/40 md:p-8"
    >
      <Icon
        className="size-6 text-[#a0a0a8] transition-colors duration-150 group-hover:text-teal-400"
        aria-hidden
      />
      <div className="mt-5 font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
        {label}
      </div>
      <div className="mt-2 break-all font-serif text-lg text-[#e8e8ec] md:text-xl">
        {display}
      </div>
      <div className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-teal-400">
        {cta}
        <ArrowUpRight className="size-3" aria-hidden />
      </div>
    </a>
  );
}

function AsideItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-wider text-[#6b6b7a]">
        {label}
      </div>
      <div className="mt-2 text-sm text-[#e8e8ec]">{value}</div>
    </div>
  );
}

