<script lang="ts">
  import { authStore } from "$lib/stores/auth";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let { children } = $props();

  function handleLogout() {
    authStore.logout();
    localStorage.removeItem("user");
    goto("/login");
  }

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/pendapatan", label: "Pendapatan", icon: "💰" },
    { path: "/pengeluaran", label: "Pengeluaran", icon: "💸" },
    // { path: "/beban-operasional", label: "Beban Operasional", icon: "🏢" },
    { path: "/beban-penyusutan", label: "Beban Penyusutan", icon: "📉" },
    { path: "/laporan", label: "Laporan Laba & Rugi", icon: "📈" },
    { path: "/master/karyawan", label: "Master Karyawan", icon: "👩‍💼" },
    { path: "/master/customer", label: "Master Customer", icon: "🤝" },
  ];

  function isActive(path: string) {
    return $page.url.pathname === path;
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
              <span>{item.label}</span>
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
          👤 {$authStore?.full_name || "User"}
        </div>
        <div class="text-sm text-muted">@{$authStore?.username || "user"}</div>
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
