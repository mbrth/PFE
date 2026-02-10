
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { MOCKED_COURSES } from '../constants';
import ImpactTrajectoryCard from './ImpactTrajectoryCard';

interface DashboardProps {
  isDark?: boolean;
  search?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ isDark: propIsDark, search = '' }) => {
  const filteredCourses = MOCKED_COURSES.filter(c => {
    const q = (search || '').trim().toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.skills.join(' ').toLowerCase().includes(q)
    );
  });

  const chartData = filteredCourses.map(c => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
    co2: c.ecoScore.carbonFootprint,
    sov: c.sovereignty.sovereigntyScore,
    full: 100
  }));

  const radarData = [
    { subject: 'Énergie', A: 85 },
    { subject: 'Souveraineté', A: 70 },
    { subject: 'Éco-design', A: 65 },
    { subject: 'RGPD', A: 90 },
    { subject: 'Ethique IA', A: 75 },
  ];

  const stats = [
    { label: 'Empreinte Moyenne', value: '4.2kg', unit: 'CO2e', trend: '-12%', icon: 'fa-leaf', color: 'text-emerald-500' },
    { label: 'Indice Souveraineté', value: '88%', unit: 'Score', trend: '+5%', icon: 'fa-shield-halved', color: 'text-indigo-500' },
    { label: 'Formations Actives', value: '03', unit: 'Cours', trend: 'Stable', icon: 'fa-book-sparkles', color: 'text-amber-500' },
    { label: 'Maturité Profil', value: '74%', unit: 'Global', trend: '+14%', icon: 'fa-user-graduate', color: 'text-blue-500' },
  ];

  // Prefer theme passed from parent; fallback to global stored theme
  const isDark = typeof propIsDark === 'boolean'
    ? propIsDark
    : (typeof window !== 'undefined' && localStorage.getItem('themeDark') === 'true');

  return (
    <div className={`animate-in fade-in duration-700 space-y-8 pb-12 ${isDark ? 'bg-slate-900 text-slate-100' : ''}`}>
      {/* Welcome Banner */}
      <div className={`relative rounded-[2rem] p-6 md:p-8 lg:p-12 text-white shadow-2xl overflow-hidden group ${isDark ? 'bg-slate-800 shadow-slate-900/40' : 'bg-indigo-600 shadow-indigo-200'}`}>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-widest text-white/80 italic">Analyse en temps réel</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none">
              Pilotez votre impact <br/><span className="text-indigo-200">et votre souveraineté.</span>
            </h1>
            <p className="text-indigo-100/80 text-sm leading-relaxed">
              Vos choix de formation influencent directement l'indice de maturité numérique de votre profil. 
              Continuez ainsi pour atteindre le grade "Eco-Architecte Senior".
            </p>
          </div>
          <div className="flex gap-4 sm:gap-8 items-center">
            <div className="text-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 min-w-[120px]">
              <p className="text-4xl font-black">A+</p>
              <p className="text-[10px] font-bold uppercase text-indigo-200 tracking-tighter">Grade Impact</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 min-w-[120px]">
              <p className="text-4xl font-black">92</p>
              <p className="text-[10px] font-bold uppercase text-indigo-200 tracking-tighter">Score Souverain</p>
            </div>
            
          </div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-30"></div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100 hover:shadow-lg' : 'bg-white border border-slate-100 text-slate-900'} p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} text-xl shadow-inner`}>
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                 <span className="text-[10px] font-bold text-slate-400">{stat.unit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Trajectory Card - Premium Component */}
      <div>
        <ImpactTrajectoryCard isDark={isDark} />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'} lg:col-span-2 p-4 md:p-8 rounded-[2.5rem] shadow-sm`}>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                Comparatif de Performance
              </h3>
              <p className="text-xs text-slate-400 font-medium">Analyse croisée CO2 vs Souveraineté par formation</p>
            </div>
          </div>
          
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={12} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="co2" name="CO2 (kg)" fill="#10b981" radius={[8, 8, 8, 8]} barSize={24} />
                <Bar dataKey="sov" name="Souveraineté (%)" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'} p-8 rounded-[2.5rem] shadow-sm flex flex-col`}>
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
               Profil Éthique
            </h3>
            <p className="text-xs text-slate-400 font-medium">Vision holistique de votre engagement</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" fontSize={10} fontWeight={700} tick={{ fill: '#64748b' }} />
                <Radar
                  name="Moyenne Utilisateur"
                  dataKey="A"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="#6366f1"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
