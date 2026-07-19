<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let selectedBarang = $state<any>(null);
  let showEditStock = $state(false);
  let showEditBarcode = $state(false);
  let showLogModal = $state(false);

  function openEditStock(barang: any) {
    selectedBarang = barang;
    showEditStock = true;
    showEditBarcode = false;
  }

  function openEditBarcode(barang: any) {
    selectedBarang = barang;
    showEditBarcode = true;
    showEditStock = false;
  }

  function closeEdit() {
    selectedBarang = null;
    showEditStock = false;
    showEditBarcode = false;
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
</script>

<svelte:head>
  <title>Stock Barang - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="flex justify-between items-center mb-2xl">
    <div>
      <h1 class="mb-sm">📦 Stock Barang</h1>
      <p class="text-muted">Kelola stok dan barcode barang</p>
    </div>
    <div class="flex gap-md">
      <a href="/scan-barang" class="btn btn-primary">
        📷 Scan Barang
      </a>
      <button onclick={() => (showLogModal = true)} class="btn btn-secondary">
        📋 Riwayat Stok
      </button>
    </div>
  </div>

  {#if form?.message}
    <div class="alert alert-{form.success ? 'success' : 'error'} mb-lg">
      {form.success ? '✅' : '⚠️'} {form.message}
    </div>
  {/if}

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Daftar Barang</h3>
    </div>

    {#if data.barangs.length > 0}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th style="text-align: center;">Stok</th>
              <th>Barcode</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each data.barangs as barang, i}
              <tr>
                <td>{i + 1}</td>
                <td class="font-semibold">{barang.nama}</td>
                <td>
                  {#if barang.kategori}
                    <span class="badge badge-primary">{barang.kategori}</span>
                  {:else}
                    -
                  {/if}
                </td>
                <td style="text-align: center;">
                  <span class="badge {barang.stock <= 5 ? 'badge-danger' : 'badge-success'}">
                    {barang.stock}
                  </span>
                </td>
                <td class="text-muted">{barang.barcode || "Belum ada"}</td>
                <td style="text-align: center;">
                  <div class="flex justify-center gap-sm">
                    <button class="btn btn-sm" onclick={() => openEditStock(barang)}>
                      ✏️ Edit Stok
                    </button>
                    <button class="btn btn-primary btn-sm" onclick={() => openEditBarcode(barang)}>
                      🏷️ Set Barcode
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-center text-muted" style="padding: 2rem;">
        Belum ada data barang
      </p>
    {/if}
  </div>
</div>

<!-- Modal Edit Stock -->
{#if showEditStock}
  <div class="modal-overlay" onclick={closeEdit}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>✏️ Edit Stok {selectedBarang.nama}</h2>
        <button onclick={closeEdit} class="modal-close">✕</button>
      </div>
      <form method="POST" action="?/updateStock" use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === 'success') {
            closeEdit();
            invalidateAll();
          }
          await update();
        };
      }}>
        <div class="modal-body">
          <input type="hidden" name="id" value={selectedBarang.id} />
          <div class="form-group">
            <label for="stock" class="form-label">Stok Baru</label>
            <input
              type="number"
              id="stock"
              name="stock"
              class="form-input"
              value={selectedBarang.stock}
              required
              min="0"
            />
          </div>
        </div>
        <div class="flex gap-md" style="margin-top: var(--space-xl)">
          <button type="submit" class="btn btn-success" style="flex: 1;">💾 Simpan</button>
          <button type="button" class="btn btn-secondary" onclick={closeEdit} style="flex: 1;">✕ Batal</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Modal Edit Barcode -->
{#if showEditBarcode}
  <div class="modal-overlay" onclick={closeEdit}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>🏷️ Set Barcode {selectedBarang.nama}</h2>
        <button onclick={closeEdit} class="modal-close">✕</button>
      </div>
      <form method="POST" action="?/updateBarcode" use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === 'success') {
            closeEdit();
            invalidateAll();
          }
          await update();
        };
      }}>
        <div class="modal-body">
          <input type="hidden" name="id" value={selectedBarang.id} />
          <div class="form-group">
            <label for="barcode" class="form-label">Scan Barcode / Masukkan Manual</label>
            <input
              type="text"
              id="barcode"
              name="barcode"
              class="form-input"
              value={selectedBarang.barcode || ""}
              autofocus
              required
            />
            <p class="text-sm text-muted mt-2">
              Arahkan kursor ke kolom ini, lalu scan barcode barang menggunakan scanner.
            </p>
          </div>
        </div>
        <div class="flex gap-md" style="margin-top: var(--space-xl)">
          <button type="submit" class="btn btn-success" style="flex: 1;">💾 Simpan</button>
          <button type="button" class="btn btn-secondary" onclick={closeEdit} style="flex: 1;">✕ Batal</button>
        </div>
      </form>
    </div>
  </div>
{/if}

<!-- Modal Log -->
{#if showLogModal}
  <div class="modal-overlay" onclick={() => (showLogModal = false)}>
    <div class="modal-content log-modal" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>📋 Riwayat Stok</h2>
        <button onclick={() => (showLogModal = false)} class="modal-close">✕</button>
      </div>
      
      <div class="log-container">
        {#if data.stockLogs.length > 0}
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Barang</th>
                <th>Jenis</th>
                <th style="text-align: right;">Perubahan</th>
                <th style="text-align: right;">Stok Akhir</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {#each data.stockLogs as log}
                <tr>
                  <td class="text-sm">{formatDate(log.created_at)}</td>
                  <td class="font-semibold">{log.material.nama}</td>
                  <td>
                    <span class="badge {log.jenis === 'IN' ? 'badge-success' : log.jenis === 'OUT' ? 'badge-danger' : 'badge-primary'}">
                      {log.jenis}
                    </span>
                  </td>
                  <td style="text-align: right;" class="font-bold {log.jumlah > 0 ? 'text-success' : log.jumlah < 0 ? 'text-danger' : ''}">
                    {log.jumlah > 0 ? '+' : ''}{log.jumlah}
                  </td>
                  <td style="text-align: right;">{log.stok_sesudah}</td>
                  <td class="text-sm text-muted">{log.keterangan || '-'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        {:else}
          <p class="text-center text-muted" style="padding: 2rem;">
            Belum ada riwayat stok.
          </p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 600;
  }
  .badge-success { background: #e6f4ea; color: #1e8e3e; }
  .badge-danger { background: #fce8e6; color: #d93025; }
  .badge-primary { background: #e8f0fe; color: #1a73e8; }
  
  .text-success { color: #1e8e3e; }
  .text-danger { color: #d93025; }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease-out;
  }

  .modal-content {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-2xl);
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .log-modal {
    max-width: 800px;
  }

  .log-container {
    overflow-x: auto;
  }

  .log-container table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .log-container th {
    background-color: var(--neutral-100);
    padding: 0.75rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--neutral-700);
    border-bottom: 2px solid var(--neutral-200);
  }

  .log-container td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--neutral-200);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--neutral-500);
    transition: color var(--transition-fast);
    padding: 0.25rem;
    line-height: 1;
  }

  .modal-close:hover {
    color: var(--neutral-900);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
