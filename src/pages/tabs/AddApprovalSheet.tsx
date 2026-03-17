import { useState } from 'react';
import { X, Calendar, Paperclip, ChevronDown, AlertCircle, User, Users, FileText } from 'lucide-react';

export const APPROVAL_TYPES = [
  { value: 'broad-terms', label: 'Broad Terms Issuance', color: 'text-indigo-600 bg-indigo-50' },
  { value: 'cam-approval', label: 'CAM Approval', color: 'text-blue-600 bg-blue-50' },
  { value: 'change-approval-terms', label: 'Change in Approval Terms', color: 'text-purple-600 bg-purple-50' },
  { value: 'disbursal', label: 'Disbursal Approval', color: 'text-teal-600 bg-teal-50' },
  { value: 'document-changes', label: 'Document Changes', color: 'text-amber-600 bg-amber-50' },
  { value: 'document-deferral', label: 'Document Deferral', color: 'text-orange-600 bg-orange-50' },
  { value: 'ic-cc-minutes', label: 'IC/CC Minutes', color: 'text-cyan-600 bg-cyan-50' },
  { value: 'noc-issuance', label: 'NOC Issuance', color: 'text-emerald-600 bg-emerald-50' },
  { value: 'penal-waiver', label: 'Penal Charge Waiver Request', color: 'text-red-600 bg-red-50' },
  { value: 'pricing-approval', label: 'Pricing Approval', color: 'text-rose-600 bg-rose-50' },
  { value: 'release-icd', label: 'Release ICD/Cash Margin', color: 'text-green-600 bg-green-50' },
  { value: 'term-sheet', label: 'Term Sheet Issuance', color: 'text-sky-600 bg-sky-50' },
  { value: 'tod-request', label: 'TOD Request', color: 'text-violet-600 bg-violet-50' },
  { value: 'cam-review', label: 'CAM Review', color: 'text-blue-600 bg-blue-50' },
  { value: 'ic-approval', label: 'IC Approval', color: 'text-indigo-600 bg-indigo-50' },
  { value: 'others', label: 'Others', color: 'text-slate-600 bg-slate-100' },
];

export const APPROVAL_STATUSES = [
  { value: 'all', label: 'All Statuses', dot: 'bg-slate-400' },
  { value: 'approved', label: 'Approved', dot: 'bg-emerald-500' },
  { value: 'rejected', label: 'Rejected', dot: 'bg-red-500' },
  { value: 'sent_back', label: 'Send Back', dot: 'bg-orange-400' },
  { value: 'pending', label: 'Pending', dot: 'bg-amber-400' },
  { value: 'cancelled', label: 'Cancel', dot: 'bg-gray-400' },
];

const PRIORITY = [
  { value: 'low', label: 'Low', color: 'text-slate-600 bg-slate-100' },
  { value: 'medium', label: 'Medium', color: 'text-amber-600 bg-amber-50' },
  { value: 'high', label: 'High', color: 'text-orange-600 bg-orange-50' },
  { value: 'critical', label: 'Critical', color: 'text-red-600 bg-red-50' },
];

const TEAM_MEMBERS = [
  'Siddharth Manohar', 'Niranjan Rathi', 'Apoorva Sharma',
  'Nipun Koshi', 'Ishpreet Gandhi', 'Rishabh Mehta',
];

const FACILITIES = ['SV4280_T1', 'SV4156_T1', 'SV4280_T2'];

interface Props {
  onClose: () => void;
  onSubmit?: (data: Record<string, string>) => void;
}

export default function AddApprovalSheet({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    approvalType: '',
    subject: '',
    description: '',
    to: '',
    cc: [] as string[],
    dueDate: '',
    priority: 'medium',
    facility: '',
    notes: '',
    status: 'pending',
  });
  const [ccInput, setCcInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.approvalType) e.approvalType = 'Select an approval type';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.to) e.to = 'Assign to someone';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit?.(form as unknown as Record<string, string>);
    onClose();
  };

  const addCC = (name: string) => {
    if (!form.cc.includes(name)) setForm(p => ({ ...p, cc: [...p.cc, name] }));
    setCcInput('');
  };

  const removeCC = (name: string) => setForm(p => ({ ...p, cc: p.cc.filter(c => c !== name) }));

  const selectedType = APPROVAL_TYPES.find(t => t.value === form.approvalType);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/25 backdrop-blur-[2px]" onClick={onClose} />

      {/* Sheet */}
      <div className="w-[520px] bg-white flex flex-col shadow-2xl border-l border-slate-200 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
              <FileText className="w-4.5 h-4.5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-slate-900">New Approval Request</h2>
              <p className="text-xs text-slate-500 mt-0.5">Sid's Company · SV4280_T1</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Approval Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Approval Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={form.approvalType}
                onChange={e => set('approvalType', e.target.value)}
                className={`w-full h-10 pl-3 pr-8 text-sm border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${errors.approvalType ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              >
                <option value="">Select approval type...</option>
                {APPROVAL_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {selectedType && (
              <span className={`inline-flex items-center gap-1 mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${selectedType.color}`}>
                {selectedType.label}
              </span>
            )}
            {errors.approvalType && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.approvalType}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Brief description of the request..."
              value={form.subject}
              onChange={e => set('subject', e.target.value)}
              className={`w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${errors.subject ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            />
            {errors.subject && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description / Notes</label>
            <textarea
              rows={3}
              placeholder="Add context, supporting details, or instructions..."
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
          </div>

          {/* To + Priority row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />Assigned To <span className="text-red-500">*</span></span>
              </label>
              <div className="relative">
                <select
                  value={form.to}
                  onChange={e => set('to', e.target.value)}
                  className={`w-full h-10 pl-3 pr-8 text-sm border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${errors.to ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
                >
                  <option value="">Select person...</option>
                  {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              {errors.to && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.to}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Priority</label>
              <div className="relative">
                <select
                  value={form.priority}
                  onChange={e => set('priority', e.target.value)}
                  className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                >
                  {PRIORITY.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* CC */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />CC</span>
            </label>
            {form.cc.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.cc.map(name => (
                  <span key={name} className="flex items-center gap-1 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full pl-2 pr-1 py-0.5">
                    {name}
                    <button onClick={() => removeCC(name)} className="w-4 h-4 rounded-full hover:bg-indigo-200 flex items-center justify-center text-indigo-500">×</button>
                  </span>
                ))}
              </div>
            )}
            <div className="relative">
              <select
                value={ccInput}
                onChange={e => { if (e.target.value) addCC(e.target.value); }}
                className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
              >
                <option value="">Add CC recipient...</option>
                {TEAM_MEMBERS.filter(m => !form.cc.includes(m)).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Facility + Due Date row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Linked Facility</label>
              <div className="relative">
                <select
                  value={form.facility}
                  onChange={e => set('facility', e.target.value)}
                  className="w-full h-10 pl-3 pr-8 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
                >
                  <option value="">Select facility...</option>
                  {FACILITIES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due Date <span className="text-red-500">*</span></span>
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={e => set('dueDate', e.target.value)}
                className={`w-full h-10 px-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${errors.dueDate ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
              />
              {errors.dueDate && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dueDate}</p>}
            </div>
          </div>

          {/* Initial Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Initial Status</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'pending', label: 'Pending', dot: 'bg-amber-400', active: 'border-amber-300 bg-amber-50' },
                { value: 'draft', label: 'Draft', dot: 'bg-slate-400', active: 'border-slate-300 bg-slate-50' },
                { value: 'in_review', label: 'In Review', dot: 'bg-blue-500', active: 'border-blue-300 bg-blue-50' },
              ].map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => set('status', s.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-xs font-medium border rounded-lg transition-all ${form.status === s.value ? s.active + ' border-2' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />{s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Attachments</label>
            <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors text-sm text-slate-500 hover:text-indigo-600">
              <Paperclip className="w-4 h-4" />
              Click to attach documents (PDF, DOCX, XLSX)
              <input type="file" multiple className="hidden" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 h-10 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            Submit Request
          </button>
          <button
            onClick={() => { set('status', 'draft'); handleSubmit(); }}
            className="h-10 px-4 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Save as Draft
          </button>
          <button onClick={onClose} className="h-10 px-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
