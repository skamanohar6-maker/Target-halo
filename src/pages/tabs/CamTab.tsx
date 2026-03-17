import { useState } from 'react';
import { Brain, ChevronDown, CheckCircle, Clock, FileText, Sparkles, AlertTriangle, TrendingUp, Building2, Users, Banknote } from 'lucide-react';

const STATUS_MAP = {
  draft: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  review: { label: 'Under Review', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  approved: { label: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

type Section = { id: string; title: string; icon: React.FC<{ className?: string }>; content: React.ReactNode };

export default function CamTab() {
  const [status, setStatus] = useState<keyof typeof STATUS_MAP>('draft');
  const [expanded, setExpanded] = useState<string[]>(['overview', 'financials']);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);

  const toggle = (id: string) =>
    setExpanded((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const handleAI = () => {
    setAiLoading(true);
    setTimeout(() => { setAiLoading(false); setAiGenerated(true); }, 1800);
  };

  const s = STATUS_MAP[status];

  const SECTIONS: Section[] = [
    {
      id: 'overview',
      title: 'Company Overview',
      icon: Building2,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Company Name', value: "Sid's Company" },
            { label: 'Sector', value: 'Fintech / Lending' },
            { label: 'Incorporation Date', value: 'Jan 15, 2017' },
            { label: 'PAN', value: 'ABCCS1234K' },
            { label: 'Promoters', value: 'Ritesh (Partner)' },
            { label: 'City', value: 'Pithora, Maharashtra' },
            { label: 'ST Rating', value: 'ST 7 (Internal)' },
            { label: 'Existing Lenders', value: 'Axis Bank, HDFC Bank' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
          <div className="col-span-2 bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Business Description</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {aiGenerated
                ? "Sid's Company is a Fintech / Lending platform established in 2017, focused on providing credit facilities to SME borrowers in Tier-2 and Tier-3 markets. The company has demonstrated consistent growth with AUM of ₹200 Cr+ and maintains diversified funding sources across 4+ lenders."
                : 'Click "Generate with AI" to auto-populate this section from the available data.'}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'financials',
      title: 'Financial Summary',
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 rounded-lg">
                  {['Particulars', 'FY 2022-23', 'FY 2023-24', 'H1 FY 2024-25', 'Trend'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Revenue', vals: ['₹12.4 Cr', '₹18.7 Cr', '₹11.2 Cr'], trend: '↑' },
                  { label: 'EBITDA', vals: ['₹3.1 Cr', '₹5.2 Cr', '₹3.4 Cr'], trend: '↑' },
                  { label: 'PAT', vals: ['₹1.8 Cr', '₹3.0 Cr', '₹2.1 Cr'], trend: '↑' },
                  { label: 'Net Worth', vals: ['₹8.2 Cr', '₹11.2 Cr', '₹13.3 Cr'], trend: '↑' },
                  { label: 'Total Debt', vals: ['₹24 Cr', '₹38 Cr', '₹50 Cr'], trend: '↑' },
                  { label: 'DSCR', vals: ['1.38x', '1.52x', '1.42x'], trend: '→' },
                  { label: 'Debt/Equity', vals: ['2.93x', '3.39x', '2.82x'], trend: '↓' },
                ].map((r, i) => (
                  <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs font-semibold text-slate-700">{r.label}</td>
                    {r.vals.map((v, j) => (
                      <td key={j} className="px-4 py-3 fin-mono text-xs text-slate-700">{v}</td>
                    ))}
                    <td className="px-4 py-3 text-base">{r.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {aiGenerated && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-700 leading-relaxed">
                  <strong>AI Analysis:</strong> The company shows consistent revenue growth (~50% YoY in FY24) with improving PAT margins from 14.5% to 16%. DSCR has declined slightly but remains above the covenant threshold of 1.25x. Debt/Equity has improved to 2.82x, trending toward the covenant limit of 3.0x — monitor closely.
                </p>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'facility',
      title: 'Proposed Facility',
      icon: Banknote,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Facility Type', value: 'Amortizing Term Loan' },
            { label: 'Facility Amount', value: '₹50 Crores' },
            { label: 'Rate of Interest', value: '8% p.a. (Fixed)' },
            { label: 'Tenor', value: '18 Months' },
            { label: 'Repayment', value: 'Monthly amortization' },
            { label: 'Security', value: 'Exclusive charge on loan book' },
            { label: 'Processing Fee', value: '1% of facility amount' },
            { label: 'Grace Period', value: '30 days' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-lg p-3">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'risk',
      title: 'Risk Assessment',
      icon: AlertTriangle,
      content: (
        <div className="space-y-3">
          {[
            { risk: 'Concentration risk in SME segment', mitigation: 'Diversification across 500+ borrowers; max single exposure 2%', severity: 'medium' },
            { risk: 'Regulatory compliance (NBFC-P2P)', mitigation: 'RBI registered, quarterly compliance reports filed on time', severity: 'low' },
            { risk: 'Liquidity mismatch', mitigation: 'ALM policy in place; max 6-month mismatch allowed', severity: 'medium' },
            { risk: 'Key person dependency', mitigation: 'Succession planning documented for top 3 roles', severity: 'low' },
          ].map((r, i) => {
            const c = r.severity === 'medium' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-emerald-600 bg-emerald-50 border-emerald-200';
            return (
              <div key={i} className={`rounded-lg border p-4 ${c.split(' ').slice(1).join(' ')}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${c.split(' ')[0]}`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{r.risk}</p>
                    <p className="text-xs text-slate-600 mt-1">{r.mitigation}</p>
                  </div>
                  <span className={`ml-auto shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full border capitalize ${c}`}>{r.severity}</span>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      id: 'recommendation',
      title: 'Recommendation',
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-800 text-sm">Recommended for Approval</p>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                {aiGenerated
                  ? "Based on the financial analysis, the company demonstrates strong revenue growth, adequate DSCR above covenant threshold, and improving debt/equity trends. The proposed facility aligns with the company's scale and repayment capacity. Subject to standard conditions precedent."
                  : 'Generate with AI or write your recommendation here.'}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">Conditions & Notes</label>
            <textarea rows={4} placeholder="Add conditions precedent, special covenants, or reviewer notes..."
              className="w-full text-sm border border-slate-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      {/* CAM header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Credit Appraisal Memorandum</h2>
            <p className="text-xs text-slate-500 fin-mono">SV4280_T1 · Rev 2 · Updated Mar 11, 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Status selector */}
          <div className="relative">
            <button className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-full border ${s.bg} ${s.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {s.label}
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleAI}
            disabled={aiLoading}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg hover:from-indigo-700 hover:to-indigo-600 transition-all disabled:opacity-60"
          >
            {aiLoading ? (
              <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" />Generate with AI</>
            )}
          </button>
          <button
            onClick={() => setStatus('review')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors">
            <CheckCircle className="w-3.5 h-3.5" /> Submit for Review
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-3 max-w-5xl mx-auto w-full">
        {aiGenerated && (
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <p className="text-xs text-indigo-700 font-medium">AI has pre-filled sections based on available data. Review and edit before submitting.</p>
          </div>
        )}

        {SECTIONS.map(({ id, title, icon: Icon, content }) => {
          const open = expanded.includes(id);
          return (
            <div key={id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{title}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <div className="px-5 pb-5 border-t border-slate-100 pt-4">{content}</div>}
            </div>
          );
        })}

        {/* Approvers */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-700">Approval Chain</h3>
          </div>
          <div className="flex items-center gap-0">
            {[
              { name: 'Apoorva Sharma', role: 'Analyst', status: 'approved', initials: 'AS' },
              { name: 'Niranjan Rathi', role: 'Credit Head', status: 'review', initials: 'NR' },
              { name: 'Siddharth Manohar', role: 'RM Lead', status: 'pending', initials: 'SM' },
              { name: 'Investment Committee', role: 'Final', status: 'pending', initials: 'IC' },
            ].map((a, i) => {
              const sc = a.status === 'approved' ? 'text-emerald-500' : a.status === 'review' ? 'text-blue-500' : 'text-slate-300';
              const bg = a.status === 'approved' ? 'bg-emerald-50 border-emerald-200' : a.status === 'review' ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200';
              return (
                <div key={i} className="flex items-center">
                  <div className={`flex flex-col items-center text-center border rounded-xl px-4 py-3 w-32 ${bg}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${a.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : a.status === 'review' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                      {a.initials}
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-1.5 leading-tight">{a.name}</p>
                    <p className="text-[10px] text-slate-400">{a.role}</p>
                    <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-semibold ${sc}`}>
                      {a.status === 'approved' ? <><CheckCircle className="w-3 h-3" />Done</> : a.status === 'review' ? <><Clock className="w-3 h-3" />In Review</> : <span className="text-slate-400">Pending</span>}
                    </div>
                  </div>
                  {i < 3 && <div className={`w-6 h-0.5 ${i < 1 ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
