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

  function openEdit(item: any) { editItem = { ...item }; showEditModal = true; }
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

<svelte:head><title>Master Role - Buku Kas</title></svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Master Role</h1>
    <p class="text-muted">Kelola role/hak akses user</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>+ Tambah Role</button>
</div>

{#if form?.error}<div class="alert alert-error" style="margin-bottom:1rem;">{form.error}</div>{/if}
{#if form?.success}<div class="alert alert-success" style="margin-bottom:1rem;">Berhasil menyimpan role!</div>{/if}

<div class="toolbar">
  <div class="search-box">
    <input type="text" class="form-control" placeholder="Cari nama, deskripsi..." bind:value={searchValue} on:keydown={(e) => e.key === 'Enter' && doSearch()} />
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
      <thead><tr><th>Nama Role</th><th>Deskripsi</th><th>Jumlah User</th><th>Status</th><th style="width:140px;">Aksi</th></tr></thead>
      <tbody>
        {#each data.roles as item}
          <tr>
            <td class="font-medium">{item.nama}</td>
            <td>{item.deskripsi || '-'}</td>
            <td><span class="badge badge-neutral">{item._count?.users ?? 0} user</span></td>
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
                  <button type="submit" class="btn btn-sm btn-danger" disabled={loading} on:click|preventDefault={(e) => { if (confirm('Yakin hapus role ini?')) e.currentTarget.form?.requestSubmit(); }}>Hapus</button>
                </form>
              </div>
            </td>
          </tr>
        {:else}
          <tr><td colspan="5" class="text-center text-muted" style="padding:2rem;">Belum ada data role</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if data.pagination && data.pagination.totalPages > 1}
  <div class="pagination-container">
    <div class="pagination-info">Total: {data.pagination.totalItems} role</div>
    <div class="pagination-controls">
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page <= 1} on:click={() => changePage(data.pagination.page - 1)}>⬅️ Sebelumnya</button>
      <span class="pagination-page">Halaman {data.pagination.page} / {data.pagination.totalPages}</span>
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page >= data.pagination.totalPages} on:click={() => changePage(data.pagination.page + 1)}>Selanjutnya ➡️</button>
    </div>
  </div>
{/if}

{#if showAddModal}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Tambah Role</h2><button class="btn-close" on:click={() => (showAddModal = false)}>✕</button></div>
    <form method="POST" action="?/create" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showAddModal = false; update(); }; }}>
      <div class="form-group"><label class="form-label">Nama Role *</label><input type="text" name="nama" class="form-control" required placeholder="Contoh: Admin, Kasir" /></div>
      <div class="form-group"><label class="form-label">Deskripsi</label><textarea name="deskripsi" class="form-control" rows="3" placeholder="Jelaskan hak akses role ini..."></textarea></div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showAddModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Role'}</button>
      </div>
    </form>
  </div></div>
{/if}

{#if showEditModal && editItem}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Edit Role</h2><button class="btn-close" on:click={() => (showEditModal = false)}>✕</button></div>
    <form method="POST" action="?/update" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showEditModal = false; update(); }; }}>
      <input type="hidden" name="id" value={editItem.id} />
      <div class="form-group"><label class="form-label">Nama Role *</label><input type="text" name="nama" class="form-control" required bind:value={editItem.nama} /></div>
      <div class="form-group"><label class="form-label">Deskripsi</label><textarea name="deskripsi" class="form-control" rows="3" bind:value={editItem.deskripsi}></textarea></div>
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
  .badge-neutral { background:#f3f4f6; color:#374151; }
  .btn-warning { background:#f59e0b; color:white; border:none; }
  .btn-success { background:#22c55e; color:white; border:none; }
  .modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .modal-content { background:white; padding:2rem; border-radius:var(--radius-lg); width:100%; max-width:500px; }
  .modal-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
  .btn-close { background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--neutral-500); }
  .form-group { margin-bottom:1rem; }
  .form-label { display:block; margin-bottom:0.5rem; font-weight:500; color:var(--neutral-700); }
  .form-control { width:100%; padding:0.75rem 1rem; border:1px solid var(--neutral-300); border-radius:var(--radius-md); font-size:1rem; transition:all 0.2s; box-sizing:border-box; font-family:inherit; }
  .form-control:focus { outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(37,99,235,0.1); }
  textarea.form-control { resize:vertical; }
  .pagination-container { display:flex; justify-content:space-between; align-items:center; margin-top:var(--space-lg); padding-top:var(--space-md); border-top:1px solid var(--neutral-200); }
  .pagination-info { color:var(--neutral-600); font-size:0.9rem; }
  .pagination-controls { display:flex; align-items:center; gap:var(--space-md); }
  .pagination-page { font-weight:500; color:var(--neutral-700); }
</style>
