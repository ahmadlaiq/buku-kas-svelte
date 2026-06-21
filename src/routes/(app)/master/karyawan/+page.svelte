<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let showAddModal = false;
  let loading = false;
</script>

<svelte:head>
  <title>Master Karyawan - Buku Kas</title>
</svelte:head>

<div class="header">
  <div>
    <h1 class="text-2xl font-bold">Master Karyawan</h1>
    <p class="text-muted">Kelola data karyawan salon</p>
  </div>
  <button class="btn btn-primary" on:click={() => (showAddModal = true)}>
    + Tambah Karyawan
  </button>
</div>

{#if form?.error}
  <div class="alert alert-error" style="margin-bottom: 1rem;">
    {form.error}
  </div>
{/if}

{#if form?.success}
  <div class="alert alert-success" style="margin-bottom: 1rem;">
    Berhasil menyimpan data karyawan!
  </div>
{/if}

<div class="card">
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Posisi</th>
          <th>No HP</th>
          <th style="width: 100px;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {#each data.karyawan as item}
          <tr>
            <td class="font-medium">{item.nama}</td>
            <td>{item.posisi || '-'}</td>
            <td>{item.no_hp || '-'}</td>
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
                    if (confirm('Yakin ingin menghapus karyawan ini?')) {
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
              Belum ada data karyawan
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

{#if showAddModal}
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="text-xl font-bold">Tambah Karyawan</h2>
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
          <label for="nama" class="form-label">Nama Karyawan *</label>
          <input
            type="text"
            id="nama"
            name="nama"
            class="form-control"
            required
            placeholder="Masukkan nama karyawan"
          />
        </div>

        <div class="form-group">
          <label for="posisi" class="form-label">Posisi</label>
          <input
            type="text"
            id="posisi"
            name="posisi"
            class="form-control"
            placeholder="Contoh: Terapis, Kasir"
          />
        </div>

        <div class="form-group">
          <label for="no_hp" class="form-label">No. HP</label>
          <input
            type="text"
            id="no_hp"
            name="no_hp"
            class="form-control"
            placeholder="08123xxxx"
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
            {loading ? 'Menyimpan...' : 'Simpan Karyawan'}
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
</style>
