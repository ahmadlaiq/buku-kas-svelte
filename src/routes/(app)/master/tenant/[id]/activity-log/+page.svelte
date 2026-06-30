<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  function formatDate(dateString: string | Date) {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  function getBadgeColor(action: string) {
    if (action === 'CREATE') return 'badge-success';
    if (action === 'UPDATE') return 'badge-warning';
    if (action === 'DELETE') return 'badge-danger';
    return 'badge-neutral';
  }
</script>

<svelte:head>
  <title>Activity Log - {data.tenant.nama}</title>
</svelte:head>

<div class="header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
  <div>
    <h1 class="text-2xl font-bold">Activity Log: {data.tenant.nama}</h1>
    <p class="text-muted">Riwayat aktivitas (Tambah, Edit, Hapus) pada tenant ini</p>
  </div>
  <a href="/master/tenant" class="btn btn-secondary">Kembali</a>
</div>

<div class="card">
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Waktu</th>
          <th>User</th>
          <th>Aksi</th>
          <th>Modul / Entitas</th>
          <th>Detail Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {#each data.logs as log}
          <tr>
            <td class="text-sm">{formatDate(log.created_at)}</td>
            <td>
              {#if log.user}
                <span class="font-semibold">{log.user.full_name}</span>
                <div class="text-xs text-muted">{log.user.role?.nama || '-'}</div>
              {:else}
                <span class="text-muted italic">Sistem / Terhapus</span>
              {/if}
            </td>
            <td>
              <span class="badge {getBadgeColor(log.action)}">{log.action}</span>
            </td>
            <td class="font-semibold">{log.entity}</td>
            <td class="text-sm text-muted" style="max-width: 300px; white-space: normal;">
              {log.details || '-'}
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="text-center text-muted" style="padding: 2rem;">
              Belum ada aktivitas yang terekam untuk tenant ini.
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .badge { display:inline-block; padding:0.25rem 0.75rem; border-radius:99px; font-size:0.75rem; font-weight:600; text-transform:uppercase; }
  .badge-success { background:#dcfce7; color:#166534; }
  .badge-warning { background:#fef08a; color:#854d0e; }
  .badge-danger { background:#fee2e2; color:#991b1b; }
  .badge-neutral { background:#f1f5f9; color:#475569; }
</style>
