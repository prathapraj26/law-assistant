
export type ViewType = 'chat' | 'library' | 'news' | 'checklist';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: GroundingSource[];
  isDocument?: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface LegalSection {
  id: string;
  title: string;
  description: string;
  code: string;
  details?: string;
}

export interface LegalTemplate {
  id: string;
  title: string;
  icon: string;
  prompt: string;
}

export interface NewsItem {
  title: string;
  snippet: string;
  url: string;
  date: string;
}
