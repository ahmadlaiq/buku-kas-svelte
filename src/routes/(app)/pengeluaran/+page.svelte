<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showModal = $state(false);
  let formData = $state({
    tanggal: new Date().toISOString().split("T")[0],
    kategori: "",
    deskripsi: "",
    jumlah: "",
  });

  const kategoriOptions = [
    "Pembelian Produk",
    "Gaji Karyawan",
    "Utilitas (Listrik, Air)",
    "Sewa Tempat",
    "Peralatan & Perlengkapan",
    "Pemasaran & Promosi",
    "Lainnya",
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
    showModal = true;
  }

  function filterByMonth(month: string) {
    const searchParams = new URLSearchParams({ month });
    window.location.href = `/pengeluaran?${searchParams.toString()}`;
  }
</script>

<svelte:head>
  <title>Pengeluaran - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="flex justify-between items-center mb-2xl">
    <div>
      <h1 class="mb-sm">💸 Pengeluaran</h1>
      <p class="text-muted">Kelola data pengeluaran salon Anda</p>
    </div>
    <button onclick={handleOpenModal} class="btn btn-primary">
      ➕ Tambah Pengeluaran
    </button>
  </div>

  <!-- Filter & Stats -->
  <div class="card mb-lg">
    <div class="flex justify-between items-center">
      <div>
        <label class="form-label">Filter Bulan:</label>
        <input
          type="month"
          class="form-input"
          style="width: auto; display: inline-block;"
          value={data.selectedMonth}
          onchange={(e) => filterByMonth(e.currentTarget.value)}
        />
      </div>
      <div class="stat-card" style="margin: 0; flex: 1; max-width: 300px;">
        <div class="stat-label">Total Pengeluaran</div>
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
      <h3 class="card-title">Daftar Pengeluaran</h3>
    </div>

    {#if data.pengeluaran.length > 0}
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Deskripsi</th>
              <th style="text-align: right;">Jumlah</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {#each data.pengeluaran as item, index}
              <tr>
                <td>{index + 1}</td>
                <td>{formatDate(item.tanggal)}</td>
                <td><span class="badge badge-danger">{item.kategori}</span></td>
                <td>{item.deskripsi || "-"}</td>
                <td style="text-align: right;" class="font-semibold text-error">
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
        Belum ada data pengeluaran untuk bulan ini
      </p>
    {/if}
  </div>
</div>

<!-- Modal -->
{#if showModal}
  <div class="modal-overlay" onclick={() => (showModal = false)}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>➕ Tambah Pengeluaran</h2>
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
            {#each kategoriOptions as kategori}
              <option value={kategori}>{kategori}</option>
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
            id="jumlah"
            name="jumlah"
            type="number"
            class="form-input"
            bind:value={formData.jumlah}
            min="0"
            step="1000"
            required
          />
        </div>

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
