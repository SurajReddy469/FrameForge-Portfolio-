import React, { useState, useMemo } from 'react';
import { Calculator, Percent, Clock, DollarSign, PieChart, ShieldCheck } from 'lucide-react';
import { formatPrice } from './PropertyCard';

const MortgageCalculator = ({ propertyPrice = 38500000 }) => {
  const [price, setPrice] = useState(propertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [tenureYears, setTenureYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  // Synchronize if propertyPrice prop changes
  React.useEffect(() => {
    if (propertyPrice) setPrice(propertyPrice);
  }, [propertyPrice]);

  const calculations = useMemo(() => {
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    
    // Monthly interest rate
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    let emi = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      emi = Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - loanAmount;
    const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
    const interestPercent = 100 - principalPercent;

    return {
      downPayment,
      loanAmount,
      monthlyEMI: emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent
    };
  }, [price, downPaymentPercent, tenureYears, interestRate]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Mortgage & EMI Estimator
            </h3>
            <p className="text-xs text-slate-500">
              Calculate realistic monthly repayments with customized down payment & bank tenure.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Bank Standard Formula (RBI Regulated)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Control Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Home Purchase Price</span>
              <span className="text-emerald-700 font-extrabold text-sm">{formatPrice(price, 'For Sale')}</span>
            </div>
            <input
              type="range"
              min={2500000}
              max={150000000}
              step={500000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-slate-900 font-bold">{formatPrice(calculations.downPayment, 'For Sale')}</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10% (Min)</span>
              <span>20% (Recommended)</span>
              <span>60% (Conservative)</span>
            </div>
          </div>

          {/* Loan Tenure (Years) */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Loan Duration</span>
              <span className="text-slate-900 font-bold">{tenureYears} Years ({tenureYears * 12} Months)</span>
            </div>
            <div className="flex gap-2">
              {[10, 15, 20, 25, 30].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenureYears(yr)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                    tenureYears === yr
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Annual Bank Interest Rate</span>
              <span className="text-emerald-700 font-extrabold text-sm">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min={6.5}
              max={13}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>6.5% (Prime)</span>
              <span>8.5% (Current Average)</span>
              <span>13% (Max)</span>
            </div>
          </div>

        </div>

        {/* Results Card Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white space-y-6 shadow-xl border border-slate-800">
          
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Estimated Monthly Repayment
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹{calculations.monthlyEMI.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ month</span>
            </div>
          </div>

          {/* Breakdown progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Principal ({calculations.principalPercent}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                Interest ({calculations.interestPercent}%)
              </span>
            </div>
            
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300" 
                style={{ width: `${calculations.principalPercent}%` }} 
              />
              <div 
                className="bg-teal-400 h-full transition-all duration-300" 
                style={{ width: `${calculations.interestPercent}%` }} 
              />
            </div>
          </div>

          {/* Detail List */}
          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Principal Loan Amount:</span>
              <strong className="text-white font-bold">{formatPrice(calculations.loanAmount, 'For Sale')}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Interest Payable:</span>
              <strong className="text-teal-300 font-bold">{formatPrice(calculations.totalInterest, 'For Sale')}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Payment (Principal + Interest):</span>
              <strong className="text-white font-bold">{formatPrice(calculations.totalPayment, 'For Sale')}</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-slate-400 leading-relaxed">
            💡 <em>Note:</em> Actual loan sanctions, processing charges, and stamp duty are subject to individual bank eligibility.
          </div>

        </div>

      </div>

    </div>
  );
};

export default MortgageCalculator;
