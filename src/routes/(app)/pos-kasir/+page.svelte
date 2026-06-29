<script lang="ts">
  import { onMount } from 'svelte';
  
  // --- MOCK DATA ---
  const MOCK_SERVICES = [
    { id: 'S1', nama: 'Potong Rambut Pria', price: 50000, type: 'JASA' },
    { id: 'S2', nama: 'Potong Rambut Wanita', price: 75000, type: 'JASA' },
    { id: 'S3', nama: 'Creambath', price: 120000, type: 'JASA' },
    { id: 'S4', nama: 'Coloring Basic', price: 250000, type: 'JASA' },
    { id: 'S5', nama: 'Smoothing', price: 350000, type: 'JASA' },
    { id: 'S6', nama: 'Hair Spa', price: 150000, type: 'JASA' }
  ];

  const MOCK_PRODUCTS = [
    { id: 'P1', nama: 'Pomade Water Based', price: 85000, stock: 12, type: 'PRODUCT' },
    { id: 'P2', nama: 'Hair Tonic Ginseng', price: 65000, stock: 8, type: 'PRODUCT' },
    { id: 'P3', nama: 'Shampoo Anti Dandruff', price: 45000, stock: 20, type: 'PRODUCT' },
    { id: 'P4', nama: 'Hair Serum', price: 110000, stock: 5, type: 'PRODUCT' }
  ];

  const MOCK_CUSTOMERS = [
    { id: 'C1', nama: 'Budi Santoso' },
    { id: 'C2', nama: 'Siti Aminah' },
    { id: 'C3', nama: 'Andi Wijaya' },
    { id: 'C4', nama: 'Rina Melati' }
  ];

  const MOCK_EMPLOYEES = [
    { id: 'E1', nama: 'Dimas (Stylist 1)' },
    { id: 'E2', nama: 'Ayu (Stylist 2)' },
    { id: 'E3', nama: 'Reza (Stylist 3)' }
  ];

  // --- STATE ---
  let activeTab = 'SEMUA'; // SEMUA, JASA, PRODUCT
  let searchQuery = '';
  
  let selectedCustomerId = '';
  let paymentMethod = 'CASH';
  let uangDiterima = 0;
  
  // Array of items in cart
  // { cartId, item_id, nama, type, price, qty, discount, karyawan_id }
  let cart: any[] = [];

  let isCheckoutSuccess = false;
  let checkoutResponse: any = null;

  // --- COMPUTED / DERIVED ---
  $: filteredItems = [...MOCK_SERVICES, ...MOCK_PRODUCTS].filter(item => {
    const matchTab = activeTab === 'SEMUA' || item.type === activeTab;
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  $: subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  $: totalDiscount = cart.reduce((sum, item) => sum + ((item.discount || 0) * item.qty), 0);
  $: grandTotal = subtotal - totalDiscount;
  $: kembalian = paymentMethod === 'CASH' ? Math.max(0, uangDiterima - grandTotal) : 0;
  
  // --- ACTIONS ---
  function addToCart(item: any) {
    if (item.type === 'PRODUCT' && item.stock <= 0) {
      alert('Stok produk habis!');
      return;
    }
    
    // Check if product already in cart
    if (item.type === 'PRODUCT') {
      const existing = cart.find(c => c.item_id === item.id);
      if (existing) {
        if (existing.qty < item.stock) {
          existing.qty += 1;
          cart = [...cart];
        } else {
          alert('Maksimal stok tercapai!');
        }
        return;
      }
    }

    cart = [...cart, {
      cartId: Date.now().toString() + Math.random().toString(),
      item_id: item.id,
      nama: item.nama,
      type: item.type,
      price: item.price,
      qty: 1,
      discount: 0,
      karyawan_id: item.type === 'JASA' ? '' : null
    }];
  }

  function removeFromCart(cartId: string) {
    cart = cart.filter(c => c.cartId !== cartId);
  }

  function formatRp(num: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  }

  async function handleCheckout() {
    if (cart.length === 0) {
      alert('Keranjang belanja kosong!');
      return;
    }

    // Validation for Services (Must select stylist)
    for (const item of cart) {
      if (item.type === 'JASA' && !item.karyawan_id) {
        alert(`Harap pilih Stylist/Karyawan untuk layanan: ${item.nama}`);
        return;
      }
    }

    if (paymentMethod === 'CASH' && uangDiterima < grandTotal) {
      alert('Uang diterima kurang dari total bayar!');
      return;
    }

    const payload = {
      customer_id: selectedCustomerId || null,
      payment_method: paymentMethod,
      total_bayar: grandTotal,
      uang_diterima: paymentMethod === 'CASH' ? uangDiterima : grandTotal,
      kembalian: paymentMethod === 'CASH' ? kembalian : 0,
      items: cart.map(c => ({
        type: c.type,
        item_id: c.item_id,
        qty: c.qty,
        price: c.price - (c.discount || 0), // net price per item
        karyawan_id: c.karyawan_id || null
      }))
    };

    console.log("SENDING API PAYLOAD:", JSON.stringify(payload, null, 2));

    // Simulate API Call
    isCheckoutSuccess = true;
    checkoutResponse = payload;
  }

  function resetTransaction() {
    cart = [];
    selectedCustomerId = '';
    paymentMethod = 'CASH';
    uangDiterima = 0;
    isCheckoutSuccess = false;
    checkoutResponse = null;
  }
</script>

<svelte:head>
  <title>POS Kasir - Buku Kas Salon</title>
</svelte:head>

<div class="pos-container">
  <!-- LEFT PANEL: ITEMS -->
  <div class="items-panel">
    <div class="header">
      <div class="header-title">
        <a href="/dashboard" class="back-btn">⬅</a>
        <h1 style="margin:0; font-size: 1.5rem;">Point of Sale</h1>
      </div>
      
      <div class="filters">
        <input 
          type="text" 
          placeholder="Cari layanan atau produk..." 
          bind:value={searchQuery}
          class="search-input"
        />
        
        <div class="tabs">
          <button class="tab-btn {activeTab === 'SEMUA' ? 'active' : ''}" on:click={() => activeTab = 'SEMUA'}>Semua</button>
          <button class="tab-btn {activeTab === 'JASA' ? 'active' : ''}" on:click={() => activeTab = 'JASA'}>Jasa / Layanan</button>
          <button class="tab-btn {activeTab === 'PRODUCT' ? 'active' : ''}" on:click={() => activeTab = 'PRODUCT'}>Produk Retail</button>
        </div>
      </div>
    </div>

    <div class="grid-container">
      {#each filteredItems as item}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="item-card" class:disabled={item.type === 'PRODUCT' && item.stock <= 0} on:click={() => addToCart(item)}>
          <div class="item-badge" class:jasa={item.type === 'JASA'} class:product={item.type === 'PRODUCT'}>
            {item.type === 'JASA' ? '✂️ Layanan' : '🛍️ Produk'}
          </div>
          <h3 class="item-name">{item.nama}</h3>
          <div class="item-price">{formatRp(item.price)}</div>
          
          {#if item.type === 'PRODUCT'}
            <div class="item-stock {item.stock <= 0 ? 'out-of-stock' : ''}">
              Sisa Stok: {item.stock}
            </div>
          {/if}
        </div>
      {/each}
      
      {#if filteredItems.length === 0}
        <div style="grid-column: 1 / -1; text-align:center; padding: 3rem; color: #6b7280;">
          Tidak ada item yang ditemukan
        </div>
      {/if}
    </div>
  </div>

  <!-- RIGHT PANEL: CART -->
  <div class="cart-panel">
    <div class="cart-header">
      <h2>Keranjang Belanja</h2>
      <span class="badge">{cart.length} Item</span>
    </div>

    <div class="cart-customer">
      <label for="customer">Pelanggan</label>
      <select id="customer" bind:value={selectedCustomerId}>
        <option value="">Guest / Walk-in</option>
        {#each MOCK_CUSTOMERS as c}
          <option value={c.id}>{c.nama}</option>
        {/each}
      </select>
    </div>

    <div class="cart-items">
      {#each cart as c}
        <div class="cart-item">
          <div class="cart-item-header">
            <div>
              <span class="type-indicator {c.type === 'JASA' ? 'text-blue' : 'text-green'}">•</span>
              <strong>{c.nama}</strong>
            </div>
            <button class="remove-btn" on:click={() => removeFromCart(c.cartId)}>✕</button>
          </div>
          
          <div class="cart-item-details">
            <div class="price-row">
              <span class="price-val">{formatRp(c.price)}</span>
            </div>

            <!-- QTY & DISCOUNT -->
            <div class="control-row">
              <div class="qty-control" class:hidden={c.type === 'JASA'}>
                <label>Qty:</label>
                <input type="number" min="1" bind:value={c.qty} disabled={c.type === 'JASA'} />
              </div>
              <div class="discount-control">
                <label>Diskon (Rp):</label>
                <input type="number" min="0" bind:value={c.discount} />
              </div>
            </div>

            <!-- STYLIST SELECTION FOR JASA -->
            {#if c.type === 'JASA'}
              <div class="stylist-control">
                <select bind:value={c.karyawan_id} class:error={!c.karyawan_id}>
                  <option value="" disabled selected>Pilih Stylist / Karyawan</option>
                  {#each MOCK_EMPLOYEES as emp}
                    <option value={emp.id}>{emp.nama}</option>
                  {/each}
                </select>
              </div>
            {/if}
            
            <div class="item-subtotal">
              Sub: {formatRp((c.price - c.discount) * c.qty)}
            </div>
          </div>
        </div>
      {:else}
        <div class="empty-cart">
          <div class="empty-icon">🛒</div>
          <p>Keranjang kosong<br/>Pilih item di sebelah kiri</p>
        </div>
      {/each}
    </div>

    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>{formatRp(subtotal)}</span>
      </div>
      {#if totalDiscount > 0}
        <div class="summary-row discount">
          <span>Total Diskon</span>
          <span>-{formatRp(totalDiscount)}</span>
        </div>
      {/if}
      <div class="summary-row grand-total">
        <span>Grand Total</span>
        <span>{formatRp(grandTotal)}</span>
      </div>

      <div class="payment-section">
        <label>Metode Pembayaran</label>
        <div class="payment-methods">
          <button class="pay-btn {paymentMethod === 'CASH' ? 'active' : ''}" on:click={() => paymentMethod = 'CASH'}>💵 Tunai</button>
          <button class="pay-btn {paymentMethod === 'DEBIT' ? 'active' : ''}" on:click={() => paymentMethod = 'DEBIT'}>💳 Debit/CC</button>
          <button class="pay-btn {paymentMethod === 'QRIS' ? 'active' : ''}" on:click={() => paymentMethod = 'QRIS'}>📱 QRIS</button>
        </div>

        {#if paymentMethod === 'CASH'}
          <div class="cash-input-group">
            <label>Uang Diterima (Rp)</label>
            <input type="number" bind:value={uangDiterima} placeholder="0" class="cash-input" />
            <div class="change-display {uangDiterima < grandTotal && uangDiterima > 0 ? 'error' : ''}">
              Kembalian: {formatRp(kembalian)}
            </div>
          </div>
        {/if}
      </div>

      <button class="checkout-btn" on:click={handleCheckout} disabled={cart.length === 0}>
        Selesaikan Transaksi
      </button>
    </div>
  </div>
</div>

<!-- SUCCESS MODAL -->
{#if isCheckoutSuccess}
  <div class="modal-overlay">
    <div class="modal-content success">
      <div class="success-icon">✅</div>
      <h2>Transaksi Berhasil!</h2>
      <p class="text-muted">Metode Pembayaran: <strong>{checkoutResponse.payment_method}</strong></p>
      
      <div class="receipt">
        <div class="receipt-row"><span>Total Bayar</span> <strong>{formatRp(checkoutResponse.total_bayar)}</strong></div>
        {#if checkoutResponse.payment_method === 'CASH'}
          <div class="receipt-row"><span>Uang Diterima</span> <span>{formatRp(checkoutResponse.uang_diterima)}</span></div>
          <div class="receipt-row"><span>Kembalian</span> <strong>{formatRp(checkoutResponse.kembalian)}</strong></div>
        {/if}
      </div>

      <div class="modal-actions">
        <button class="btn btn-secondary" on:click={() => alert('Fitur Cetak Struk akan segera hadir!')}>🖨️ Cetak Struk</button>
        <button class="btn btn-primary" on:click={resetTransaction}>Transaksi Baru</button>
      </div>
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #f3f4f6;
  }

  .pos-container {
    display: flex;
    height: calc(100vh - 6rem);
    overflow: hidden;
    background: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--neutral-200);
  }

  /* LEFT PANEL */
  .items-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f9fafb;
  }

  .header {
    background-color: white;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: #f3f4f6;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #4b5563;
    font-size: 1.25rem;
    transition: background 0.2s;
  }
  .back-btn:hover { background: #e5e7eb; }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-input {
    flex: 1;
    min-width: 250px;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .tabs {
    display: flex;
    gap: 0.5rem;
    background: #f3f4f6;
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  .tab-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    border-radius: 0.375rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }
  .tab-btn.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .grid-container {
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    overflow-y: auto;
    align-content: start;
  }

  .item-card {
    background: white;
    border-radius: 0.75rem;
    padding: 1.25rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
    border: 1px solid #f3f4f6;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    border-color: #e5e7eb;
  }
  .item-card.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .item-badge {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  .item-badge.jasa { background: #dbeafe; color: #1e40af; }
  .item-badge.product { background: #dcfce7; color: #166534; }

  .item-name {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  }
  .item-price {
    font-size: 1.125rem;
    font-weight: 700;
    color: #3b82f6;
  }
  .item-stock {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: auto;
  }
  .item-stock.out-of-stock {
    color: #ef4444;
    font-weight: 600;
  }

  /* RIGHT PANEL: CART */
  .cart-panel {
    width: 380px;
    background: white;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e5e7eb;
    box-shadow: -4px 0 15px rgba(0,0,0,0.03);
    z-index: 10;
  }

  .cart-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart-header h2 { margin: 0; font-size: 1.25rem; }
  .cart-header .badge { background: #3b82f6; color: white; padding: 0.2rem 0.6rem; border-radius: 99px; font-size: 0.8rem; font-weight: bold; }

  .cart-customer {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  .cart-customer label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #4b5563; }
  .cart-customer select { width: 100%; padding: 0.6rem; border: 1px solid #d1d5db; border-radius: 0.5rem; }

  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: #f9fafb;
  }

  .empty-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    text-align: center;
  }
  .empty-icon { font-size: 4rem; margin-bottom: 1rem; opacity: 0.5; }

  .cart-item {
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  }
  
  .cart-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }
  .remove-btn {
    background: none; border: none; color: #ef4444; font-size: 1.2rem; cursor: pointer; padding: 0 0.2rem;
  }

  .text-blue { color: #3b82f6; }
  .text-green { color: #10b981; }

  .cart-item-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .price-val { font-weight: 500; color: #6b7280; font-size: 0.9rem; }

  .control-row {
    display: flex;
    gap: 0.5rem;
  }
  .control-row > div { flex: 1; }
  .control-row label { display: block; font-size: 0.75rem; color: #6b7280; margin-bottom: 0.2rem; }
  .control-row input { width: 100%; box-sizing: border-box; padding: 0.4rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem; }
  .hidden { opacity: 0.5; pointer-events: none; }

  .stylist-control select {
    width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem; background: #f8fafc;
  }
  .stylist-control select.error { border-color: #ef4444; background: #fef2f2; }

  .item-subtotal {
    text-align: right;
    font-weight: 700;
    color: #111827;
    font-size: 0.95rem;
    border-top: 1px dashed #e5e7eb;
    padding-top: 0.5rem;
  }

  .cart-summary {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 1.5rem;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.02);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #4b5563;
  }
  .summary-row.discount { color: #ef4444; }
  .summary-row.grand-total {
    font-size: 1.25rem;
    font-weight: 800;
    color: #111827;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 2px solid #e5e7eb;
    margin-bottom: 1.25rem;
  }

  .payment-section label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; }
  .payment-methods {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .pay-btn {
    flex: 1;
    padding: 0.5rem 0.2rem;
    font-size: 0.8rem;
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .pay-btn.active {
    background: #eff6ff;
    border-color: #3b82f6;
    color: #1d4ed8;
    font-weight: 600;
  }

  .cash-input-group {
    margin-bottom: 1rem;
  }
  .cash-input {
    width: 100%; box-sizing: border-box; padding: 0.75rem; font-size: 1.1rem; border: 2px solid #d1d5db; border-radius: 0.5rem; font-weight: bold;
  }
  .cash-input:focus { outline: none; border-color: #10b981; }
  .change-display {
    margin-top: 0.5rem; font-weight: 600; color: #10b981; text-align: right; font-size: 1.1rem;
  }
  .change-display.error { color: #ef4444; }

  .checkout-btn {
    width: 100%;
    padding: 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }
  .checkout-btn:hover { background: #2563eb; }
  .checkout-btn:disabled { background: #9ca3af; cursor: not-allowed; }

  /* MODAL OVERLAY */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(4px);
  }
  .modal-content.success {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    text-align: center;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    animation: pop 0.3s ease-out;
  }
  @keyframes pop {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .success-icon { font-size: 4rem; margin-bottom: 1rem; }
  .modal-content.success h2 { margin: 0 0 0.5rem 0; color: #111827; }
  .text-muted { color: #6b7280; font-size: 0.9rem; margin-bottom: 1.5rem; }
  
  .receipt {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    text-align: left;
  }
  .receipt-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
  .receipt-row:last-child { margin-bottom: 0; padding-top: 0.5rem; border-top: 1px dashed #d1d5db; }
  
  .modal-actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
  }
  .btn {
    padding: 0.75rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; border: none; width: 100%;
  }
  .btn-primary { background: #10b981; color: white; }
  .btn-primary:hover { background: #059669; }
  .btn-secondary { background: #f3f4f6; color: #4b5563; }
  .btn-secondary:hover { background: #e5e7eb; }

  /* RESPONSIVE TABLET */
  @media (max-width: 900px) {
    .pos-container { flex-direction: column; }
    .cart-panel { width: 100%; height: 50vh; border-left: none; border-top: 1px solid #e5e7eb; }
    .items-panel { height: 50vh; }
  }
</style>
