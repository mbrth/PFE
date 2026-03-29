import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism/index.js';
import { db } from '../../services/db';
import { useChat } from '../../hooks/useChat';
import { Course, CourseLesson } from '../../types';

interface CourseViewerProps {
  course: Course;
  onBack: () => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ course, onBack }) => {
  const [activeSection, setActiveSection] = useState<string>('0-0');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const { sendMessage, isTyping, messages } = useChat();
  const [mentorQuery, setMentorQuery] = useState('');

  const getActiveLesson = (): CourseLesson => {
    const [mIdx, lIdx] = activeSection.split('-').map(Number);
    return course.modules?.[mIdx]?.lessons[lIdx] || { title: '', content: '' };
  };

  const activeLesson = getActiveLesson();

  const scrollToLesson = (id: string) => {
    const element = document.getElementById(`lesson-${id}`);
    if (element) {
      const yOffset = -120; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    db.getCourseProgress(course.id).then(progress => {
      const completed = progress.map((p: any) => p.lessonId);
      setCompletedLessons(completed);
      if (completed.length > 0) {
        const allIds: string[] = [];
        course.modules?.forEach((m, mIdx) => m.lessons.forEach((_, lIdx) => allIds.push(`${mIdx}-${lIdx}`)));
        const lastIndex = allIds.findLastIndex(id => completed.includes(id));
        const nextId = allIds[lastIndex + 1] || allIds[lastIndex];
        if (nextId) setTimeout(() => scrollToLesson(nextId), 800);
      }
    });
  }, [course.id]);

  useEffect(() => {
    db.logLessonView().catch(e => {});
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-lesson-id]');
      let current = activeSection;
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 300) {
          current = section.getAttribute('data-lesson-id') || current;
        }
      });
      if (current !== activeSection) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleMentorAsk = async () => {
    if (!mentorQuery.trim()) return;
    setIsMentorOpen(true);
    await sendMessage(mentorQuery, activeLesson.content);
    setMentorQuery('');
  };

  const handleMarkAsCompleted = async (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;
    try {
      await db.markLessonCompleted(course.id, lessonId);
      setCompletedLessons(prev => [...prev, lessonId]);
    } catch (err) {}
  };

  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const content = String(children).replace(/\n$/, '');
      if (!inline && match) {
        try {
          return (
            <div className="rounded-2xl overflow-hidden my-6 border border-ink/10 shadow-sm bg-[#1e1e1e]">
              <div className="bg-[#252525] px-4 py-2 border-b border-white/5 flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{match[1]}</span>
              </div>
              <SyntaxHighlighter style={vscDarkPlus as any} language={match[1]} PreTag="div" customStyle={{ margin: 0, padding: '1.25rem', fontSize: '13px' }} {...props}>
                {content}
              </SyntaxHighlighter>
            </div>
          );
        } catch (e) { return <pre className="bg-ink p-6 rounded-3xl text-white overflow-auto">{content}</pre>; }
      }
      return <code className="bg-sage/10 text-sage px-1.5 py-0.5 rounded font-bold text-[0.9em]" {...props}>{children}</code>;
    },
    table: ({ children }: any) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-base-bg/50 border-b border-ink/10">{children}</thead>,
    th: ({ children }: any) => <th className="px-4 py-3 font-black uppercase text-[10px] text-ink/40 tracking-wider">{children}</th>,
    td: ({ children }: any) => <td className="px-4 py-3 border-b border-ink/5 font-medium text-ink/70">{children}</td>,
    tr: ({ children }: any) => <tr className="hover:bg-base-bg/20 transition-colors last:td:border-0">{children}</tr>,
    h1: ({children}: any) => <h1 className="text-3xl font-black text-ink mb-6 mt-10 first:mt-0">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-2xl font-black text-ink mb-4 mt-8">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold text-ink mb-3 mt-6">{children}</h3>,
    p: ({children}: any) => <p className="text-base text-ink/70 leading-relaxed mb-4">{children}</p>
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <header className="fixed top-0 left-0 right-0 z-[50] bg-white/80 backdrop-blur-md border-b border-ink/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-base-bg transition-colors text-ink/40 hover:text-ink">
            <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <div className="h-4 w-px bg-ink/10"></div>
          <span className="text-sm font-black text-ink truncate max-w-[200px] md:max-w-md">{course.title}</span>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-black text-ink/30 uppercase tracking-widest">Progression</span>
                 <span className="text-[9px] font-black text-sage">{Math.round((completedLessons.length / (course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 1)) * 100)}%</span>
              </div>
              <div className="w-24 h-1 bg-base-bg rounded-full mt-1 overflow-hidden border border-ink/5">
                 <div className="h-full bg-sage transition-all duration-700" style={{ width: `${(completedLessons.length / (course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 1)) * 100}%` }}></div>
              </div>
           </div>
        </div>
      </header>

      <div className="flex pt-14">
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
            {course.modules?.map((module, mIdx) => (
              <div key={mIdx} className="space-y-24 mb-24">
                {module.lessons.map((lesson, lIdx) => {
                  const id = `${mIdx}-${lIdx}`;
                  const isDone = completedLessons.includes(id);
                  return (
                    <section key={lIdx} id={`lesson-${id}`} data-lesson-id={id} className="scroll-mt-32 border-b border-ink/5 pb-24 last:border-0 last:pb-0">
                      <div className="mb-10">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="text-[10px] font-black text-sage uppercase tracking-[0.2em]">{module.title}</span>
                           <span className="text-ink/10">•</span>
                           <span className="text-[10px] font-bold text-ink/30 uppercase">Leçon {lIdx + 1}</span>
                        </div>
                        <h2 className="text-4xl font-black text-ink tracking-tight">{lesson.title}</h2>
                      </div>

                      <div className="relative">
                        <article className="prose prose-slate prose-lg max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownComponents as any}>
                            {lesson.content}
                          </ReactMarkdown>
                        </article>

                        <div className="mt-12 flex items-center justify-between">
                           {!isDone ? (
                             <button 
                               onClick={() => handleMarkAsCompleted(id)}
                               className="flex items-center gap-3 px-6 py-3 bg-base-bg hover:bg-sage hover:text-white text-ink/60 rounded-xl font-bold text-sm transition-all group"
                             >
                               <i className="fa-solid fa-circle-check transition-colors group-hover:text-white text-sage"></i>
                               <span>Marquer comme terminé</span>
                             </button>
                           ) : (
                             <div className="flex items-center gap-2 text-sage font-black text-[10px] uppercase tracking-widest bg-sage/5 px-4 py-2 rounded-lg border border-sage/10">
                                <i className="fa-solid fa-check-double"></i>
                                <span>Leçon terminée</span>
                             </div>
                           )}
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>
            ))}

            <div className="py-20 text-center space-y-6">
               <div className="w-16 h-16 bg-base-bg rounded-2xl flex items-center justify-center mx-auto text-sage text-2xl border border-ink/5">
                  <i className="fa-solid fa-flag-checkered"></i>
               </div>
               <h3 className="text-2xl font-black text-ink">Fin du parcours</h3>
               <p className="text-sm text-ink/40 max-w-xs mx-auto font-medium">Vous avez parcouru l'intégralité des modules disponibles.</p>
               <button onClick={onBack} className="px-8 py-3 bg-ink text-white rounded-xl font-black text-sm hover:bg-sage transition-all">Retourner au dashboard</button>
            </div>
          </div>
        </main>

        <aside className="hidden xl:block w-72 shrink-0 border-l border-ink/5 h-[calc(100vh-56px)] sticky top-14 bg-base-bg/20 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-ink/30 mb-6">Curriculum</h3>
            <div className="space-y-8">
              {course.modules?.map((module, mIdx) => (
                <div key={mIdx} className="space-y-3">
                  <h4 className="text-[10px] font-black text-ink/80 uppercase truncate px-2">{module.title}</h4>
                  <div className="space-y-1">
                    {module.lessons.map((lesson, lIdx) => {
                      const id = `${mIdx}-${lIdx}`;
                      const isDone = completedLessons.includes(id);
                      const isActive = activeSection === id;
                      return (
                        <button
                          key={lIdx}
                          onClick={() => scrollToLesson(id)}
                          className={`w-full text-left p-2.5 rounded-lg transition-all flex items-center justify-between group ${
                            isActive ? 'bg-white shadow-sm border border-ink/5 text-ink' : 'text-ink/40 hover:text-ink'
                          }`}
                        >
                          <span className={`text-[11px] font-bold truncate flex-1 ${isActive ? 'text-ink' : ''}`}>{lesson.title}</span>
                          {isDone && <i className="fa-solid fa-check text-sage text-[9px] ml-2"></i>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.05)] transform transition-transform duration-500 ease-in-out border-l border-ink/5 ${isMentorOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="h-full flex flex-col pt-14">
            <div className="px-8 py-6 border-b border-ink/5 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ink text-white rounded-lg flex items-center justify-center text-xs shadow-lg"><i className="fa-solid fa-robot"></i></div>
                  <span className="font-black text-xs uppercase tracking-widest text-ink">Mentor IA</span>
               </div>
               <button onClick={() => setIsMentorOpen(false)} className="text-ink/20 hover:text-ink transition-colors"><i className="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-base-bg/10">
               {messages.map((msg, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[8px] font-black uppercase tracking-widest text-ink/20">{msg.role === 'assistant' ? 'Mentor' : 'Moi'}</span>
                    </div>
                    <div className={`text-sm font-medium text-ink/80 leading-relaxed ${msg.role === 'assistant' ? 'pl-4 border-l-2 border-sage/30' : 'pl-4 border-l-2 border-ink/10'}`}>
                       <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                    </div>
                 </div>
               ))}
               {isTyping && <div className="pl-4 border-l-2 border-sage/30 animate-pulse text-[10px] font-black text-sage uppercase tracking-widest">Réflexion...</div>}
            </div>
            <div className="p-6 border-t border-ink/5 bg-white">
               <div className="relative">
                  <textarea 
                    value={mentorQuery}
                    onChange={e => setMentorQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleMentorAsk())}
                    placeholder="Une question sur ce point ?" 
                    className="w-full p-5 bg-base-bg rounded-2xl text-sm font-medium border border-transparent focus:border-ink/10 outline-none transition-all h-24 resize-none"
                  />
                  <button onClick={handleMentorAsk} className="absolute right-3 bottom-3 w-10 h-10 bg-ink text-white rounded-xl flex items-center justify-center hover:bg-sage transition-all"><i className="fa-solid fa-paper-plane text-xs"></i></button>
               </div>
            </div>
         </div>
      </div>

      {!isMentorOpen && (
        <button 
          onClick={() => setIsMentorOpen(true)}
          className="fixed bottom-8 right-8 z-[45] w-14 h-14 bg-ink text-white rounded-2xl shadow-2xl hover:bg-sage transition-all flex items-center justify-center group border-2 border-white"
        >
           <i className="fa-solid fa-robot text-lg group-hover:scale-110 transition-transform"></i>
        </button>
      )}
    </div>
  );
};

export default CourseViewer;
