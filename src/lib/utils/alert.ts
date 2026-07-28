import Swal from 'sweetalert2';

function getRandomTimer() {
  return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
}

export const showAlert = {
  success(title: string, text?: string) {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer: getRandomTimer(),
      timerProgressBar: true,
      confirmButtonColor: '#10b981' // Tailwind Emerald-500
    });
  },
  error(title: string, text?: string) {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      timer: getRandomTimer(),
      timerProgressBar: true,
      confirmButtonColor: '#ef4444' // Tailwind Red-500
    });
  },
  warning(title: string, text?: string) {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      timer: getRandomTimer(),
      timerProgressBar: true,
      confirmButtonColor: '#f59e0b' // Tailwind Amber-500
    });
  },
  info(title: string, text?: string) {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      timer: getRandomTimer(),
      timerProgressBar: true,
      confirmButtonColor: '#3b82f6' // Tailwind Blue-500
    });
  },
  confirm(title: string, text: string, confirmText: string = 'Ya, Lanjutkan!') {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: confirmText,
      cancelButtonText: 'Batal'
    });
  }
};
