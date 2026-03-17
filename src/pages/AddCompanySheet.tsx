import { useState } from 'react';
import { X, Upload, ChevronDown } from 'lucide-react';

interface Props { onClose: () => void }

const INCORPORATION_TYPES = ['Proprietorship', 'Partnership', 'LLP', 'Pvt. Ltd', 'Pub. Ltd', 'Individual', 'Others'];
const RISK_CATEGORIES = ['Green', 'Yellow', 'Blue', 'NA'];
const ST_RATINGS = ['ST 1', 'ST 2', 'ST 3', 'ST 4', 'ST 5', 'ST 6', 'ST 7', 'ST 8'];
const STAGE_STATUSES = [
  'Evaluation Stage', 'Cold', 'Rejected', 'Exited',
  'Active debt exposure, live warrants', 'Active debt exposure, no warrants',
  'Active debt exposure & warrants exited', 'Nil debt exposure, live warrants',
  'Nil debt exposure, no warrants', 'Nil debt exposure & warrants exited',
];
const SPOC_OPTIONS = ['Apoorva Sharma', 'Nipun Koshi', 'Ishpreet Gandhi', 'Niranjan Rathi'];
const LEAD_OPTIONS = ['Niranjan Rathi', 'Siddharth Manohar', 'Apoorva Sharma'];
const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Singapore', 'UAE'];
const SEGMENTS = ['B2B', 'B2C', 'B2B2C'];
const INDUSTRIES = ['Agritech', 'Consumer', 'Edtech', 'Electric Vehicles', 'Fintech', 'Logistics', 'MarketPlace', 'Media and Entertainment', 'SAAS', 'Commerce', 'Renewables', 'Others'];
const SUB_INDUSTRIES = ['Lending', 'Payments', 'Insurance', 'Wealth Management', 'Others'];
const AUDITORS = ['BDO', 'Deloitte', 'EY', 'GT', 'KPMG', 'PwC', 'Others', 'Deloittee'];

export default function AddCompanySheet({ onClose }: Props) {
  const [form, setForm] = useState({
    brandName: '', panNumber: '', spoc: '', lead: '', supportingSpoc: '',
    incorporationType: '', logoFile: null as File | null,
    name: '', legalName: '', riskCategory: '', stRating: '',
    relationshipSince: '', internalStageStatus: '',
    regAddress1: '', regAddress2: '', regCountry: '', regState: '', regCity: '', regPin: '',
    sameAsRegistered: false,
    commAddress1: '', commAddress2: '', commCountry: '', commState: '', commCity: '', commPin: '',
    contactNumber: '',
    cin: '', gstNumber: '', segment: '', industry: '', subIndustry: '',
    dateOfInc: '', primaryEmail: '', secondaryEmail: '', auditor: '',
    lastAuditOpinion: '',
    comments: '',
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const toggle = (k: keyof typeof form) => () =>
    setForm(f => ({ ...f, [k]: !f[k] }));

  const inputCls = 'w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white placeholder:text-slate-300';
  const selectCls = `${inputCls} appearance-none`;
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;
  const sectionCls = 'text-sm font-display font-bold text-slate-800 mb-4';

  const SelectField = ({ label, required, value, onChange, options }: {
    label: string; required?: boolean; value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[];
  }) => (
    <div>
      <label className={labelCls}>{label} {required && reqStar}</label>
      <div className="relative">
        <select value={value} onChange={onChange} className={selectCls}>
          <option value="" disabled />
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-y-0 right-0 z-50 w-[780px] bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900">Add Counter Party</h2>
            <p className="text-xs text-slate-400 mt-0.5">Create a new company in the portfolio</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-7">

          {/* ── Section 1: Brand & SPOC ──────────────────────── */}
          <div>
            <h3 className={sectionCls}>Brand & SPOC Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Brand Name {reqStar}</label>
                  <input value={form.brandName} onChange={set('brandName')} className={inputCls} placeholder="Enter brand name" />
                </div>
                <div>
                  <label className={labelCls}>PAN Number {reqStar}</label>
                  <input value={form.panNumber} onChange={set('panNumber')} className={inputCls} placeholder="e.g. ABCCS1234K" maxLength={10} style={{ textTransform: 'uppercase' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <SelectField label="SPOC" required value={form.spoc} onChange={set('spoc')} options={SPOC_OPTIONS} />
                <SelectField label="Lead" required value={form.lead} onChange={set('lead')} options={LEAD_OPTIONS} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <SelectField label="Supporting SPOC" value={form.supportingSpoc} onChange={set('supportingSpoc')} options={SPOC_OPTIONS} />
                <SelectField label="Incorporation Type" required value={form.incorporationType} onChange={set('incorporationType')} options={INCORPORATION_TYPES} />
              </div>

              {/* Logo Upload */}
              <div>
                <label className={labelCls}>Upload Logo</label>
                <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/20 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400 mb-1.5" />
                  <span className="text-xs font-medium text-slate-500">
                    {form.logoFile ? form.logoFile.name : 'Click or drag to upload logo'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 2MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setForm(f => ({ ...f, logoFile: e.target.files?.[0] || null }))}
                  />
                </label>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* ── Section 2: Company Details ───────────────────── */}
          <div>
            <h3 className={sectionCls}>Company Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Name {reqStar}</label>
                  <input value={form.name} onChange={set('name')} className={inputCls} placeholder="Company name" />
                </div>
                <div>
                  <label className={labelCls}>Legal Name {reqStar}</label>
                  <input value={form.legalName} onChange={set('legalName')} className={inputCls} placeholder="Legal entity name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <SelectField label="Risk Category" required value={form.riskCategory} onChange={set('riskCategory')} options={RISK_CATEGORIES} />
                <SelectField label="S T Rating" required value={form.stRating} onChange={set('stRating')} options={ST_RATINGS} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Relationship Since {reqStar}</label>
                  <input type="date" value={form.relationshipSince} onChange={set('relationshipSince')} className={inputCls} />
                </div>
                <SelectField label="Internal Stage Status" required value={form.internalStageStatus} onChange={set('internalStageStatus')} options={STAGE_STATUSES} />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* ── Section 3: Registered Address ────────────────── */}
          <div>
            <h3 className={sectionCls}>Registered Address</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Address Line 1 {reqStar}</label>
                  <input value={form.regAddress1} onChange={set('regAddress1')} className={inputCls} placeholder="Street address" />
                </div>
                <div>
                  <label className={labelCls}>Address Line 2 {reqStar}</label>
                  <input value={form.regAddress2} onChange={set('regAddress2')} className={inputCls} placeholder="Apartment, suite, etc." />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <SelectField label="Country" required value={form.regCountry} onChange={set('regCountry')} options={COUNTRIES} />
                <div>
                  <label className={labelCls}>State {reqStar}</label>
                  <input value={form.regState} onChange={set('regState')} className={inputCls} placeholder="State" />
                </div>
                <div>
                  <label className={labelCls}>City {reqStar}</label>
                  <input value={form.regCity} onChange={set('regCity')} className={inputCls} placeholder="City" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Pin {reqStar}</label>
                  <input value={form.regPin} onChange={set('regPin')} className={inputCls} placeholder="PIN code" maxLength={6} />
                </div>
                <div className="col-span-2" />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* ── Section 4: Communication Address ─────────────── */}
          <div>
            <h3 className={sectionCls}>Communication Address</h3>
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sameAsRegistered as boolean}
                onChange={toggle('sameAsRegistered')}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
              />
              <span className="text-sm text-slate-600">Same as Registered Address</span>
            </label>

            {!form.sameAsRegistered && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Address Line 1 {reqStar}</label>
                    <input value={form.commAddress1} onChange={set('commAddress1')} className={inputCls} placeholder="Street address" />
                  </div>
                  <div>
                    <label className={labelCls}>Address Line 2 {reqStar}</label>
                    <input value={form.commAddress2} onChange={set('commAddress2')} className={inputCls} placeholder="Apartment, suite, etc." />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <SelectField label="Country" required value={form.commCountry} onChange={set('commCountry')} options={COUNTRIES} />
                  <div>
                    <label className={labelCls}>State {reqStar}</label>
                    <input value={form.commState} onChange={set('commState')} className={inputCls} placeholder="State" />
                  </div>
                  <div>
                    <label className={labelCls}>City {reqStar}</label>
                    <input value={form.commCity} onChange={set('commCity')} className={inputCls} placeholder="City" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <label className={labelCls}>Pin {reqStar}</label>
                    <input value={form.commPin} onChange={set('commPin')} className={inputCls} placeholder="PIN code" maxLength={6} />
                  </div>
                  <div className="col-span-2" />
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className={labelCls}>Contact Number</label>
              <input value={form.contactNumber} onChange={set('contactNumber')} className={`${inputCls} max-w-xs`} placeholder="+91 9876543210" />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* ── Section 5: Business Details ──────────────────── */}
          <div>
            <h3 className={sectionCls}>Business Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>CIN</label>
                  <input value={form.cin} onChange={set('cin')} className={inputCls} placeholder="Corporate ID Number" />
                </div>
                <div>
                  <label className={labelCls}>GST Number</label>
                  <input value={form.gstNumber} onChange={set('gstNumber')} className={inputCls} placeholder="GST Number" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <SelectField label="Segment" required value={form.segment} onChange={set('segment')} options={SEGMENTS} />
                <SelectField label="Industry" required value={form.industry} onChange={set('industry')} options={INDUSTRIES} />
                <SelectField label="Sub Industry" required value={form.subIndustry} onChange={set('subIndustry')} options={SUB_INDUSTRIES} />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Date of Inc {reqStar}</label>
                  <input type="date" value={form.dateOfInc} onChange={set('dateOfInc')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Primary Email</label>
                  <input type="email" value={form.primaryEmail} onChange={set('primaryEmail')} className={inputCls} placeholder="primary@company.com" />
                </div>
                <div>
                  <label className={labelCls}>Secondary Email</label>
                  <input type="email" value={form.secondaryEmail} onChange={set('secondaryEmail')} className={inputCls} placeholder="secondary@company.com" />
                </div>
              </div>

              <SelectField label="Auditor" required value={form.auditor} onChange={set('auditor')} options={AUDITORS} />

              {/* Last Audit Opinion — radio group */}
              <div>
                <label className={labelCls}>Last Audit Opinion {reqStar}</label>
                <div className="flex items-center gap-6 mt-1">
                  {['Qualified', 'Unqualified', 'Disclaimer'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="lastAuditOpinion"
                        value={opt}
                        checked={form.lastAuditOpinion === opt}
                        onChange={set('lastAuditOpinion')}
                        className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500/20"
                      />
                      <span className="text-sm text-slate-700">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className={labelCls}>Comments</label>
                <textarea
                  value={form.comments} onChange={set('comments')} rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Any additional notes..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 px-7 py-5 border-t border-slate-100 shrink-0">
          <button
            onClick={onClose}
            className="px-10 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-10 py-2.5 text-sm font-semibold text-white bg-indigo-700 hover:bg-indigo-600 rounded-xl transition-colors shadow-sm">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
