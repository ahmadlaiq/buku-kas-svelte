<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let showAddModal = false;
  let showEditModal = false;
  let showRoleModal = false;
  let loading = false;
  let editItem: any = null;
  let activeMenuRoles: number[] = [];

  function openEdit(item: any) { editItem = { ...item }; showEditModal = true; }
  
  function openRoleSetting(item: any) {
    editItem = item;
    activeMenuRoles = item.role_menus.map((rm: any) => rm.role_id);
    showRoleModal = true;
  }

  function toggleRole(roleId: number) {
    if (activeMenuRoles.includes(roleId)) {
      activeMenuRoles = activeMenuRoles.filter(id => id !== roleId);
    } else {
      activeMenuRoles = [...activeMenuRoles, roleId];
    }
  }
</script>

<svelte:head><title>Manajemen Menu - Buku Kas</title></svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Manajemen Menu</h1>
    <p class="text-muted">Kelola daftar menu dan akses Role pada sistem SaaS</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>+ Tambah Menu</button>
</div>

{#if form?.error}<div class="alert alert-error" style="margin-bottom:1rem;">{form.error}</div>{/if}
{#if form?.success}<div class="alert alert-success" style="margin-bottom:1rem;">Perubahan berhasil disimpan!</div>{/if}

<div class="card">
  <div class="table-container">
    <table class="table">
      <thead><tr><th>Urutan</th><th>Icon & Nama Menu</th><th>Path URL</th><th>Hak Akses Role</th><th style="width:200px;">Aksi</th></tr></thead>
      <tbody>
        {#each data.menus as item}
          <tr>
            <td class="font-medium text-center">{item.urutan}</td>
            <td class="font-medium">
              <span style="font-size: 1.25rem; margin-right: 0.5rem;">{item.icon || '📄'}</span>
              {item.nama}
            </td>
            <td><code>{item.path}</code></td>
            <td>
              <div style="display:flex;gap:0.25rem;flex-wrap:wrap;">
                {#each data.roles.filter(r => item.role_menus.some(rm => rm.role_id === r.id)) as role}
                  <span class="badge badge-info">{role.nama}</span>
                {/each}
                {#if item.role_menus.length === 0}
                  <span class="text-muted text-sm italic">Belum ada hak akses</span>
                {/if}
              </div>
            </td>
            <td>
              <div style="display:flex;gap:0.4rem;">
                <button class="btn btn-sm btn-info" on:click={() => openRoleSetting(item)}>Set Role</button>
                <button class="btn btn-sm btn-secondary" on:click={() => openEdit(item)}>Edit</button>
                <form method="POST" action="?/delete" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" class="btn btn-sm btn-danger" disabled={loading} on:click|preventDefault={(e) => { if (confirm('Yakin hapus menu ini?')) e.currentTarget.form?.requestSubmit(); }}>Hapus</button>
                </form>
              </div>
            </td>
          </tr>
        {:else}
          <tr><td colspan="5" class="text-center text-muted" style="padding:2rem;">Belum ada data menu</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal Tambah -->
{#if showAddModal}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Tambah Menu</h2><button class="btn-close" on:click={() => (showAddModal = false)}>✕</button></div>
    <form method="POST" action="?/create" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showAddModal = false; update(); }; }}>
      <div class="form-group"><label class="form-label">Nama Menu *</label><input type="text" name="nama" class="form-control" required placeholder="Contoh: Laporan Keuangan" /></div>
      <div class="form-group"><label class="form-label">Path URL *</label><input type="text" name="path" class="form-control" required placeholder="Contoh: /laporan" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Icon (Emoji)</label><input type="text" name="icon" class="form-control" placeholder="📊" /></div>
        <div class="form-group"><label class="form-label">Urutan</label><input type="number" name="urutan" class="form-control" value="0" /></div>
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showAddModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </form>
  </div></div>
{/if}

<!-- Modal Edit -->
{#if showEditModal && editItem}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Edit Menu</h2><button class="btn-close" on:click={() => (showEditModal = false)}>✕</button></div>
    <form method="POST" action="?/update" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showEditModal = false; update(); }; }}>
      <input type="hidden" name="id" value={editItem.id} />
      <div class="form-group"><label class="form-label">Nama Menu *</label><input type="text" name="nama" class="form-control" required bind:value={editItem.nama} /></div>
      <div class="form-group"><label class="form-label">Path URL *</label><input type="text" name="path" class="form-control" required bind:value={editItem.path} /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Icon (Emoji)</label><input type="text" name="icon" class="form-control" bind:value={editItem.icon} /></div>
        <div class="form-group"><label class="form-label">Urutan</label><input type="number" name="urutan" class="form-control" bind:value={editItem.urutan} /></div>
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showEditModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
      </div>
    </form>
  </div></div>
{/if}

<!-- Modal Setting Role -->
{#if showRoleModal && editItem}
  <div class="modal"><div class="modal-content">
    <div class="modal-header">
      <div>
        <h2 class="text-xl font-bold">Hak Akses Menu</h2>
        <p class="text-sm text-muted">Menu: {editItem.nama}</p>
      </div>
      <button class="btn-close" on:click={() => (showRoleModal = false)}>✕</button>
    </div>
    <form method="POST" action="?/updateRoles" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showRoleModal = false; update(); }; }}>
      <input type="hidden" name="menu_id" value={editItem.id} />
      
      <div class="roles-container">
        {#each data.roles as role}
          <label class="role-checkbox {activeMenuRoles.includes(role.id) ? 'active' : ''}">
            <input type="checkbox" name="roles[]" value={role.id} checked={activeMenuRoles.includes(role.id)} on:change={() => toggleRole(role.id)} />
            <div class="role-info">
              <span class="role-name">{role.nama}</span>
              <span class="role-desc">{role.deskripsi || ''}</span>
            </div>
          </label>
        {/each}
      </div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showRoleModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Hak Akses'}</button>
      </div>
    </form>
  </div></div>
{/if}

<style>
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
  .badge { display:inline-block; padding:0.2rem 0.6rem; border-radius:99px; font-size:0.75rem; font-weight:600; }
  .badge-info { background:#e0f2fe; color:#0369a1; }
  .btn-info { background:#0ea5e9; color:white; border:none; }
  .btn-info:hover { background:#0284c7; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
  .modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .modal-content { background:white; padding:2rem; border-radius:var(--radius-lg); width:100%; max-width:560px; max-height:90vh; overflow-y:auto; }
  .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
  .btn-close { background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--neutral-500); }
  .form-group { margin-bottom:1rem; }
  .form-label { display:block; margin-bottom:0.5rem; font-weight:500; color:var(--neutral-700); }
  .form-control { width:100%; padding:0.75rem 1rem; border:1px solid var(--neutral-300); border-radius:var(--radius-md); font-size:1rem; transition:all 0.2s; box-sizing:border-box; font-family:inherit; }
  
  .roles-container { display:flex; flex-direction:column; gap:0.5rem; }
  .role-checkbox { display:flex; align-items:flex-start; gap:1rem; padding:1rem; border:1px solid var(--neutral-200); border-radius:var(--radius-md); cursor:pointer; transition:all 0.2s; }
  .role-checkbox:hover { border-color:var(--neutral-300); background:var(--neutral-50); }
  .role-checkbox.active { border-color:var(--primary); background:rgba(37,99,235,0.05); }
  .role-checkbox input { margin-top:0.25rem; }
  .role-info { display:flex; flex-direction:column; }
  .role-name { font-weight:600; color:var(--neutral-800); }
  .role-desc { font-size:0.875rem; color:var(--neutral-500); }
</style>
