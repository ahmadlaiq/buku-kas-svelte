<script lang="ts">
  import type { PageData } from "./$types";
  import Chart from "chart.js/auto";

  let { data }: { data: PageData } = $props();

  function renderChart(node: HTMLCanvasElement, stats: any) {
    const chart = new Chart(node, {
      type: "bar",
      data: {
        labels: ["Pendapatan", "Pengeluaran", "Laba/Rugi"],
        datasets: [
          {
            label: "Nominal",
            data: [
              stats.pendapatan,
              stats.pengeluaran + stats.bebanPenyusutan,
              stats.labaRugi,
            ],
            backgroundColor: [
              "rgba(16, 185, 129, 0.8)", // success
              "rgba(239, 68, 68, 0.8)", // error
              stats.labaRugi >= 0
                ? "rgba(59, 130, 246, 0.8)" // primary blue
                : "rgba(239, 68, 68, 0.8)",
            ],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => formatCurrency(ctx.raw as number)
            }
          }
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    return {
      update(newStats: any) {
        chart.data.datasets[0].data = [
          newStats.pendapatan,
          newStats.pengeluaran + newStats.bebanPenyusutan,
          newStats.labaRugi,
        ];
        const bgColors = chart.data.datasets[0].backgroundColor as string[];
        bgColors[2] = newStats.labaRugi >= 0
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(239, 68, 68, 0.8)";
        chart.update();
      },
      destroy() {
        chart.destroy();
      },
    };
  }

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
      month: "short",
      year: "numeric",
    });
  }

  function updateFilter(month: string, penyusutan: boolean) {
    const searchParams = new URLSearchParams();
    if (month) searchParams.set("month", month);
    searchParams.set("penyusutan", penyusutan.toString());
    window.location.href = `/dashboard?${searchParams.toString()}`;
  }
</script>

<svelte:head>
  <title>Dashboard - Buku Kas Salon</title>
</svelte:head>

<div>
  <div class="mb-2xl">
    <h1 class="mb-sm">📊 Dashboard</h1>
    <p class="text-muted">Ringkasan keuangan salon Anda bulan ini</p>
  </div>

  <!-- Filter -->
  <div class="card mb-lg">
    <div style="display: flex; gap: 1.5rem; align-items: flex-end; flex-wrap: wrap;">
      <div>
        <label class="form-label" style="margin-bottom: 0.5rem; display: block;">Filter Bulan:</label>
        <input
          type="month"
          class="form-input"
          style="width: auto;"
          value={data.selectedMonth}
          onchange={(e) => updateFilter(e.currentTarget.value, data.withPenyusutan)}
        />
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <input
          type="checkbox"
          id="includePenyusutan"
          style="width: 1.2rem; height: 1.2rem; cursor: pointer;"
          checked={data.withPenyusutan}
          onchange={(e) => updateFilter(data.selectedMonth, e.currentTarget.checked)}
        />
        <label for="includePenyusutan" style="cursor: pointer; font-weight: 500; user-select: none;">
          Hitung Beban Penyusutan
        </label>
      </div>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">💰 Total Pendapatan</div>
      <div class="stat-value text-success">
        {formatCurrency(data.stats.pendapatan)}
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">💸 Total Pengeluaran</div>
      <div class="stat-value text-error">
        {formatCurrency(data.stats.pengeluaran)}
      </div>
    </div>

    <!-- <div class="stat-card">
      <div class="stat-label">🏢 Beban Operasional</div>
      <div class="stat-value text-error">
        {formatCurrency(data.stats.bebanOperasional)}
      </div>
    </div> -->

    {#if data.withPenyusutan}
    <div class="stat-card">
      <div class="stat-label">📉 Beban Penyusutan</div>
      <div class="stat-value text-error">
        {formatCurrency(data.stats.bebanPenyusutan)}
      </div>
    </div>
    {/if}

    <div class="stat-card" style="grid-column: span 2;">
      <div class="stat-label">📈 Laba/Rugi Bersih</div>
      <div
        class="stat-value"
        class:text-success={data.stats.labaRugi >= 0}
        class:text-error={data.stats.labaRugi < 0}
      >
        {formatCurrency(data.stats.labaRugi)}
      </div>
      <div
        class="stat-change"
        class:positive={data.stats.labaRugi >= 0}
        class:negative={data.stats.labaRugi < 0}
      >
        {data.stats.labaRugi >= 0 ? "📈 Untung" : "📉 Rugi"}
      </div>
    </div>
  </div>

  <!-- Chart Section -->
  <div class="card" style="margin-bottom: var(--space-2xl);">
    <div class="card-header">
      <h3 class="card-title">📈 Grafik Ringkasan</h3>
    </div>
    <div style="height: 350px; width: 100%;">
      <canvas use:renderChart={data.stats}></canvas>
    </div>
  </div>

  <!-- Recent Transactions -->
  <div
    style="display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: var(--space-lg);"
  >
    <!-- Recent Income -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">💰 Pendapatan Terbaru</h3>
      </div>

      {#if data.recentPendapatan.length > 0}
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {#each data.recentPendapatan as item}
                <tr>
                  <td>{formatDate(item.tanggal)}</td>
                  <td>
                    <div class="font-medium">{item.kategori}</div>
                    {#if item.deskripsi}
                      <div class="text-sm text-muted">{item.deskripsi}</div>
                    {/if}
                  </td>
                  <td class="font-semibold text-success"
                    >{formatCurrency(item.jumlah)}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="text-center text-muted">Belum ada data pendapatan</p>
      {/if}

      <div class="mt-lg text-center">
        <a href="/pendapatan" class="btn btn-secondary btn-sm">
          Lihat Semua →
        </a>
      </div>
    </div>

    <!-- Recent Expenses -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">💸 Pengeluaran Terbaru</h3>
      </div>

      {#if data.recentPengeluaran.length > 0}
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {#each data.recentPengeluaran as item}
                <tr>
                  <td>{formatDate(item.tanggal)}</td>
                  <td>
                    <div class="font-medium">{item.kategori}</div>
                    {#if item.deskripsi}
                      <div class="text-sm text-muted">{item.deskripsi}</div>
                    {/if}
                  </td>
                  <td class="font-semibold text-error"
                    >{formatCurrency(item.jumlah)}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="text-center text-muted">Belum ada data pengeluaran</p>
      {/if}

      <div class="mt-lg text-center">
        <a href="/pengeluaran" class="btn btn-secondary btn-sm">
          Lihat Semua →
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  @media (max-width: 1100px) {
    div[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }
  }
</style>
