<script lang="ts">
  import '../app.css';
  import { authStore } from '$lib/stores/auth';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let { children } = $props();

  // Check authentication on page load
  $effect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        authStore.setUser(user);
      } else if ($page.url.pathname !== '/login' && $page.url.pathname !== '/' && $page.url.pathname !== '/scan-barang') {
        goto('/login');
      }
    }
  });
</script>

{@render children()}
