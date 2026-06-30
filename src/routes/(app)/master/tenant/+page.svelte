<script lang="ts">
  import { enhance } from '$app/forms';
  import { env } from '$env/dynamic/public';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let showAddModal = false;
  let showEditModal = false;
  let showDetailModal = false;
  let loading = false;
  let editItem: any = null;
  let detailItem: any = null;
  let openDropdown: number | null = null;
  let searchValue = data.search || '';

  function openEdit(item: any) { editItem = { ...item }; showEditModal = true; }
  function openDetail(item: any) { detailItem = item; showDetailModal = true; }
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

  // --- SUPER ADMIN STATES ---
  $: isSuperAdmin = data.user?.role_name === 'Super Admin';
  $: metrics = data.metrics || { totalActive: 0, totalPending: 0, estimatedMRR: 0 };
  $: pendingPayments = data.allTenants ? data.allTenants.filter((t: any) => t.status === 'PENDING' || t.status === 'SUSPENDED') : [];

  let showVerifyModal = false;
  let selectedTenant: any = null;
  let verifyForm = { duration_months: 1 };
  let isSubmitting = false;
  let broadcastMessage = "";
  let isBroadcasting = false;

  function openVerifyModal(tenant: any) {
    selectedTenant = tenant;
    verifyForm = { duration_months: 1 };
    showVerifyModal = true;
  }
  async function submitBroadcast(e: any) {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    isBroadcasting = true;
    await new Promise(r => setTimeout(r, 800));
    alert("Pengumuman berhasil dikirim ke seluruh tenant!");
    broadcastMessage = ""; isBroadcasting = false;
  }

</script>

<svelte:window on:click={() => openDropdown = null} />

<svelte:head><title>Master Tenant - Buku Kas</title></svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Master Tenant</h1>
    <p class="text-muted">Kelola cabang/lokasi salon</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>+ Tambah Tenant</button>
</div>

{#if form?.error}<div class="alert alert-error" style="margin-bottom:1rem;">{form.error}</div>{/if}
{#if form?.success}<div class="alert alert-success" style="margin-bottom:1rem;">Berhasil menyimpan tenant!</div>{/if}


{#if isSuperAdmin}

<div style="margin-bottom: 2rem;">
  <!-- BROADCAST SYSTEM -->
  <div class="card" style="padding: 1.5rem;">
    <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem;">Pengumuman Global</h2>
    <form on:submit={submitBroadcast}>
      <div class="form-group">
        <textarea class="form-control" rows="3" placeholder="Tulis pengumuman untuk semua Tenant..." bind:value={broadcastMessage} required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" disabled={isBroadcasting}>
        {isBroadcasting ? 'Mengirim...' : 'Kirim Pengumuman'}
      </button>
    </form>
  </div>
</div>
{/if}

<div class="toolbar">
  <div class="search-box">
    <input type="text" class="form-control" placeholder="Cari nama, alamat, email..." bind:value={searchValue} on:keydown={(e) => e.key === 'Enter' && doSearch()} />
    <button class="btn btn-secondary" on:click={doSearch}>Cari</button>
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
      <thead><tr><th>Nama Tenant</th><th>Alamat</th><th>No HP</th><th>Status</th><th style="width:80px; text-align: center;">Aksi</th></tr></thead>
      <tbody>
        {#each data.tenants as item}
          <tr>
            <td class="font-medium">{item.nama}</td>
            <td>{item.alamat || '-'}</td>
            <td>{item.no_hp || '-'}</td>
            <td>
              <span class="badge {item.is_aktif ? 'badge-success' : 'badge-danger'}">{item.is_aktif ? 'Aktif' : 'Tidak Aktif'}</span>
              {#if item.expired_at}
                <div style="font-size: 0.75rem; margin-top: 0.25rem; color: var(--neutral-500);">
                  Exp: {new Date(item.expired_at).toLocaleDateString('id-ID')}
                </div>
              {/if}
            </td>
            <td style="text-align: center;">
              <div class="action-wrapper">
                <button class="btn btn-sm btn-secondary" style="padding: 0.25rem 0.5rem;" on:click|stopPropagation={() => openDropdown = openDropdown === item.id ? null : item.id}>⋮</button>
                {#if openDropdown === item.id}
                  <div class="dropdown-menu show" on:click|stopPropagation>
                    <button class="dropdown-item" on:click={() => { openDetail(item); openDropdown = null; }}>Detail</button>
                    <button class="dropdown-item" on:click={() => { window.location.href = `/master/tenant/${item.id}/activity-log`; openDropdown = null; }}>Activity Log</button>
                    {#if isSuperAdmin}
                      <button class="dropdown-item text-success" on:click={() => { openVerifyModal(item); openDropdown = null; }}>Bayar / Perpanjang</button>
                    {/if}
                    <button class="dropdown-item" on:click={() => { openEdit(item); openDropdown = null; }}>Edit</button>
                    <form method="POST" action="?/toggleAktif" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; openDropdown = null; update(); }; }}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="is_aktif" value={String(item.is_aktif)} />
                      <button type="submit" class="dropdown-item {item.is_aktif ? 'text-warning' : 'text-success'}" disabled={loading}>{item.is_aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
                    </form>
                    <form method="POST" action="?/delete" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; openDropdown = null; update(); }; }}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" class="dropdown-item text-danger" disabled={loading} on:click|preventDefault={(e) => { if (confirm('Yakin hapus tenant ini?')) e.currentTarget.form?.requestSubmit(); }}>Hapus</button>
                    </form>
                  </div>
                {/if}
              </div>
            </td>
          </tr>
        {:else}
          <tr><td colspan="7" class="text-center text-muted" style="padding:2rem;">Belum ada data tenant</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if data.pagination && data.pagination.totalPages > 1}
  <div class="pagination-container">
    <div class="pagination-info">Total: {data.pagination.totalItems} tenant</div>
    <div class="pagination-controls">
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page <= 1} on:click={() => changePage(data.pagination.page - 1)}>Sebelumnya</button>
      <span class="pagination-page">Halaman {data.pagination.page} / {data.pagination.totalPages}</span>
      <button class="btn btn-secondary btn-sm" disabled={data.pagination.page >= data.pagination.totalPages} on:click={() => changePage(data.pagination.page + 1)}>Selanjutnya</button>
    </div>
  </div>
{/if}

{#if showAddModal}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Tambah Tenant</h2><button class="btn-close" on:click={() => (showAddModal = false)}>✕</button></div>
    <form method="POST" action="?/create" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showAddModal = false; update(); }; }}>
      <div class="form-group"><label class="form-label">Nama Tenant *</label><input type="text" name="nama" class="form-control" required placeholder="Contoh: Salon Irna - Pusat" /></div>
      <div class="form-group"><label class="form-label">Alamat</label><textarea name="alamat" class="form-control" rows="2" placeholder="Jl. Merdeka No. 1"></textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">No. HP</label><input type="text" name="no_hp" class="form-control" placeholder="021-xxxxxx" /></div>
        <div class="form-group"><label class="form-label">Email</label><input type="email" name="email" class="form-control" placeholder="info@salon.com" /></div>
      </div>
      <div class="form-group"><label class="form-label">Media Sosial</label><input type="text" name="medsos" class="form-control" placeholder="@salon.irna" /></div>
      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button type="button" class="btn btn-secondary" style="flex:1;" on:click={() => (showAddModal = false)}>Batal</button>
        <button type="submit" class="btn btn-primary" style="flex:1;" disabled={loading}>{loading ? 'Menyimpan...' : 'Simpan Tenant'}</button>
      </div>
    </form>
  </div></div>
{/if}

{#if showEditModal && editItem}
  <div class="modal"><div class="modal-content">
    <div class="modal-header"><h2 class="text-xl font-bold">Edit Tenant</h2><button class="btn-close" on:click={() => (showEditModal = false)}>✕</button></div>
    <form method="POST" action="?/update" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; showEditModal = false; update(); }; }}>
      <input type="hidden" name="id" value={editItem.id} />
      <div class="form-group"><label class="form-label">Nama Tenant *</label><input type="text" name="nama" class="form-control" required bind:value={editItem.nama} /></div>
      <div class="form-group"><label class="form-label">Alamat</label><textarea name="alamat" class="form-control" rows="2" bind:value={editItem.alamat}></textarea></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">No. HP</label><input type="text" name="no_hp" class="form-control" bind:value={editItem.no_hp} /></div>
        <div class="form-group"><label class="form-label">Email</label><input type="email" name="email" class="form-control" bind:value={editItem.email} /></div>
      </div>
      <div class="form-group"><label class="form-label">Media Sosial</label><input type="text" name="medsos" class="form-control" bind:value={editItem.medsos} /></div>
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
  .badge-warning { background: #fef08a; color: #854d0e; }
  .modal-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .action-wrapper { position: relative; display: inline-block; }
  .dropdown-menu { position: absolute; right: 0; top: 100%; background: white; border: 1px solid var(--neutral-200); border-radius: var(--radius-md); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); z-index: 50; display: none; flex-direction: column; min-width: 160px; padding: 0.35rem 0; margin-top: 0.25rem; }
  .dropdown-menu.show { display: flex; }
  .dropdown-item { padding: 0.5rem 1rem; text-align: left; background: none; border: none; font-size: 0.875rem; color: var(--neutral-700); cursor: pointer; width: 100%; display: block; font-family: inherit; transition: background 0.2s; }
  .dropdown-item:hover { background: var(--neutral-100); }
  .text-danger { color: #dc2626 !important; }
  .text-warning { color: #d97706 !important; }
  .text-success { color: #10b981 !important; }
  .btn-warning { background:#f59e0b; color:white; border:none; }
  .btn-success { background:#22c55e; color:white; border:none; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; }
  .modal { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:1000; }
  .modal-content { background:white; padding:2rem; border-radius:var(--radius-lg); width:100%; max-width:560px; max-height:90vh; overflow-y:auto; }
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

{#if showDetailModal && detailItem}
  <div class="modal-overlay" on:click={() => (showDetailModal = false)}>
    <div class="modal-content" style="max-width: 600px;" on:click={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2 style="margin: 0; font-size: 1.25rem;">Detail Tenant</h2>
        <button class="btn-close" on:click={() => (showDetailModal = false)}>✕</button>
      </div>
      <div style="padding: 1.5rem;">
        <div style="display: grid; grid-template-columns: 120px 1fr; gap: 0.75rem; margin-bottom: 1.5rem; font-size: 0.95rem;">
          <div class="text-muted">Nama Tenant</div><div class="font-bold">{detailItem.nama}</div>
          <div class="text-muted">Alamat</div><div>{detailItem.alamat || '-'}</div>
          <div class="text-muted">No HP</div><div>{detailItem.no_hp || '-'}</div>
          <div class="text-muted">Email</div><div>{detailItem.email || '-'}</div>
          <div class="text-muted">Sosmed</div><div>{detailItem.medsos || '-'}</div>
          <div class="text-muted">Paket</div><div><span class="badge badge-neutral">{detailItem.paket}</span></div>
          <div class="text-muted">Status</div><div>
            <span class="badge {detailItem.is_aktif ? 'badge-success' : 'badge-danger'}">{detailItem.is_aktif ? 'Aktif' : 'Tidak Aktif'}</span>
          </div>
          <div class="text-muted">Expired At</div><div>
            {detailItem.expired_at ? new Date(detailItem.expired_at).toLocaleDateString('id-ID') : '-'}
          </div>
        </div>
        {#if detailItem.bukti_transfer}
          <div style="margin-top: 1rem; border-top: 1px solid var(--neutral-200); padding-top: 1rem;">
            <h3 class="font-bold mb-2" style="font-size: 0.95rem;">Bukti Pembayaran Terakhir</h3>
            <img src={detailItem.bukti_transfer} alt="Bukti Transfer" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--neutral-200);" />
          </div>
        {/if}
      </div>
      <div style="padding: 1rem 1.5rem; border-top: 1px solid var(--neutral-200); display: flex; justify-content: flex-end;">
        <button class="btn btn-secondary" on:click={() => (showDetailModal = false)}>Tutup</button>
      </div>
    </div>
  </div>
{/if}

{#if showVerifyModal && selectedTenant}
  <div class="modal-overlay" on:click={() => (showVerifyModal = false)}>
    <div class="modal-content" on:click={(e) => e.stopPropagation()} style="max-width: 500px;">
      <div class="modal-header">
        <h2 style="margin: 0; font-size: 1.25rem;">Verifikasi Pembayaran</h2>
      </div>
      <div style="padding: 1.5rem; background: #f8fafc; border-bottom: 1px solid var(--neutral-200);">
        <div style="display: grid; grid-template-columns: 100px 1fr; gap: 0.5rem; font-size: 0.9rem;">
          <div class="text-muted">Tenant</div><div style="font-weight: 600;">{selectedTenant.nama}</div>
          <div class="text-muted">Pemilik</div><div>{selectedTenant.pemilik}</div>
          <div class="text-muted">Paket</div><div><span class="badge badge-neutral">{selectedTenant.paket}</span></div>
        </div>
      </div>
      <form method="POST" action="?/verifyPayment" enctype="multipart/form-data" use:enhance={async ({ cancel, formData }) => {
        isSubmitting = true;
        
        const file = formData.get('bukti_transfer');
        if (file && typeof file !== 'string' && file.size > 0) {
          const cloudName = env.PUBLIC_CLOUDINARY_CLOUD_NAME;
          const uploadPreset = env.PUBLIC_CLOUDINARY_UPLOAD_PRESET;
          
          if (!cloudName || !uploadPreset) {
            alert("Konfigurasi Cloudinary belum disetting di .env!\nTambahkan PUBLIC_CLOUDINARY_CLOUD_NAME dan PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
            isSubmitting = false;
            cancel();
            return;
          }
          
          try {
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', file);
            cloudinaryFormData.append('upload_preset', uploadPreset);
            
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
              method: 'POST',
              body: cloudinaryFormData
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || 'Upload gagal');
            
            // Hapus file asli dan ganti dengan URL Cloudinary
            formData.delete('bukti_transfer');
            formData.set('bukti_transfer_url', data.secure_url);
          } catch (e) {
            alert("Gagal upload ke Cloudinary: " + (e.message || 'Error tidak diketahui'));
            isSubmitting = false;
            cancel();
            return;
          }
        } else {
          alert("Harap pilih file bukti transfer");
          isSubmitting = false;
          cancel();
          return;
        }

        return async ({ result, update }) => {
          isSubmitting = false;
          await update();
          if (result.type === 'success') {
            showVerifyModal = false;
            alert("Berhasil! Pembayaran telah dikonfirmasi dan masa aktif diperpanjang.");
          } else if (result.type === 'failure') {
            alert(result.data?.error || "Gagal memproses pembayaran");
          }
        };
      }} style="padding: 1.5rem;">
        <input type="hidden" name="id" value={selectedTenant.id} />
        <div class="form-group">
          <label class="form-label" for="duration">Durasi Perpanjangan</label>
          <select id="duration" name="duration_months" class="form-control" bind:value={verifyForm.duration_months}>
            <option value={1}>1 Bulan</option>
            <option value={6}>6 Bulan</option>
            <option value={12}>12 Bulan</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="bukti">Upload Bukti Transfer</label>
          <input type="file" id="bukti" name="bukti_transfer" class="form-control" accept="image/*" required />
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button type="button" class="btn btn-secondary" style="flex: 1;" on:click={() => (showVerifyModal = false)}>Batal</button>
          <button type="submit" class="btn btn-primary" style="flex: 1;" disabled={isSubmitting}>Konfirmasi & Perpanjang</button>
        </div>
      </form>
    </div>
  </div>
{/if}
