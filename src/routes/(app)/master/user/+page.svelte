<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let showAddModal = false;
  let showEditModal = false;
  let loading = false;
  let editItem: any = null;
  let searchValue = data.search || '';

  function openEdit(item: any) { editItem = { ...item, password: '' }; showEditModal = true; }
  function changePage(newPage: number) {
    const sp = new URL(window.location.href).searchParams;
    sp.set('page', newPage.toString());
    window.location.href = `?${sp.toString()}`;
  }
  function doSearch() {
    const sp = new URL(window.location.href).searchParams;
    sp.set('search', searchValue); sp.set('page', '1');
    window.location.href = `?${sp.toString()}`;
  }
  function setStatus(status: string) {
    const sp = new URL(window.location.href).searchParams;
    sp.set('status', status); sp.set('page', '1');
    window.location.href = `?${sp.toString()}`;
  }
</script>

<svelte:head><title>Master User - Buku Kas</title></svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Master User</h1>
    <p class="text-muted">Kelola akun pengguna sistem</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>+ Tambah User</button>
</div>

{#if form?.error}<div class="alert alert-error" style="margin-bottom:1rem;">{form.error}</div>{/if}
{#if form?.success}<div class="alert alert-success" style="margin-bottom:1rem;">Berhasil menyimpan user!</div>{/if}

<div class="toolbar">
  <div class="search-box">
    <input type="text" class="form-control" placeholder="Cari username, nama lengkap..." bind:value={searchValue} on:keydown={(e) => e.key === 'Enter' && doSearch()} />
    <button class="btn btn-secondary" on:click={doSearch}>🔍 Cari</button>
  </div>
  <div class="status-tabs">
    <button class="tab-btn {data.statusFilter === 'semua' ? 'active' : ''}" on:click={() => setStatus('semua')}>Semua</button>
    <button class="tab-btn {data.statusFilter === 'aktif' ? 'active' : ''}" on:click={() => setStatus('aktif')}>Aktif</button>
    <button class="tab-btn {data.statusFilter === 'nonaktif' ? 'active' : ''}" on:click={() => setStatus('nonaktif')}>Tidak Aktif</button>
  </div>
</div>

<div class="card">
  <div class="table-container">
    <table class="table">
      <thead><tr><th>Username</th><th>Nama Lengkap</th><th>Role</th><th>Tenant</th><th>Status</th><th style="width:140px;">Aksi</th></tr></thead>
      <tbody>
        {#each data.users as item}
          <tr>
            <td><code>{item.username}</code></td>
            <td class="font-medium">{item.full_name}</td>
            <td>{item.role ? <span class="badge badge-blue">{item.role.nama}</span> : <span class="text-muted">-</span>}</td>
            <td>{item.tenant?.nama || '-'}</td>
            <td><span class="badge {item.is_aktif ? 'badge-success' : 'badge-danger'}">{item.is_aktif ? 'Aktif' : 'Tidak Aktif'}</span></td>
            <td>
              <div style="display:flex;gap:0.4rem;">
                <button class="btn btn-sm btn-secondary" on:click={() => openEdit(item)}>Edit</button>
                <form method="POST" action="?/toggleAktif" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="is_aktif" value={String(item.is_aktif)} />
                  <button type="submit" class="btn btn-sm {item.is_aktif ? 'btn-warning' : 'btn-success'}" disabled={loading}>{item.is_aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
                </form>
                <form method="POST" action="?/delete" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" class="btn btn-sm btn-danger" disabled={loading} on:click|preventDefault={(e) => { if (confirm('Yakin hapus user ini?')) e.currentTarget.form?.requestSubmit(); }}>Hapus</button>
                </form>
              </div>
            </td>
          </tr>
        {:else}
          <tr><td colspan="6" class="text-center text-muted" style="padding:2rem;">Belum ada data user</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if data.pagination && data.pagination.totalPages > 1}
  <div class="pagination-container">
    <div class="pagination-info">Total: {data.pagination.totalItems} user</div>
    <div class="pagination-controls">
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page <= 1} on:click={() => changePage(data.pagination.page - 1)}>⬅️ Sebelumnya</button>
      <span class="pagination-page">Halaman {data.pagination.page} / {data.pagination.totalPages}</span>
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page >= data.pagination.totalPages} on:click={() => changePage(data.pagination.page + 1)}>Selanjutnya ➡️</button>
    </div>
  </div>
{/if}

{#if showAddModal}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Tambah User</h2><button class="btn-close" on:click={() => (showAddModal = false)}>✕</button></div>
    <form method="POST" action="?/create" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showAddModal = false; update(); }; }}>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Username *</label><input type="text" name="username" class="form-control" required placeholder="contoh: admin01" /></div>
        <div class="form-group"><label class="form-label">Password *</label><input type="password" name="password" class="form-control" required placeholder="Min. 6 karakter" /></div>
      </div>
      <div class="form-group"><label class="form-label">Nama Lengkap *</label><input type="text" name="full_name" class="form-control" required placeholder="Nama lengkap user" /></div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Role</label>
          <select name="role_id" class="form-control">
            <option value="">-- Pilih Role --</option>
            {#each data.roles as role}<option value={role.id}>{role.nama}</option>{/each}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Tenant</label>
          <select name="tenant_id" class="form-control">
            <option value="">-- Pilih Tenant --</option>
            {#each data.tenants as tenant}<option value={tenant.id}>{tenant.nama}</option>{/each}
          </select>
        </div>
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showAddModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan User'}</button>
      </div>
    </form>
  </div></div>
{/if}

{#if showEditModal && editItem}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Edit User</h2><button class="btn-close" on:click={() => (showEditModal = false)}>✕</button></div>
    <form method="POST" action="?/update" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showEditModal = false; update(); }; }}>
      <input type="hidden" name="id" value={editItem.id} />
      <div class="form-row">
        <div class="form-group"><label class="form-label">Username *</label><input type="text" name="username" class="form-control" required bind:value={editItem.username} /></div>
        <div class="form-group"><label class="form-label">Password Baru <small class="text-muted">(kosongkan jika tidak diubah)</small></label><input type="password" name="password" class="form-control" placeholder="Password baru..." /></div>
      </div>
      <div class="form-group"><label class="form-label">Nama Lengkap *</label><input type="text" name="full_name" class="form-control" required bind:value={editItem.full_name} /></div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Role</label>
          <select name="role_id" class="form-control" bind:value={editItem.role_id}>
            <option value="">-- Pilih Role --</option>
            {#each data.roles as role}<option value={role.id}>{role.nama}</option>{/each}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Tenant</label>
          <select name="tenant_id" class="form-control" bind:value={editItem.tenant_id}>
            <option value="">-- Pilih Tenant --</option>
            {#each data.tenants as tenant}<option value={tenant.id}>{tenant.nama}</option>{/each}
          </select>
        </div>
      </div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showEditModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</button>
      </div>
    </form>
  </div></div>
{/if}

<style>
  .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; gap:1rem; flex-wrap:wrap; }
  .search-box { display:flex; gap:0.5rem; flex:1; min-width:250px; }
  .search-box .form-control { flex:1; }
  .status-tabs { display:flex; gap:0.5rem; }
  .tab-btn { padding:0.5rem 1rem; border:1px solid var(--neutral-300); border-radius:var(--radius-md); background:white; cursor:pointer; font-size:0.875rem; transition:all 0.2s; }
  .tab-btn.active { background:var(--primary); color:white; border-color:var(--primary); }
  .badge { display:inline-block; padding:0.2rem 0.6rem; border-radius:99px; font-size:0.75rem; font-weight:600; }
  .badge-success { background:#dcfce7; color:#166534; }
  .badge-danger { background:#fee2e2; color:#991b1b; }
  .badge-blue { background:#dbeafe; color:#1d4ed8; }
  .btn-warning { background:#f59e0b; color:white; border:none; }
  .btn-success { background:#22c55e; color:white; border:none; }
  code { font-size:0.85rem; background:#f3f4f6; padding:0.15rem 0.4rem; border-radius:4px; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
  .modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .modal-content { background:white; padding:2rem; border-radius:var(--radius-lg); width:100%; max-width:600px; max-height:90vh; overflow-y:auto; }
  .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
  .btn-close { background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--neutral-500); }
  .form-group { margin-bottom:1rem; }
  .form-label { display:block; margin-bottom:0.5rem; font-weight:500; color:var(--neutral-700); }
  .form-label small { font-weight:400; }
  .form-control { width:100%; padding:0.75rem 1rem; border:1px solid var(--neutral-300); border-radius:var(--radius-md); font-size:1rem; transition:all 0.2s; box-sizing:border-box; font-family:inherit; }
  .form-control:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(37,99,235,0.1); }
  .pagination-container { display:flex; justify-content:space-between; align-items:center; margin-top:var(--space-lg); padding-top:var(--space-md); border-top:1px solid var(--neutral-200); }
  .pagination-info { color:var(--neutral-600); font-size:0.9rem; }
  .pagination-controls { display:flex; align-items:center; gap:var(--space-md); }
  .pagination-page { font-weight:500; color:var(--neutral-700); }
</style>
