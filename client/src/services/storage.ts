const API_KEY_STORAGE_KEY = 'csn_gemini_api_key';
const REFUSAL_STATE_KEY = 'csn_refusal_state';
const CHAT_HISTORY_KEY = 'csn_chat_history';

export interface Message {
  sender: 'user' | 'clerk';
  text: string;
}

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const setStoredApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

export const removeStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

export const getStoredRefusalState = (): number => {
  const state = localStorage.getItem(REFUSAL_STATE_KEY);
  return state ? parseInt(state, 10) : 1;
};

export const setStoredRefusalState = (state: number): void => {
  localStorage.setItem(REFUSAL_STATE_KEY, state.toString());
};

export const getStoredChatHistory = (): Message[] | null => {
  const history = localStorage.getItem(CHAT_HISTORY_KEY);
  return history ? JSON.parse(history) : null;
};

export const setStoredChatHistory = (history: Message[]): void => {
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
};
