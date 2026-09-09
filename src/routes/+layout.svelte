<script lang="ts">
  import '../app.css';
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let { children } = $props();

  // Sync auth store if user data exists in localStorage
  $effect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          authStore.setUser(user);
        } catch (e) {}
      }
    }
  });
</script>

{@render children()}
