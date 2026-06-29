<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let { data, children } = $props();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    goto("/login");
  }

  const menuItems = data.menus || [];

  function isActive(path: string) {
    return $page.url.pathname === path || $page.url.pathname.startsWith(path + '/');
  }
</script>

<div class="layout">
  <aside class="sidebar">
    <a href="/dashboard" class="sidebar-brand">Buku Kas Salon</a>

    <nav>
      <ul class="sidebar-menu">
        {#each menuItems as item}
          <li class="sidebar-item">
            <a
              href={item.path}
              class="sidebar-link"
              class:active={isActive(item.path)}
            >
              <span>{item.icon}</span>
              <span>{item.nama}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <div
      style="margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--neutral-200);"
    >
      <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
        <div class="text-sm font-semibold mb-xs">
          👤 {data.user?.full_name || "User"}
        </div>
        <div class="text-sm text-muted">@{data.user?.username || "user"}</div>
      </div>
      <button
        onclick={handleLogout}
        class="btn btn-danger"
        style="width: 100%;"
      >
        Keluar
      </button>
    </div>
  </aside>

  <main class="main-content">
    {@render children()}
  </main>
</div>
