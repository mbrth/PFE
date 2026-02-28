import React from 'react';

interface VisionImpactPageProps {
  onBack: () => void;
  onStart: () => void;
}

const VisionImpactPage: React.FC<VisionImpactPageProps> = ({ onBack, onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="font-bold">Retour</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">EcoOrient</span>
        </div>
        <button
          onClick={onStart}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-md"
        >
          Espace Membre
        </button>
      </nav>

      {/* Vision Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest italic">Notre Vision</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Créer la prochaine génération de <span className="text-indigo-600">talents du numérique responsable.</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
            Nous croyons que la technologie doit servir l'humanité et la planète. EcoOrient forme les professionnels qui concilient innovation IA et responsabilité écologique.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
              </div>
              <div>
                <p className="font-bold text-slate-900">Intelligence Artificielle Responsable</p>
                <p className="text-sm text-slate-500">Maîtriser l'IA tout en respectant l'éthique et la souveraineté</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
              </div>
              <div>
                <p className="font-bold text-slate-900">Mesurer l'Impact Réel</p>
                <p className="text-sm text-slate-500">Comprendre le coût écologique de chaque décision numérique</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                <i className="fa-solid fa-check text-indigo-600 text-sm"></i>
              </div>
              <div>
                <p className="font-bold text-slate-900">Gouvernance des Données</p>
                <p className="text-sm text-slate-500">Garantir la protection et la souveraineté des données</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative animate-in zoom-in-95 duration-700">
          <div className="bg-gradient-to-br from-indigo-100 to-blue-50 rounded-3xl p-12 relative z-10 shadow-xl">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-black text-indigo-600 mb-2">2030</div>
                <p className="font-bold text-slate-900">Horizon des talents EU du numérique responsable</p>
                <p className="text-sm text-slate-500 mt-2">D'ici 2030, nous voulons former 50,000 professionnels maîtrisant l'IA responsable</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-4xl font-black text-emerald-600 mb-2">-50%</div>
                <p className="font-bold text-slate-900">Objectif d'empreinte carbone</p>
                <p className="text-sm text-slate-500 mt-2">Les systèmes IA responsables consomment 50% moins d'énergie en moyenne</p>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-200/50 rounded-full blur-3xl -z-0 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/50 rounded-full blur-3xl -z-0"></div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-in fade-in duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest italic">Notre Impact</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Les chiffres qui nous motivent.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Chaque apprenant contribue à réduire l'impact environnemental du numérique et à construire une IA souveraine et responsable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all">
              <div className="text-5xl font-black text-indigo-600 mb-2">1,200+</div>
              <p className="font-bold text-slate-900 mb-2">Apprenants Actifs</p>
              <p className="text-sm text-slate-500">Prêts à transformer leur carrière</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all">
              <div className="text-5xl font-black text-emerald-600 mb-2">500T</div>
              <p className="font-bold text-slate-900 mb-2">CO2 Économisées</p>
              <p className="text-sm text-slate-500">En pratiques IA responsables</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all">
              <div className="text-5xl font-black text-blue-600 mb-2">200+</div>
              <p className="font-bold text-slate-900 mb-2">Formations</p>
              <p className="text-sm text-slate-500">Couverture complète du numérique</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl transition-all">
              <div className="text-5xl font-black text-purple-600 mb-2">95%</div>
              <p className="font-bold text-slate-900 mb-2">Taux de Satisfaction</p>
              <p className="text-sm text-slate-500">De nos apprenants</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <i className="fa-solid fa-brain text-indigo-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Intelligence Éthique</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Nous enseignons comment développer des systèmes IA qui respectent les droits humains, la vie privée et les valeurs écologiques. Chaque décision de conception est évaluée pour son impact sociétal.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <i className="fa-solid fa-leaf text-emerald-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Efficacité Carbone</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Les apprenants EcoOrient conçoivent des solutions IA 40% plus efficaces énergétiquement. Moins de ressources, plus de résultats. C'est l'équation de demain.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <i className="fa-solid fa-lock text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Souveraineté Numérique</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Nous préparons les talents français et européens à bâtir une IA souveraine, indépendante des géants technologiques, contrôlée et régulée démocratiquement.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-slate-100 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <i className="fa-solid fa-handshake text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-900">Impact Collectif</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Chaque apprenant qui sort de nos formations remplace 10 solutions IA irresponsables par des alternatives souveines et éco-responsables dans son organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            Rejoignez la Révolution IA Responsable
          </h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
            Devenez l'un des talents qui transforment le numérique. Votre carrière, votre planète, votre souveraineté.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl"
            >
              Démarrer maintenant
            </button>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-400 transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p className="mb-2">© 2026 EcoOrient. Formant les talents du numérique responsable.</p>
          <p>Insérant dans les valeurs de la France et de l'Europe en matière d'IA souveraine</p>
        </div>
      </footer>
    </div>
  );
};

export default VisionImpactPage;
