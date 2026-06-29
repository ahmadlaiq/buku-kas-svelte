<script lang="ts">
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth';

  let username = $state('');
  let password = $state('');
  let error = $state('');
  let loading = $state(false);

  async function handleLogin() {
    error = '';
    loading = true;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        authStore.setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        goto('/dashboard');
      } else {
        error = data.error || 'Login gagal';
      }
    } catch (err) {
      error = 'Terjadi kesalahan. Silakan coba lagi.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Buku Kas Salon</title>
</svelte:head>

<div class="login-container">
  <div class="login-card">
    <div class="login-header">
      <h1 class="login-title">Buku Kas Salon</h1>
      <p class="login-subtitle">Sistem Manajemen Keuangan Salon</p>
    </div>

    {#if error}
      <div class="alert alert-error mb-lg">
        {error}
      </div>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          type="text"
          class="form-input"
          bind:value={username}
          placeholder="Masukkan username"
          required
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          type="password"
          class="form-input"
          bind:value={password}
          placeholder="Masukkan password"
          required
          disabled={loading}
        />
      </div>

      <button type="submit" class="btn btn-primary" style="width: 100%;" disabled={loading}>
        {#if loading}
          <div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div>
          Memproses...
        {:else}
          Masuk
        {/if}
      </button>
    </form>

    <!-- <div class="mt-lg text-center text-sm text-muted">
      <p>Default: username: <strong>admin</strong>, password: <strong>admin123</strong></p>
    </div> -->
  </div>
</div>

<style>
  .login-container {
    animation: fadeIn 0.5s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-card {
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
