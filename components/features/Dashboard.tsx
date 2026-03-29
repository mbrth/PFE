import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import StatCard from './Dashboard/StatCard';
import WelcomeBanner from './Dashboard/WelcomeBanner';
import { db } from '../../services/db';
import { UserRole } from '../../types';

interface DashboardProps {
  isDark?: boolean;
  search?: string;
  userRole?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ isDark, userRole }) => {
  const [carbonStats, setCarbonStats] = useState({ totalConsumed: 0, totalSaved: 0, aiRequestsCount: 0 });
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      db.getCarbonStats(),
      db.getSkillsAnalytics()
    ]).then(([stats, analytics]) => {
      setCarbonStats(stats);
      setSkillsData(analytics);
      setLoading(false);
    });
  }, []);

  const overallMastery = skillsData.length > 0 
    ? Math.round(skillsData.reduce((acc, curr) => acc + curr.A, 0) / skillsData.length)
    : 0;

  const stats = [
    { label: 'CO2 Consommé', value: (carbonStats.totalConsumed / 1000).toFixed(3), unit: 'kg', trend: 'Réel', icon: 'fa-cloud', color: 'text-rose-500' },
    { label: 'CO2 Économisé', value: (carbonStats.totalSaved / 1000).toFixed(2), unit: 'kg', trend: 'Économie', icon: 'fa-leaf', color: 'text-emerald-500' },
    { label: 'Mentor IA', value: carbonStats.aiRequestsCount.toString(), unit: 'Interactions', trend: 'Optimisé', icon: 'fa-robot', color: 'text-indigo-500' },
    { label: 'Maturité Profil', value: overallMastery.toString(), unit: '% Global', trend: 'Certifié', icon: 'fa-user-astronaut', color: 'text-blue-500' },
  ];

  const trajectoryData = {
    mainGrade: overallMastery > 80 ? 'A+' : overallMastery > 50 ? 'B' : 'C',
    trajectory: 'responsable',
    lastDecisionImpact: 8,
    fromGrade: 'B',
    toGrade: 'A+',
    progressPercent: overallMastery,
    co2: carbonStats.totalConsumed / 1000,
    sovereignty: 92,
    ethicsStatus: 'improving'
  };

  const bgClass = isDark ? 'bg-base-bg/5 border border-base-bg/10 text-base-bg' : 'bg-white border border-ink/5 text-ink';

  if (loading) return <div className="py-20 text-center"><i className="fa-solid fa-circle-notch animate-spin text-4xl text-sage"></i></div>;

  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-12">
      <WelcomeBanner isDark={isDark} trajectoryData={trajectoryData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} isDark={isDark} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-10 rounded-[3rem] ${isDark ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'} border flex flex-col md:flex-row items-center gap-10`}>
           <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl shadow-emerald-500/10 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-seedling text-4xl text-emerald-500 animate-pulse"></i>
           </div>
           <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-emerald-900">Impact Écologique Réel</h3>
              <p className="text-emerald-800/60 font-medium">
                 En utilisant cette architecture sobre, vous avez déjà économisé <strong className="text-emerald-600">{(carbonStats.totalSaved).toFixed(1)}g de CO2e</strong>.
              </p>
           </div>
           <div className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg">
              {((carbonStats.totalSaved / (carbonStats.totalSaved + carbonStats.totalConsumed + 0.001)) * 100).toFixed(0)}% d'économie
           </div>
        </div>

        <div className={`p-10 rounded-[3rem] ${bgClass} flex flex-col items-center`}>
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-ink/30 mb-8 self-start px-2">Compétences</h3>
           {skillsData.length > 0 && skillsData.some(s => s.A > 0) ? (
             <div className="w-full flex justify-center">
                {/* Fixed size RadarChart to avoid width/height -1 errors */}
                <RadarChart width={300} height={300} cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                  <PolarGrid stroke={isDark ? "rgba(248, 247, 242, 0.1)" : "rgba(45, 51, 49, 0.05)"} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#F8F7F2' : '#2D3331', fontSize: 10, fontWeight: 900 }} />
                  <Radar
                    name="Mon Profil"
                    dataKey="A"
                    stroke="#7D9D85"
                    fill="#7D9D85"
                    fillOpacity={0.5}
                  />
                </RadarChart>
             </div>
           ) : (
             <div className="text-center py-10 opacity-20 flex flex-col items-center justify-center flex-1">
                <i className="fa-solid fa-chart-line text-4xl mb-4"></i>
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Aucune donnée.<br/>Terminez une leçon pour<br/>voir vos compétences.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
