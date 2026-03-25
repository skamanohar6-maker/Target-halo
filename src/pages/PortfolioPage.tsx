import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, TrendingUp, Users, Banknote, Clock, Building2, ChevronUp, ChevronDown, X, Plus } from 'lucide-react';
import AddCompanySheet from './AddCompanySheet';

/* ── Filter categories ────────────────────────────────────── */
const FILTER_CATEGORIES = [
  'All',
  'Evaluation Stage',
  'Cold',
  'Rejected',
  'Exited',
  'Active debt exposure, live warrants',
  'Active debt exposure, no warrants',
  'Active debt exposure & warrants exited',
  'Nil debt exposure, live warrants',
  'Nil debt exposure, no warrants',
  'Nil debt exposure & warrants exited',
] as const;

type FilterCategory = typeof FILTER_CATEGORIES[number];

// Spark data: 6 values representing relative performance over recent months
const COMPANIES = [
  {
    id: 'sids-company',
    name: "Sid's Company",
    sector: 'Fintech / Lending',
    since: 2017,
    sanction: '₹50 Cr',
    roi: '8.0%',
    tenor: '18 mo',
    pending: 2,
    spocs: 2,
    stage: 'Active',
    stageColor: '#10B981',
    stageBg: 'rgba(16,185,129,0.1)',
    color: ['#292F80', '#5C62B0'],
    initials: 'SC',
    spark: [30, 45, 38, 60, 55, 72],
    trend: +14,
    category: 'Active debt exposure, live warrants' as FilterCategory,
  },
  {
    id: 'werize-wfin',
    name: 'WeRize WFin',
    sector: 'NBFC / Consumer',
    since: 2019,
    sanction: '₹120 Cr',
    roi: '10.5%',
    tenor: '24 mo',
    pending: 0,
    spocs: 3,
    stage: 'Performing',
    stageColor: '#3B82F6',
    stageBg: 'rgba(59,130,246,0.1)',
    color: ['#10B981', '#0D9488'],
    initials: 'WW',
    spark: [60, 55, 70, 65, 80, 78],
    trend: +8,
    category: 'Active debt exposure, no warrants' as FilterCategory,
  },
  {
    id: 'alpha-capital',
    name: 'Alpha Capital',
    sector: 'PE / Debt Fund',
    since: 2021,
    sanction: '₹200 Cr',
    roi: '12.0%',
    tenor: '36 mo',
    pending: 5,
    spocs: 4,
    stage: 'Watch',
    stageColor: '#F59E0B',
    stageBg: 'rgba(245,158,11,0.1)',
    color: ['#F59E0B', '#EF4444'],
    initials: 'AC',
    spark: [80, 75, 82, 70, 65, 68],
    trend: -5,
    category: 'Evaluation Stage' as FilterCategory,
  },
  {
    id: 'beta-ventures',
    name: 'Beta Ventures',
    sector: 'Micro-finance',
    since: 2020,
    sanction: '₹85 Cr',
    roi: '14.1%',
    tenor: '12 mo',
    pending: 1,
    spocs: 2,
    stage: 'Active',
    stageColor: '#10B981',
    stageBg: 'rgba(16,185,129,0.1)',
    color: ['#3B45A0', '#8488C4'],
    initials: 'BV',
    spark: [40, 50, 55, 60, 70, 85],
    trend: +22,
    category: 'Active debt exposure, live warrants' as FilterCategory,
  },
  {
    id: 'gamma-fintech',
    name: 'Gamma Fintech',
    sector: 'Fintech / Lending',
    since: 2022,
    sanction: '₹65 Cr',
    roi: '10.9%',
    tenor: '15 mo',
    pending: 0,
    spocs: 2,
    stage: 'Performing',
    stageColor: '#3B82F6',
    stageBg: 'rgba(59,130,246,0.1)',
    color: ['#0D9488', '#10B981'],
    initials: 'GF',
    spark: [35, 42, 48, 55, 60, 68],
    trend: +12,
    category: 'Nil debt exposure, live warrants' as FilterCategory,
  },
  {
    id: 'delta-corp',
    name: 'Delta Corp',
    sector: 'NBFC / Consumer',
    since: 2018,
    sanction: '₹45 Cr',
    roi: '9.7%',
    tenor: '20 mo',
    pending: 3,
    spocs: 1,
    stage: 'Alert',
    stageColor: '#EF4444',
    stageBg: 'rgba(239,68,68,0.1)',
    color: ['#EF4444', '#F97316'],
    initials: 'DC',
    spark: [70, 65, 58, 50, 42, 38],
    trend: -18,
    category: 'Cold' as FilterCategory,
  },
];

const STATS = [
  {
    label: 'Portfolio Companies',
    value: '24',
    sub: '+3 this quarter',
    icon: Building2,
    positive: true,
  },
  {
    label: 'Active Facilities',
    value: '47',
    sub: '8 maturing soon',
    icon: Banknote,
    positive: true,
  },
  {
    label: 'Total AUM',
    value: '₹2,840 Cr',
    sub: '↑ ₹240 Cr YTD',
    icon: TrendingUp,
    positive: true,
  },
  {
    label: 'Pending Approvals',
    value: '12',
    sub: '4 overdue',
    icon: Clock,
    positive: false,
  },
];

// Mini sparkline bars component
function Sparkline({ data, color }: { data: number[]; color: string[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-[5px] rounded-sm transition-all"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === data.length - 1
              ? `linear-gradient(180deg, ${color[0]}, ${color[1]})`
              : `rgba(${hexToRgb(color[0])}, 0.25)`,
          }}
        />
      ))}
    </div>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('All');
  const [filterOpen, setFilterOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const [showAddCompany, setShowAddCompany] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const filterBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openFilter = () => {
    if (!filterOpen && filterBtnRef.current) {
      const rect = filterBtnRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 6,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    }
    setFilterOpen(v => !v);
  };

  const filtered = COMPANIES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.sector.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 min-h-0 overflow-y-auto" style={{ background: 'linear-gradient(160deg, #EDF0FF 0%, #F4F6FF 35%, #F7F9FC 65%, #EFF4FF 100%)' }}>

      {/* Hero Header */}
      <div
        className="fade-up-1"
        style={{
          background: 'linear-gradient(135deg, #0D1733 0%, #14234B 60%, #1F2468 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  ERP Portfolio
                </h1>
                {/* LIVE badge */}
                <span className="live-badge">
                  <span className="live-dot" />
                  Live
                </span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
                Deal-flow · Facilities · Compliance — updated just now
              </p>
              <button
                onClick={() => setShowAddCompany(true)}
                className="mt-3 flex items-center gap-1.5 h-8 px-4 text-xs font-semibold text-white rounded-lg transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #292F80, #3B45A0)' }}
              >
                <Plus className="w-3.5 h-3.5" />
                Add Company
              </button>
            </div>

            {/* AUM hero number */}
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(148,163,184,0.5)' }}>
                Total AUM
              </p>
              <p
                className="fin-mono font-bold"
                style={{
                  fontSize: '28px',
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ₹2,840 Cr
              </p>
              <p className="text-xs mt-1 flex items-center justify-end gap-1" style={{ color: '#10B981' }}>
                <ChevronUp className="w-3 h-3" />
                ₹240 Cr YTD
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="mt-6 grid grid-cols-4 rounded-xl overflow-hidden fade-up-2 glass-dark"
          >
            {STATS.map(({ label, value, sub, icon: Icon, positive }, i) => (
              <div
                key={label}
                className="px-5 py-4 flex items-center gap-3"
                style={{
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: positive ? 'rgba(59,69,160,0.18)' : 'rgba(245,158,11,0.15)',
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: positive ? '#8488C4' : '#F59E0B' }}
                  />
                </div>
                <div>
                  <p
                    className="fin-mono font-bold text-white leading-none"
                    style={{ fontSize: '17px' }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[10px] font-medium mt-1 leading-none"
                    style={{ color: 'rgba(148,163,184,0.55)' }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-[10px] mt-0.5 leading-none"
                    style={{ color: positive ? 'rgba(16,185,129,0.8)' : 'rgba(245,158,11,0.8)' }}
                  >
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="px-8 py-7">

        {/* Section header + search */}
        <div className="flex items-center justify-between mb-6 fade-up-3">
          <div>
            <h2
              className="text-base font-semibold text-slate-900"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Portfolio Companies
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {filtered.length} of {COMPANIES.length} companies shown
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="relative glass-input rounded-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-56 pl-9 pr-4 h-9 text-sm rounded-lg bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all"
              />
            </div>

            {/* Category filter dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                ref={filterBtnRef}
                onClick={openFilter}
                className={`flex items-center gap-2 h-9 pl-3.5 pr-2.5 text-sm font-medium rounded-lg border transition-all ${
                  categoryFilter !== 'All'
                    ? 'border-indigo-300 text-indigo-700'
                    : 'text-slate-600 hover:border-white/80'
                }`}
                style={
                  categoryFilter !== 'All'
                    ? { background: 'rgba(238,242,255,0.85)', backdropFilter: 'blur(12px)' }
                    : { background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.70)' }
                }
              >
                <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[180px] truncate">
                  {categoryFilter === 'All' ? 'All Categories' : categoryFilter}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Active filter clear chip */}
              {categoryFilter !== 'All' && (
                <button
                  onClick={(e) => { e.stopPropagation(); setCategoryFilter('All'); }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}

              {/* Dropdown portal — renders on document.body to escape all transforms */}
              {filterOpen && createPortal(
                <div
                  className="w-80 rounded-xl overflow-hidden"
                  style={{
                    position: 'fixed',
                    top: dropdownPos.top,
                    right: dropdownPos.right,
                    zIndex: 99999,
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.85)',
                    boxShadow: '0 16px 48px rgba(15,23,42,0.14), 0 4px 16px rgba(41,47,128,0.08), inset 0 1px 0 rgba(255,255,255,1)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(59,69,160,0.08)' }}>
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Filter by Category</p>
                  </div>
                  <div className="max-h-[360px] overflow-y-auto py-1">
                    {FILTER_CATEGORIES.map((cat) => {
                      const count = cat === 'All' ? COMPANIES.length : COMPANIES.filter(c => c.category === cat).length;
                      const isActive = categoryFilter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => { setCategoryFilter(cat); setFilterOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-sm font-medium">{cat}</span>
                          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                            isActive
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 fade-up-4">
          {filtered.map((company, idx) => (
            <button
              key={company.id}
              onClick={() => navigate(`/portfolio/company/${company.id}`)}
              className="text-left group relative"
              style={{ animationDelay: `${0.05 * idx}s` }}
            >
              <div
                className="rounded-xl overflow-hidden text-left transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.68)',
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  boxShadow: '0 2px 12px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.95)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(255,255,255,0.85)';
                  el.style.boxShadow = '0 10px 32px rgba(41,47,128,0.12), 0 2px 8px rgba(20,35,75,0.06), inset 0 1px 0 rgba(255,255,255,1)';
                  el.style.borderColor = 'rgba(255,255,255,0.92)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = 'rgba(255,255,255,0.68)';
                  el.style.boxShadow = '0 2px 12px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.95)';
                  el.style.borderColor = 'rgba(255,255,255,0.75)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Top gradient accent bar */}
                <div
                  className="h-[3px]"
                  style={{ background: `linear-gradient(90deg, ${company.color[0]}, ${company.color[1]})` }}
                />

                <div className="p-5">
                  {/* Company header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${company.color[0]}, ${company.color[1]})`,
                        boxShadow: `0 2px 8px rgba(${hexToRgb(company.color[0])},0.3)`,
                      }}
                    >
                      {company.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="font-semibold text-slate-900 text-[14px] leading-snug truncate group-hover:text-indigo-600 transition-colors"
                          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                        >
                          {company.name}
                        </h3>
                        {/* Stage chip */}
                        <span
                          className="shrink-0 text-[10px] font-semibold rounded-full px-2 py-0.5"
                          style={{ color: company.stageColor, background: company.stageBg }}
                        >
                          {company.stage}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {company.sector} · Since {company.since}
                      </p>
                    </div>
                    {company.pending > 0 && (
                      <span className="shrink-0 text-[10px] font-semibold bg-amber-50 text-amber-600 border border-amber-200/80 rounded-full px-2 py-0.5">
                        {company.pending} pending
                      </span>
                    )}
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[
                      { label: 'SANCTION', value: company.sanction },
                      { label: 'ROI', value: company.roi },
                      { label: 'TENOR', value: company.tenor },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg p-2.5"
                        style={{
                          background: 'rgba(255,255,255,0.55)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255,255,255,0.70)',
                        }}
                      >
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">{label}</p>
                        <p className="fin-mono text-[13px] font-semibold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Footer: SPOCs + sparkline + trend */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.5)' }}
                  >
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Users className="w-3.5 h-3.5" />
                      <span>{company.spocs} SPOCs</span>
                    </div>

                    {/* Sparkline + trend */}
                    <div className="flex items-center gap-2.5">
                      <Sparkline data={company.spark} color={company.color} />
                      <span
                        className="fin-mono text-[11px] font-semibold"
                        style={{ color: company.trend >= 0 ? '#10B981' : '#EF4444' }}
                      >
                        {company.trend >= 0 ? '+' : ''}{company.trend}%
                      </span>
                    </div>

                    <span className="text-xs font-medium text-indigo-500 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add Company Sheet */}
      {showAddCompany && <AddCompanySheet onClose={() => setShowAddCompany(false)} />}
    </div>
  );
}
