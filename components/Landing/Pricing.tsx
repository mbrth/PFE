
import React from 'react';

interface PricingProps {
  onStart: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStart }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16 animate-in fade-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">Plans for every journey</span>
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
          Invest in your impact.
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          From individual exploration to full team transformation. Choose the plan that fits your ambition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Explorateur Plan */}
        <PricingCard 
          title="Explorer"
          subtitle="To start your transition"
          price="Free"
          priceSuffix="/mo"
          ctaText="Start for free"
          features={[
            { text: "Access to 50+ courses", included: true },
            { text: "AI assessment 1x/mo", included: true },
            { text: "Personal CO2 measure", included: true },
            { text: "Digital certificates", included: true },
            { text: "Custom mentorship", included: false },
            { text: "API & Integrations", included: false }
          ]}
        />

        {/* Professionnel Plan - Recommended */}
        <PricingCard 
          title="Professional"
          subtitle="For motivated individuals"
          price="14€"
          priceSuffix="/mo"
          ctaText="Start my transformation"
          isRecommended
          onStart={onStart}
          features={[
            { text: "Everything in Explorer", included: true, bold: true },
            { text: "200+ advanced courses", included: true },
            { text: "Unlimited AI assessment", included: true },
            { text: "Expert mentorship", included: true },
            { text: "Career coaching", included: true },
            { text: "Eco-Architect badge", included: true },
            { text: "API & Integrations", included: false }
          ]}
        />

        {/* Entreprise Plan */}
        <PricingCard 
          title="Enterprise"
          subtitle="For teams of 10+"
          price="Custom"
          priceSuffix=""
          ctaText="Request a demo"
          features={[
            { text: "Everything in Pro", included: true, bold: true },
            { text: "Multi-account & roles", included: true },
            { text: "Team dashboards", included: true },
            { text: "Training & Onboarding", included: true },
            { text: "API & Integrations", included: true },
            { text: "Priority 24/7 support", included: true },
            { text: "Governance & audit", included: true }
          ]}
        />
      </div>

      <div className="mt-16 p-8 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
        <p className="text-slate-700 font-bold mb-2">💡 Choosing advice</p>
        <p className="text-sm text-slate-600">
          <strong>Free</strong> = Explore responsible AI • <strong>Pro</strong> = Accelerate your career transition • <strong>Enterprise</strong> = Transform your entire organization
        </p>
      </div>
    </section>
  );
};

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  priceSuffix: string;
  ctaText: string;
  isRecommended?: boolean;
  onStart?: () => void;
  features: { text: string; included: boolean; bold?: boolean }[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  title, subtitle, price, priceSuffix, ctaText, isRecommended, onStart, features
}) => {
  return (
    <div className={`group rounded-[2rem] p-8 transition-all duration-500 bg-white border ${
      isRecommended 
        ? 'border-2 border-indigo-600 shadow-2xl shadow-indigo-100 bg-gradient-to-br from-indigo-50 to-white relative transform md:scale-105 md:-translate-y-4' 
        : 'border-slate-200 hover:shadow-2xl hover:border-indigo-200'
    }`}>
      {isRecommended && (
        <div className="absolute -top-4 left-8 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
          RECOMMENDED
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-black text-slate-900 mb-2">{title}</h3>
        <p className={`text-sm ${isRecommended ? 'text-slate-600 font-bold' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-black ${isRecommended ? 'text-indigo-600' : 'text-slate-900'}`}>
            {price}
          </span>
          <span className="text-sm text-slate-500">{priceSuffix}</span>
        </div>
      </div>
      
      <button 
        onClick={onStart}
        className={`w-full py-3 px-6 rounded-xl font-bold transition-all mb-8 shadow-lg ${
          isRecommended 
            ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}
      >
        {ctaText}
      </button>
      
      <div className={`space-y-3 border-t pt-8 ${isRecommended ? 'border-indigo-200' : 'border-slate-100'}`}>
        {features.map((feature, i) => (
          <div key={i} className={`flex items-center gap-3 ${!feature.included ? 'opacity-40' : ''}`}>
            {feature.included ? (
              <i className={`fa-solid fa-check text-sm ${isRecommended ? 'text-indigo-600' : 'text-emerald-500'}`}></i>
            ) : (
              <i className="fa-solid fa-xmark text-slate-400 text-sm"></i>
            )}
            <span className={`text-sm text-slate-700 ${feature.bold ? 'font-bold' : ''}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
