<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Html5Qrcode } from "html5-qrcode";

  let scanner: Html5Qrcode;
  let action = $state<"add" | "reduce">("add");
  let qty = $state(1);
  
  let scanStatus = $state<"idle" | "success" | "error" | "processing">("idle");
  let statusMessage = $state("");
  
  let latitude = $state<number | null>(null);
  let longitude = $state<number | null>(null);
  
  let isGeoLocked = $state(true);
  let isCheckingGeo = $state(true);
  let errorMessage = $state("");
  let isScanningBlocked = $state(false);

  onMount(() => {
    // Check Geolocation
    if (!navigator.geolocation) {
      isGeoLocked = true;
      isCheckingGeo = false;
      errorMessage = "Perangkat/Browser Anda tidak mendukung fitur GPS.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        isGeoLocked = false;
        isCheckingGeo = false;
        initScanner();
      },
      (err) => {
        isGeoLocked = true;
        isCheckingGeo = false;
        errorMessage = "Akses lokasi ditolak. Harap izinkan akses lokasi (GPS) untuk menggunakan fitur scan ini.";
      },
      { enableHighAccuracy: true }
    );
  });

  onDestroy(() => {
    if (scanner && scanner.isScanning) {
      scanner.stop().catch(console.error);
    }
  });

  async function initScanner() {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length > 0) {
        let cameraId = devices[0].id;
        const backCamera = devices.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('environment'));
        if (backCamera) {
          cameraId = backCamera.id;
        }

        scanner = new Html5Qrcode("reader");
        await scanner.start(
          cameraId,
          { 
            fps: 10, 
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0
          },
          onScanSuccess,
          undefined
        );
      } else {
        throw new Error("Tidak ada kamera yang terdeteksi di perangkat Anda.");
      }
    } catch (err: any) {
      isGeoLocked = true;
      errorMessage = "Gagal mengakses kamera: " + (err?.message || err);
      console.error(err);
    }
  }

  async function onScanSuccess(decodedText: string) {
    if (isScanningBlocked) return;
    
    // Block multiple scans temporarily
    isScanningBlocked = true;
    scanStatus = "processing";
    statusMessage = "Memproses scan...";

    try {
      const res = await fetch("/api/stock/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barcode: decodedText,
          action,
          qty,
          latitude,
          longitude
        }),
      });

      const data = await res.json();
      if (res.ok) {
        scanStatus = "success";
        statusMessage = `Sukses [${decodedText}]\n${data.data.nama} (Stok: ${data.data.stock})`;
      } else {
        scanStatus = "error";
        statusMessage = `Gagal: ${data.message}`;
      }
    } catch (error) {
      scanStatus = "error";
      statusMessage = "Gagal terhubung ke server.";
    }

    // Unblock after 3 seconds
    setTimeout(() => {
      isScanningBlocked = false;
      scanStatus = "idle";
      statusMessage = "";
    }, 3000);
  }
</script>

<svelte:head>
  <title>Scan Barang - PWA</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover">
</svelte:head>

<div class="app-container">
  {#if isCheckingGeo}
    <div class="overlay">
      <div class="loader"></div>
      <p>Memeriksa akses lokasi...</p>
    </div>
  {:else if isGeoLocked}
    <div class="overlay locked">
      <div class="error-icon">🔒</div>
      <h2>Akses Terkunci</h2>
      <p>{errorMessage}</p>
      <button class="btn-refresh" onclick={() => window.location.reload()}>Coba Lagi</button>
    </div>
  {:else}
    <!-- Main UI -->
    <header class="header">
      <h1>Scan Barang</h1>
      <p class="subtitle">Arahkan kamera ke barcode produk</p>
    </header>

    <main class="main-content">
      <!-- Controls -->
      <div class="controls-card">
        <div class="action-toggle">
          <button 
            class="toggle-btn add {action === 'add' ? 'active' : ''}" 
            onclick={() => action = 'add'}
          >
            + Tambah
          </button>
          <button 
            class="toggle-btn reduce {action === 'reduce' ? 'active' : ''}" 
            onclick={() => action = 'reduce'}
          >
            - Kurang
          </button>
        </div>
        
        <div class="qty-control">
          <label for="qty">Kuantitas (Qty):</label>
          <input 
            type="number" 
            id="qty" 
            bind:value={qty} 
            min="1" 
            inputmode="numeric" 
          />
        </div>
      </div>

      <!-- Scanner Box -->
      <div class="scanner-container {isScanningBlocked ? 'blocked' : ''}">
        <div id="reader"></div>
        {#if isScanningBlocked}
          <div class="scanner-overlay">
            <div class="countdown">Jeda 3 Detik...</div>
          </div>
        {/if}
      </div>

      <!-- Status/Logger -->
      <div class="status-logger {scanStatus}">
        {#if scanStatus === 'idle'}
          <p class="idle-text">Menunggu scan barcode...</p>
        {:else if scanStatus === 'processing'}
          <p class="processing-text">🔄 {statusMessage}</p>
        {:else}
          <p style="white-space: pre-line;">{statusMessage}</p>
        {/if}
      </div>
    </main>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Safe area for iOS notches */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  .overlay {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    background-color: #ffffff;
    height: 100vh;
  }

  .overlay.locked {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .btn-refresh {
    margin-top: 1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #dc2626;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .header {
    background-color: #ffffff;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: center;
  }

  .header h1 {
    margin: 0;
    font-size: 1.25rem;
    color: #111827;
  }

  .header .subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: #6b7280;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .controls-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .action-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .toggle-btn {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid transparent;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    background-color: #f3f4f6;
    color: #6b7280;
    transition: all 0.2s;
  }

  .toggle-btn.add.active {
    background-color: #dcfce7;
    color: #166534;
    border-color: #22c55e;
  }

  .toggle-btn.reduce.active {
    background-color: #fee2e2;
    color: #991b1b;
    border-color: #ef4444;
  }

  .qty-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .qty-control label {
    font-weight: 600;
    color: #374151;
  }

  .qty-control input {
    width: 80px;
    padding: 0.5rem;
    font-size: 1.25rem;
    text-align: center;
    border: 1px solid #d1d5db;
    border-radius: 8px;
  }

  .scanner-container {
    position: relative;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    min-height: 250px;
  }

  #reader {
    width: 100%;
    border: none !important;
  }

  .scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .countdown {
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(4px);
  }

  .status-logger {
    margin-top: auto;
    padding: 1rem;
    border-radius: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-logger p { margin: 0; }
  
  .status-logger.idle .idle-text { color: #6b7280; }
  .status-logger.processing { background-color: #fef3c7; color: #92400e; }
  .status-logger.success { background-color: #dcfce7; color: #166534; }
  .status-logger.error { background-color: #fee2e2; color: #991b1b; }
</style>
