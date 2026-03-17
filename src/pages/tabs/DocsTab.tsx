import { useState } from 'react';
import {
  FileText, Download, Eye, MoreHorizontal, Upload,
  CheckCircle, XCircle, Clock, ChevronDown, Trash2,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'transaction', label: 'Transaction', count: 4, approved: 3, rejected: 1 },
  { id: 'other-txn', label: 'Other transaction', count: 2, approved: 2, rejected: 0 },
  { id: 'cond-prec', label: 'Conditions precedent', count: 6, approved: 5, rejected: 1 },
  { id: 'cond-sub', label: 'Conditions subsequent', count: 3, approved: 3, rejected: 0 },
  { id: 'execution', label: 'Execution Documents', count: 5, approved: 4, rejected: 1 },
  { id: 'mis', label: 'MIS Data', count: 8, approved: 6, rejected: 0 },
  { id: 'trustee', label: 'Trustee', count: 2, approved: 2, rejected: 0 },
  { id: 'common', label: 'Common', count: 1, approved: 1, rejected: 0 },
];

const DOCS: Record<string, {
  id: string; name: string; status: 'approved' | 'rejected' | 'pending';
  remarks: string; uploadedBy: string; uploadedAt: string; size: string;
}[]> = {
  transaction: [
    { id: 'd1', name: 'Txn Doc DTD_0001.pdf', status: 'approved', remarks: 'Countersignatures from Trustee received', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 10, 2:30 PM', size: '1.2 MB' },
    { id: 'd2', name: 'POA-Executed_0001.pdf', status: 'rejected', remarks: 'Place of execution should be updated to Mumbai. Please re-upload.', uploadedBy: 'Nipun Koshi', uploadedAt: 'Mar 9, 11:00 AM', size: '845 KB' },
    { id: 'd3', name: 'Term_Sheet_Final.pdf', status: 'approved', remarks: 'Verified and accepted', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 8, 4:15 PM', size: '2.1 MB' },
    { id: 'd4', name: 'Board_Resolution.pdf', status: 'pending', remarks: 'Awaiting CAD review', uploadedBy: 'Niranjan Rathi', uploadedAt: 'Mar 11, 9:00 AM', size: '512 KB' },
  ],
  'other-txn': [
    { id: 'd5', name: 'Supplementary_Agreement.pdf', status: 'approved', remarks: 'All clauses verified', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 7, 3:00 PM', size: '1.8 MB' },
    { id: 'd6', name: 'Addendum_v2.pdf', status: 'approved', remarks: 'Reviewed and accepted', uploadedBy: 'Nipun Koshi', uploadedAt: 'Mar 6, 1:45 PM', size: '634 KB' },
  ],
  'cond-prec': [
    { id: 'd7', name: 'KYC_Company_Docs.pdf', status: 'approved', remarks: 'KYC verified', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 5, 2:00 PM', size: '3.4 MB' },
    { id: 'd8', name: 'MOA_AOA.pdf', status: 'approved', remarks: 'Verified', uploadedBy: 'Nipun Koshi', uploadedAt: 'Mar 4, 11:30 AM', size: '2.7 MB' },
    { id: 'd9', name: 'Director_KYC.pdf', status: 'rejected', remarks: 'PAN card copy is blurry. Please re-upload.', uploadedBy: 'Niranjan Rathi', uploadedAt: 'Mar 3, 4:00 PM', size: '1.1 MB' },
    { id: 'd10', name: 'Audited_Financials_FY24.pdf', status: 'approved', remarks: 'Approved', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 2, 9:30 AM', size: '5.6 MB' },
    { id: 'd11', name: 'Audited_Financials_FY23.pdf', status: 'approved', remarks: 'Approved', uploadedBy: 'Apoorva Sharma', uploadedAt: 'Mar 2, 9:28 AM', size: '5.2 MB' },
    { id: 'd12', name: 'Networth_Certificate.pdf', status: 'approved', remarks: 'CA certificate verified', uploadedBy: 'Nipun Koshi', uploadedAt: 'Mar 1, 3:15 PM', size: '398 KB' },
  ],
};

const STATUS = {
  approved: { icon: CheckCircle, label: 'Approved by CAD', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  rejected: { icon: XCircle, label: 'Rejected by CAD', bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  pending: { icon: Clock, label: 'Pending review', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-400' },
};

const FACILITIES = ['SV4156_T1', 'SV4280_T1', 'SV4280_T2'];

export default function DocsTab() {
  const [docType, setDocType] = useState<'facility' | 'tranche'>('facility');
  const [facility, setFacility] = useState(FACILITIES[0]);
  const [category, setCategory] = useState('transaction');
  const [dragging, setDragging] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const docs = DOCS[category] ?? [];
  const cat = CATEGORIES.find((c) => c.id === category)!;

  const toggleDoc = (id: string) =>
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () =>
    setSelected(selected.size === docs.length ? new Set() : new Set(docs.map(d => d.id)));;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
        {/* Doc type toggle */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          {(['facility', 'tranche'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDocType(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                docType === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t === 'facility' ? 'Facility Documents' : 'Tranche Documents'}
            </button>
          ))}
        </div>

        {/* Facility selector */}
        <div className="relative">
          <label className="text-xs font-medium text-slate-500 mr-2">Facilities:</label>
          <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
            {facility}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Category sidebar */}
        <div className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto">
          <div className="p-3 space-y-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  category === c.id
                    ? 'bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-500 pl-[10px]'
                    : 'text-slate-600 hover:bg-slate-50 font-medium'
                }`}
              >
                <span className="truncate">{c.label}</span>
                <span className={`text-[11px] font-semibold rounded-full px-1.5 py-0.5 ${
                  category === c.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {c.count}
                </span>
              </button>
            ))}
          </div>

          {cat && (
            <div className="mt-auto border-t border-slate-100 p-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-emerald-600"><span className="w-2 h-2 rounded-full bg-emerald-500" />{cat.approved} approved</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500" />{cat.rejected} rejected</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-amber-500"><span className="w-2 h-2 rounded-full bg-amber-400" />{cat.count - cat.approved - cat.rejected} pending</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Document list + upload */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {/* Select-all row */}
          {docs.length > 0 && (
            <div className="flex items-center gap-2 px-1 pb-1">
              <input
                type="checkbox"
                checked={selected.size === docs.length && docs.length > 0}
                onChange={toggleAll}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              <span className="text-xs text-slate-500 font-medium">
                {selected.size > 0 ? `${selected.size} selected` : 'Select all'}
              </span>
            </div>
          )}

          {/* Documents */}
          {docs.map((doc) => {
            const s = STATUS[doc.status];
            const Icon = s.icon;
            const isSelected = selected.has(doc.id);
            return (
              <div key={doc.id} className={`bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4 transition-colors ${isSelected ? 'border-indigo-300 bg-indigo-50/30' : s.border}`}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleDoc(doc.id)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer mt-3 shrink-0"
                />
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800 truncate">{doc.name}</p>
                    <span className={`shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{doc.remarks}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                    <span>{doc.uploadedBy}</span>
                    <span>·</span>
                    <span>{doc.uploadedAt}</span>
                    <span>·</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors">
                    Move to Trustee
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === doc.id ? null : doc.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                    {menuOpen === doc.id && (
                      <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1 w-36">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {docs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No documents in this category</p>
            </div>
          )}

          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              dragging ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50'
            }`}
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Click or Drop Files Here to Upload</p>
            <p className="text-xs text-slate-400 mt-1">PDF, DOC, XLSX up to 25 MB</p>
          </div>

          {/* Submit bar */}
          <div className="flex justify-center pt-2">
            <button className="px-8 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
              Submit
            </button>
          </div>

          {/* Bulk action bar */}
          <div className="flex items-center justify-center gap-3 pt-2 pb-1">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Download Selected Files
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
              Move Selected Files To Trustee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
