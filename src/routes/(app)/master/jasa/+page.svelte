<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let showAddModal = false;
  let loading = false;

  function changePage(newPage: number) {
    const searchParams = new URL(window.location.href).searchParams;
    searchParams.set("page", newPage.toString());
    window.location.href = `?${searchParams.toString()}`;
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }
</script>

<svelte:head>
  <title>Master Jasa - Buku Kas</title>
</svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Master Jasa</h1>
    <p class="text-muted">Kelola data layanan/jasa salon</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>
    + Tambah Jasa
  </button>
</div>

{#if form?.error}
  <div class="alert alert-error" style="margin-bottom: 1rem;">
    {form.error}
  </div>
{/if}

{#if form?.success}
  <div class="alert alert-success" style="margin-bottom: 1rem;">
    Berhasil menyimpan data jasa!
  </div>
{/if}

<div class="card">
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nama Jasa</th>
          <th>Kategori</th>
          <th>Harga Default</th>
          <th style="width: 100px;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each data.material as item}
          <tr>
            <td class="font-medium">{item.nama}</td>
            <td>{item.kategori || '-'}</td>
            <td>{item.harga ? formatCurrency(item.harga) : '-'}</td>
            <td>
              <form method="POST" action="?/delete" use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                  loading = false;
                  update();
                };
              }}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  class="btn btn-sm btn-danger"
                  disabled={loading}
                  on:click|preventDefault={(e) => {
                    if (confirm('Yakin ingin menghapus jasa ini?')) {
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                >
                  Hapus
                </button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="4" class="text-center text-muted" style="padding: 2rem;">
              Belum ada data jasa
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
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
        on:click={() => changePage(data.pagination.page - 1)}
      >
        ⬅️ Sebelumnya
      </button>
      <span class="pagination-page">
        Halaman {data.pagination.page} / {data.pagination.totalPages}
      </span>
      <button
        class="btn btn-secondary btn-sm"
        disabled={data.pagination.page >= data.pagination.totalPages}
        on:click={() => changePage(data.pagination.page + 1)}
      >
        Selanjutnya ➡️
      </button>
    </div>
  </div>
{/if}

{#if showAddModal}
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="text-xl font-bold">Tambah Jasa</h2>
        <button class="btn-close" on:click={() => (showAddModal = false)}>✕</button>
      </div>

      <form
        method="POST"
        action="?/create"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            showAddModal = false;
            update();
          };
        }}
      >
        <div class="form-group">
          <label for="nama" class="form-label">Nama Jasa *</label>
          <input
            type="text"
            id="nama"
            name="nama"
            class="form-control"
            required
            placeholder="Contoh: Potong Poni"
          />
        </div>

        <div class="form-group">
          <label for="kategori" class="form-label">Kategori</label>
          <input
            type="text"
            id="kategori"
            name="kategori"
            class="form-control"
            placeholder="Contoh: Potong Rambut, Hair Treatment, dll"
          />
        </div>

        <div class="form-group">
          <label for="harga" class="form-label">Harga Default (Rp)</label>
          <input
            type="number"
            id="harga"
            name="harga"
            class="form-control"
            placeholder="0"
          />
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button
            type="button"
            class="btn btn-secondary"
            style="flex: 1;"
            on:click={() => (showAddModal = false)}
            disabled={loading}
          >
            Batal
          </button>
          <button type="submit" class="btn btn-primary" style="flex: 1;" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Jasa'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 500px;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--neutral-500);
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--neutral-700);
  }
  .form-control {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--neutral-300);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: all 0.2s;
  }
  .form-control:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
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
</style>
