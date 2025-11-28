// ===============================
// MOCK do localStorage para Node
// ===============================
export const localStorageMock = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  }
};

global.localStorage = localStorageMock;
