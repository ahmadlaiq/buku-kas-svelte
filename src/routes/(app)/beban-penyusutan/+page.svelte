<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { formatNumber, parseFormattedNumber } from "$lib/utils/numberFormat";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showModal = $state(false);
  let formData = $state({
    id: "",
    tanggal: new Date().toISOString().split("T")[0],
    nama_aset: "",
    nilai_aset: "",
    umur_ekonomis: "",
  });
  let editMode = $state(false);
  let displayNilaiAset = $state("");

  let nilaiPenyusutan = $derived(() => {
    const nilai = parseFloat(formData.nilai_aset);
    const umur = parseInt(formData.umur_ekonomis);
    if (nilai && umur && nilai > 0 && umur > 0) {
      return nilai / umur;
    }
    return 0;
  });

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function handleOpenModal() {
    editMode = false;
    formData = {
      id: "",
      tanggal: new Date().toISOString().split("T")[0],
      nama_aset: "",
      nilai_aset: "",
      umur_ekonomis: "",
    };
    displayNilaiAset = "";
    showModal = true;
  }

  function handleEdit(item: any) {
    editMode = true;
    formData = {
      id: item.id.toString(),
      tanggal: item.tanggal,
      nama_aset: item.nama_aset,
      nilai_aset: item.nilai_aset.toString(),
      umur_ekonomis: item.umur_ekonomis.toString(),
    };
    displayNilaiAset = formatNumber(item.nilai_aset.toString());
    showModal = true;
  }

  function handleNilaiAsetInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const formatted = formatNumber(input.value);
    displayNilaiAset = formatted;
    formData.nilai_aset = parseFormattedNumber(formatted);
  }

  function applyFilters() {
    const searchParams = new URLSearchParams();

    if (filterStartDate) searchParams.set("startDate", filterStartDate);
    if (filterEndDate) searchParams.set("endDate", filterEndDate);

    window.location.href = `/beban-penyusutan?${searchParams.toString()}`;
  }

  function changePage(newPage: number) {
    const searchParams = new URL(window.location.href).searchParams;
    searchParams.set("page", newPage.toString());
    window.location.href = `/beban-penyusutan?${searchParams.toString()}`;
  }

  let filterStartDate = $state(data.filters.startDate);
  let filterEndDate = $state(data.filters.endDate);

  function handleSort(column: string) {
    const searchParams = new URL(window.location.href).searchParams;
    const currentSortBy = searchParams.get("sortBy") || "tanggal";
    let currentSortOrder = searchParams.get("sortOrder") || "desc";

    if (currentSortBy === column) {
      currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    } else {
      currentSortOrder = "asc";
    }

    searchParams.set("sortBy", column);
    searchParams.set("sortOrder", currentSortOrder);
    window.location.href = `/beban-penyusutan?${searchParams.toString()}`;
  }
</script>

<svelte:head>
  <title>Beban Penyusutan - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="flex justify-between items-center mb-2xl">
    <div>
      <h1 class="mb-sm">📉 Beban Penyusutan</h1>
      <p class="text-muted">Kelola data beban penyusutan aset salon Anda</p>
    </div>
    <button onclick={handleOpenModal} class="btn btn-primary">
      ➕ Tambah Beban Penyusutan
    </button>
  </div>

  <!-- Info Box -->
  <div class="alert alert-info mb-lg">
    💡 <strong>Info:</strong> Penyusutan dihitung secara otomatis dengan metode garis
    lurus (Nilai Aset ÷ Umur Ekonomis dalam Bulan).
  </div>

  <!-- Filter & Stats -->
  <div class="card mb-lg">
    <div
      class="flex"
      style="gap: var(--space-md); align-items: flex-end; flex-wrap: wrap;"
    >
      <div style="flex: 1; min-width: 150px;">
        <label class="form-label">Tanggal Mulai:</label>
        <input type="date" class="form-input" bind:value={filterStartDate} />
      </div>
      <div style="flex: 1; min-width: 150px;">
        <label class="form-label">Tanggal Sampai:</label>
        <input type="date" class="form-input" bind:value={filterEndDate} />
      </div>
      <div>
        <button onclick={applyFilters} class="btn btn-primary">
          🔍 Filter
        </button>
      </div>
      <div class="stat-card" style="margin: 0; flex: 1; min-width: 250px;">
        <div class="stat-label">Total Beban Penyusutan</div>
        <div class="stat-value text-error">{formatCurrency(data.total)}</div>
      </div>
    </div>
  </div>

  {#if form?.error}
    <div class="alert alert-error mb-lg">
      ⚠️ {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success mb-lg">✅ Data berhasil disimpan</div>
  {/if}

  <!-- Data Table -->
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Daftar Beban Penyusutan</h3>
    </div>

    {#if data.bebanPenyusutan.length > 0}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th onclick={() => handleSort('tanggal')} style="cursor: pointer; user-select: none;">
                Tanggal
                {#if data.filters.sortBy === 'tanggal'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('nama_aset')} style="cursor: pointer; user-select: none;">
                Nama Aset
                {#if data.filters.sortBy === 'nama_aset'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('nilai_aset')} style="text-align: right; cursor: pointer; user-select: none;">
                Nilai Aset
                {#if data.filters.sortBy === 'nilai_aset'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('umur_ekonomis')} style="text-align: center; cursor: pointer; user-select: none;">
                Umur (Bulan)
                {#if data.filters.sortBy === 'umur_ekonomis'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('nilai_penyusutan')} style="text-align: right; cursor: pointer; user-select: none;">
                Penyusutan/Bulan
                {#if data.filters.sortBy === 'nilai_penyusutan'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each data.bebanPenyusutan as item, index}
              <tr>
                <td>{index + 1}</td>
                <td>{formatDate(item.tanggal)}</td>
                <td><span class="font-medium">{item.nama_aset}</span></td>
                <td style="text-align: right;" class="font-semibold">
                  {formatCurrency(item.nilai_aset)}
                </td>
                <td style="text-align: center;">
                  <span class="badge badge-primary"
                    >{item.umur_ekonomis} Bulan</span
                  >
                </td>
                <td style="text-align: right;" class="font-semibold text-error">
                  {formatCurrency(item.nilai_penyusutan)}
                </td>
                <td style="text-align: center;">
                  <div class="flex gap-sm justify-center">
                    <button
                      class="btn btn-secondary btn-sm"
                      onclick={() => handleEdit(item)}
                    >
                      ✏️ Edit
                    </button>
                    <form
                      method="POST"
                      action="?/delete"
                      use:enhance={() => {
                        return async ({ update }) => {
                          await update();
                          invalidateAll();
                        };
                      }}
                    >
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        class="btn btn-danger btn-sm"
                        onclick={(e) => {
                          if (!confirm("Yakin ingin menghapus data ini?")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        🗑️ Hapus
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-center text-muted" style="padding: 2rem;">
        Belum ada data beban penyusutan untuk bulan ini
      </p>
    {/if}
  </div>

  <!-- Pagination -->
  {#if data.pagination && data.pagination.totalPages > 1}
    <div class="pagination-container">
      <div class="pagination-info">
        Menampilkan {Math.min(
          (data.pagination.page - 1) * data.pagination.limit + 1,
          data.pagination.totalItems,
        )} -
        {Math.min(
          data.pagination.page * data.pagination.limit,
          data.pagination.totalItems,
        )}
        dari {data.pagination.totalItems} data
      </div>
      <div class="pagination-controls">
        <button
          class="btn btn-secondary btn-sm"
          disabled={data.pagination.page <= 1}
          onclick={() => changePage(data.pagination.page - 1)}
        >
          ⬅️ Sebelumnya
        </button>
        <span class="pagination-page">
          Halaman {data.pagination.page} / {data.pagination.totalPages}
        </span>
        <button
          class="btn btn-secondary btn-sm"
          disabled={data.pagination.page >= data.pagination.totalPages}
          onclick={() => changePage(data.pagination.page + 1)}
        >
          Selanjutnya ➡️
        </button>
      </div>
    </div>
  {/if}
</div>

<!-- Modal -->
{#if showModal}
  <div class="modal-overlay" onclick={() => (showModal = false)}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>{editMode ? '✏️ Edit' : '➕ Tambah'} Beban Penyusutan</h2>
        <button onclick={() => (showModal = false)} class="modal-close"
          >✕</button
        >
      </div>

      <form
        method="POST"
        action={editMode ? "?/update" : "?/create"}
        use:enhance={() => {
          return async ({ result, update }) => {
            await update();
            if (result.type === "success") {
              showModal = false;
              invalidateAll();
            }
          };
        }}
      >
        {#if editMode}
          <input type="hidden" name="id" value={formData.id} />
        {/if}
        <div class="form-group">
          <label for="tanggal" class="form-label">Tanggal</label>
          <input
            id="tanggal"
            name="tanggal"
            type="date"
            class="form-input"
            bind:value={formData.tanggal}
            required
          />
        </div>

        <div class="form-group">
          <label for="nama_aset" class="form-label">Nama Aset</label>
          <input
            id="nama_aset"
            name="nama_aset"
            type="text"
            class="form-input"
            bind:value={formData.nama_aset}
            placeholder="Contoh: Kursi Salon, Alat Cukur, dll"
            required
          />
        </div>

        <div class="form-group">
          <label for="nilai_aset" class="form-label">Nilai Aset (Rp)</label>
          <input
            id="nilai_aset-display"
            type="text"
            inputmode="numeric"
            class="form-input"
            value={displayNilaiAset}
            oninput={handleNilaiAsetInput}
            placeholder="10.000"
            required
          />
          <input type="hidden" name="nilai_aset" value={formData.nilai_aset} />
        </div>

        <div class="form-group">
          <label for="umur_ekonomis" class="form-label"
            >Umur Ekonomis (Bulan)</label
          >
          <input
            id="umur_ekonomis"
            name="umur_ekonomis"
            type="number"
            class="form-input"
            bind:value={formData.umur_ekonomis}
            min="1"
            step="1"
            placeholder="Estimasi masa pakai dalam bulan"
            required
          />
        </div>

        {#if nilaiPenyusutan() > 0}
          <div class="alert alert-info mb-lg">
            📊 <strong>Nilai Penyusutan per Bulan:</strong>
            {formatCurrency(nilaiPenyusutan())}
          </div>
        {/if}

        <div class="flex gap-md">
          <button type="submit" class="btn btn-primary" style="flex: 1;">
            💾 Simpan
          </button>
          <button
            type="button"
            onclick={() => (showModal = false)}
            class="btn btn-secondary"
            style="flex: 1;"
          >
            ✕ Batal
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--space-lg);
    padding-top: var(--space-md);
    border-top: 1px solid var(--neutral-200);
  }

  .pagination-info {
    color: var(--neutral-600);
    font-size: 0.9rem;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .pagination-page {
    font-weight: 500;
    color: var(--neutral-700);
  }

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
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
