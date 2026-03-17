import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Banknote, Building2, Shield, BarChart3,
  ArrowUpRight, ArrowDownRight, ChevronUp, ChevronDown, Filter,
  Download, Calendar, PieChart, Activity, Target, Users,
} from 'lucide-react';

/* ── Time filter ──────────────────────────────────────────── */
const TIME_FILTERS = ['3M', '6M', '1Y', 'YTD', 'All'] as const;

/* ── Monthly disbursement vs repayment (12M) ─────────────── */
const DISB_REPAY = [
  { month: 'Apr', disb: 120, repay: 85 },
  { month: 'May', disb: 95, repay: 90 },
  { month: 'Jun', disb: 140, repay: 75 },
  { month: 'Jul', disb: 80, repay: 100 },
  { month: 'Aug', disb: 110, repay: 88 },
  { month: 'Sep', disb: 160, repay: 92 },
  { month: 'Oct', disb: 130, repay: 105 },
  { month: 'Nov', disb: 90, repay: 110 },
  { month: 'Dec', disb: 175, repay: 95 },
  { month: 'Jan', disb: 145, repay: 120 },
  { month: 'Feb', disb: 200, repay: 130 },
  { month: 'Mar', disb: 155, repay: 115 },
];

/* ── ROI distribution ────────────────────────────────────── */
const ROI_DIST = [
  { range: '6-8%', count: 4, pct: 9 },
  { range: '8-10%', count: 8, pct: 17 },
  { range: '10-12%', count: 14, pct: 30 },
  { range: '12-14%', count: 12, pct: 26 },
  { range: '14-16%', count: 6, pct: 13 },
  { range: '16%+', count: 3, pct: 6 },
];

/* ── Vintage / tenor breakdown ───────────────────────────── */
const TENOR = [
  { range: '0-6M', value: 280, pct: 10 },
  { range: '6-12M', value: 560, pct: 20 },
  { range: '12-18M', value: 840, pct: 30 },
  { range: '18-24M', value: 700, pct: 25 },
  { range: '24M+', value: 460, pct: 16 },
];

/* ── Top performing companies ────────────────────────────── */
const TOP_COMPANIES = [
  { name: 'WeRize WFin', aum: '₹420 Cr', roi: '13.2%', status: 'On Track', trend: 'up', compliance: 98 },
  { name: 'Alpha Capital', aum: '₹380 Cr', roi: '12.8%', status: 'On Track', trend: 'up', compliance: 96 },
  { name: "Sid's Company", aum: '₹310 Cr', roi: '11.5%', status: 'Watch', trend: 'down', compliance: 88 },
  { name: 'Beta Ventures', aum: '₹275 Cr', roi: '14.1%', status: 'On Track', trend: 'up', compliance: 94 },
  { name: 'Gamma Fintech', aum: '₹240 Cr', roi: '10.9%', status: 'On Track', trend: 'up', compliance: 92 },
  { name: 'Delta Corp', aum: '₹195 Cr', roi: '9.7%', status: 'Alert', trend: 'down', compliance: 72 },
];

/* ── Compliance scorecard ────────────────────────────────── */
const COMPLIANCE = [
  { label: 'Covenants Met', value: 42, total: 47, pct: 89, color: '#10B981' },
  { label: 'Docs Complete', value: 38, total: 42, pct: 90, color: '#3B45A0' },
  { label: 'KYC Up-to-date', value: 44, total: 47, pct: 94, color: '#292F80' },
  { label: 'Audit Clean', value: 35, total: 40, pct: 88, color: '#5C62B0' },
];

/* ── Fund-type mix ───────────────────────────────────────── */
const FUND_MIX = [
  { type: 'NCD', value: '₹1,140 Cr', pct: 40, color: '#14234B' },
  { type: 'Term Loan', value: '₹710 Cr', pct: 25, color: '#292F80' },
  { type: 'Working Capital', value: '₹430 Cr', pct: 15, color: '#3B45A0' },
  { type: 'CC / OD', value: '₹285 Cr', pct: 10, color: '#5C62B0' },
  { type: 'Others', value: '₹275 Cr', pct: 10, color: '#ADAFD8' },
];

/* ── Key metrics for summary strip ───────────────────────── */
const METRICS = [
  { label: 'Weighted Avg ROI', value: '12.4%', change: '+0.3%', positive: true, icon: Target },
  { label: 'Net Disbursed (YTD)', value: '₹1,600 Cr', change: '+₹420 Cr', positive: true, icon: Banknote },
  { label: 'Collection Rate', value: '97.2%', change: '+1.8%', positive: true, icon: Activity },
  { label: 'Active Companies', value: '47', change: '+5', positive: true, icon: Building2 },
  { label: 'NPA Ratio', value: '1.8%', change: '-0.4%', positive: true, icon: Shield },
  { label: 'Team Utilization', value: '82%', change: '+6%', positive: true, icon: Users },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<typeof TIME_FILTERS[number]>('1Y');
  const disbMax = Math.max(...DISB_REPAY.map(d => Math.max(d.disb, d.repay)));
  const roiMax = Math.max(...ROI_DIST.map(d => d.pct));

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
                  Analytics
                </h1>
                <span className="live-badge"><span className="live-dot" />Live</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
                Portfolio intelligence · Deep metrics
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Period filter */}
              <div
                className="flex items-center rounded-lg p-0.5"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                {TIME_FILTERS.map(t => (
                  <button
                    key={t}
                    onClick={() => setPeriod(t)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      period === t
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                className="flex items-center gap-1.5 h-9 px-3 text-sm font-medium rounded-lg transition-all hover:brightness-110"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
              >
                <Filter className="w-3.5 h-3.5" />
                Filters
              </button>
              <button
                className="flex items-center gap-1.5 h-9 px-3 text-sm font-medium rounded-lg transition-all hover:brightness-110"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 space-y-6">
        {/* Metrics Strip */}
        <div className="grid grid-cols-6 gap-3 fade-up-2">
          {METRICS.map(({ label, value, change, positive, icon: Icon }) => (
            <div key={label} className="halo-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(59,69,160,0.08)' }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: '#3B45A0' }} />
                </div>
                <span className="text-[10px] font-medium text-slate-400 leading-tight">{label}</span>
              </div>
              <p className="fin-mono text-lg font-bold text-slate-900">{value}</p>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold mt-0.5" style={{ color: positive ? '#10B981' : '#EF4444' }}>
                {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {change}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: Disbursement vs Repayment + ROI Distribution */}
        <div className="grid grid-cols-5 gap-5 fade-up-3">
          {/* Disbursement vs Repayment */}
          <div className="col-span-3 halo-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">Disbursement vs Repayment</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly flow · ₹ Cr</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#292F80' }} />Disbursed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#ADAFD8' }} />Repaid</span>
              </div>
            </div>
            <div className="flex items-end gap-[4px] h-44">
              {DISB_REPAY.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[8px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity fin-mono">
                    {d.disb}
                  </span>
                  <div className="w-full flex gap-[2px] items-end" style={{ height: '140px' }}>
                    <div
                      className="flex-1 rounded-t-[3px] transition-all duration-300"
                      style={{
                        height: `${(d.disb / disbMax) * 100}%`,
                        background: 'linear-gradient(180deg, #292F80, #3B45A0)',
                      }}
                    />
                    <div
                      className="flex-1 rounded-t-[3px] transition-all duration-300"
                      style={{
                        height: `${(d.repay / disbMax) * 100}%`,
                        background: '#ADAFD8',
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-medium text-slate-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Distribution */}
          <div className="col-span-2 halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">ROI Distribution</h3>
                <p className="text-xs text-slate-400 mt-0.5">Across active facilities</p>
              </div>
              <BarChart3 className="w-4 h-4 text-slate-300" />
            </div>
            <div className="space-y-2.5">
              {ROI_DIST.map(({ range, count, pct }) => (
                <div key={range}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600 fin-mono">{range}</span>
                    <span className="text-[10px] text-slate-400">{count} facilities · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(pct / roiMax) * 100}%`,
                        background: `linear-gradient(90deg, #292F80, #5C62B0)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Weighted average</span>
              <span className="text-sm font-bold text-indigo-700 fin-mono">12.4%</span>
            </div>
          </div>
        </div>

        {/* Row 3: Tenor Breakdown + Fund Mix + Compliance */}
        <div className="grid grid-cols-3 gap-5 fade-up-4">
          {/* Tenor Breakdown */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">Tenor Breakdown</h3>
                <p className="text-xs text-slate-400 mt-0.5">AUM by remaining tenor</p>
              </div>
              <Calendar className="w-4 h-4 text-slate-300" />
            </div>
            <div className="space-y-3">
              {TENOR.map(({ range, value, pct }) => (
                <div key={range}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{range}</span>
                    <span className="text-xs text-slate-500 fin-mono">₹{value} Cr <span className="text-slate-400">({pct}%)</span></span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct * 3}%`, background: '#3B45A0' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Avg tenor</span>
              <span className="text-sm font-bold text-indigo-700 fin-mono">15.4 months</span>
            </div>
          </div>

          {/* Fund Type Mix */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">Fund Type Mix</h3>
                <p className="text-xs text-slate-400 mt-0.5">Instrument breakdown</p>
              </div>
              <PieChart className="w-4 h-4 text-slate-300" />
            </div>
            {/* Visual donut approximation */}
            <div className="flex justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    return FUND_MIX.map(({ type, pct, color }) => {
                      const stroke = (pct / 100) * 251.2;
                      const gap = 251.2 - stroke;
                      const el = (
                        <circle
                          key={type}
                          cx="50" cy="50" r="40"
                          fill="none"
                          stroke={color}
                          strokeWidth="16"
                          strokeDasharray={`${stroke} ${gap}`}
                          strokeDashoffset={-offset}
                          className="transition-all duration-500"
                        />
                      );
                      offset += stroke;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-slate-900 fin-mono">₹2.8K</span>
                  <span className="text-[9px] text-slate-400">Cr Total</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {FUND_MIX.map(({ type, value, pct, color }) => (
                <div key={type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                    <span className="font-medium text-slate-600">{type}</span>
                  </div>
                  <span className="fin-mono text-slate-500">{value} <span className="text-slate-400">({pct}%)</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Scorecard */}
          <div className="halo-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-display font-semibold text-slate-800">Compliance Scorecard</h3>
                <p className="text-xs text-slate-400 mt-0.5">Portfolio health</p>
              </div>
              <Shield className="w-4 h-4 text-slate-300" />
            </div>
            {/* Overall score */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeDasharray={`${0.91 * 263.9} ${263.9}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-900 fin-mono">91%</span>
                  <span className="text-[9px] text-slate-400">Overall</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {COMPLIANCE.map(({ label, value, total, pct, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{label}</span>
                    <span className="text-[10px] fin-mono text-slate-500">{value}/{total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Top Companies Table */}
        <div className="halo-card p-5 fade-up-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-display font-semibold text-slate-800">Top Performing Companies</h3>
              <p className="text-xs text-slate-400 mt-0.5">Ranked by AUM · Active portfolio</p>
            </div>
            <TrendingUp className="w-4 h-4 text-slate-300" />
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3 pl-3">Company</th>
                <th className="text-right text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3">AUM</th>
                <th className="text-right text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3">ROI</th>
                <th className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Status</th>
                <th className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Compliance</th>
                <th className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider pb-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {TOP_COMPANIES.map((c, i) => (
                <tr key={c.name} className="border-b border-slate-50 hover:bg-indigo-50/30 transition-colors">
                  <td className="py-3 pl-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold"
                        style={{
                          background: i < 3
                            ? `linear-gradient(135deg, #292F80, #5C62B0)`
                            : '#94A3B8',
                        }}
                      >
                        {c.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="text-right text-sm font-semibold text-slate-700 fin-mono">{c.aum}</td>
                  <td className="text-right text-sm font-medium text-emerald-600 fin-mono">{c.roi}</td>
                  <td className="text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full"
                      style={{
                        background: c.status === 'On Track' ? '#D1FAE5' : c.status === 'Watch' ? '#FEF3C7' : '#FEE2E2',
                        color: c.status === 'On Track' ? '#059669' : c.status === 'Watch' ? '#D97706' : '#DC2626',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: c.status === 'On Track' ? '#10B981' : c.status === 'Watch' ? '#F59E0B' : '#EF4444',
                        }}
                      />
                      {c.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${c.compliance}%`,
                            background: c.compliance >= 90 ? '#10B981' : c.compliance >= 80 ? '#F59E0B' : '#EF4444',
                          }}
                        />
                      </div>
                      <span className="text-[10px] fin-mono text-slate-500">{c.compliance}%</span>
                    </div>
                  </td>
                  <td className="text-center">
                    {c.trend === 'up' ? (
                      <ChevronUp className="w-4 h-4 text-emerald-500 mx-auto" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
