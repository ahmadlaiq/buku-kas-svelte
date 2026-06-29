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
  let isSidebarOpen = $state(true);

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class="layout">
  <!-- Toggle Button for Sidebar (Visible when closed or on mobile) -->
  <button 
    class="sidebar-toggle-btn" 
    class:open={isSidebarOpen}
    onclick={toggleSidebar}
    title="Toggle Sidebar"
  >
    {isSidebarOpen ? '◀' : '▶'}
  </button>

  <aside class="sidebar" class:closed={!isSidebarOpen}>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
      <a href="/dashboard" class="sidebar-brand" style="margin-bottom:0;">{isSidebarOpen ? 'Salon Management System' : 'SMS'}</a>
    </div>

    <nav>
      <ul class="sidebar-menu">
        {#each menuItems as item}
          <li class="sidebar-item">
            <a
              href={item.path}
              class="sidebar-link"
              class:active={isActive(item.path)}
              title={item.nama}
            >
              <span class="icon">{item.icon}</span>
              {#if isSidebarOpen}
                <span class="text">{item.nama}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    {#if isSidebarOpen}
      <div style="margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--neutral-200);">
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
    {:else}
      <div style="margin-top: auto; padding-top: 2rem; border-top: 1px solid var(--neutral-200); text-align:center;">
        <button onclick={handleLogout} class="btn btn-danger btn-sm" title="Keluar">
          🚪
        </button>
      </div>
    {/if}
  </aside>

  <main class="main-content" class:expanded={!isSidebarOpen}>
    {@render children()}
  </main>
</div>

<style>
  .sidebar {
    transition: width 0.3s ease;
    width: 320px;
    /* padding: 1rem !important; */
    flex-shrink: 0;
    position: relative;
    overflow-x: hidden;
    /* box-sizing: border-box; */
  }
  .sidebar.closed {
    width: 80px;
    padding: 1.5rem 0.5rem !important; /* Override the large padding from app.css */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sidebar-toggle-btn {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 1px solid var(--neutral-200);
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
  }
  .sidebar-toggle-btn:hover {
    background: var(--neutral-100);
  }
  .sidebar-toggle-btn.open {
    left: 260px; /* Attach to sidebar edge when open */
  }
  .sidebar.closed .sidebar-toggle-btn.open {
    left: 60px;
  }

  .main-content {
    transition: margin-left 0.3s ease;
  }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .sidebar.closed .sidebar-menu {
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .sidebar.closed .sidebar-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .sidebar.closed .sidebar-link {
    justify-content: center;
    padding: 0.75rem;
    border-radius: 0.75rem;
    width: 3rem;
    height: 3rem;
    box-sizing: border-box;
  }
  .sidebar.closed .sidebar-link:hover {
    transform: translateY(-2px); /* Override translateX from app.css */
  }
  
  .sidebar.closed .sidebar-brand {
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
    margin-bottom: 2rem !important;
  }

  /* Make sure the toggle button adapts */
  @media (max-width: 768px) {
    .sidebar-toggle-btn {
      top: 20px;
      bottom: auto;
    }
  }
</style>
