import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import StatCard from './Dashboard/StatCard';
import WelcomeBanner from './Dashboard/WelcomeBanner';
import { useCourses } from '../hooks/useCourses';

interface DashboardProps {
  isDark?: boolean;
  search?: string;
}

/**
 * Main dashboard view providing a bird's eye view of the user's eco-impact and skills.
 * It synthesizes complex data into actionable insights using charts and statistical summaries,
 * allowing developers to track their progress towards digital sovereignty.
 */
const Dashboard: React.FC<DashboardProps> = ({ isDark, search = '' }) => {
  const { courses } = useCourses(search);

  // We prepare chart data from the filtered courses to visualize the impact per module.
  const chartData = courses.map(c => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
    co2: c.ecoScore.carbonFootprint,
    sov: c.sovereignty.sovereigntyScore,
    full: 100
  }));

  // Static radar data represents the qualitative aspects of the user's professional profile.
  const radarData = [
    { subject: 'Efficacité Algo', A: 85 },
    { subject: 'Souveraineté', A: 70 },
    { subject: 'Éco-conception', A: 65 },
    { subject: 'RGPD & Privacy', A: 90 },
    { subject: 'Éthique IA', A: 75 },
  ];

  // Key performance indicators (KPIs) reflecting the core values of the EcoOrient platform.
  const stats = [
    { label: 'Empreinte Moyenne', value: '4.2', unit: 'kg CO2e', trend: '-12%', icon: 'fa-leaf', color: 'text-emerald-500' },
    { label: 'Indice Souveraineté', value: '88', unit: '% Score', trend: '+5%', icon: 'fa-shield-halved', color: 'text-indigo-500' },
    { label: 'Formations Actives', value: '03', unit: 'Modules', trend: 'Stable', icon: 'fa-code', color: 'text-amber-500' },
    { label: 'Maturité Profil', value: '74', unit: '% Global', trend: '+14%', icon: 'fa-user-astronaut', color: 'text-blue-500' },
  ];

  const trajectoryData = {
    mainGrade: 'A+',
    trajectory: 'responsable',
    lastDecisionImpact: 8,
    fromGrade: 'A',
    toGrade: 'A+',
    progressPercent: 75,
    co2: 2.4,
    sovereignty: 92,
    ethicsStatus: 'improving'
  };

  // We toggle visual styles based on the theme to maintain accessibility and visual brand consistency.
  const bgClass = isDark ? 'bg-base-bg/5 border border-base-bg/10 text-base-bg' : 'bg-white border border-ink/5 text-ink';
  const mutedTextClass = isDark ? 'text-base-bg/50' : 'text-ink/40';

  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-12">
      <WelcomeBanner isDark={isDark} trajectoryData={trajectoryData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} isDark={isDark} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* The cross-analysis view provides a direct comparison between ecological impact and sovereignty. */}
        <div className={`card-modern lg:col-span-2 ${bgClass}`}>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-black text-inherit">
                Analyse Croisée
              </h3>
              <p className={`text-sm font-medium mt-2 ${mutedTextClass}`}>Efficacité CO2 vs Souveraineté par module de code</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${isDark ? 'bg-base-bg/10' : 'bg-ink/5 text-ink'}`}>
               <i className="fa-solid fa-chart-column"></i>
            </div>
          </div>
          
          <div className="h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={12} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(248, 247, 242, 0.1)" : "rgba(45, 51, 49, 0.05)"} />
                <XAxis dataKey="name" fontSize={10} fontWeight={700} tickLine={false} axisLine={false} tick={{ fill: isDark ? 'rgba(248, 247, 242, 0.5)' : 'rgba(45, 51, 49, 0.4)' }} />
                <YAxis fontSize={10} fontWeight={700} tickLine={false} axisLine={false} tick={{ fill: isDark ? 'rgba(248, 247, 242, 0.5)' : 'rgba(45, 51, 49, 0.4)' }} />
                <Tooltip 
                  cursor={{ fill: isDark ? 'rgba(248, 247, 242, 0.05)' : 'rgba(45, 51, 49, 0.02)' }}
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDark ? '#2D3331' : '#ffffff',
                    color: isDark ? '#F8F7F2' : '#2D3331',
                    fontWeight: 'bold',
                    padding: '16px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
                />
                <Bar dataKey="co2" name="CO2 (kg)" fill="#7D9D85" radius={[12, 12, 12, 12]} barSize={24} />
                <Bar dataKey="sov" name="Souveraineté (%)" fill="#C4B5A2" radius={[12, 12, 12, 12]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* The radar chart illustrates the holistic maturity of the developer's ethical profile. */}
        <div className={`card-modern flex flex-col ${bgClass}`}>
          <div className="mb-10">
            <h3 className="text-3xl font-black text-inherit">
               Radar d'Impact
            </h3>
            <p className={`text-sm font-medium mt-2 ${mutedTextClass}`}>Vue holistique de votre profil développeur</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke={isDark ? "rgba(248, 247, 242, 0.1)" : "rgba(45, 51, 49, 0.1)"} />
                <PolarAngleAxis dataKey="subject" fontSize={9} fontWeight={800} tick={{ fill: isDark ? 'rgba(248, 247, 242, 0.7)' : 'rgba(45, 51, 49, 0.7)', textTransform: 'uppercase' }} />
                <Radar
                  name="Moyenne"
                  dataKey="A"
                  stroke="#7D9D85"
                  strokeWidth={4}
                  fill="#7D9D85"
                  fillOpacity={0.2}
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
