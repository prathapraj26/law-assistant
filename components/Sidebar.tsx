
import React from 'react';
import { QUICK_SECTIONS, LEGAL_TEMPLATES } from '../constants';
import { LegalSection, LegalTemplate, ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  onSelectSection: (section: LegalSection) => void;
  onSelectTemplate: (template: LegalTemplate) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onSelectSection, onSelectTemplate }) => {
  const navItems = [
    { id: 'chat', label: 'AI Counselor', icon: 'fa-comment-dots' },
    { id: 'library', label: 'Law Library', icon: 'fa-book-open' },
    { id: 'news', label: 'Legal News', icon: 'fa-newspaper' },
    { id: 'checklist', label: 'Action Plans', icon: 'fa-tasks' },
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 hidden lg:flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl font-bold text-indigo-900 legal-title flex items-center gap-2">
          <i className="fas fa-balance-scale text-indigo-600"></i>
          Ben10 AI
        </h2>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Indian Legal Assistant</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {/* Main Navigation */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Navigation</h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  currentView === item.id 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Document Center Section - Only relevant for Chat View mostly but kept for quick access */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Drafting Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {LEGAL_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                    setView('chat');
                    onSelectTemplate(template);
                }}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-center group"
              >
                <i className={`fas ${template.icon} text-slate-400 group-hover:text-indigo-600 mb-2`}></i>
                <span className="text-[9px] font-bold text-slate-600 group-hover:text-indigo-700 uppercase tracking-tight">
                  {template.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section Lookup */}
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Quick IPC/BNS</h3>
          <div className="space-y-2">
            {QUICK_SECTIONS.slice(0, 4).map((section) => (
              <button
                key={section.id}
                onClick={() => {
                    setView('chat');
                    onSelectSection(section);
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 group transition-all"
              >
                <div className="font-bold text-xs text-slate-700 group-hover:text-indigo-700">{section.title}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{section.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
          <p className="text-[9px] text-indigo-800 leading-relaxed font-medium">
            <i className="fas fa-shield-alt mr-1"></i>
            SECURE: All data processed in session. AI drafts are for review only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
