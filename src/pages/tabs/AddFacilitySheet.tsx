import { useState } from 'react';
import { X } from 'lucide-react';

interface Props { onClose: () => void }

const CURRENCIES = ['Indian Rupee', 'United States Dollar', 'Euro', 'British Pound'];
const FACILITY_TYPES = ['Revolving Credit', 'Amortizing Loan'];
const FREQUENCY_OPTS = ['Monthly', 'Yearly', 'Flat', 'N/A'];
const BACKEND_FEE_PAYABLE = ['Upfront', 'At Maturity', 'Quarterly', 'N/A'];
const NON_MIN_FREQ = ['Monthly', 'Quarterly', 'Yearly', 'N/A'];

export default function AddFacilitySheet({ onClose }: Props) {
  const [form, setForm] = useState({
    currency: '', facilityId: '', facilityType: '', totalSanction: '',
    fullTenor: '', pf: '', roi: '', gracePeriod: '',
    prepaymentPenalty: '', prepaymentFreq: '',
    defaultInterest: '', defaultInterestFreq: '',
    nonMinUtilFreq: '', backendFee: '', backendFeePayable: '', icDate: '',
    availabilityPeriod: '', debtXIRR: '', expectedDealIRR: '', comments: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = 'w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white placeholder:text-slate-300';
  const selectCls = `${inputCls} appearance-none`;
  const labelCls = 'block text-xs font-medium text-slate-500 mb-1.5';
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-y-0 right-0 z-50 w-[720px] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <h2 className="text-lg font-display font-bold text-slate-900">Add Facility</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

          {/* Row 1: Currency | Facility ID */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Currency {reqStar}</label>
              <div className="relative">
                <select value={form.currency} onChange={set('currency')} className={selectCls}>
                  <option value="" disabled />
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Facility ID</label>
              <input value={form.facilityId} onChange={set('facilityId')} className={inputCls} />
            </div>
          </div>

          {/* Row 2: Facility Type | Total Sanction */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Facility Type {reqStar}</label>
              <div className="relative">
                <select value={form.facilityType} onChange={set('facilityType')} className={selectCls}>
                  <option value="" disabled />
                  {FACILITY_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Total Sanction (INR in Cr / Other CCY in Mn) {reqStar}</label>
              <input value={form.totalSanction} onChange={set('totalSanction')} className={inputCls} />
            </div>
          </div>

          {/* Row 3: Full Tenor | PF */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Full Tenor of Facility (Month/s)</label>
              <input value={form.fullTenor} onChange={set('fullTenor')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>PF (%)</label>
              <input value={form.pf} onChange={set('pf')} className={inputCls} />
            </div>
          </div>

          {/* Row 4: ROI | Grace Period */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>ROI (%)</label>
              <input value={form.roi} onChange={set('roi')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Grace Period (in Days)</label>
              <input value={form.gracePeriod} onChange={set('gracePeriod')} className={inputCls} />
            </div>
          </div>

          {/* Row 5: Pre-payment Penalty | Pre-payment Penalty Frequency */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Pre-payment Penalty (%)</label>
              <input value={form.prepaymentPenalty} onChange={set('prepaymentPenalty')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Pre-payment Penalty Frequency</label>
              <div className="relative">
                <select value={form.prepaymentFreq} onChange={set('prepaymentFreq')} className={selectCls}>
                  <option value="" disabled />
                  {FREQUENCY_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* Row 6: Default Interest | Default Interest Frequency */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Default Interest (%)</label>
              <input value={form.defaultInterest} onChange={set('defaultInterest')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Default Interest Frequency</label>
              <div className="relative">
                <select value={form.defaultInterestFreq} onChange={set('defaultInterestFreq')} className={selectCls}>
                  <option value="" disabled />
                  {FREQUENCY_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
          </div>

          {/* Row 7: Non-minimum Utilization Frequency | Backend Fee */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Non-minimum Utilization Frequency</label>
              <div className="relative">
                <select value={form.nonMinUtilFreq} onChange={set('nonMinUtilFreq')} className={selectCls}>
                  <option value="" disabled />
                  {NON_MIN_FREQ.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Backend Fee (%)</label>
              <input value={form.backendFee} onChange={set('backendFee')} className={inputCls} />
            </div>
          </div>

          {/* Row 8: Backend Fee Payable | IC Date */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Backend Fee Payable</label>
              <div className="relative">
                <select value={form.backendFeePayable} onChange={set('backendFeePayable')} className={selectCls}>
                  <option value="" disabled />
                  {BACKEND_FEE_PAYABLE.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>IC Date</label>
              <input type="date" value={form.icDate} onChange={set('icDate')} className={inputCls} />
            </div>
          </div>

          {/* Row 9: Availability Period | Debt XIRR */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Availability Period for Remaining Sanction</label>
              <input type="date" value={form.availabilityPeriod} onChange={set('availabilityPeriod')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Debt XIRR (%)</label>
              <input value={form.debtXIRR} onChange={set('debtXIRR')} className={inputCls} />
            </div>
          </div>

          {/* Row 10: Expected Deal IRR */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Expected Deal IRR (%)</label>
              <input value={form.expectedDealIRR} onChange={set('expectedDealIRR')} className={inputCls} />
            </div>
            <div />
          </div>

          {/* Comments */}
          <div>
            <label className={labelCls}>Enter Comments</label>
            <textarea
              value={form.comments} onChange={set('comments')} rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 px-7 py-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-10 py-2.5 text-sm font-semibold text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-10 py-2.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
