<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { formatNumber, parseFormattedNumber } from "$lib/utils/numberFormat";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showModal = $state(false);
  let formData = $state({
    tanggal: new Date().toISOString().split("T")[0],
    kategori: "",
    deskripsi: "",
    jumlah: "",
  });
  let displayJumlah = $state("");

  const kategoriGroups = [
    {
      label: "Hair Treatment",
      options: ["Hair Treatment", "Potong Rambut"]
    },
    {
      label: "Nail Art",
      options: ["Nail Art"]
    },
    {
      label: "Product",
      options: ["Product"]
    }
  ];

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
    formData = {
      tanggal: new Date().toISOString().split("T")[0],
      kategori: "",
      deskripsi: "",
      jumlah: "",
    };
    displayJumlah = "";
    showModal = true;
  }

  function handleJumlahInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const formatted = formatNumber(input.value);
    displayJumlah = formatted;
    formData.jumlah = parseFormattedNumber(formatted);
  }

  function applyFilters() {
    const searchParams = new URLSearchParams();

    if (filterStartDate) searchParams.set("startDate", filterStartDate);
    if (filterEndDate) searchParams.set("endDate", filterEndDate);
    if (filterKategori && filterKategori !== "all")
      searchParams.set("kategori", filterKategori);

    window.location.href = `/pendapatan?${searchParams.toString()}`;
  }

  function changePage(newPage: number) {
    const searchParams = new URL(window.location.href).searchParams;
    searchParams.set("page", newPage.toString());
    window.location.href = `/pendapatan?${searchParams.toString()}`;
  }

  let filterStartDate = $state(data.filters.startDate);
  let filterEndDate = $state(data.filters.endDate);
  let filterKategori = $state(data.filters.kategori);

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
    window.location.href = `/pendapatan?${searchParams.toString()}`;
  }
</script>

<svelte:head>
  <title>Pendapatan - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="flex justify-between items-center mb-2xl">
    <div>
      <h1 class="mb-sm">💰 Pendapatan</h1>
      <p class="text-muted">Kelola data pendapatan salon Anda</p>
    </div>
    <button onclick={handleOpenModal} class="btn btn-success">
      ➕ Tambah Pendapatan
    </button>
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
      <div style="flex: 1; min-width: 150px;">
        <label class="form-label">Kategori:</label>
        <select class="form-select" bind:value={filterKategori}>
          <option value="all">Semua Kategori</option>
          {#each kategoriGroups as group}
            <optgroup label={group.label}>
              {#each group.options as kategori}
                <option value={kategori}>{kategori}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
      </div>
      <div>
        <button onclick={applyFilters} class="btn btn-primary">
          🔍 Filter
        </button>
      </div>
      <div class="stat-card" style="margin: 0; flex: 1; min-width: 250px;">
        <div class="stat-label">Total Pendapatan</div>
        <div class="stat-value text-success">{formatCurrency(data.total)}</div>
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
      <h3 class="card-title">Daftar Pendapatan</h3>
    </div>

    {#if data.pendapatan.length > 0}
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
              <th onclick={() => handleSort('kategori')} style="cursor: pointer; user-select: none;">
                Kategori
                {#if data.filters.sortBy === 'kategori'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('deskripsi')} style="cursor: pointer; user-select: none;">
                Deskripsi
                {#if data.filters.sortBy === 'deskripsi'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th onclick={() => handleSort('jumlah')} style="text-align: right; cursor: pointer; user-select: none;">
                Jumlah
                {#if data.filters.sortBy === 'jumlah'}
                  {data.filters.sortOrder === 'asc' ? '↑' : '↓'}
                {:else}
                  <span style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each data.pendapatan as item, index}
              <tr>
                <td>{index + 1}</td>
                <td>{formatDate(item.tanggal)}</td>
                <td><span class="badge badge-primary">{item.kategori}</span></td
                >
                <td>{item.deskripsi || "-"}</td>
                <td
                  style="text-align: right;"
                  class="font-semibold text-success"
                >
                  {formatCurrency(item.jumlah)}
                </td>
                <td style="text-align: center;">
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
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-center text-muted" style="padding: 2rem;">
        Belum ada data pendapatan untuk bulan ini
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
        <h2>➕ Tambah Pendapatan</h2>
        <button onclick={() => (showModal = false)} class="modal-close"
          >✕</button
        >
      </div>

      <form
        method="POST"
        action="?/create"
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
          <label for="kategori" class="form-label">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            class="form-select"
            bind:value={formData.kategori}
            required
          >
            <option value="">Pilih Kategori</option>
            {#each kategoriGroups as group}
              <optgroup label={group.label}>
                {#each group.options as kategori}
                  <option value={kategori}>{kategori}</option>
                {/each}
              </optgroup>
            {/each}
          </select>
        </div>

        <div class="form-group">
          <label for="deskripsi" class="form-label">Deskripsi (Opsional)</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            class="form-textarea"
            bind:value={formData.deskripsi}
            placeholder="Deskripsi detail..."
          ></textarea>
        </div>

        <div class="form-group">
          <label for="jumlah" class="form-label">Jumlah (Rp)</label>
          <input
            id="jumlah-display"
            type="text"
            inputmode="numeric"
            class="form-input"
            value={displayJumlah}
            oninput={handleJumlahInput}
            placeholder="10.000"
            required
          />
          <input type="hidden" name="jumlah" value={formData.jumlah} />
        </div>

        <div class="flex gap-md">
          <button type="submit" class="btn btn-success" style="flex: 1;">
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
