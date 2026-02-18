
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    alert('Document text copied to clipboard!');
  };

  const containsLegalDraft = message.content.includes('---') || message.content.includes('Subject:') || message.content.includes('TO,');

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm ${isUser ? 'ml-3 bg-indigo-600' : 'mr-3 bg-slate-800'}`}>
          <i className={`fas ${isUser ? 'fa-user' : 'fa-balance-scale'} text-white text-xs`}></i>
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`relative px-5 py-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
          }`}>
            {!isUser && containsLegalDraft && (
              <button 
                onClick={copyToClipboard}
                className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-600 p-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-200 transition-colors shadow-sm"
                title="Copy Document Draft"
              >
                <i className="fas fa-copy text-xs"></i>
              </button>
            )}

            <div className="whitespace-pre-wrap">
              {message.content.split('\n').map((line, i) => {
                const isHeading = line.toUpperCase() === line && line.length > 5 && !line.includes('HTTP');
                const isPlaceholder = line.includes('[') && line.includes(']');
                
                return (
                  <p key={i} className={`
                    ${line.trim() === '' ? 'h-3' : 'mb-2'} 
                    ${isHeading ? 'font-bold text-indigo-700 underline underline-offset-4 decoration-indigo-200 mb-4' : ''}
                    ${isPlaceholder ? 'bg-amber-50 px-1 border-b border-amber-200 text-amber-900' : ''}
                  `}>
                    {line}
                  </p>
                );
              })}
            </div>

            {message.sources && message.sources.length > 0 && (
              <div className={`mt-4 pt-3 border-t ${isUser ? 'border-indigo-500' : 'border-slate-100'}`}>
                <p className={`text-[10px] uppercase font-bold tracking-widest mb-2 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                  Verification Sources:
                </p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[10px] px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                        isUser 
                          ? 'bg-indigo-700 hover:bg-indigo-800 text-indigo-100' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <i className="fas fa-external-link-alt text-[8px]"></i>
                      {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 mx-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
