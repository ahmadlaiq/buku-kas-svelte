/**
 * Format angka dengan pemisah ribuan (.) untuk tampilan
 * Contoh: 10000 -> "10.000"
 */
export function formatNumber(value: string | number): string {
  // Hapus semua karakter non-digit
  const numericValue = value.toString().replace(/\D/g, '');
  
  // Jika kosong, return string kosong
  if (!numericValue) return '';
  
  // Format dengan pemisah ribuan
  return parseInt(numericValue).toLocaleString('id-ID');
}

/**
 * Parse angka yang sudah diformat kembali ke angka asli
 * Contoh: "10.000" -> "10000"
 */
export function parseFormattedNumber(value: string): string {
  return value.replace(/\./g, '');
}

/**
 * Handle input event untuk format angka otomatis
 */
export function handleNumberInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart || 0;
  const oldValue = input.value;
  const oldLength = oldValue.length;
  
  // Format nilai
  const formattedValue = formatNumber(input.value);
  input.value = formattedValue;
  
  // Hitung perbedaan panjang untuk adjust cursor
  const newLength = formattedValue.length;
  const diff = newLength - oldLength;
  
  // Set cursor position yang baru
  const newPosition = cursorPosition + diff;
  input.setSelectionRange(newPosition, newPosition);
}
