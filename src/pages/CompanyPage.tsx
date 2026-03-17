import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DocsTab from './tabs/DocsTab';
import FinancialsTab from './tabs/FinancialsTab';
import CamTab from './tabs/CamTab';
import AddApprovalSheet, { APPROVAL_TYPES, APPROVAL_STATUSES } from './tabs/AddApprovalSheet';
import AddFacilitySheet from './tabs/AddFacilitySheet';
import AddTrancheModal from './tabs/AddTrancheModal';
import {
  ArrowLeft, Building2, Users, MapPin, Calendar, Banknote, Percent, Clock,
  AlertCircle, Plus, Upload, CheckCircle, XCircle, RotateCcw, MessageSquare,
  ChevronRight, FileText, Shield, DollarSign, ChevronDown, TrendingUp, Zap,
} from 'lucide-react';

const COMPANY_DATA: Record<string, {
  name: string; sector: string; pan: string; location: string; phone: string;
  since: string; stRating: string; sanction: string; roi: string; tenor: string;
  pending: number; initials: string; color: string; healthScore: number;
  spocs: { name: string; email: string; dept: string }[];
  founders: { name: string; role: string; dob: string }[];
  approvals: {
    id: string; from: string; initials: string; subject: string; type: string;
    status: 'pending' | 'approved' | 'rejected' | 'sent_back';
    date: string; overdue?: string;
    messages: { author: string; initials: string; text: string; time: string }[];
  }[];
}> = {
  'sids-company': {
    name: "Sid's Company", sector: 'Fintech / Lending', pan: 'ABCCS1234K',
    location: 'Pithora', phone: '9873645833', since: 'Jan 2017', stRating: 'ST 7',
    sanction: '₹50 Cr', roi: '8%', tenor: '18 mo', pending: 2,
    initials: 'SC', color: 'from-indigo-500 to-violet-600', healthScore: 78,
    spocs: [
      { name: 'Apoorva Sharma', email: 'apoorva@halo.in', dept: 'Credit' },
      { name: 'Nipun Koshi', email: 'nipun@halo.in', dept: 'Operations' },
    ],
    founders: [{ name: 'Ritesh', role: 'Partner', dob: 'Jan 10, 2016' }],
    approvals: [
      { id: 'apr-1', from: 'Niranjan Rathi', initials: 'NR', subject: 'Due date extension for Q1 disbursement', type: 'Broad Terms Issuance', status: 'pending', date: 'Mar 10', overdue: '6 days', messages: [{ author: 'Niranjan Rathi', initials: 'NR', text: 'Done', time: 'Mar 10, 3:29 PM' }] },
      { id: 'apr-2', from: 'Siddharth Manohar', initials: 'SM', subject: 'CAM review for revised terms', type: 'CAM Approval', status: 'pending', date: 'Mar 10', messages: [] },
    ],
  },
  'werize-wfin': {
    name: 'WeRize WFin', sector: 'NBFC / Consumer', pan: 'WFNBC5678K',
    location: 'Mumbai', phone: '9876543210', since: 'Mar 2019', stRating: 'ST 5',
    sanction: '₹120 Cr', roi: '10.5%', tenor: '24 mo', pending: 0,
    initials: 'WW', color: 'from-emerald-500 to-teal-600', healthScore: 91,
    spocs: [{ name: 'Priya Nair', email: 'priya@halo.in', dept: 'Credit' }, { name: 'Rohan Mehta', email: 'rohan@halo.in', dept: 'Legal' }],
    founders: [{ name: 'Amit Kumar', role: 'CEO', dob: 'Apr 5, 2019' }],
    approvals: [],
  },
  'alpha-capital': {
    name: 'Alpha Capital', sector: 'PE / Debt Fund', pan: 'ALPHX9900K',
    location: 'Delhi', phone: '9811223344', since: 'Jun 2021', stRating: 'ST 3',
    sanction: '₹200 Cr', roi: '12%', tenor: '36 mo', pending: 5,
    initials: 'AC', color: 'from-amber-500 to-orange-600', healthScore: 62,
    spocs: [{ name: 'Arjun Verma', email: 'arjun@halo.in', dept: 'Credit' }, { name: 'Sneha Joshi', email: 'sneha@halo.in', dept: 'Operations' }],
    founders: [{ name: 'Rajesh Gupta', role: 'Managing Partner', dob: 'Jun 1, 2021' }],
    approvals: [],
  },
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: Building2 },
  { id: 'company', label: 'Company', icon: Users },
  { id: 'compliance', label: 'Approval Workflow', icon: Shield },
  { id: 'financials', label: 'Financials', icon: DollarSign },
  { id: 'docs', label: 'Docs', icon: FileText },
  { id: 'cam', label: 'CAM', icon: FileText },
];

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400',   bar: 'border-l-amber-400' },
  approved:  { label: 'Approved',  bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', bar: 'border-l-emerald-500' },
  rejected:  { label: 'Rejected',  bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-500',     bar: 'border-l-red-500' },
  sent_back: { label: 'Sent Back', bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  dot: 'bg-orange-400',  bar: 'border-l-orange-400' },
};

const AVATAR_COLORS = ['from-indigo-400 to-indigo-600', 'from-violet-400 to-violet-600', 'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500', 'from-rose-400 to-pink-500', 'from-blue-400 to-blue-600'];
const avatarColor = (s: string) => AVATAR_COLORS[s.charCodeAt(0) % AVATAR_COLORS.length];

const ACTIVITY = [
  { actor: 'Niranjan Rathi', initials: 'NR', action: 'posted approval request', target: 'Broad Terms', time: '3h ago', color: 'from-indigo-400 to-indigo-600' },
  { actor: 'Apoorva Sharma', initials: 'AS', action: 'pulled credit report', target: 'Ritesh', time: '2d ago', color: 'from-violet-400 to-violet-600' },
  { actor: 'Nipun Koshi', initials: 'NK', action: 'uploaded transaction doc', target: 'DTD_0001', time: '3d ago', color: 'from-teal-400 to-teal-600' },
  { actor: 'Siddharth Manohar', initials: 'SM', action: 'updated facility terms', target: 'SV4280_T1', time: '4d ago', color: 'from-blue-400 to-blue-600' },
];

export default function CompanyPage() {
  const { id = 'sids-company' } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [replyText, setReplyText] = useState('');
  const [showApprovalSheet, setShowApprovalSheet] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [companySubTab, setCompanySubTab] = useState<'details' | 'captable' | 'crime' | 'facility'>('details');
  const [capEntryMode, setCapEntryMode] = useState<'manual' | 'upload'>('manual');
  const [capSubTab, setCapSubTab] = useState<'funding' | 'shareholding'>('funding');
  const [expandedFacility, setExpandedFacility] = useState<string | null>('SV4156_T1');
  const [showAddFacility, setShowAddFacility] = useState(false);
  const [addTrancheFacilityId, setAddTrancheFacilityId] = useState<string | null>(null);
  const [financialsInitialSubTab, setFinancialsInitialSubTab] = useState<'bank-statement' | 'gst' | 'credit' | 'covenants' | 'repayment'>('bank-statement');

  const company = COMPANY_DATA[id] ?? COMPANY_DATA['sids-company'];
  const filteredApprovals = company.approvals.filter((a) => {
    const statusMatch = filterStatus === 'all' || a.status === filterStatus;
    const typeMatch = filterType === 'all' || a.type === filterType;
    return statusMatch && typeMatch;
  });
  const activeApproval = company.approvals.find((a) => a.id === selectedApproval);
  const healthDeg = company.healthScore * 3.6;
  const healthColor = company.healthScore >= 80 ? '#10b981' : company.healthScore >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        {/* Accent strip */}
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

        <div className="px-7 pt-4 pb-0">
          {/* Breadcrumb */}
          <button onClick={() => navigate('/portfolio')} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors mb-3 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Portfolio
          </button>

          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-lg ring-4 ring-white`}>
              {company.initials}
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5">
                <h1 className="text-[22px] font-display font-bold text-slate-900 tracking-tight">{company.name}</h1>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{company.stRating}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                {[
                  { icon: Building2, text: company.sector },
                  { icon: MapPin, text: company.location },
                  { icon: Calendar, text: `Since ${company.since}` },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-1 text-xs text-slate-500">
                    <Icon className="w-3 h-3 text-slate-400" />{text}
                  </span>
                ))}
                <span className="text-xs text-slate-400 fin-mono">{company.pan}</span>
              </div>
            </div>

            {/* KPI strip */}
            <div className="hidden lg:flex items-stretch gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              {[
                { icon: Banknote, label: 'Sanction', value: company.sanction, color: 'text-indigo-600', hover: 'hover:bg-indigo-50/60' },
                { icon: Percent, label: 'ROI', value: company.roi, color: 'text-emerald-600', hover: 'hover:bg-emerald-50/60' },
                { icon: Clock, label: 'Tenor', value: company.tenor, color: 'text-blue-600', hover: 'hover:bg-blue-50/60' },
                { icon: AlertCircle, label: 'Pending', value: `${company.pending}`, color: company.pending > 0 ? 'text-amber-600' : 'text-slate-400', hover: 'hover:bg-amber-50/60' },
              ].map(({ icon: Icon, label, value, color, hover }) => (
                <div key={label} className={`flex flex-col items-center justify-center px-5 py-3 bg-white cursor-default transition-colors ${hover}`}>
                  <p className={`fin-mono text-[17px] font-bold leading-none ${color}`}>{value}</p>
                  <div className={`flex items-center gap-1 mt-1.5 ${color}`}>
                    <Icon className="w-3 h-3 opacity-70" />
                    <p className="text-[9px] uppercase tracking-widest font-semibold opacity-70">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab bar — pill style */}
          <div className="flex gap-0.5 mt-4">
            {TABS.map(({ id: tabId, label, icon: Icon }) => {
              const isActive = activeTab === tabId;
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveTab(tabId)}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 border-b-2 border-indigo-500'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 border-b-2 border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {tabId === 'compliance' && company.pending > 0 && (
                    <span className="text-[9px] font-bold bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                      {company.pending}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-7 fade-up-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

              {/* Deal Health */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Deal Health</p>
                <div className="flex items-center gap-5">
                  {/* Conic ring */}
                  <div className="relative shrink-0 w-24 h-24">
                    <div
                      className="w-24 h-24 rounded-full"
                      style={{ background: `conic-gradient(${healthColor} ${healthDeg}deg, #e2e8f0 0deg)` }}
                    />
                    <div className="absolute inset-[6px] bg-white rounded-full flex flex-col items-center justify-center">
                      <span className="fin-mono text-xl font-bold" style={{ color: healthColor }}>{company.healthScore}</span>
                      <span className="text-[9px] text-slate-400 font-medium">/ 100</span>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[
                      { label: 'Sanctions Used', value: '0%', color: 'bg-indigo-500', w: 'w-0' },
                      { label: 'Compliance', value: '90%', color: 'bg-emerald-500', w: 'w-[90%]' },
                      { label: 'Docs Approved', value: '75%', color: 'bg-blue-500', w: 'w-[75%]' },
                    ].map(({ label, value, color, w }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-500">{label}</span>
                          <span className="font-semibold text-slate-700 fin-mono">{value}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${color} ${w} transition-all`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  {[
                    { icon: Banknote, label: 'Sanction', value: company.sanction, color: 'text-indigo-600 bg-indigo-50' },
                    { icon: TrendingUp, label: 'ROI', value: company.roi, color: 'text-emerald-600 bg-emerald-50' },
                    { icon: Clock, label: 'Tenor', value: company.tenor, color: 'text-blue-600 bg-blue-50' },
                    { icon: Zap, label: 'Pending', value: `${company.pending} actions`, color: 'text-amber-600 bg-amber-50' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className={`flex items-center gap-2 p-2.5 rounded-xl ${color.split(' ')[1]}`}>
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${color.split(' ')[0]}`} />
                      <div className="min-w-0">
                        <p className={`fin-mono text-sm font-bold ${color.split(' ')[0]} leading-none`}>{value}</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
                <div className="space-y-2">
                  {[
                    { icon: Plus, label: 'Add Approval Request', sub: 'Start a new workflow', gradient: 'from-indigo-500 to-violet-500', action: () => setActiveTab('compliance') },
                    { icon: Upload, label: 'Upload Document', sub: 'Add to document vault', gradient: 'from-blue-500 to-cyan-500', action: () => setActiveTab('docs') },
                    { icon: DollarSign, label: 'View Repayment Schedule', sub: 'Check payment timeline', gradient: 'from-emerald-500 to-teal-500', action: () => { setFinancialsInitialSubTab('repayment'); setActiveTab('financials'); } },
                    { icon: Plus, label: 'Add Covenant', sub: 'Log key covenant', gradient: 'from-rose-500 to-pink-500', action: () => { setFinancialsInitialSubTab('covenants'); setActiveTab('financials'); } },
                  ].map(({ icon: Icon, label, sub, gradient, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all group"
                    >
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">{label}</p>
                        <p className="text-xs text-slate-400">{sub}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Recent Activity</p>
                <div className="space-y-0">
                  {ACTIVITY.map(({ actor, initials, action, target, time, color }, i) => (
                    <div key={i} className="flex gap-3 pb-4 relative">
                      {i < ACTIVITY.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-100" />
                      )}
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-[10px] font-bold shrink-0 z-10`}>
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm text-slate-700 leading-snug">
                          <span className="font-semibold text-slate-900">{actor}</span> {action}{' '}
                          <span className="text-indigo-600 font-medium">{target}</span>
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 fin-mono">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── COMPANY ── */}
        {activeTab === 'company' && (
          <div className="flex flex-col flex-1 min-h-0 fade-up-2">
            {/* Sub-tab bar */}
            <div className="bg-white border-b border-slate-200 px-6 flex items-center gap-0">
              {[
                { id: 'details', label: 'Company Details' },
                { id: 'captable', label: 'Cap Table & Shareholding' },
                { id: 'crime', label: 'Crime Check Verification' },
                { id: 'facility', label: 'Facility Details' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setCompanySubTab(id as typeof companySubTab)}
                  className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    companySubTab === id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Company Details ── */}
            {companySubTab === 'details' && (
              <div className="flex-1 overflow-y-auto p-7">
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className={`h-1.5 bg-gradient-to-r ${company.color}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-slate-700">Company Information</h2>
                        <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700">Edit <ChevronRight className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md`}>
                          {company.initials}
                        </div>
                        <div className="grid grid-cols-3 gap-x-10 gap-y-4 flex-1">
                          {[
                            { label: 'Company Name', value: company.name, mono: false },
                            { label: 'Sector', value: company.sector, mono: false },
                            { label: 'ST Rating', value: company.stRating, mono: true },
                            { label: 'PAN Number', value: company.pan, mono: true },
                            { label: 'Phone', value: company.phone, mono: true },
                            { label: 'Location', value: company.location, mono: false },
                            { label: 'Incorporated', value: company.since, mono: false },
                          ].map(({ label, value, mono }) => (
                            <div key={label}>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">{label}</p>
                              <p className={`text-sm font-semibold text-slate-800 ${mono ? 'fin-mono' : ''}`}>{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-700">Founders & Directors</h2>
                        <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Plus className="w-3.5 h-3.5" /> Add</button>
                      </div>
                      <div className="space-y-2.5">
                        {company.founders.map((f) => (
                          <div key={f.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor(f.name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                              {f.name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                              <p className="text-xs text-slate-500">{f.role} · <span className="fin-mono">{f.dob}</span></p>
                            </div>
                          </div>
                        ))}
                        {company.founders.length === 0 && <p className="text-xs text-slate-400 text-center py-6">No founders added yet</p>}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-slate-700">SPOCs</h2>
                        <button className="flex items-center gap-1 text-xs text-indigo-600 font-medium hover:text-indigo-700"><Plus className="w-3.5 h-3.5" /> Add</button>
                      </div>
                      <div className="space-y-2.5">
                        {company.spocs.map((s) => (
                          <div key={s.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarColor(s.name)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                              {s.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                              <p className="text-xs text-slate-500">{s.dept} · {s.email}</p>
                            </div>
                            <span className="text-[10px] font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{s.dept}</span>
                          </div>
                        ))}
                        {company.spocs.length === 0 && <p className="text-xs text-slate-400 text-center py-6">No SPOCs added yet</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Cap Table & Shareholding ── */}
            {companySubTab === 'captable' && (
              <div className="flex-1 overflow-y-auto p-7">
                <div className="max-w-5xl mx-auto space-y-5">
                  {/* Manual / File Upload toggle */}
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1">
                      <button
                        onClick={() => setCapEntryMode('manual')}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                          capEntryMode === 'manual'
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Manual Entries
                      </button>
                      <button
                        onClick={() => setCapEntryMode('upload')}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                          capEntryMode === 'upload'
                            ? 'bg-slate-800 text-white shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        File Upload
                      </button>
                    </div>
                  </div>

                  {capEntryMode === 'manual' && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      {/* Cap sub-tabs + Add New */}
                      <div className="flex items-center justify-between border-b border-slate-100 px-5">
                        <div className="flex">
                          {[
                            { id: 'funding', label: 'Round Of Funding' },
                            { id: 'shareholding', label: 'Shareholding Pattern' },
                          ].map(({ id, label }) => (
                            <button
                              key={id}
                              onClick={() => setCapSubTab(id as typeof capSubTab)}
                              className={`px-4 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                                capSubTab === id
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-slate-500 hover:text-slate-700'
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
                          <Plus className="w-3.5 h-3.5" /> Add New
                        </button>
                      </div>

                      {/* Round Of Funding table */}
                      {capSubTab === 'funding' && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100">
                                {['Date of Funding', 'Currency Type', 'Series', 'Investment Amount (In Cr)', 'Post Money Valuation (In Cr)', 'Investor Type', 'Investors', 'Actions'].map((col) => (
                                  <th key={col} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { date: 'Jan 2022', currency: 'INR', series: 'Series A', amount: '15.00', postMoney: '120.00', investorType: 'VC', investors: 'Peak XV Partners' },
                                { date: 'Aug 2023', currency: 'INR', series: 'Series B', amount: '40.00', postMoney: '350.00', investorType: 'VC', investors: 'Lightspeed India' },
                              ].map((row, i) => (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                                  <td className="px-4 py-3.5 fin-mono text-slate-700">{row.date}</td>
                                  <td className="px-4 py-3.5 text-slate-600">{row.currency}</td>
                                  <td className="px-4 py-3.5">
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-semibold">{row.series}</span>
                                  </td>
                                  <td className="px-4 py-3.5 fin-mono text-slate-800 font-semibold">₹{row.amount}</td>
                                  <td className="px-4 py-3.5 fin-mono text-slate-800 font-semibold">₹{row.postMoney}</td>
                                  <td className="px-4 py-3.5 text-slate-600">{row.investorType}</td>
                                  <td className="px-4 py-3.5 text-slate-700 font-medium">{row.investors}</td>
                                  <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-2">
                                      <button className="text-[11px] text-indigo-600 font-medium hover:text-indigo-700">Edit</button>
                                      <button className="text-[11px] text-red-500 font-medium hover:text-red-600">Delete</button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {false && (
                                <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">No funding rounds added yet</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Shareholding Pattern table */}
                      {capSubTab === 'shareholding' && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-100">
                                {['Shareholder Name', 'Shareholder Type', 'No. of Shares', 'Stake (%)', 'As of Date', 'Actions'].map((col) => (
                                  <th key={col} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { name: 'Siddharth Manohar', type: 'Founder', shares: '45,00,000', stake: '45.0%', date: 'Mar 2025' },
                                { name: 'Peak XV Partners', type: 'Institutional', shares: '15,00,000', stake: '15.0%', date: 'Mar 2025' },
                                { name: 'Lightspeed India', type: 'Institutional', shares: '40,00,000', stake: '40.0%', date: 'Mar 2025' },
                              ].map((row, i) => (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                                  <td className="px-4 py-3.5 font-medium text-slate-800">{row.name}</td>
                                  <td className="px-4 py-3.5">
                                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${row.type === 'Founder' ? 'bg-violet-50 text-violet-700' : 'bg-blue-50 text-blue-700'}`}>{row.type}</span>
                                  </td>
                                  <td className="px-4 py-3.5 fin-mono text-slate-700">{row.shares}</td>
                                  <td className="px-4 py-3.5 fin-mono font-bold text-emerald-700">{row.stake}</td>
                                  <td className="px-4 py-3.5 fin-mono text-slate-600">{row.date}</td>
                                  <td className="px-4 py-3.5">
                                    <div className="flex items-center gap-2">
                                      <button className="text-[11px] text-indigo-600 font-medium hover:text-indigo-700">Edit</button>
                                      <button className="text-[11px] text-red-500 font-medium hover:text-red-600">Delete</button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {capEntryMode === 'upload' && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10">
                      <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-xl py-16 px-8 hover:border-indigo-300 hover:bg-indigo-50/20 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-slate-400" />
                        <p className="text-sm font-semibold text-slate-700">Drop your cap table file here</p>
                        <p className="text-xs text-slate-400">Supports .xlsx, .csv — max 10 MB</p>
                        <button className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Browse File</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Facility Details ── */}
            {companySubTab === 'facility' && (
              <div className="flex-1 overflow-y-auto p-7">
                <div className="max-w-5xl mx-auto space-y-4">
                  {/* Action buttons */}
                  <div className="flex items-center justify-end gap-2">
                    <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 border border-red-200 bg-white rounded-xl hover:bg-red-50 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Delete
                    </button>
                    <button className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-indigo-600 border border-indigo-200 bg-white rounded-xl hover:bg-indigo-50 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => setShowAddFacility(true)} className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>

                  {/* Facilities table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Header row */}
                    <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      <span>Facility ID</span>
                      <span>Facility Type</span>
                      <span>Total Sanction Amount (INR in Cr / Other Currency in MN)</span>
                      <span>Rate of Interest (%)</span>
                    </div>

                    {[
                      { id: 'SV4156_T1', type: 'Amortizing Loan', sanction: '10', roi: '14.1',
                        tranches: [
                          { id: 'SV4156_T1_1', amount: '10', cashMargin: '0', cashMarginBenefit: '0', cashMarginRelease: 'N/A', maturity: '2025-12-28' },
                        ]
                      },
                      { id: 'SV4280_T1', type: 'Working Capital', sanction: '25', roi: '12.5',
                        tranches: [
                          { id: 'SV4280_T1_1', amount: '15', cashMargin: '5', cashMarginBenefit: '0.5', cashMarginRelease: 'N/A', maturity: '2026-03-31' },
                          { id: 'SV4280_T1_2', amount: '10', cashMargin: '5', cashMarginBenefit: '0.5', cashMarginRelease: 'N/A', maturity: '2026-06-30' },
                        ]
                      },
                    ].map((facility) => (
                      <div key={facility.id} className="border-b border-slate-100 last:border-0">
                        {/* Facility row */}
                        <div
                          className="grid grid-cols-4 gap-4 px-5 py-4 items-center hover:bg-slate-50/60 cursor-pointer transition-colors"
                          onClick={() => setExpandedFacility(expandedFacility === facility.id ? null : facility.id)}
                        >
                          <span className="fin-mono text-sm font-semibold text-slate-800">{facility.id}</span>
                          <span className="text-sm text-slate-700">{facility.type}</span>
                          <span className="fin-mono text-sm text-slate-800 font-semibold">{facility.sanction}</span>
                          <div className="flex items-center justify-between">
                            <span className="fin-mono text-sm font-semibold text-slate-800">{facility.roi}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFacility === facility.id ? 'rotate-180' : ''}`} />
                          </div>
                        </div>

                        {/* Tranche accordion */}
                        {expandedFacility === facility.id && (
                          <div className="mx-5 mb-4 rounded-xl border border-slate-200 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
                              <span className="text-xs font-semibold text-indigo-600">Tranche For Facility</span>
                              <button onClick={() => setAddTrancheFacilityId(facility.id)} className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 border border-slate-300 bg-white px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                                <Plus className="w-3 h-3" /> Add Tranche
                              </button>
                            </div>
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-slate-100">
                                  {['Tranche ID', 'Amount (INR in Cr / Other Currency in MN)', 'Cash Margin (%)', 'Cash Margin Benefit', 'Cash Margin Release', 'Maturity Date of Tranche', 'Actions'].map((col) => (
                                    <th key={col} className="px-4 py-2.5 text-left font-semibold text-slate-500 whitespace-nowrap">{col}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {facility.tranches.map((t) => (
                                  <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/40">
                                    <td className="px-4 py-3 fin-mono font-bold text-slate-800">{t.id}</td>
                                    <td className="px-4 py-3 fin-mono text-slate-700">{t.amount}</td>
                                    <td className="px-4 py-3 fin-mono text-slate-700">{t.cashMargin}</td>
                                    <td className="px-4 py-3 fin-mono text-slate-700">{t.cashMarginBenefit}</td>
                                    <td className="px-4 py-3 text-slate-600">{t.cashMarginRelease}</td>
                                    <td className="px-4 py-3 fin-mono font-semibold text-slate-800">{t.maturity}</td>
                                    <td className="px-4 py-3">
                                      <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                                        <span className="text-slate-500 font-bold text-base leading-none">⋮</span>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Crime Check Verification ── */}
            {companySubTab === 'crime' && (
              <div className="flex-1 overflow-y-auto p-7">
                <div className="max-w-5xl mx-auto space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                      <h2 className="text-sm font-semibold text-slate-700">Crime Check Verification</h2>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Run Check
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            {['Person Name', 'Designation', 'Check Type', 'Status', 'Checked On', 'Remarks', 'Actions'].map((col) => (
                              <th key={col} className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Siddharth Manohar', designation: 'CEO & Founder', type: 'CIBIL + Criminal', status: 'Clear', date: 'Jan 15, 2025', remarks: 'No adverse records' },
                            { name: 'Priya Sharma', designation: 'CFO', type: 'CIBIL + Criminal', status: 'Clear', date: 'Jan 15, 2025', remarks: 'No adverse records' },
                            { name: 'Rahul Verma', designation: 'Director', type: 'Criminal', status: 'Pending', date: '—', remarks: 'Awaiting response' },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                              <td className="px-4 py-3.5 font-medium text-slate-800">{row.name}</td>
                              <td className="px-4 py-3.5 text-slate-600">{row.designation}</td>
                              <td className="px-4 py-3.5 text-slate-600">{row.type}</td>
                              <td className="px-4 py-3.5">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                                  row.status === 'Clear' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Clear' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                  {row.status}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 fin-mono text-slate-600">{row.date}</td>
                              <td className="px-4 py-3.5 text-slate-500">{row.remarks}</td>
                              <td className="px-4 py-3.5">
                                <button className="text-[11px] text-indigo-600 font-medium hover:text-indigo-700">View Report</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── COMPLIANCE ── */}
        {activeTab === 'compliance' && (
          <div className="flex flex-1 min-h-0 fade-up-2">
            {/* Left panel */}
            <div className="w-[300px] shrink-0 border-r border-slate-200 bg-white flex flex-col">
              <div className="p-4 space-y-2.5 border-b border-slate-100">
                {/* Type filter */}
                <div className="relative">
                  <button
                    onClick={() => { setTypeDropdownOpen(!typeDropdownOpen); setStatusDropdownOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
                  >
                    <span className="text-slate-500">Type: <span className="text-slate-800 font-semibold">{filterType === 'all' ? 'All Types' : filterType}</span></span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {typeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 max-h-56 overflow-y-auto">
                      <button onClick={() => { setFilterType('all'); setTypeDropdownOpen(false); }} className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 ${filterType === 'all' ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>All Types ({company.approvals.length})</button>
                      {APPROVAL_TYPES.map((t) => (
                        <button key={t.value} onClick={() => { setFilterType(t.label); setTypeDropdownOpen(false); }} className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 ${filterType === t.label ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${t.color.split(' ')[1]?.replace('50', '400') ?? 'bg-slate-400'}`} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Status filter */}
                <div className="relative">
                  <button
                    onClick={() => { setStatusDropdownOpen(!statusDropdownOpen); setTypeDropdownOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors"
                  >
                    <span className="text-slate-500">Status: <span className="text-slate-800 font-semibold">{filterStatus === 'all' ? 'All Statuses' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1).replace('_', ' ')}</span></span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {statusDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 max-h-56 overflow-y-auto">
                      <button onClick={() => { setFilterStatus('all'); setStatusDropdownOpen(false); }} className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 ${filterStatus === 'all' ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>All Statuses</button>
                      {APPROVAL_STATUSES.filter(s => s.value !== 'all').map((s) => (
                        <button key={s.value} onClick={() => { setFilterStatus(s.value); setStatusDropdownOpen(false); }} className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center gap-2 ${filterStatus === s.value ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setShowApprovalSheet(true)} className="w-full flex items-center justify-center gap-2 h-9 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-xl transition-all shadow-sm hover:shadow-md">
                  <Plus className="w-3.5 h-3.5" /> New Request
                </button>
              </div>

              {/* Approval cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredApprovals.length === 0 && (
                  <div className="text-center py-14">
                    <CheckCircle className="w-9 h-9 text-slate-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No approvals match this filter</p>
                  </div>
                )}
                {filteredApprovals.map((apr) => {
                  const sc = STATUS_CONFIG[apr.status];
                  const isSelected = selectedApproval === apr.id;
                  return (
                    <button
                      key={apr.id}
                      onClick={() => setSelectedApproval(isSelected ? null : apr.id)}
                      className={`w-full text-left rounded-xl border-l-[3px] transition-all ${sc.bar} ${
                        isSelected ? 'bg-indigo-50 border border-indigo-200 shadow-md' : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="p-3.5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${avatarColor(apr.from)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                              {apr.initials}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-800 leading-none">{apr.from}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{apr.subject}</p>
                            </div>
                          </div>
                          <span className={`shrink-0 flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${sc.bg} ${sc.text}`}>{apr.type}</span>
                          {apr.overdue ? (
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                              <Clock className="w-2.5 h-2.5" /> {apr.overdue} overdue
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 fin-mono">{apr.date}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail panel */}
            <div className="flex-1 flex flex-col bg-[#F8FAFB]">
              {!activeApproval ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-7 h-7 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium text-slate-400">Select an approval request</p>
                    <p className="text-xs text-slate-300 mt-1">Click any item on the left to view details</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white border-b border-slate-200 px-6 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display font-semibold text-slate-900 text-base">{activeApproval.subject}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                          {[
                            { k: 'Type', v: activeApproval.type },
                            { k: 'From', v: activeApproval.from },
                            { k: 'Date', v: activeApproval.date },
                            { k: 'Assigned To', v: 'Siddharth Manohar' },
                          ].map(({ k, v }) => (
                            <span key={k} className="text-xs text-slate-500"><span className="font-semibold text-slate-600">{k}:</span> {v}</span>
                          ))}
                        </div>
                      </div>
                      <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_CONFIG[activeApproval.status].bg} ${STATUS_CONFIG[activeApproval.status].text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[activeApproval.status].dot}`} />
                        {STATUS_CONFIG[activeApproval.status].label}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
                    {activeApproval.messages.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-xs text-slate-400">No comments yet — use the reply box below</p>
                      </div>
                    )}
                    {activeApproval.messages.map((msg, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${avatarColor(msg.author)} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                          {msg.initials}
                        </div>
                        <div className="flex-1 bg-white rounded-2xl rounded-tl-md border border-slate-200 shadow-sm px-4 py-3">
                          <p className="text-sm text-slate-800">{msg.text}</p>
                          <p className="text-[10px] text-slate-400 mt-1.5 fin-mono">{msg.author} · {msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border-t border-slate-200 p-4 space-y-3">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply or add a comment..."
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all bg-slate-50 focus:bg-white"
                    />
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors">
                        <RotateCcw className="w-3.5 h-3.5" /> Send Back
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-white text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors ml-auto">
                        <MessageSquare className="w-3.5 h-3.5" /> Comment
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'financials' && <FinancialsTab initialSubTab={financialsInitialSubTab} />}
        {activeTab === 'docs' && <DocsTab />}
        {activeTab === 'cam' && <CamTab />}
      </div>

      {(typeDropdownOpen || statusDropdownOpen) && (
        <div className="fixed inset-0 z-10" onClick={() => { setTypeDropdownOpen(false); setStatusDropdownOpen(false); }} />
      )}

      {showApprovalSheet && <AddApprovalSheet onClose={() => setShowApprovalSheet(false)} />}
      {showAddFacility && <AddFacilitySheet onClose={() => setShowAddFacility(false)} />}
      {addTrancheFacilityId && (
        <AddTrancheModal
          facilityId={addTrancheFacilityId}
          facilityIds={['SV4156_T1', 'SV4280_T1']}
          onClose={() => setAddTrancheFacilityId(null)}
        />
      )}
    </div>
  );
}
