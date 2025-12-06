import { writable } from 'svelte/store';

interface User {
  id: number;
  username: string;
  full_name: string;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    setUser: (user: User) => set(user),
    logout: () => set(null)
  };
}

export const authStore = createAuthStore();
