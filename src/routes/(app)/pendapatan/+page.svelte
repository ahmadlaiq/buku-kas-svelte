<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { formatNumber, parseFormattedNumber } from "$lib/utils/numberFormat";
  import { showAlert } from "$lib/utils/alert";
  import Swal from 'sweetalert2';
  
  let { data, form }: { data: PageData; form: ActionData } = $props();

  let showModal = $state(false);
  let selectedDetail: any = $state(null);

  const kategoriGroups = [
    {
      label: "Hair Treatment",
      options: ["Hair Treatment"]
    },
    {
      label: "Nail Art",
      options: ["Nail Art"]
    },
    {
      label: "Dagangan",
      options: ["Dagangan"]
    },
    {
      label: "Jajan",
      options: ["Jajan"]
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

  function handleOpenModal(detailData: any) {
    selectedDetail = detailData;
    showModal = true;
  }

  function handlePrintClick(item: any) {
    Swal.fire({
      title: 'Opsi Bagikan',
      text: 'Pilih metode pembagian struk:',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: '🖨️ Cetak Biasa',
      denyButtonText: '📱 Kirim WA',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#6b7280',
      denyButtonColor: '#25D366'
    }).then((result) => {
      if (result.isConfirmed) {
        printReceipt(item);
      } else if (result.isDenied) {
        promptWA(item);
      }
    });
  }

  function printReceipt(item: any) {
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (!printWindow) {
      showAlert.warning('Popup Diblokir', 'Browser memblokir popup.');
      return;
    }
    
    let customerName = 'Pelanggan';
    const match = item.deskripsi?.match(/Pelanggan:\s([^.]+)/);
    if (match) customerName = match[1];

    let itemsHtml = '';
    if (item.details && item.details.length > 0) {
      item.details.forEach((d: any) => {
        itemsHtml += `
          <div style="margin-bottom: 8px;">
            <div>${d.material?.nama || 'Item'}</div>
            <div style="display: flex; justify-content: space-between;">
              <span>${d.qty} x ${formatCurrency(d.harga_satuan)}</span>
              <span>${formatCurrency(d.subtotal)}</span>
            </div>
          </div>
        `;
      });
    } else {
      itemsHtml = `<div style="text-align: center;">${item.deskripsi}</div>`;
    }

    let tenantName = data.tenant?.nama || 'BUKU KAS SALON';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Struk - TRX-${item.id}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace, sans-serif; font-size: 12px; margin: 0; padding: 10px; color: black; max-width: 80mm; }
            h2 { margin: 0 0 5px 0; font-size: 16px; text-align: center; }
            p { margin: 3px 0; }
            hr { border: none; border-top: 1px dashed black; margin: 10px 0; }
            @media print { body { max-width: 100%; margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          <h2>${tenantName}</h2>
          <p style="text-align: center;">Salinan Struk</p>
          <hr />
          <p>No TRX: ${item.id}</p>
          <p>Tanggal: ${formatDate(item.tanggal)}</p>
          <p>Pelanggan: ${customerName}</p>
          <hr />
          ${itemsHtml}
          <hr />
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
            <span>Total</span> <span>${formatCurrency(item.jumlah)}</span>
          </div>
          <hr />
          <p style="text-align: center; margin-top: 20px;">Terima Kasih</p>
          <script>
            window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 500); }
          <\\/script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  }

  function promptWA(item: any) {
    Swal.fire({
      title: 'Kirim via WhatsApp',
      input: 'text',
      inputLabel: 'Masukkan Nomor HP Pelanggan',
      inputPlaceholder: 'Contoh: 08123456789',
      showCancelButton: true,
      confirmButtonText: 'Kirim',
      cancelButtonText: 'Batal'
    }).then((res) => {
      if (res.isConfirmed && res.value) {
        let phone = res.value.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.slice(1);
        
        let customerName = 'Pelanggan';
        const match = item.deskripsi?.match(/Pelanggan:\s([^.]+)/);
        if (match) customerName = match[1];

        let itemsText = '';
        if (item.details && item.details.length > 0) {
          itemsText = item.details.map((d: any) => `- ${d.qty}x ${d.material?.nama} = ${formatCurrency(d.subtotal)}`).join('%0A');
        } else {
          itemsText = item.deskripsi || 'Tidak ada detail';
        }

        let tenantName = data.tenant?.nama || 'Buku Kas Salon';
        let text = `Halo Kak ${customerName},%0ATerima kasih atas kunjungan Anda di *${tenantName}*.%0A%0A*Salinan Transaksi (TRX-${item.id}):*%0A${itemsText}%0A%0ATotal: *${formatCurrency(item.jumlah)}*%0A%0ATerima kasih!`;
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
      }
    });
  }

  function applyFilters() {
    const searchParams = new URLSearchParams();

    if (filterStartDate) searchParams.set("startDate", filterStartDate);
    if (filterEndDate) searchParams.set("endDate", filterEndDate);
    if (filterKategori && filterKategori !== "all")
      searchParams.set("kategori", filterKategori);
    if (searchValue) searchParams.set("search", searchValue);
    
    searchParams.set('page', '1');

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
  let searchValue = $state(data.filters.search || '');

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
      <p class="text-muted">Kelola dan lihat rincian pendapatan salon Anda</p>
    </div>
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
      <div style="flex: 1; min-width: 200px;">
        <label class="form-label">Cari Deskripsi:</label>
        <input type="text" class="form-input" placeholder="Cari..." bind:value={searchValue} onkeydown={(e) => e.key === 'Enter' && applyFilters()} />
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
                <td>
                  {#if item.displayCategories}
                    <div class="flex gap-xs flex-wrap">
                      {#each item.displayCategories as cat}
                        <span class="badge badge-primary">{cat}</span>
                      {/each}
                    </div>
                  {:else}
                    <span class="badge badge-primary">{item.kategori}</span>
                  {/if}
                </td>
                <td>{item.deskripsi || "-"}</td>
                <td
                  style="text-align: right;"
                  class="font-semibold text-success"
                >
                  {formatCurrency(item.jumlah)}
                </td>
                <td style="text-align: center;">
                  <div class="flex gap-sm justify-center">
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm"
                      title="Cetak atau Kirim WA"
                      onclick={() => handlePrintClick(item)}
                    >
                      🖨️
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary btn-sm"
                      onclick={() => handleOpenModal(item)}
                    >
                      📄 Detail
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
                        type="button"
                        class="btn btn-danger btn-sm"
                        onclick={(e) => {
                          const form = (e.currentTarget as HTMLButtonElement).closest('form');
                          if (form) {
                            showAlert.confirm('Hapus Data?', 'Yakin ingin menghapus data ini?', 'Ya, Hapus').then(res => {
                              if (res.isConfirmed) form.requestSubmit();
                            });
                          }
                        }}
                      >
                        🗑️
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
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" onclick={() => (showModal = false)}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <div class="modal-header">
        <h2>📄 Detail Transaksi</h2>
        <button onclick={() => (showModal = false)} class="modal-close"
          >✕</button
        >
      </div>

      {#if selectedDetail}
        <div class="mb-md">
          <p><strong>Tanggal:</strong> {formatDate(selectedDetail.tanggal)}</p>
          <p><strong>Kategori:</strong> <span class="badge badge-primary">{selectedDetail.kategori}</span></p>
          <p><strong>Total:</strong> <span class="font-bold text-success">{formatCurrency(selectedDetail.jumlah)}</span></p>
          <p><strong>Keterangan:</strong> {selectedDetail.deskripsi}</p>
        </div>

        {#if selectedDetail.details && selectedDetail.details.length > 0}
          <h4 class="mb-sm">Rincian Item</h4>
          <div class="table-container mb-md">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Harga</th>
                  <th>Subtotal</th>
                  <th>Stylist</th>
                </tr>
              </thead>
              <tbody>
                {#each selectedDetail.details as d}
                  <tr>
                    <td>{d.material?.nama || 'Unknown'}</td>
                    <td>{d.qty}</td>
                    <td>{formatCurrency(d.harga_satuan)}</td>
                    <td class="font-semibold">{formatCurrency(d.subtotal)}</td>
                    <td>
                      {#if d.karyawan}
                        <span class="badge" style="background:var(--neutral-100);">{d.karyawan.nama}</span>
                      {:else}
                        -
                      {/if}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {:else}
          <p class="text-muted text-center" style="padding: 1rem 0;">Belum ada rincian item (data lama).</p>
        {/if}

        <div class="flex justify-center mt-lg">
          <button
            type="button"
            onclick={() => (showModal = false)}
            class="btn btn-secondary"
            style="min-width: 120px;"
          >
            Tutup
          </button>
        </div>
      {/if}
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
    max-width: 800px;
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
