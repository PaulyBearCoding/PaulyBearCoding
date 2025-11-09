import { create } from 'zustand';

interface AuthModalStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));
