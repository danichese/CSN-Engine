const API_KEY_STORAGE_KEY = 'csn_gemini_api_key';
const REFUSAL_STATE_KEY = 'csn_refusal_state';

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
