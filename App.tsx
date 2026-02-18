
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatBubble from './components/ChatBubble';
import { Message, LegalSection, LegalTemplate, ViewType, NewsItem } from './types';
import { LegalAIService } from './services/geminiService';
import { QUICK_SECTIONS, CHECKLISTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Good Morning! I am Ben10 AI, your Indian Legal AI Adviser and Documentation Assistant.\n\nI can help you analyze legal incidents, find IPC/BNS sections, and **draft professional legal documents** (FIRs, Notices, etc.).\n\nHow can I help you document your case today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiServiceRef = useRef<LegalAIService | null>(null);

  useEffect(() => {
    aiServiceRef.current = new LegalAIService();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, view]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-6).map(m => ({ role: m.role, content: m.content }));
      const response = await aiServiceRef.current?.getLegalAdvice(input, history);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response?.text || "I'm sorry, I encountered an error processing your request.",
        timestamp: new Date(),
        sources: response?.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting to the legal database right now. Please check your internet connection and try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLegalNews = async () => {
    if (news.length > 0 || isNewsLoading) return;
    setIsNewsLoading(true);
    try {
      const response = await aiServiceRef.current?.getLegalAdvice("List the top 5 most important recent legal updates or landmark judgments in India from the last 30 days. Format as a list with Title and a one-sentence summary.", []);
      // Simplistic parsing for the news feed
      const lines = response?.text.split('\n').filter(l => l.trim().length > 10).slice(0, 5);
      const fakeNews = lines?.map(line => ({
          title: line.replace(/^\d\.\s*/, '').split(':')[0] || 'Legal Update',
          snippet: line.split(':')[1] || line,
          url: response?.sources?.[0]?.uri || 'https://livelaw.in',
          date: new Date().toLocaleDateString()
      })) || [];
      setNews(fakeNews);
    } catch (e) {
      console.error(e);
    } finally {
      setIsNewsLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'news') {
      fetchLegalNews();
    }
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'library':
        return (
          <div className="p-8 max-w-5xl mx-auto space-y-6">
            <header className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-800">Legal Knowledge Hub</h2>
              <p className="text-slate-500 mt-2">Comprehensive directory of IPC and BNS sections.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {QUICK_SECTIONS.map(section => (
                <div key={section.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{section.code}</span>
                    <span className="text-slate-400 font-mono text-sm">#{section.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{section.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{section.details || section.description}</p>
                  <button 
                    onClick={() => {
                        setView('chat');
                        setInput(`Tell me more about ${section.title}.`);
                    }}
                    className="text-indigo-600 text-xs font-bold hover:underline"
                  >
                    Discuss in AI Counselor →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="p-8 max-w-4xl mx-auto">
            <header className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Legal Pulse</h2>
                <p className="text-slate-500 mt-2">Real-time updates from Indian High Courts & Supreme Court.</p>
              </div>
              <button onClick={() => { setNews([]); fetchLegalNews(); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <i className={`fas fa-sync-alt ${isNewsLoading ? 'fa-spin' : ''}`}></i>
              </button>
            </header>
            
            {isNewsLoading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-24 bg-slate-200 animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 hover:border-indigo-200 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <i className="fas fa-gavel text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 hover:text-indigo-600 cursor-pointer">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.snippet}</p>
                      <div className="flex gap-4 mt-3">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <i className="far fa-calendar"></i> {item.date}
                        </span>
                        <a href={item.url} target="_blank" className="text-[10px] text-indigo-500 font-bold hover:underline">Read Full Article</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'checklist':
        return (
          <div className="p-8 max-w-4xl mx-auto space-y-8">
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-800">Action Plan Manager</h2>
              <p className="text-slate-500 mt-2">Standard operating procedures for legal scenarios.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {CHECKLISTS.map((list, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-slate-800 p-5 text-white">
                    <h3 className="font-bold flex items-center gap-2">
                      <i className="fas fa-tasks text-indigo-400"></i>
                      {list.title}
                    </h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {list.steps.map((step, si) => (
                      <label key={si} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors border border-transparent hover:border-slate-100">
                        <input type="checkbox" className="mt-1 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">{step}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth" ref={scrollRef}>
            <div className="max-w-4xl mx-auto">
              {messages.map((msg, idx) => (
                <ChatBubble key={idx} message={msg} />
              ))}
              
              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className="flex flex-row">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-3 mt-1 shadow-md">
                      <i className="fas fa-pen-nib text-white text-xs animate-bounce"></i>
                    </div>
                    <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">Ben10 is drafting...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        currentView={view}
        setView={setView}
        onSelectSection={(s) => { setView('chat'); setInput(`Tell me more about ${s.title}.`); }}
        onSelectTemplate={(t) => { setView('chat'); setInput(t.prompt); }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                {view === 'chat' ? 'Ben10 AI Document Lab' : 
                 view === 'library' ? 'Knowledge Hub' : 
                 view === 'news' ? 'Legal Pulse' : 'Action Plans'}
              </h1>
              <p className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">Indian Penal Code & Documentation Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {view === 'chat' && (
                <button onClick={() => setMessages([messages[0]])} className="text-xs text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1">
                  <i className="fas fa-undo"></i> Reset Session
                </button>
             )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        {view === 'chat' && (
          <div className="p-4 md:p-6 bg-white border-t border-slate-200 shrink-0">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a legal question or describe an incident..."
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl py-4 pl-6 pr-16 transition-all outline-none text-slate-800 placeholder:text-slate-400 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`absolute right-2 top-2 bottom-2 px-5 rounded-xl transition-all flex items-center justify-center ${
                    !input.trim() || isLoading
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                  }`}
                >
                  <i className={`fas ${isLoading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
