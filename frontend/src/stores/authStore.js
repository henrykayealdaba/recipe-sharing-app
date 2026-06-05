import { create } from 'zustand';
import api from '../api/axios';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  signup: async (data) => {
    set({ loading: true });
    try {
      const res = await api.post('/auth/signup', data);
      set({ user: res.data.user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await api.post('/auth/login', data);
      set({ user: res.data.user });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await api.post('/auth/logout');
    set({ user: null });
  },

  authCheck: async () => {
    try {
      const res = await api.get('/auth/authCheck');
      set({ user: res.data.user });
    } catch (error) {
      set({ user: null });

      if (error?.response?.status !== 401) {
        console.error(error);
      }
    }
  },
}));
