import { useState, useRef, useEffect } from 'react';
import { Search, Plus, ChevronDown, X, Filter, Upload, MoreVertical } from 'lucide-react';

// ── Templates data ────────────────────────────────────────────
const TEMPLATES = [
  'Fund II_Disclosing Party_V1',
  'Fund II_Tripartite NDA_V1',
  'Fund 3_Disclosing Party_V1',
  'Fund 3_Tripartite NDA_V1',
  'SVL_Disclosing Party_V1_GCC',
  'SVL_Tripartite NDA_V1_GCC',
  'UK_Mutual NDA',
  'Fund II_Receiving Party_V1',
  'Fund II_Mutual NDA_V1',
  'Fund 3_Mutual NDA_V1',
  'Fund 3_Receiving Party_V1',
  'SVL_Receiving Party_V1',
  'SVL_Mutual NDA_v1',
  'Stride UK NDA _Disclosing Party _ Company',
  'Stride UK NDA _Receiving Party _ Company',
  'Stride UK NDA _Disclosing Party _ Individual',
  'Stride UK NDA _Receiving Party _ Individual',
  'Fund 4_Receiving Party_v1',
  'Fund 4_Disclosing Party_v1',
  'Fund 4_Mutual NDA_v1',
  'Fund 4_Tripartite NDA_v1',
];

// ── Add Template Modal ────────────────────────────────────────
function AddTemplateModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col">
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Add Template</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="px-7 py-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                Template Name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white placeholder:text-slate-300"
              />
            </div>

            <div>
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex items-center gap-3 px-5 py-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors text-slate-600 text-sm font-medium"
              >
                <Upload className="w-5 h-5 text-slate-400" />
                {file ? file.name : 'Upload Template File'}
              </button>
              <input ref={fileRef} type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
            </div>
          </div>

          <div className="px-7 pb-6">
            <button className="w-full py-3 text-sm font-semibold text-slate-400 bg-slate-100 rounded-xl hover:bg-slate-200 hover:text-slate-700 transition-colors">
              Add Template
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── View Templates Modal ──────────────────────────────────────
function ViewTemplatesModal({ onClose }: { onClose: () => void }) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh]">
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">View Templates</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 w-16">
                    <span className="flex items-center gap-1">S. No <Filter className="w-3 h-3 text-slate-300" /></span>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1">Template Name <Filter className="w-3 h-3 text-slate-300" /></span>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 w-24">
                    <span className="flex items-center gap-1">Actions <Filter className="w-3 h-3 text-slate-300" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TEMPLATES.map((name, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-100 transition-colors ${openMenu === i ? 'bg-indigo-50/60' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-6 py-4 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-4 text-slate-800">{name}</td>
                    <td className="px-4 py-4">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenu(openMenu === i ? null : i)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </button>
                        {openMenu === i && (
                          <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-xl border border-slate-100 z-10 overflow-hidden">
                            {['Edit', 'Delete', 'Download'].map(action => (
                              <button
                                key={action}
                                onClick={() => setOpenMenu(null)}
                                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Sample data ──────────────────────────────────────────────
const NDAS = [
  { id: 1, brand: 'Sid\'s Company', sentTo: 'Ritesh Kumar', sentOn: '10 Mar 2026', signingStatus: 'Completed', individualStatus: 'Ritesh: SIGNED', teammates: 'Apoorva Sharma' },
  { id: 2, brand: 'WeRize WFin', sentTo: 'Amit Kumar', sentOn: '8 Mar 2026', signingStatus: 'In Progress', individualStatus: 'Amit: UNSIGNED', teammates: 'Nipun Koshi' },
  { id: 3, brand: 'Alpha Capital', sentTo: 'Rajesh Gupta', sentOn: '5 Mar 2026', signingStatus: 'Completed', individualStatus: 'Rajesh: SIGNED', teammates: 'Apoorva Sharma' },
  { id: 4, brand: 'Beta Ventures', sentTo: 'Priya Nair', sentOn: '3 Mar 2026', signingStatus: 'Unopened', individualStatus: 'Priya: UNOPENED', teammates: 'Siddharth Manohar' },
  { id: 5, brand: 'Gamma Fintech', sentTo: 'Rohan Mehta', sentOn: '1 Mar 2026', signingStatus: 'Completed', individualStatus: 'Rohan: SIGNED', teammates: 'Nipun Koshi' },
];

const SIGNING_STATUS_STYLE: Record<string, string> = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Unopened: 'bg-slate-50 text-slate-500 border-slate-200',
};

// ── Add New Company Modal ────────────────────────────────────
function AddCompanyModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    companyName: '',
    companyUrl: '',
    legalName: '',
    basedOutOf: '',
    representatives: '',
    currencyType: '',
    currencyFigureType: '',
  });
  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = 'w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white placeholder:text-slate-300';
  const selectCls = `${inputCls} appearance-none`;
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
  const req = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Add New Company</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">
            {/* Company Name */}
            <div>
              <label className={labelCls}>Company Name {req}</label>
              <input value={form.companyName} onChange={set('companyName')} placeholder="Name" className={inputCls} />
            </div>

            {/* Company URL */}
            <div>
              <label className={labelCls}>Company URL {req}</label>
              <input value={form.companyUrl} onChange={set('companyUrl')} placeholder="URL" className={inputCls} />
            </div>

            {/* Legal Name Of Entity */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`${labelCls} mb-0`}>Legal Name Of Entity {req}</label>
                <button className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-3 h-3" /> Add New
                </button>
              </div>
              <div className="relative">
                <select value={form.legalName} onChange={set('legalName')} className={selectCls}>
                  <option value="">Select</option>
                  <option>Sid's Company Pvt Ltd</option>
                  <option>WeRize Financial Services</option>
                  <option>Alpha Capital Partners</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Company Based Out Of */}
            <div>
              <label className={labelCls}>Company Based Out Of {req}</label>
              <div className="relative">
                <select value={form.basedOutOf} onChange={set('basedOutOf')} className={selectCls}>
                  <option value="">Select</option>
                  <option>India</option>
                  <option>KSA</option>
                  <option>SE Asia</option>
                  <option>UAE</option>
                  <option>UK</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Representatives */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`${labelCls} mb-0`}>Representatives {req}</label>
                <button className="flex items-center gap-1 text-xs font-semibold text-white bg-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <textarea value={form.representatives} onChange={set('representatives')} rows={3} className={`${inputCls} resize-none`} />
            </div>

            {/* Currency Type | Currency Figure Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Company Currency Type {req}</label>
                <div className="relative">
                  <select value={form.currencyType} onChange={set('currencyType')} className={selectCls}>
                    <option value="">Select</option>
                    <option>INR</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>AED</option>
                    <option>SAR</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div>
                <label className={labelCls}>Company Currency Figure Type {req}</label>
                <div className="relative">
                  <select value={form.currencyFigureType} onChange={set('currencyFigureType')} className={selectCls}>
                    <option value="">Select</option>
                    <option>NA</option>
                    <option>Bn</option>
                    <option>Cr</option>
                    <option>Lac</option>
                    <option>Mn</option>
                    <option>OTH</option>
                    <option>Th</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-7 py-5 border-t border-slate-100">
            <button className="w-full py-3 text-sm font-semibold text-slate-400 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors">
              Add Company
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main ESign Page ──────────────────────────────────────────
export default function ESignPage() {
  const [docTab, setDocTab] = useState<'nda' | 'general'>('nda');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [showViewTemplates, setShowViewTemplates] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showActions) return;
    const handler = (e: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
        setShowActions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showActions]);

  const filtered = NDAS.filter(n =>
    (filter === 'All' || n.signingStatus === filter) &&
    (n.brand.toLowerCase().includes(search.toLowerCase()) ||
     n.sentTo.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Esign</h1>
            <p className="text-sm text-slate-500 mt-0.5">Total {NDAS.length * 30} NDAs</p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCompany(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Company
            </button>
            <div className="relative" ref={actionsRef}>
              <button
                onClick={() => setShowActions(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Actions <ChevronDown className="w-4 h-4" />
              </button>
              {showActions && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 z-30 overflow-hidden">
                  {[
                    { label: 'Send NDA', action: () => {} },
                    { label: 'Send General Document', action: () => {} },
                    { label: 'Add Template', action: () => setShowAddTemplate(true) },
                    { label: 'View Templates', action: () => setShowViewTemplates(true) },
                  ].map(({ label, action }) => (
                    <button
                      key={label}
                      onClick={() => { setShowActions(false); action(); }}
                      className="w-full text-left px-5 py-3.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 px-8 py-3 flex items-center justify-between">
        {/* Status filter */}
        <div className="relative">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm font-medium border border-slate-200 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
          >
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Unopened</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* NDA / General Document tabs */}
        <div className="flex items-center gap-6">
          {(['nda', 'general'] as const).map(t => (
            <button
              key={t}
              onClick={() => setDocTab(t)}
              className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                docTab === t ? 'border-slate-800 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {t === 'nda' ? 'NDA' : 'General Document'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-8 py-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                {[
                  'Brand Name', 'Sent To', 'Sent On',
                  'Signing Status', 'Individual Status',
                  'Notified Teammates', 'Actions',
                ].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      {h}
                      {h !== 'Actions' && <Filter className="w-3 h-3 text-slate-300" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">No records found</td>
                </tr>
              ) : (
                filtered.map(row => (
                  <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800">{row.brand}</td>
                    <td className="px-5 py-4 text-slate-600">{row.sentTo}</td>
                    <td className="px-5 py-4 text-slate-500 fin-mono text-xs">{row.sentOn}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${SIGNING_STATUS_STYLE[row.signingStatus] ?? 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {row.signingStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-600">{row.individualStatus}</td>
                    <td className="px-5 py-4 text-xs text-slate-600">{row.teammates}</td>
                    <td className="px-5 py-4">
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddCompany && <AddCompanyModal onClose={() => setShowAddCompany(false)} />}
      {showAddTemplate && <AddTemplateModal onClose={() => setShowAddTemplate(false)} />}
      {showViewTemplates && <ViewTemplatesModal onClose={() => setShowViewTemplates(false)} />}
    </div>
  );
}
