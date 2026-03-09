
import React from 'react';

interface PricingProps {
  onStart: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStart }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32" id="tarifs">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-ink tracking-tight">
          Choisissez votre <span className="text-sage italic font-serif font-normal">engagement.</span>
        </h2>
        <p className="text-lg text-ink/50 max-w-2xl mx-auto font-medium">
          Une tarification transparente pour soutenir une tech durable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          icon="fa-compass"
          title="Curiosité"
          price="0€"
          desc="Découvrez les bases du code et de l'IA responsable."
          features={[
             { icon: "fa-book", text: "10 modules d'initiation" },
             { icon: "fa-chart-pie", text: "Bilan CO2 mensuel" },
             { icon: "fa-users", text: "Accès communauté Dev" }
          ]}
          onStart={onStart}
        />
        <PricingCard 
          icon="fa-leaf"
          title="Engagement"
          price="14€"
          priceSuffix="/mois"
          desc="Transformez radicalement votre façon de coder."
          isRecommended
          features={[
             { icon: "fa-infinity", text: "Accès illimité aux cours" },
             { icon: "fa-certificate", text: "Certification Éco-Développeur" },
             { icon: "fa-user-tie", text: "Mentorat technique" },
             { icon: "fa-lightbulb", text: "Projets IA souverains" }
          ]}
          onStart={onStart}
        />
        <PricingCard 
          icon="fa-building-columns"
          title="Institution"
          price="Sur devis"
          desc="Pour les écoles et entreprises en transition."
          features={[
             { icon: "fa-users-gear", text: "Dashboard d'équipe" },
             { icon: "fa-server", text: "Souveraineté garantie" },
             { icon: "fa-magnifying-glass-location", text: "Audit d'impact groupe" }
          ]}
          onStart={onStart}
        />
      </div>
    </section>
  );
};

const PricingCard = ({ icon, title, price, priceSuffix, desc, isRecommended, features, onStart }: any) => (
  <div className={`bg-white rounded-[2.5rem] p-10 flex flex-col border ${isRecommended ? 'border-sage shadow-xl shadow-sage/10 scale-105 relative z-10' : 'border-ink/5'}`}>
    <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-xl ${isRecommended ? 'bg-sage text-white shadow-md shadow-sage/20' : 'bg-sand/30 text-sand-dark'}`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    
    <div className="mb-6 space-y-2 text-left">
      <h3 className="text-xl font-black text-ink">{title}</h3>
      <p className="text-sm text-ink/50 font-medium leading-tight">{desc}</p>
    </div>

    <div className="flex items-baseline gap-1 mb-8 text-left">
      <span className="text-4xl font-black text-ink">{price}</span>
      <span className="text-sm text-ink/40 font-bold uppercase tracking-widest">{priceSuffix}</span>
    </div>

    <button 
      onClick={onStart} 
      className={`w-full py-4 rounded-xl font-bold text-base transition-all mb-10 flex items-center justify-center gap-2 ${
        isRecommended ? 'bg-sage text-white hover:bg-ink' : 'bg-ink text-white hover:bg-sage'
      }`}
    >
      Sélectionner <i className="fa-solid fa-chevron-right text-xs"></i>
    </button>

    <ul className="space-y-4 mt-auto text-left">
      {features.map((f: any, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm font-semibold text-ink/70">
          <i className={`fa-solid ${f.icon} text-sage w-4 text-center opacity-80`}></i> {f.text}
        </li>
      ))}
    </ul>
  </div>
);

export default Pricing;
