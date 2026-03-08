import { useState, useCallback } from 'react';
import { Store, ShoppingBag, Terminal, Folder, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import ProjectPanel from './ProjectPanel';
import { PROJECTS } from './projectsData';
import type { ProjectData } from './projectsData';

// Map project id → lucide icon + tailwind gradient (same pattern as Skills section icons)
const PROJECT_VISUALS: Record<string, { Icon: React.ElementType; gradient: string }> = {
  biolinkstore:      { Icon: Store,       gradient: 'from-lime-400 to-emerald-500' },
  repuestosOriente:  { Icon: ShoppingBag, gradient: 'from-sky-400 to-cyan-500'    },
  eaglekit:          { Icon: Terminal,    gradient: 'from-amber-400 to-orange-500' },
};

const STATUS_STYLES: Record<string, string> = {
  live:  'bg-green-50 text-green-700 border-green-200',
  beta:  'bg-blue-50  text-blue-700  border-blue-200',
  wip:   'bg-amber-50 text-amber-700 border-amber-200',
};

export default function Projects() {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  const openPanel  = useCallback((p: ProjectData) => setActiveProject(p), []);
  const closePanel = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* ── Header ── */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Folder className="w-4 h-4" />
                <span>Selected work</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
                {t('projects.title')}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('projects.subtitle')}
              </p>
            </div>

            {/* ── Grid ── */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openPanel(project)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <ProjectPanel project={activeProject} onClose={closePanel} />
    </>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }: { project: ProjectData; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const visual = PROJECT_VISUALS[project.id] ?? { Icon: Folder, gradient: 'from-slate-400 to-slate-600' };
  const { Icon, gradient } = visual;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-100 cursor-pointer flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
    >
      {/* Decorative large index — very faint, behind content */}
      <span
        aria-hidden
        className="absolute -top-2 -right-1 text-[7rem] font-black text-slate-100 leading-none select-none pointer-events-none transition-opacity duration-300"
        style={{ opacity: hovered ? 0.8 : 0.5 }}
      >
        {project.index}
      </span>

      {/* ── Top row: icon + status ── */}
      <div className="relative flex items-start justify-between mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[project.statusType]}`}>
          {project.status}
        </span>
      </div>

      {/* ── Type labels ── */}
      <div className="relative flex flex-wrap gap-1.5 mb-4">
        {project.typeLabels.map((label) => (
          <span
            key={label}
            className="text-xs bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5"
          >
            {label}
          </span>
        ))}
      </div>

      {/* ── Title + description ── */}
      <div className="relative mb-6 flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* ── Metrics ── */}
      <div className="relative grid grid-cols-3 gap-3 mb-6">
        {project.metrics.map((m, i) => (
          <div key={i} className="text-center bg-slate-50 rounded-xl p-2.5 border border-slate-100">
            <div className={`text-sm font-bold leading-none mb-1 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
              {m.value}
            </div>
            <div className="text-slate-400 leading-tight" style={{ fontSize: '0.58rem' }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer: stack + CTA ── */}
      <div className="relative pt-5 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.stackPills.map((pill) => (
            <span
              key={pill}
              className="text-slate-400 bg-slate-50 border border-slate-100 rounded px-2 py-0.5"
              style={{ fontSize: '0.62rem' }}
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          {/* Direct URL — only shown for projects with a live non-mailto link */}
          {(() => {
            const liveLink = project.links.find((l) => l.primary && !l.isMailto);
            return liveLink ? (
              <a
                href={liveLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors duration-200"
                style={{ fontSize: '0.7rem' }}
              >
                <ExternalLink className="w-3 h-3" />
                {liveLink.href.replace('https://', '')}
              </a>
            ) : (
              <span className="text-xs text-slate-300" style={{ fontSize: '0.68rem' }}>Código disponible a solicitud</span>
            );
          })()}
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white"
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
