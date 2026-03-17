import { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  facilityId: string;
  facilityIds: string[];
  onClose: () => void;
}

const TENOR_COUNT_OPTS = ['From disbursement of each tranche', 'From date of first disbursement'];
const CURRENCIES = ['Indian Rupee', 'United States Dollar', 'Euro', 'British Pound'];
const CASH_MARGIN_RELEASE_OPTS = ['N/A', 'At maturity', 'Proportionately on each principal repayment'];
const DEAL_STATUS_OPTS = [
  'Broad terms issued', 'Rejected', 'Cold', 'Prospect',
  'CAM under progress', 'IC Pending', 'Documentation in progress',
  'Active disbursing', 'Fully disbursed', 'Closed',
];
const PROBABILITY_OPTS = ['Very High (>90%)', 'High (70–90%)', 'Medium (40–70%)', 'Low (20–40%)', 'Very Low (<20%)'];
const FUND_TYPE_OPTS = ['NCD', 'Term Loan', 'Working Capital', 'CC / OD', 'Mezzanine', 'ECB', 'Others'];

export default function AddTrancheModal({ facilityId, facilityIds, onClose }: Props) {
  const [form, setForm] = useState({
    facilityId,
    tenorCount: '',
    amount: '0.00',
    currency: 'Indian Rupee',
    cashMargin: '',
    cashMarginRelease: '',
    cashMarginBenefit: '',
    maturityDate: '',
    dealStatus: '',
    expectedDisbDate: '',
    probability: '',
    fundType: '',
    comments: '',
  });

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const inputCls = 'w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-colors bg-white';
  const selectCls = `${inputCls} appearance-none`;
  const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
  const reqStar = <span className="text-red-500 ml-0.5">*</span>;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

      {/* Centered modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
            <h2 className="text-lg font-display font-bold text-slate-900">Add Tranche</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

            {/* Facility ID */}
            <div>
              <label className={labelCls}>Facility ID {reqStar}</label>
              <div className="relative">
                <select value={form.facilityId} onChange={set('facilityId')} className={`${selectCls} bg-slate-50 text-slate-600 font-medium`}>
                  {facilityIds.map(id => <option key={id}>{id}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Tenor Count */}
            <div>
              <label className={labelCls}>Tenor Count of Each Tranche (in Months)</label>
              <div className="relative">
                <select value={form.tenorCount} onChange={set('tenorCount')} className={selectCls}>
                  <option value="" disabled />
                  {TENOR_COUNT_OPTS.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className={labelCls}>Amount (INR in Cr, other Currency in Mn) {reqStar}</label>
              <input type="number" step="0.01" value={form.amount} onChange={set('amount')} className={inputCls} />
            </div>

            {/* Currency */}
            <div>
              <label className={labelCls}>Currency {reqStar}</label>
              <div className="relative">
                <select value={form.currency} onChange={set('currency')} className={`${selectCls} bg-slate-50 text-slate-600 font-medium`}>
                  {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
              </div>
            </div>

            {/* Cash Margin | Cash Margin Release */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Cash Margin (%)</label>
                <input value={form.cashMargin} onChange={set('cashMargin')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Cash Margin Release</label>
                <div className="relative">
                  <select value={form.cashMarginRelease} onChange={set('cashMarginRelease')} className={selectCls}>
                    <option value="" disabled />
                    {CASH_MARGIN_RELEASE_OPTS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
            </div>

            {/* Cash Margin Benefit | Maturity Date */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Cash Margin Benefit (%)</label>
                <input value={form.cashMarginBenefit} onChange={set('cashMarginBenefit')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Maturity Date Of Tranche {reqStar}</label>
                <input type="date" value={form.maturityDate} onChange={set('maturityDate')} className={inputCls} />
              </div>
            </div>

            {/* Deal Status | Expected Disbursement Date */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Deal Status {reqStar}</label>
                <div className="relative">
                  <select value={form.dealStatus} onChange={set('dealStatus')} className={selectCls}>
                    <option value="" disabled />
                    {DEAL_STATUS_OPTS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>Expected Disbursement Date {reqStar}</label>
                <input type="date" value={form.expectedDisbDate} onChange={set('expectedDisbDate')} className={inputCls} />
              </div>
            </div>

            {/* Probability | Fund Type */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Probability {reqStar}</label>
                <div className="relative">
                  <select value={form.probability} onChange={set('probability')} className={selectCls}>
                    <option value="" disabled />
                    {PROBABILITY_OPTS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
              <div>
                <label className={labelCls}>Fund Type {reqStar}</label>
                <div className="relative">
                  <select value={form.fundType} onChange={set('fundType')} className={selectCls}>
                    <option value="" disabled />
                    {FUND_TYPE_OPTS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className={labelCls}>Comments</label>
              <textarea
                value={form.comments} onChange={set('comments')} rows={3}
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
      </div>
    </>
  );
}
