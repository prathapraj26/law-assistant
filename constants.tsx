
import { LegalSection, LegalTemplate } from './types';

export const QUICK_SECTIONS: LegalSection[] = [
  { id: '302', title: 'Section 302 IPC', description: 'Punishment for Murder', code: 'IPC', details: 'Prescribes the death penalty or imprisonment for life, and shall also be liable to fine.' },
  { id: '307', title: 'Section 307 IPC', description: 'Attempt to Murder', code: 'IPC', details: 'Punishment for whoever does any act with such intention or knowledge, and under such circumstances that, if he by that act caused death, he would be guilty of murder.' },
  { id: '375', title: 'Section 375 IPC', description: 'Definition of Rape', code: 'IPC', details: 'Defines the legal parameters of sexual assault and non-consensual acts.' },
  { id: '420', title: 'Section 420 IPC', description: 'Cheating/Fraud', code: 'IPC', details: 'Deals with cheating and dishonestly inducing delivery of property.' },
  { id: '498A', title: 'Section 498A IPC', description: 'Cruelty by Husband', code: 'IPC', details: 'Punishment for husband or relative of husband of a woman subjecting her to cruelty.' },
  { id: '120B', title: 'Section 120B IPC', description: 'Criminal Conspiracy', code: 'IPC', details: 'Punishment of criminal conspiracy.' },
  { id: '323', title: 'Section 323 IPC', description: 'Voluntary Causing Hurt', code: 'IPC', details: 'Punishment for voluntarily causing hurt.' },
];

export const LEGAL_TEMPLATES: LegalTemplate[] = [
  { 
    id: 'fir', 
    title: 'FIR Draft', 
    icon: 'fa-file-signature', 
    prompt: 'Help me draft a formal First Information Report (FIR) for an incident involving [describe incident]. Include placeholders for station name, date, and personal details.' 
  },
  { 
    id: 'notice', 
    title: 'Legal Notice', 
    icon: 'fa-envelope-open-text', 
    prompt: 'I need to draft a formal Legal Notice for [reason, e.g., recovery of money/defamation]. Please provide a professional template following Indian legal standards.' 
  },
  { 
    id: 'bail', 
    title: 'Bail Application', 
    icon: 'fa-gavel', 
    prompt: 'Draft a skeleton for a Bail Application under Section 437/439 of CrPC/BNSS for [offense description].' 
  },
  { 
    id: 'affidavit', 
    title: 'General Affidavit', 
    icon: 'fa-stamp', 
    prompt: 'Create a template for a general Affidavit for [purpose, e.g., proof of residence or name change] to be executed on a non-judicial stamp paper.' 
  }
];

export const CHECKLISTS = [
  {
    title: "Post-Accident Steps",
    steps: [
      "Check for injuries and call 102 (Ambulance) if needed.",
      "Call the police (100 or 112) immediately to report the accident.",
      "Take clear photos of vehicle positions and damage.",
      "Collect contact information of witnesses.",
      "Inform your insurance provider within 24 hours.",
      "Do not sign any settlement without legal review."
    ]
  },
  {
    title: "Filing an FIR",
    steps: [
      "Visit the nearest police station immediately.",
      "Request the Duty Officer to record your information.",
      "Ensure the report is read back to you if written by the officer.",
      "Sign only after confirming all details are accurate.",
      "Ask for a free carbon copy of the FIR (it's your legal right).",
      "Get the FIR number for future tracking."
    ]
  }
];

export const SYSTEM_INSTRUCTION = `You are "Ben10 AI", an expert AI Legal Consultant for Indian Law.

Core Capabilities:
1. Legal Analysis: Identify IPC/BNS/CrPC/BNSS sections.
2. Documentation: Draft professional legal documents using [PLACEHOLDERS].
3. Legal News: When asked about current events, use Google Search to find latest judgments or law changes.

Style:
- Professional, objective, and authoritative yet helpful.
- Use Markdown for structure.
- Always add: "Disclaimer: This is AI guidance, not legal advice."`;
