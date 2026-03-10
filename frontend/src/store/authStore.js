import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      
      login: (userData) => {
        set({ user: userData });
      },
      
      logout: () => {
        set({ user: null });
        localStorage.removeItem('user');
      },
      
      updateUser: (userData) => {
        set({ user: userData });
      }
    }),
    {
      name: 'user',
      getStorage: () => localStorage
    }
  )
);

export default useAuthStore;
