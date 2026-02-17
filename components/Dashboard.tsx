import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { MOCKED_COURSES } from '../constants';
import StatCard from './Dashboard/StatCard';
import WelcomeBanner from './Dashboard/WelcomeBanner';

interface DashboardProps {
  isDark?: boolean;
  search?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ isDark, search = '' }) => {
  const filteredCourses = MOCKED_COURSES.filter(c => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.provider.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.skills.some(skill => skill.toLowerCase().includes(q))
    );
  });

  const chartData = filteredCourses.map(c => ({
    name: c.title.length > 15 ? c.title.substring(0, 15) + '...' : c.title,
    co2: c.ecoScore.carbonFootprint,
    sov: c.sovereignty.sovereigntyScore,
    full: 100
  }));

  const radarData = [
    { subject: 'Energy', A: 85 },
    { subject: 'Sovereignty', A: 70 },
    { subject: 'Eco-design', A: 65 },
    { subject: 'GDPR', A: 90 },
    { subject: 'AI Ethics', A: 75 },
  ];

  const stats = [
    { label: 'Avg Footprint', value: '4.2kg', unit: 'CO2e', trend: '-12%', icon: 'fa-leaf', color: 'text-emerald-500' },
    { label: 'Sovereignty Index', value: '88%', unit: 'Score', trend: '+5%', icon: 'fa-shield-halved', color: 'text-indigo-500' },
    { label: 'Active Courses', value: '03', unit: 'Courses', trend: 'Stable', icon: 'fa-book-sparkles', color: 'text-amber-500' },
    { label: 'Profile Maturity', value: '74%', unit: 'Global', trend: '+14%', icon: 'fa-user-graduate', color: 'text-blue-500' },
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
    ethicsStatus: 'stable'
  };

  return (
    <div className={`animate-in fade-in duration-700 space-y-8 pb-12 ${isDark ? 'text-slate-100' : ''}`}>
      <WelcomeBanner isDark={isDark} trajectoryData={trajectoryData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} isDark={isDark} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Comparison */}
        <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'} lg:col-span-2 p-4 md:p-8 rounded-[2.5rem] shadow-sm`}>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                Performance Comparison
              </h3>
              <p className="text-xs text-slate-400 font-medium">Cross-analysis CO2 vs Sovereignty by course</p>
            </div>
          </div>
          
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={12} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey="name" fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis fontSize={10} fontWeight={600} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: isDark ? '#1e293b' : '#F8FAFC' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    color: isDark ? '#f8fafc' : '#1e293b'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="co2" name="CO2 (kg)" fill="#10b981" radius={[8, 8, 8, 8]} barSize={24} />
                <Bar dataKey="sov" name="Sovereignty (%)" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ethical Profile */}
        <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'} p-8 rounded-[2.5rem] shadow-sm flex flex-col`}>
          <div className="mb-8">
            <h3 className="text-xl font-black flex items-center gap-2">
               Ethical Profile
            </h3>
            <p className="text-xs text-slate-400 font-medium">Holistic view of your commitment</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke={isDark ? "#334155" : "#e2e8f0"} />
                <PolarAngleAxis dataKey="subject" fontSize={10} fontWeight={700} tick={{ fill: '#64748b' }} />
                <Radar
                  name="User Average"
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
