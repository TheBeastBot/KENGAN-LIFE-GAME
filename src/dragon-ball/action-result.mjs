export const ok = (state, message = '') => ({ ok: true, state, message, reason: '' });
export const fail = (state, reason) => ({ ok: false, state, message: '', reason });
export const unwrap = (result) => result?.state ?? result;
