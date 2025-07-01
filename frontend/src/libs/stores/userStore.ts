// src/stores/usersStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define a User type
export type User = {
  id: string;
  name: string;
  email: string;
};

export type UserState = {
  currentUser: User | null;
  users: User[];
};

export type UserActions = {
  setCurrentUser: (user: User) => void;
};

const useUsersStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      setCurrentUser: (user: User) => set({ currentUser: user })
      // addUser: (user) =>
      //   set((state) => ({
      //     users: [...state.users, user]
      //   })),
      // removeUser: (id) =>
      //   set((state) => ({
      //     users: state.users.filter((user) => user.id !== id)
      //   }))
    }),
    { name: 'user-store', skipHydration: true }
  )
);

export default useUsersStore;
