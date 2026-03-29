import React, { useState } from 'react';
import { db } from '../../services/db';
import { useCourses } from '../../hooks/useCourses';
import { UserRole, CloudProvider, ServerRegion, Course, CourseModule } from '../../types';

interface CourseManagementProps {
  userRole: UserRole;
  onPreviewCourse: (course: Course) => void;
}

const CourseManagement: React.FC<CourseManagementProps> = ({ userRole, onPreviewCourse }) => {
  const { courses, loading } = useCourses('', userRole);
  const [showForm, setShowShowForm] = useState(false);
  
  const [modules, setModules] = useState<CourseModule[]>([
    { title: 'Introduction', lessons: [{ title: 'Bienvenue', content: '# Bienvenue\nCommencez à rédiger ici...' }] }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    category: '',
    duration: '',
    level: 'Débutant',
    description: '',
    skills: '',
    carbonFootprint: 0,
    hostingLocation: ServerRegion.FRANCE,
    cloudProvider: CloudProvider.OVH
  });

  const addModule = () => {
    setModules([...modules, { title: 'Nouveau Module', lessons: [] }]);
  };

  const addLesson = (mIdx: number) => {
    const newModules = [...modules];
    newModules[mIdx].lessons.push({ title: 'Nouvelle Leçon', content: '## Titre\nContenu en **Markdown**' });
    setModules(newModules);
  };

  const updateLesson = (mIdx: number, lIdx: number, field: 'title' | 'content', value: string) => {
    const newModules = [...modules];
    const targetModule = { ...newModules[mIdx] };
    const targetLesson = { ...targetModule.lessons[lIdx], [field]: value };
    targetModule.lessons[lIdx] = targetLesson;
    newModules[mIdx] = targetModule;
    setModules(newModules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const courseData = {
        title: formData.title,
        provider: formData.provider,
        category: formData.category,
        duration: formData.duration,
        level: formData.level,
        description: formData.description,
        skills: formData.skills.split(',').map(s => s.trim()),
        ecoScore: { 
          carbonFootprint: Number(formData.carbonFootprint), 
          pue: 1.1, 
          renewableEnergyRatio: 100, 
          ecoDesignScore: 90 
        },
        sovereignty: { 
          hostingLocation: formData.hostingLocation, 
          provider: formData.cloudProvider, 
          gdprCompliance: true, 
          legalJurisdiction: 'FR', 
          sovereigntyScore: 100 
        },
        modules: modules 
      };

      await db.createCourse(courseData as any);
      setShowShowForm(false);
      window.location.reload();
    } catch (err) {
      console.error("Course creation failed:", err);
      alert('Erreur lors de la création. Vérifiez la console.');
    }
  };

  const handleValidate = async (id: string) => {
    if (!confirm('Valider cette formation pour tous les utilisateurs ?')) return;
    await db.validateCourse(id);
    window.location.reload();
  };

  const handleReject = async (id: string) => {
    if (!confirm('Voulez-vous rejeter et supprimer définitivement cette formation ?')) return;
    await db.deleteCourse(id);
    window.location.reload();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-ink tracking-tight">Espace Formateur</h1>
          <p className="text-ink/50 text-sm">Concevez des parcours pédagogiques à impact positif.</p>
        </div>
        <button 
          onClick={() => setShowShowForm(!showForm)}
          className="px-6 py-3 bg-sage text-white rounded-2xl font-black shadow-lg hover:bg-ink transition-all flex items-center gap-2"
        >
          <i className={`fa-solid ${showForm ? 'fa-xmark' : 'fa-plus'}`}></i>
          {showForm ? 'Annuler' : 'Créer une formation'}
        </button>
      </div>

      {showForm && (
        <div className="space-y-8 animate-in slide-in-from-top-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-ink/5">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-ink">
              <span className="w-8 h-8 bg-sage/10 text-sage rounded-lg flex items-center justify-center text-sm">1</span>
              Informations Générales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input required placeholder="Nom de la formation" className="input-modern" onChange={e => setFormData({...formData, title: e.target.value})} />
                <input required placeholder="Organisme formateur" className="input-modern" onChange={e => setFormData({...formData, provider: e.target.value})} />
                <textarea placeholder="Description courte..." className="input-modern h-32" onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="space-y-4">
                <input required placeholder="Compétences (ex: React, Docker)" className="input-modern" onChange={e => setFormData({...formData, skills: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Durée (ex: 15h)" className="input-modern" onChange={e => setFormData({...formData, duration: e.target.value})} />
                  <select className="input-modern" onChange={e => setFormData({...formData, level: e.target.value as any})}>
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                  </select>
                </div>
                <div className="p-4 bg-base-bg rounded-2xl border border-ink/5">
                  <label className="block text-[10px] font-black text-ink/30 uppercase tracking-widest mb-2">Impact Carbone (kg CO2)</label>
                  <input type="number" step="0.1" className="bg-transparent w-full font-black text-xl text-ink outline-none" onChange={e => setFormData({...formData, carbonFootprint: Number(e.target.value)})} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-ink/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black flex items-center gap-3 text-ink">
                <span className="w-8 h-8 bg-sage/10 text-sage rounded-lg flex items-center justify-center text-sm">2</span>
                Programme & Contenu
              </h3>
              <button onClick={addModule} className="text-xs font-black uppercase tracking-widest text-sage hover:text-ink transition-colors">
                + Nouveau Chapitre
              </button>
            </div>

            <div className="space-y-6">
              {modules.map((mod, mIdx) => (
                <div key={mIdx} className="p-6 bg-base-bg/50 rounded-[2rem] border border-ink/5">
                  <input 
                    className="bg-transparent font-black text-lg w-full mb-4 outline-none focus:text-sage text-ink" 
                    value={mod.title} 
                    onChange={e => {
                      const n = [...modules];
                      n[mIdx].title = e.target.value;
                      setModules(n);
                    }}
                  />
                  
                  <div className="space-y-4 ml-4">
                    {mod.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="bg-white p-6 rounded-2xl shadow-sm border border-ink/5 space-y-4">
                        <input 
                          className="w-full font-bold text-sm outline-none border-b border-ink/5 pb-2 text-ink" 
                          value={lesson.title} 
                          placeholder="Titre de la leçon"
                          onChange={e => updateLesson(mIdx, lIdx, 'title', e.target.value)}
                        />
                        <textarea 
                          className="w-full h-40 bg-base-bg/30 rounded-xl p-4 text-xs font-mono outline-none focus:ring-2 focus:ring-sage/20 text-ink"
                          value={lesson.content}
                          placeholder="Contenu Markdown..."
                          onChange={e => updateLesson(mIdx, lIdx, 'content', e.target.value)}
                        />
                      </div>
                    ))}
                    <button onClick={() => addLesson(mIdx)} className="text-[10px] font-black uppercase tracking-widest text-ink/30 hover:text-sage py-2 px-4 border border-dashed border-ink/10 rounded-xl w-full">
                      + Ajouter une leçon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-6 bg-ink text-white rounded-[2rem] font-black text-xl hover:bg-sage shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Publier pour audit
          </button>
        </div>
      )}

      {!showForm && (
        <div className="grid gap-4 mt-8">
          {loading ? (
            <div className="text-center py-20"><i className="fa-solid fa-circle-notch animate-spin text-4xl text-sage"></i></div>
          ) : (
            courses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-3xl border border-ink/5 flex justify-between items-center group hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${course.isValidated ? 'bg-sage' : 'bg-amber-400'}`}>
                    <i className={`fa-solid ${course.isValidated ? 'fa-check' : 'fa-clock'}`}></i>
                  </div>
                  <div>
                    <h3 className="font-black text-ink">{course.title}</h3>
                    <div className="flex gap-3 text-[10px] uppercase font-black tracking-widest text-ink/40 mt-1">
                      <span>{course.provider}</span>
                      <span>•</span>
                      <span className={course.isValidated ? 'text-sage' : 'text-amber-500'}>
                        {course.isValidated ? 'Public' : 'En attente'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => onPreviewCourse(course)}
                    className="p-3 bg-base-bg text-ink/60 rounded-xl hover:bg-ink hover:text-white transition-all flex items-center gap-2 font-bold text-xs"
                  >
                    <i className="fa-solid fa-eye"></i>
                    <span>Auditer</span>
                  </button>
                  {userRole === 'admin' && !course.isValidated && (
                    <button onClick={() => handleValidate(course.id)} className="p-3 bg-sage/10 text-sage rounded-xl hover:bg-sage hover:text-white transition-all font-bold text-xs flex items-center gap-2">
                      <i className="fa-solid fa-check"></i>
                      <span>Valider</span>
                    </button>
                  )}
                  {userRole === 'admin' && (
                    <button onClick={() => handleReject(course.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold text-xs flex items-center gap-2">
                      <i className="fa-solid fa-xmark"></i>
                      <span>Rejeter</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
