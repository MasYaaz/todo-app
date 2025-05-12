// @ts-nocheck
import { mount } from 'svelte'
import './app.css'
// @ts-ignore
import App from './App.svelte'
import 'bulma'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app

      function updateFavicon() {
            const favicon = document.getElementById('favicon');
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkModeMediaQuery.matches) {
                // Jika tema gelap
                favicon.href = "src/assets/calendar-solid-terang.svg";
            } else {
                // Jika tema terang
                favicon.href = "src/assets/calendar-solid.svg";
            }
        }
        // Panggil fungsi saat halaman dimuat
        updateFavicon();
        // Tambahkan event listener untuk mendeteksi perubahan tema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
