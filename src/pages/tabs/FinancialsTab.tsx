import { useState, useRef } from 'react';
import {
  Upload, Plus, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, Clock, BarChart2, ChevronDown, FileText,
  Building2, Landmark, RefreshCw, X,
} from 'lucide-react';

// ── Add Covenant Modal ─────────────────────────────────────
function AddCovenantModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    classification: '',
    category: '',
    covenantType: '',
    frequency: 'Event Based',
    definitionType: '',
    definition: '',
    value: '',
    units: '',
    impactOnPrice: '',
    comments: '',
  });
  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = 'w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white';
  const selectCls = `${inputCls} appearance-none`;
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
  const req = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Add Covenant</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
            {/* Classification */}
            <div>
              <label className={labelCls}>Classification {req}</label>
              <div className="relative">
                <select value={form.classification} onChange={set('classification')} className={selectCls}>
                  <option value="" disabled />
                  <option>Documented</option>
                  <option>Internal</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Category | Types of covenant */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Category {req}</label>
                <div className="relative">
                  <select value={form.category} onChange={set('category')} className={selectCls}>
                    <option value="" disabled />
                    <option>Regular</option>
                    <option>Event</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>Types of covenant {req}</label>
                <div className="relative">
                  <select value={form.covenantType} onChange={set('covenantType')} className={selectCls}>
                    <option value="" disabled />
                    <option>Financial</option>
                    <option>Non Financial</option>
                    <option>Document Deferral</option>
                    <option>Others</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
            </div>

            {/* Frequency */}
            <div className="max-w-[50%]">
              <label className={labelCls}>Frequency {req}</label>
              <div className="relative">
                <select value={form.frequency} onChange={set('frequency')} className={`${selectCls} bg-slate-50 font-medium text-slate-600`}>
                  <option>Event Based</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Half Yearly</option>
                  <option>Annual</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Definition Type */}
            <div>
              <label className={labelCls}>Definition Type {req}</label>
              <div className="relative">
                <select value={form.definitionType} onChange={set('definitionType')} className={selectCls}>
                  <option value="" disabled />
                  <option>Standard</option>
                  <option>Non-Standard</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Definition */}
            <div>
              <label className={labelCls}>Definition {req}</label>
              <input value={form.definition} onChange={set('definition')} className={inputCls} />
            </div>

            {/* Value | Units */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Value {req}</label>
                <input value={form.value} onChange={set('value')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Units</label>
                <input value={form.units} onChange={set('units')} className={inputCls} />
              </div>
            </div>

            {/* Impact on Price */}
            <div>
              <label className={labelCls}>Impact on Price {req}</label>
              <div className="flex items-center gap-6 mt-1">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio" name="impact" value={opt}
                      checked={form.impactOnPrice === opt}
                      onChange={set('impactOnPrice')}
                      className="w-4 h-4 accent-indigo-600"
                    />
                    <span className="text-sm font-semibold text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className={labelCls}>Enter Comments</label>
              <textarea value={form.comments} onChange={set('comments')} rows={3} className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 px-8 py-5 border-t border-slate-100">
            <button onClick={onClose} className="px-10 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button className="px-10 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

type SubTab = 'bank-statement' | 'gst' | 'credit' | 'covenants' | 'repayment';

// ── Bank Statement ──────────────────────────────────────────
function BankStatement() {
  const rows = [
    { date: 'Mar 01', opening: '1,24,30,000', credit: '45,00,000', debit: '12,50,000', closing: '1,56,80,000' },
    { date: 'Feb 01', opening: '98,40,000', credit: '60,00,000', debit: '34,10,000', closing: '1,24,30,000' },
    { date: 'Jan 01', opening: '82,00,000', credit: '42,50,000', debit: '26,10,000', closing: '98,40,000' },
    { date: 'Dec 01', opening: '75,20,000', credit: '38,00,000', debit: '31,20,000', closing: '82,00,000' },
    { date: 'Nov 01', opening: '64,50,000', credit: '35,00,000', debit: '24,30,000', closing: '75,20,000' },
    { date: 'Oct 01', opening: '55,80,000', credit: '30,00,000', debit: '21,30,000', closing: '64,50,000' },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Avg Monthly Balance', value: '₹1.03 Cr', icon: Landmark, color: 'text-indigo-600 bg-indigo-50', trend: '+8.2%' },
          { label: 'Avg Monthly Inflow', value: '₹41.7 L', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50', trend: '+5.1%' },
          { label: 'Avg Monthly Outflow', value: '₹24.9 L', icon: TrendingDown, color: 'text-red-500 bg-red-50', trend: '-2.3%' },
          { label: 'Months Uploaded', value: '6 of 12', icon: BarChart2, color: 'text-blue-600 bg-blue-50', trend: null },
        ].map(({ label, value, icon: Icon, color, trend }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="fin-mono text-lg font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            {trend && (
              <p className={`text-[11px] font-semibold mt-1 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{trend} vs prev</p>
            )}
          </div>
        ))}
      </div>

      {/* Upload + Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Monthly Statements</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
              <Upload className="w-3.5 h-3.5" /> Upload Statement
            </button>
            <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none">
              <option>FY 2024-25</option>
              <option>FY 2023-24</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['Month', 'Opening Balance', 'Credit', 'Debit', 'Closing Balance', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-indigo-50/40 transition-colors">
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-600 font-medium">{r.date}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-700">₹{r.opening}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-emerald-600 font-medium">+₹{r.credit}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-red-500 font-medium">-₹{r.debit}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs font-semibold text-slate-800">₹{r.closing}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">View</button>
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

// ── GST ──────────────────────────────────────────────────────
function GSTPage() {
  const rows = [
    { period: 'Feb 2025', gstr1: '✅ Filed', gstr3b: '✅ Filed', turnover: '₹3.2 Cr', tax: '₹18.4 L', status: 'compliant' },
    { period: 'Jan 2025', gstr1: '✅ Filed', gstr3b: '✅ Filed', turnover: '₹2.9 Cr', tax: '₹16.8 L', status: 'compliant' },
    { period: 'Dec 2024', gstr1: '✅ Filed', gstr3b: '⚠️ Late', turnover: '₹3.5 Cr', tax: '₹20.1 L', status: 'late' },
    { period: 'Nov 2024', gstr1: '✅ Filed', gstr3b: '✅ Filed', turnover: '₹2.7 Cr', tax: '₹15.6 L', status: 'compliant' },
    { period: 'Oct 2024', gstr1: '❌ Missed', gstr3b: '❌ Missed', turnover: '—', tax: '—', status: 'missed' },
    { period: 'Sep 2024', gstr1: '✅ Filed', gstr3b: '✅ Filed', turnover: '₹3.1 Cr', tax: '₹17.9 L', status: 'compliant' },
  ];

  const statusColor = { compliant: 'text-emerald-600 bg-emerald-50', late: 'text-amber-600 bg-amber-50', missed: 'text-red-600 bg-red-50' };

  return (
    <div className="p-6 space-y-5">
      {/* GST Identity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">GST Registrations</h3>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">GSTIN</p>
                <p className="fin-mono text-sm font-semibold text-slate-800 mt-0.5">27ABCCS1234K1ZP</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">State</p>
                <p className="text-sm font-medium text-slate-700 mt-0.5">Maharashtra</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Registration Date</p>
                <p className="fin-mono text-sm font-medium text-slate-700 mt-0.5">Jan 15, 2017</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Status</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh from GSTN
          </button>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Compliance Score', value: '83%', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Filed on Time', value: '10 / 12', icon: Clock, color: 'text-blue-600 bg-blue-50' },
          { label: 'Late Filings', value: '1', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
          { label: 'Missed Filings', value: '1', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="fin-mono text-lg font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filing Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Filing History</h3>
          <select className="text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white focus:outline-none">
            <option>FY 2024-25</option><option>FY 2023-24</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['Period', 'GSTR-1', 'GSTR-3B', 'Turnover', 'Tax Liability', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 fin-mono text-xs font-medium text-slate-700">{r.period}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{r.gstr1}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{r.gstr3b}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-700">{r.turnover}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-700">{r.tax}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${statusColor[r.status as keyof typeof statusColor]}`}>
                      {r.status}
                    </span>
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

// ── Credit Report ──────────────────────────────────────────
function CreditReport() {
  return (
    <div className="p-6 space-y-5">
      {/* Bureau Scores */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { bureau: 'CIBIL', score: 742, max: 900, color: 'from-emerald-400 to-emerald-600', label: 'Good', desc: 'Last pulled: Mar 10, 2025' },
          { bureau: 'CRIF', score: 708, max: 900, color: 'from-blue-400 to-blue-600', label: 'Fair', desc: 'Last pulled: Feb 28, 2025' },
          { bureau: 'Experian', score: 735, max: 900, color: 'from-indigo-400 to-indigo-600', label: 'Good', desc: 'Last pulled: Mar 5, 2025' },
        ].map(({ bureau, score, max, color, label, desc }) => {
          const pct = (score / max) * 100;
          return (
            <div key={bureau} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{bureau}</p>
                  <p className="fin-mono text-3xl font-bold text-slate-900 mt-1">{score}</p>
                  <span className="text-xs font-medium text-emerald-600">{label}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700">
                  <RefreshCw className="w-3 h-3" /> Pull
                </button>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>300</span><span>{max}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">{desc}</p>
            </div>
          );
        })}
      </div>

      {/* Active Loans */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Active Credit Facilities</h3>
          <span className="text-xs text-slate-400">As per CIBIL report</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['Lender', 'Type', 'Sanctioned', 'Outstanding', 'Overdue', 'DPD', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { lender: 'HALO Capital', type: 'Term Loan', sanctioned: '₹50 Cr', outstanding: '₹50 Cr', overdue: '—', dpd: '0', status: 'Active' },
                { lender: 'Axis Bank', type: 'CC Limit', sanctioned: '₹5 Cr', outstanding: '₹3.2 Cr', overdue: '—', dpd: '0', status: 'Active' },
                { lender: 'HDFC Bank', type: 'OD Facility', sanctioned: '₹2 Cr', outstanding: '₹0.8 Cr', overdue: '—', dpd: '0', status: 'Active' },
                { lender: 'Kotak Mahindra', type: 'Term Loan', sanctioned: '₹8 Cr', outstanding: '₹1.4 Cr', overdue: '—', dpd: '0', status: 'Closed' },
              ].map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-3.5 text-xs font-medium text-slate-700 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />{r.lender}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600">{r.type}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-700">{r.sanctioned}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs font-medium text-slate-800">{r.outstanding}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-500">{r.overdue}</td>
                  <td className="px-5 py-3.5 fin-mono text-xs text-slate-600">{r.dpd}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiries */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Recent Enquiries (Last 6 months)</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="fin-mono text-2xl font-bold text-slate-900">3</p>
            <p className="text-xs text-slate-500 mt-0.5">Total enquiries</p>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { lender: 'HALO Capital', date: 'Mar 8, 2025', purpose: 'Term Loan' },
              { lender: 'Axis Bank', date: 'Jan 15, 2025', purpose: 'CC Enhancement' },
              { lender: 'RBL Bank', date: 'Dec 3, 2024', purpose: 'Term Loan' },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-4 text-xs text-slate-600">
                <span className="fin-mono text-slate-400 w-28">{e.date}</span>
                <span className="font-medium">{e.lender}</span>
                <span className="text-slate-400">·</span>
                <span>{e.purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Covenants ─────────────────────────────────────────────
const COV_STATUS = {
  compliant: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', label: 'Compliant' },
  due: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-400', label: 'Due Soon' },
  breached: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500', label: 'Breached' },
};

function Covenants() {
  const [addOpen, setAddOpen] = useState(false);
  const [view, setView] = useState<'documented' | 'internal'>('documented');

  const covenants = [
    { id: 'c1', type: 'Financial', name: 'Debt Service Coverage Ratio', frequency: 'Quarterly', value: '1.25x', actual: '1.42x', dueDate: 'Mar 31, 2025', status: 'compliant' as const },
    { id: 'c2', type: 'Financial', name: 'Debt-to-Equity Ratio', frequency: 'Quarterly', value: '≤ 3.0x', actual: '2.8x', dueDate: 'Mar 31, 2025', status: 'compliant' as const },
    { id: 'c3', type: 'Operational', name: 'Quarterly MIS Submission', frequency: 'Quarterly', value: 'Within 45 days', actual: 'Pending', dueDate: 'Apr 15, 2025', status: 'due' as const },
    { id: 'c4', type: 'Financial', name: 'Current Ratio', frequency: 'Annual', value: '≥ 1.1x', actual: '0.98x', dueDate: 'Mar 31, 2025', status: 'breached' as const },
  ];

  const summary = { compliant: covenants.filter(c => c.status === 'compliant').length, due: covenants.filter(c => c.status === 'due').length, breached: covenants.filter(c => c.status === 'breached').length };

  return (
    <div className="p-6 space-y-5">
      {/* Health banner */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Compliant', value: summary.compliant, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { label: 'Due Soon', value: summary.due, icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
          { label: 'Breached', value: summary.breached, icon: AlertTriangle, color: 'text-red-600 bg-red-50 border-red-100' },
          { label: 'Total Active', value: covenants.length, icon: FileText, color: 'text-blue-600 bg-blue-50 border-blue-100' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`rounded-xl border p-4 flex items-center gap-3 ${color.split(' ').slice(1).join(' ')}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color.split(' ')[0]} ${color.split(' ')[1]}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="fin-mono text-xl font-bold">{value}</p>
              <p className="text-xs font-medium mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden">
            {(['documented', 'internal'] as const).map((t) => (
              <button key={t} onClick={() => setView(t)}
                className={`px-4 py-1.5 text-xs font-medium transition-colors capitalize ${view === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                {t}
              </button>
            ))}
          </div>
          <button onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Covenant
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {['Type', 'Covenant', 'Frequency', 'Required', 'Actual', 'Due Date', 'Status'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {covenants.map((c) => {
                const s = COV_STATUS[c.status];
                return (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{c.type}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium text-slate-800">{c.name}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{c.frequency}</td>
                    <td className="px-5 py-3.5 fin-mono text-xs text-slate-700">{c.value}</td>
                    <td className="px-5 py-3.5 fin-mono text-xs font-semibold text-slate-800">{c.actual}</td>
                    <td className="px-5 py-3.5 fin-mono text-xs text-slate-500">{c.dueDate}</td>
                    <td className="px-5 py-3.5">
                      <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border w-fit ${s.bg} ${s.text} ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Covenant Modal */}
      {addOpen && <AddCovenantModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}

// ── Main FinancialsTab ────────────────────────────────────
// ── Repayment Schedule ──────────────────────────────────────
function UploadRepaymentModal({ onUpload, onClose }: { onUpload: (files: File[]) => void; onClose: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPending(Array.from(e.target.files ?? []));
    e.target.value = '';
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col">
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Upload Template</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="px-7 py-6 space-y-4">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 px-5 py-8 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
            >
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm font-medium text-slate-600">Add from Local Folder</span>
              <span className="text-xs text-slate-400">xlsx, xls, csv, pdf supported</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls,.csv,.pdf"
              multiple
              className="hidden"
              onChange={handleChange}
            />
            {pending.length > 0 && (
              <div className="space-y-1.5">
                {pending.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-700">
                    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span className="truncate flex-1">{f.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-7 pb-6 flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button
              onClick={() => { if (pending.length > 0) { onUpload(pending); onClose(); } }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors ${pending.length > 0 ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function RepaymentSchedule() {
  const [facility, setFacility] = useState('');
  const [disbursement, setDisbursement] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUpload = (files: File[]) => {
    setUploadedFiles(prev => [
      ...prev,
      ...files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' })),
    ]);
  };

  const FACILITIES = ['SV4280_T1', 'SV4156_T1', 'SV4280_T2'];
  const DISBURSEMENTS = ['DISB-001 · Mar 15, 2025', 'DISB-002 · Apr 10, 2025'];

  const scheduleRows = [
    { date: 'Apr 30, 2025', opening: '50,00,00,000', disb: '50,00,00,000', principal: '0', interest: '34,24,658', cmInterest: '0', closing: '50,00,00,000', ncf: '-34,24,658' },
    { date: 'May 31, 2025', opening: '50,00,00,000', disb: '0', principal: '2,77,77,778', interest: '33,97,260', cmInterest: '0', closing: '47,22,22,222', ncf: '-36,75,038' },
    { date: 'Jun 30, 2025', opening: '47,22,22,222', disb: '0', principal: '2,77,77,778', interest: '32,08,219', cmInterest: '0', closing: '44,44,44,444', ncf: '-35,86,897' },
    { date: 'Jul 31, 2025', opening: '44,44,44,444', disb: '0', principal: '2,77,77,778', interest: '30,19,178', cmInterest: '0', closing: '41,66,66,667', ncf: '-32,96,956' },
  ];

  const disbDetails = [
    { approve: 'Pending', status: 'Under Review', date: 'Mar 15, 2025', amount: '50.00', coupon: '8.00%', pf: '1.00%', fees: '50,00,000' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Selectors + Actions */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Facilities Request:</label>
            <select
              value={facility}
              onChange={e => setFacility(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 min-w-[160px]"
            >
              <option value="">select</option>
              {FACILITIES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">Disbursement Request:</label>
            <select
              value={disbursement}
              onChange={e => setDisbursement(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 min-w-[200px]"
            >
              <option value="">select</option>
              {DISBURSEMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete
          </button>
          <a
            href="/repaymentTemplate1.xlsx"
            download="repaymentTemplate1.xlsx"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Template
          </a>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Upload Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">File Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Download</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-sm text-slate-400">No files uploaded yet</td>
              </tr>
            ) : (
              uploadedFiles.map((f, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-800 font-medium">{f.name} <span className="text-xs text-slate-400 ml-1">({f.size})</span></td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Disbursement Details Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Disbursement Details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Approve / Reject', 'Approval Status', 'Date Of Disbursement', 'Tranche Amount (INR to Cr)', 'Coupon Rate', 'PF (%)', 'Processing Fees'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disbDetails.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors">Approve</button>
                      <button className="px-2.5 py-1 text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors">Reject</button>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">{r.status}</span></td>
                  <td className="px-4 py-3 fin-mono text-slate-700">{r.date}</td>
                  <td className="px-4 py-3 fin-mono font-semibold text-slate-800">₹{r.amount} Cr</td>
                  <td className="px-4 py-3 fin-mono text-emerald-700 font-semibold">{r.coupon}</td>
                  <td className="px-4 py-3 fin-mono text-slate-700">{r.pf}</td>
                  <td className="px-4 py-3 fin-mono text-slate-700">₹{r.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Repayment Schedule</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Date', 'Opening Balance', 'Disbursement', 'Principle', 'Interest', 'CM Interest Outflow', 'Closing Balance', 'Net Cash Flow'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 fin-mono text-slate-700 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3 fin-mono text-slate-800 text-right">₹{r.opening}</td>
                  <td className={`px-4 py-3 fin-mono text-right font-semibold ${r.disb !== '0' ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {r.disb !== '0' ? `₹${r.disb}` : '—'}
                  </td>
                  <td className="px-4 py-3 fin-mono text-slate-700 text-right">{r.principal !== '0' ? `₹${r.principal}` : '—'}</td>
                  <td className="px-4 py-3 fin-mono text-red-600 text-right">₹{r.interest}</td>
                  <td className="px-4 py-3 fin-mono text-slate-400 text-right">{r.cmInterest !== '0' ? `₹${r.cmInterest}` : '—'}</td>
                  <td className="px-4 py-3 fin-mono font-semibold text-slate-800 text-right">₹{r.closing}</td>
                  <td className="px-4 py-3 fin-mono font-semibold text-red-600 text-right">{r.ncf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showUploadModal && (
        <UploadRepaymentModal
          onUpload={handleUpload}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}

const SUB_TABS: { id: SubTab; label: string }[] = [
  { id: 'bank-statement', label: 'Bank Statement' },
  { id: 'gst', label: 'GST' },
  { id: 'credit', label: 'Credit Report' },
  { id: 'covenants', label: 'Covenants' },
  { id: 'repayment', label: 'Repayment Schedule' },
];

export default function FinancialsTab({ initialSubTab }: { initialSubTab?: SubTab }) {
  const [sub, setSub] = useState<SubTab>(initialSubTab ?? 'bank-statement');

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Sub-tab bar */}
      <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-1">
        {SUB_TABS.map(({ id, label }) => (
          <button key={id} onClick={() => setSub(id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              sub === id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}>
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {sub === 'bank-statement' && <BankStatement />}
        {sub === 'gst' && <GSTPage />}
        {sub === 'credit' && <CreditReport />}
        {sub === 'covenants' && <Covenants />}
        {sub === 'repayment' && <RepaymentSchedule />}
      </div>
    </div>
  );
}
