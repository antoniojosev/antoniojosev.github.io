import React, { useEffect, useState, useCallback } from 'react';
import { X, ExternalLink, ChevronDown } from 'lucide-react';
import type { ProjectData } from './projectsData';
import CodeRequestModal from './CodeRequestModal';

interface ProjectPanelProps {
  project: ProjectData | null;
  onClose: () => void;
}

// Dark variant of the portfolio palette — mirrors bg-slate-900 block in Contact section
const BG      = '#0f172a'; // slate-900
const SURFACE = '#1e293b'; // slate-800
const BORDER  = '#334155'; // slate-700
const TEXT    = '#f1f5f9'; // slate-100
const MUTED   = '#94a3b8'; // slate-400
const MUTED2  = '#64748b'; // slate-500

// ─── Section label — same visual weight as portfolio's small badge labels ──────

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
      />
      <span
        className="text-xs font-medium tracking-widest uppercase"
        style={{ color: MUTED, letterSpacing: '0.12em' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  );
}

function PanelSection({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <SectionLabel label={label} color={color} />
      {children}
    </section>
  );
}

// ─── Panel ────────────────────────────────────────────────────────────────────

export default function ProjectPanel({ project, onClose }: ProjectPanelProps) {
  const [openChallenge, setOpenChallenge] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const isOpen = project !== null;

  const handleClose = useCallback(() => { onClose(); }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setOpenChallenge(0);
    } else {
      document.body.style.overflow = '';
      setModalOpen(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, project?.id]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape' && !modalOpen) handleClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [handleClose, modalOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)' }}
      />

      {/* Drawer */}
      <div
        className="panel-scroll fixed top-0 right-0 z-[101] flex flex-col overflow-y-auto"
        style={{
          width: 'min(750px, 100vw)',
          height: '100dvh',
          background: BG,
          borderLeft: `1px solid ${BORDER}`,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          scrollbarWidth: 'thin',
          scrollbarColor: `${SURFACE} transparent`,
        }}
      >
        {project && (
          <PanelContent
            project={project}
            onClose={handleClose}
            openChallenge={openChallenge}
            setOpenChallenge={setOpenChallenge}
            onCodeRequest={() => setModalOpen(true)}
          />
        )}
      </div>

      {/* Code Request Modal */}
      {project && (
        <CodeRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          project={project.title}
          accent={project.color}
        />
      )}
    </>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

function PanelContent({
  project,
  onClose,
  openChallenge,
  setOpenChallenge,
  onCodeRequest,
}: {
  project: ProjectData;
  onClose: () => void;
  openChallenge: number;
  setOpenChallenge: (i: number) => void;
  onCodeRequest: () => void;
}) {
  const c = project.color;

  return (
    <>
      {/* ── Sticky header ── */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-8 py-5"
        style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-3">
          {/* Mirrors portfolio's rounded-full badge (Contact, Hero) */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
            {project.tag.text}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ border: `1px solid ${BORDER}`, background: 'transparent', color: MUTED, cursor: 'pointer' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TEXT;
            (e.currentTarget as HTMLButtonElement).style.color = TEXT;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER;
            (e.currentTarget as HTMLButtonElement).style.color = MUTED;
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 px-8 py-8 gap-10">

        {/* Hero title — font-light like portfolio h2 */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: c, opacity: 0.7 }}>
            Project {project.index}
          </p>
          <h2
            className="font-light leading-tight mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              color: TEXT,
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: MUTED }}>
            {project.subtitle}
          </p>
          {/* Colored accent rule — same pattern as Contact's dark block header */}
          <div
            className="mt-6 h-0.5 rounded-full"
            style={{ background: `linear-gradient(90deg, ${c}60, transparent)` }}
          />
        </div>

        {/* Problem */}
        <PanelSection label="El problema" color={c}>
          <div
            className="rounded-2xl p-6"
            style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${c}` }}
          >
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
              {project.problem}
            </p>
          </div>
        </PanelSection>

        {/* Architecture */}
        <PanelSection label="Arquitectura" color={c}>
          <div className="rounded-2xl overflow-x-auto" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div className="p-4">{project.diagram}</div>
          </div>
        </PanelSection>

        {/* Metrics — mirrors portfolio's stat grid style */}
        <PanelSection label="Métricas clave" color={c}>
          <div className="panel-metrics-grid grid grid-cols-3 gap-3">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 text-center"
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  borderTop: `3px solid ${c}`,
                }}
              >
                <div
                  className="text-2xl font-bold leading-none mb-1"
                  style={{ color: c }}
                >
                  {m.value}
                </div>
                <div className="text-xs leading-tight" style={{ color: MUTED2 }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </PanelSection>

        {/* Challenges — accordion */}
        <PanelSection label="Retos técnicos" color={c}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
          >
            {project.challenges.map((ch, i) => {
              const isActive = openChallenge === i;
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: i < project.challenges.length - 1 ? `1px solid ${BORDER}` : 'none',
                    borderLeft: `3px solid ${isActive ? c : 'transparent'}`,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => setOpenChallenge(isActive ? -1 : i)}
                    className="w-full flex items-start gap-4 px-6 py-4 text-left"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <span
                      className="text-xs font-semibold mt-0.5 flex-shrink-0 w-6"
                      style={{ color: c, opacity: isActive ? 1 : 0.5 }}
                    >
                      {ch.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-semibold leading-snug"
                        style={{ color: isActive ? TEXT : MUTED }}
                      >
                        {ch.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: MUTED2 }}>
                        {ch.subtitle}
                      </div>
                    </div>
                    <ChevronDown
                      size={14}
                      className="flex-shrink-0 mt-0.5 transition-transform duration-25"
                      style={{
                        color: isActive ? c : MUTED2,
                        transform: isActive ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  </button>
                  {isActive && (
                    <div
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ paddingLeft: '3.5rem', color: MUTED }}
                    >
                      {ch.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {project.afterChallenges && (
            <div className="mt-1">{project.afterChallenges}</div>
          )}
        </PanelSection>

        {/* Architectural decisions */}
        <PanelSection label="Decisiones de arquitectura" color={c}>
          <div className="flex flex-col gap-3">
            {project.decisionsNote && project.decisionsNote}
            {project.decisions.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <div
                  className="flex items-start gap-3 px-5 py-3.5"
                  style={{ background: `${c}0a`, borderBottom: `1px solid ${BORDER}` }}
                >
                  <span
                    className="text-xs font-bold tracking-widest mt-0.5 flex-shrink-0"
                    style={{ color: c }}
                  >
                    WHY
                  </span>
                  <p className="text-sm font-semibold" style={{ color: TEXT }}>
                    {d.question}
                  </p>
                </div>
                <div className="px-5 py-4 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {d.answer}
                </div>
              </div>
            ))}
          </div>
          {project.afterDecisions && (
            <div className="mt-1">{project.afterDecisions}</div>
          )}
        </PanelSection>

        {/* Retrospective */}
        <PanelSection label="Qué haría diferente hoy" color={c}>
          <div className="flex flex-col gap-2">
            {project.retrospective.map((r, i) => (
              <div
                key={i}
                className="panel-retro-grid rounded-2xl overflow-hidden"
                style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1.5fr', background: SURFACE, border: `1px solid ${BORDER}` }}
              >
                <div className="p-4 flex flex-col gap-1" style={{ borderRight: `1px solid ${BORDER}` }}>
                  <span className="text-xs tracking-widest uppercase" style={{ color: MUTED2, fontSize: '0.55rem' }}>
                    Decisión tomada
                  </span>
                  <p className="text-sm font-semibold leading-snug" style={{ color: TEXT, wordBreak: 'break-word' }}>
                    {r.decision}
                  </p>
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <span className="text-xs tracking-widest uppercase" style={{ color: c, fontSize: '0.55rem' }}>
                    Lo haría con
                  </span>
                  <div className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {r.would}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {project.afterRetro && (
            <div className="mt-1">{project.afterRetro}</div>
          )}
        </PanelSection>

        {/* Links */}
        <PanelSection label="Links" color={c}>
          <div className="flex flex-wrap gap-3 pb-2">
            {project.links.map((link, i) => {
              const sharedStyle = {
                background: link.primary ? c : 'transparent',
                color: link.primary ? '#0f172a' : MUTED,
                border: `2px solid ${link.primary ? c : BORDER}`,
              };
              const hoverIn = (el: HTMLElement) => {
                if (!link.primary) { el.style.borderColor = TEXT; el.style.color = TEXT; }
              };
              const hoverOut = (el: HTMLElement) => {
                if (!link.primary) { el.style.borderColor = BORDER; el.style.color = MUTED; }
              };

              if (link.isCodeRequest) {
                return (
                  <button
                    key={i}
                    onClick={onCodeRequest}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                    style={{ ...sharedStyle, cursor: 'pointer', fontFamily: 'inherit' }}
                    onMouseEnter={e => hoverIn(e.currentTarget as HTMLElement)}
                    onMouseLeave={e => hoverOut(e.currentTarget as HTMLElement)}
                  >
                    {link.text}
                  </button>
                );
              }

              return (
                <a
                  key={i}
                  href={link.href}
                  target={link.isMailto ? undefined : '_blank'}
                  rel={link.isMailto ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={sharedStyle}
                  onMouseEnter={e => hoverIn(e.currentTarget as HTMLElement)}
                  onMouseLeave={e => hoverOut(e.currentTarget as HTMLElement)}
                >
                  {link.text}
                  <ExternalLink size={13} />
                </a>
              );
            })}
          </div>
        </PanelSection>

      </div>
    </>
  );
}
