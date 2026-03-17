import {
  TrendingUp, TrendingDown, Banknote, Building2, Clock, Shield,
  FileText, CheckCircle, AlertTriangle, ArrowRight, Users, Zap,
  ChevronUp, BarChart3, Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── KPI cards ─────────────────────────────────────────────── */
const KPIS = [
  { label: 'Total AUM', value: '₹2,840 Cr', change: '+₹240 Cr', pct: '+9.2%', positive: true, icon: Banknote },
  { label: 'Active Deals', value: '47', change: '+5', pct: '+11.9%', positive: true, icon: Building2 },
  { label: 'Pending Actions', value: '12', change: '+3', pct: '+33%', positive: false, icon: Clock },
  { label: 'Compliance Rate', value: '94%', change: '+2%', pct: '+2.2%', positive: true, icon: Shield },
];

/* ── Deal pipeline stages ──────────────────────────────────── */
const PIPELINE = [
  { stage: 'Prospect', count: 8, value: '₹380 Cr', pct: 14, color: '#8488C4' },
  { stage: 'CAM In Progress', count: 5, value: '₹220 Cr', pct: 8, color: '#5C62B0' },
  { stage: 'IC Pending', count: 4, value: '₹175 Cr', pct: 6, color: '#3B45A0' },
  { stage: 'Documentation', count: 6, value: '₹410 Cr', pct: 14, color: '#292F80' },
  { stage: 'Active', count: 18, value: '₹1,280 Cr', pct: 45, color: '#10B981' },
  { stage: 'Fully Disbursed', count: 6, value: '₹375 Cr', pct: 13, color: '#14234B' },
];

/* ── Upcoming items ────────────────────────────────────────── */
const UPCOMING = [
  { type: 'Maturity', company: 'Alpha Capital', detail: 'SV4280_T2 — ₹75 Cr', date: 'Apr 15', urgent: true },
  { type: 'Covenant Due', company: "Sid's Company", detail: 'DSCR ≥ 1.25x', date: 'Mar 25', urgent: true },
  { type: 'Repayment', company: 'WeRize WFin', detail: '₹8.5 Cr principal', date: 'Mar 28', urgent: false },
  { type: 'Approval', company: 'Beta Ventures', detail: 'Broad Terms Issuance', date: 'Mar 22', urgent: true },
  { type: 'Document', company: 'Gamma Fintech', detail: 'Board Resolution pending', date: 'Apr 1', urgent: false },
];

/* ── Recent activity ───────────────────────────────────────── */
const ACTIVITY = [
  { user: 'NR', name: 'Niranjan Rathi', action: 'approved broad terms for', target: 'WeRize WFin', time: '2h ago', color: '#10B981' },
  { user: 'SM', name: 'Siddharth Manohar', action: 'uploaded documents for', target: "Sid's Company", time: '4h ago', color: '#3B45A0' },
  { user: 'AS', name: 'Apoorva Sharma', action: 'submitted CAM for', target: 'Alpha Capital', time: '6h ago', color: '#F59E0B' },
  { user: 'NK', name: 'Nipun Koshi', action: 'initiated disbursal for', target: 'WeRize WFin', time: '1d ago', color: '#3B82F6' },
  { user: 'IR', name: 'Ishpreet Gandhi', action: 'flagged covenant breach for', target: 'Delta Corp', time: '1d ago', color: '#EF4444' },
];

/* ── Sector allocation ─────────────────────────────────────── */
const SECTORS = [
  { name: 'Fintech / Lending', value: '₹980 Cr', pct: 35, color: '#292F80' },
  { name: 'NBFC / Consumer', value: '₹720 Cr', pct: 25, color: '#3B45A0' },
  { name: 'PE / Debt Fund', value: '₹560 Cr', pct: 20, color: '#5C62B0' },
  { name: 'Micro-finance', value: '₹340 Cr', pct: 12, color: '#8488C4' },
  { name: 'Others', value: '₹240 Cr', pct: 8, color: '#ADAFD8' },
];

/* ── Monthly AUM trend (12 months) ─────────────────────────── */
const AUM_TREND = [
  { month: 'Apr', value: 1850 },
  { month: 'May', value: 1920 },
  { month: 'Jun', value: 2010 },
  { month: 'Jul', value: 2080 },
  { month: 'Aug', value: 2150 },
  { month: 'Sep', value: 2240 },
  { month: 'Oct', value: 2350 },
  { month: 'Nov', value: 2420 },
  { month: 'Dec', value: 2520 },
  { month: 'Jan', value: 2600 },
  { month: 'Feb', value: 2740 },
  { month: 'Mar', value: 2840 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const aumMax = Math.max(...AUM_TREND.map(d => d.value));
  const aumMin = Math.min(...AUM_TREND.map(d => d.value)) - 200;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto" style={{ background: '#F7F9FC' }}>
      {/* Hero Header */}
      <div
        className="fade-up-1"
        style={{
          background: 'linear-gradient(135deg, #0D1733 0%, #14234B 60%, #1F2468 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  Dashboard
                </h1>
                <span className="live-badge"><span className="live-dot" />Live</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
                Executive overview · Updated just now
              </p>
            </div>
            <button
              onClick={() => navigate('/analytics')}
              className="flex items-center gap-1.5 h-9 px-4 text-sm font-semibold text-white rounded-lg transition-all hover:brightness-110"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 fade-up-2">
          {KPIS.map(({ label, value, change, pct, positive, icon: Icon }) => (
            <div key={label} className="halo-card p-5">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: positive ? 'rgba(59,69,160,0.08)' : 'rgba(245,158,11,0.1)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: positive ? '#3B45A0' : '#F59E0B' }} />
                </div>
                <span
                  className="flex items-center gap-0.5 text-xs font-semibold"
                  style={{ color: positive ? '#10B981' : '#EF4444' }}
                >
                  {positive ? <ChevronUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {pct}
                </span>
              </div>
              <p className="fin-mono text-xl font-bold text-slate-900">{value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-[10px] font-medium" style={{ color: positive ? '#10B981' : '#F59E0B' }}>{change} YTD</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle row: AUM Trend + Pipeline */}
        <div className="grid grid-cols-5 gap-5 fade-up-3">
          {/* AUM Trend Chart */}
          <div className="col-span-3 halo-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">AUM Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">FY 2025-26 · Monthly</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                +53% YoY
              </div>
            </div>
            {/* CSS bar chart */}
            <div className="flex items-end gap-[6px] h-40">
              {AUM_TREND.map((d, i) => {
                const h = ((d.value - aumMin) / (aumMax - aumMin)) * 100;
                const isLast = i === AUM_TREND.length - 1;
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <span className="text-[9px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity fin-mono">
                      ₹{d.value}
                    </span>
                    <div
                      className="w-full rounded-t-[4px] transition-all duration-300"
                      style={{
                        height: `${h}%`,
                        background: isLast
                          ? 'linear-gradient(180deg, #292F80, #3B45A0)'
                          : 'rgba(59,69,160,0.15)',
                        boxShadow: isLast ? '0 2px 8px rgba(41,47,128,0.3)' : 'none',
                      }}
                    />
                    <span className="text-[9px] font-medium text-slate-400">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deal Pipeline */}
          <div className="col-span-2 halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-slate-800">Deal Pipeline</h3>
              <span className="text-xs text-slate-400 font-medium">47 deals</span>
            </div>
            <div className="space-y-3">
              {PIPELINE.map(({ stage, count, value, pct, color }) => (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{stage}</span>
                    <span className="text-xs text-slate-400 fin-mono">{count} · {value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Upcoming + Activity + Sector */}
        <div className="grid grid-cols-3 gap-5 fade-up-4">
          {/* Upcoming Items */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-slate-800">Upcoming</h3>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                <AlertTriangle className="w-3 h-3" />{UPCOMING.filter(u => u.urgent).length} urgent
              </span>
            </div>
            <div className="space-y-2.5">
              {UPCOMING.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2.5 rounded-lg transition-colors hover:bg-slate-50"
                  style={item.urgent ? { borderLeft: '3px solid #F59E0B', paddingLeft: '10px' } : {}}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: item.type === 'Maturity' ? 'rgba(239,68,68,0.1)' :
                        item.type === 'Covenant Due' ? 'rgba(245,158,11,0.1)' :
                        item.type === 'Approval' ? 'rgba(59,69,160,0.1)' :
                        'rgba(16,185,129,0.1)',
                    }}
                  >
                    {item.type === 'Maturity' ? <Clock className="w-3.5 h-3.5 text-red-500" /> :
                     item.type === 'Covenant Due' ? <Shield className="w-3.5 h-3.5 text-amber-500" /> :
                     item.type === 'Approval' ? <CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> :
                     item.type === 'Repayment' ? <Banknote className="w-3.5 h-3.5 text-emerald-500" /> :
                     <FileText className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-700 truncate">{item.company}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0 fin-mono">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-slate-800">Recent Activity</h3>
              <Activity className="w-4 h-4 text-slate-300" />
            </div>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5"
                    style={{ background: a.color }}
                  >
                    {a.user}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-600 leading-snug">
                      <span className="font-semibold text-slate-800">{a.name}</span>{' '}
                      {a.action}{' '}
                      <span className="font-semibold text-indigo-600">{a.target}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-display font-semibold text-slate-800">Sector Allocation</h3>
              <span className="text-xs text-slate-400 font-medium">₹2,840 Cr</span>
            </div>
            <div className="space-y-3">
              {SECTORS.map(({ name, value, pct, color }) => (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                      <span className="text-xs font-medium text-slate-600">{name}</span>
                    </div>
                    <span className="text-xs text-slate-500 fin-mono">{value} <span className="text-slate-400">({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Quick visual: stacked bar */}
            <div className="flex h-3 rounded-full overflow-hidden mt-4">
              {SECTORS.map(({ name, pct, color }) => (
                <div key={name} style={{ width: `${pct}%`, background: color }} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="halo-card p-5 fade-up-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold text-slate-800">Quick Actions</h3>
            <Zap className="w-4 h-4 text-slate-300" />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: 'New Approval', desc: 'Start workflow', icon: CheckCircle, path: '/portfolio' },
              { label: 'Upload Document', desc: 'Add to vault', icon: FileText, path: '/portfolio' },
              { label: 'Send NDA', desc: 'E-Sign flow', icon: FileText, path: '/esign' },
              { label: 'View Reports', desc: 'Analytics & data', icon: BarChart3, path: '/analytics' },
              { label: 'Team Activity', desc: 'Who did what', icon: Users, path: '/dashboard' },
            ].map(({ label, desc, icon: Icon, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{label}</p>
                  <p className="text-[10px] text-slate-400 truncate">{desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors ml-auto shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
