<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function filterByMonth(month: string) {
    const searchParams = new URLSearchParams({ month });
    window.location.href = `/laporan?${searchParams.toString()}`;
  }

  function handlePrint() {
    window.print();
  }

  // Sorting states for each section
  let sortConfig = $state({
    pendapatan: { key: "total", order: "desc" },
    pengeluaran: { key: "total", order: "desc" },
    bebanOperasional: { key: "total", order: "desc" },
    bebanPenyusutan: { key: "total", order: "desc" },
  });

  function toggleSort(section: keyof typeof sortConfig, key: string) {
    const current = sortConfig[section];
    if (current.key === key) {
      current.order = current.order === "asc" ? "desc" : "asc";
    } else {
      sortConfig[section] = { key, order: "desc" };
    }
  }

  function sortItems(items: any[], config: { key: string; order: string }) {
    return [...items].sort((a, b) => {
      const valA = a[config.key];
      const valB = b[config.key];
      let compare = 0;
      if (typeof valA === "string") {
        compare = valA.localeCompare(valB);
      } else {
        compare = valA - valB;
      }
      return config.order === "asc" ? compare : -compare;
    });
  }

  let sortedPendapatan = $derived(
    sortItems(data.pendapatan, sortConfig.pendapatan)
  );
  let sortedPengeluaran = $derived(
    sortItems(data.pengeluaran, sortConfig.pengeluaran)
  );
  let sortedBebanOperasional = $derived(
    sortItems(data.bebanOperasional, sortConfig.bebanOperasional)
  );
  let sortedBebanPenyusutan = $derived(
    sortItems(data.bebanPenyusutan, sortConfig.bebanPenyusutan)
  );
</script>

<svelte:head>
  <title>Laporan Laba & Rugi - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="flex justify-between items-center mb-2xl no-print">
    <div>
      <h1 class="mb-sm">📈 Laporan Laba & Rugi</h1>
      <p class="text-muted">Laporan keuangan salon Anda</p>
    </div>
    <button onclick={handlePrint} class="btn btn-primary">
      🖨️ Cetak Laporan
    </button>
  </div>

  <!-- Filter -->
  <div class="card mb-lg no-print">
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
  </div>

  <!-- Report Card -->
  <div class="report-card">
    <div class="report-header">
      <h2>💅 BUKU KAS SALON</h2>
      <h3>LAPORAN LABA RUGI</h3>
      <p>Periode: {data.monthName}</p>
    </div>

    <div class="report-content">
      <!-- PENDAPATAN -->
      <section class="report-section">
        <h4 class="section-title">PENDAPATAN</h4>
        <table class="report-table">
          <thead>
            <tr>
              <th class="header-name" onclick={() => toggleSort("pendapatan", "kategori")}>
                Kategori
                {#if sortConfig.pendapatan.key === "kategori"}
                  <span class="no-print">{sortConfig.pendapatan.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th class="header-value" onclick={() => toggleSort("pendapatan", "total")}>
                Total
                {#if sortConfig.pendapatan.key === "total"}
                  <span class="no-print">{sortConfig.pendapatan.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
            </tr>
          </thead>
          <tbody>
            {#each sortedPendapatan as item}
              <tr>
                <td class="item-name">{item.kategori}</td>
                <td class="item-value">{formatCurrency(item.total)}</td>
              </tr>
            {/each}
            <tr class="subtotal-row">
              <td class="item-name"><strong>Total Pendapatan</strong></td>
              <td class="item-value"
                ><strong>{formatCurrency(data.totalPendapatan)}</strong></td
              >
            </tr>
          </tbody>
        </table>
      </section>

      <!-- PENGELUARAN LANGSUNG -->
      <section class="report-section">
        <h4 class="section-title">PENGELUARAN LANGSUNG</h4>
        <table class="report-table">
          <thead>
            <tr>
              <th class="header-name" onclick={() => toggleSort("pengeluaran", "kategori")}>
                Kategori
                {#if sortConfig.pengeluaran.key === "kategori"}
                  <span class="no-print">{sortConfig.pengeluaran.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th class="header-value" onclick={() => toggleSort("pengeluaran", "total")}>
                Total
                {#if sortConfig.pengeluaran.key === "total"}
                  <span class="no-print">{sortConfig.pengeluaran.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
            </tr>
          </thead>
          <tbody>
            {#each sortedPengeluaran as item}
              <tr>
                <td class="item-name">{item.kategori}</td>
                <td class="item-value">{formatCurrency(item.total)}</td>
              </tr>
            {/each}
            <tr class="subtotal-row">
              <td class="item-name"><strong>Total Pengeluaran</strong></td>
              <td class="item-value"
                ><strong>{formatCurrency(data.totalPengeluaran)}</strong></td
              >
            </tr>
          </tbody>
        </table>
      </section>

      <!-- LABA KOTOR -->
      <section class="report-section highlight">
        <table class="report-table">
          <tbody>
            <tr class="total-row">
              <td class="item-name"><strong>LABA KOTOR</strong></td>
              <td
                class="item-value"
                class:text-success={data.labaKotor >= 0}
                class:text-error={data.labaKotor < 0}
              >
                <strong>{formatCurrency(data.labaKotor)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- BEBAN OPERASIONAL -->
      <section class="report-section">
        <h4 class="section-title">BEBAN OPERASIONAL</h4>
        <table class="report-table">
          <thead>
            <tr>
              <th class="header-name" onclick={() => toggleSort("bebanOperasional", "kategori")}>
                Kategori
                {#if sortConfig.bebanOperasional.key === "kategori"}
                  <span class="no-print">{sortConfig.bebanOperasional.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th class="header-value" onclick={() => toggleSort("bebanOperasional", "total")}>
                Total
                {#if sortConfig.bebanOperasional.key === "total"}
                  <span class="no-print">{sortConfig.bebanOperasional.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
            </tr>
          </thead>
          <tbody>
            {#each sortedBebanOperasional as item}
              <tr>
                <td class="item-name">{item.kategori}</td>
                <td class="item-value">{formatCurrency(item.total)}</td>
              </tr>
            {/each}
            <tr class="subtotal-row">
              <td class="item-name"><strong>Total Beban Operasional</strong></td
              >
              <td class="item-value"
                ><strong>{formatCurrency(data.totalBebanOperasional)}</strong
                ></td
              >
            </tr>
          </tbody>
        </table>
      </section>

      <!-- BEBAN PENYUSUTAN -->
      <section class="report-section">
        <h4 class="section-title">BEBAN PENYUSUTAN</h4>
        <table class="report-table">
          <thead>
            <tr>
              <th class="header-name" onclick={() => toggleSort("bebanPenyusutan", "kategori")}>
                Kategori
                {#if sortConfig.bebanPenyusutan.key === "kategori"}
                  <span class="no-print">{sortConfig.bebanPenyusutan.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
              <th class="header-value" onclick={() => toggleSort("bebanPenyusutan", "total")}>
                Total
                {#if sortConfig.bebanPenyusutan.key === "total"}
                  <span class="no-print">{sortConfig.bebanPenyusutan.order === "asc" ? "↑" : "↓"}</span>
                {:else}
                  <span class="no-print" style="opacity: 0.3">↕</span>
                {/if}
              </th>
            </tr>
          </thead>
          <tbody>
            {#each sortedBebanPenyusutan as item}
              <tr>
                <td class="item-name">{item.kategori}</td>
                <td class="item-value">{formatCurrency(item.total)}</td>
              </tr>
            {/each}
            <tr class="subtotal-row">
              <td class="item-name"><strong>Total Beban Penyusutan</strong></td>
              <td class="item-value"
                ><strong>{formatCurrency(data.totalBebanPenyusutan)}</strong
                ></td
              >
            </tr>
          </tbody>
        </table>
      </section>

      <!-- TOTAL BIAYA -->
      <section class="report-section highlight">
        <table class="report-table">
          <tbody>
            <tr class="total-row">
              <td class="item-name"><strong>TOTAL BIAYA</strong></td>
              <td class="item-value">
                <strong>{formatCurrency(data.totalBiaya)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- LABA BERSIH -->
      <section class="report-section final">
        <table class="report-table">
          <tbody>
            <tr class="final-row">
              <td class="item-name"><strong>LABA (RUGI) BERSIH</strong></td>
              <td
                class="item-value"
                class:text-success={data.labaBersih >= 0}
                class:text-error={data.labaBersih < 0}
              >
                <strong>{formatCurrency(data.labaBersih)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <div class="report-footer">
      <p>
        Dicetak pada: {new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="stats-grid mt-2xl no-print">
    <div class="stat-card">
      <div class="stat-label">💰 Total Pendapatan</div>
      <div class="stat-value text-success">
        {formatCurrency(data.totalPendapatan)}
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">💸 Total Biaya</div>
      <div class="stat-value text-error">{formatCurrency(data.totalBiaya)}</div>
    </div>

    <div class="stat-card">
      <div class="stat-label">📊 Laba Kotor</div>
      <div
        class="stat-value"
        class:text-success={data.labaKotor >= 0}
        class:text-error={data.labaKotor < 0}
      >
        {formatCurrency(data.labaKotor)}
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">📈 Laba Bersih</div>
      <div
        class="stat-value"
        class:text-success={data.labaBersih >= 0}
        class:text-error={data.labaBersih < 0}
      >
        {formatCurrency(data.labaBersih)}
      </div>
      <div
        class="stat-change"
        class:positive={data.labaBersih >= 0}
        class:negative={data.labaBersih < 0}
      >
        {data.labaBersih >= 0 ? "📈 Untung" : "📉 Rugi"}
      </div>
    </div>
  </div>
</div>

<style>
  .report-card {
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    padding: var(--space-2xl);
    margin-bottom: var(--space-2xl);
  }

  .report-header {
    text-align: center;
    border-bottom: 3px solid var(--primary-600);
    padding-bottom: var(--space-lg);
    margin-bottom: var(--space-2xl);
  }

  .report-header h2 {
    font-size: 1.75rem;
    color: var(--primary-600);
    margin-bottom: var(--space-sm);
  }

  .report-header h3 {
    font-size: 1.25rem;
    color: var(--neutral-800);
    margin-bottom: var(--space-sm);
  }

  .report-header p {
    color: var(--neutral-600);
    font-size: 1rem;
  }

  .report-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .report-section {
    margin-bottom: var(--space-xl);
  }

  .section-title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--primary-700);
    margin-bottom: var(--space-md);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .report-table {
    width: 100%;
    border-collapse: collapse;
  }

  .header-name, .header-value {
    padding: var(--space-sm) var(--space-md);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--neutral-500);
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid var(--neutral-200);
  }

  .header-name {
    text-align: left;
    padding-left: var(--space-lg);
  }

  .header-value {
    text-align: right;
  }

  .report-table tr {
    border-bottom: 1px solid var(--neutral-200);
  }

  .report-table td {
    padding: var(--space-sm) var(--space-md);
  }

  .item-name {
    text-align: left;
    padding-left: var(--space-lg);
  }

  .item-value {
    text-align: right;
    font-family: "Courier New", monospace;
  }

  .subtotal-row {
    background: var(--neutral-50);
    border-top: 2px solid var(--neutral-300);
  }

  .subtotal-row td {
    padding: var(--space-md) var(--space-md);
  }

  .total-row {
    background: var(--neutral-100);
    border-top: 2px solid var(--neutral-400);
    border-bottom: 2px solid var(--neutral-400);
  }

  .total-row td {
    padding: var(--space-md) var(--space-md);
    font-size: 1.1rem;
  }

  .final-row {
    background: linear-gradient(135deg, var(--primary-50), var(--primary-100));
    border-top: 3px solid var(--primary-600);
    border-bottom: 3px solid var(--primary-600);
  }

  .final-row td {
    padding: var(--space-lg) var(--space-md);
    font-size: 1.25rem;
  }

  .report-section.highlight {
    margin: var(--space-2xl) 0;
  }

  .report-section.final {
    margin-top: var(--space-2xl);
  }

  .report-footer {
    text-align: center;
    margin-top: var(--space-2xl);
    padding-top: var(--space-lg);
    border-top: 2px solid var(--neutral-200);
    color: var(--neutral-600);
    font-size: 0.875rem;
  }

  /* Print Styles */
  @media print {
    .no-print {
      display: none !important;
    }

    .report-card {
      box-shadow: none;
      border: 1px solid #000;
    }

    body {
      background: white;
    }

    .final-row {
      background: #f0f0f0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
