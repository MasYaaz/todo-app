import "./app.css";
import { mount } from 'svelte';
import App from "./App.svelte";
import "bulma";

mount(App, {
  target: document.getElementById('app'),
});

export default App;

function updateFavicon() {
  const favicon = document.getElementById("favicon");
  if (favicon instanceof HTMLLinkElement) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.matches) {
      favicon.href = "./calendar-solid-terang.svg";
    } else {
      favicon.href = "./calendar-solid.svg";
    }
  }
}
// Panggil fungsi saat halaman dimuat
updateFavicon();
// Tambahkan event listener untuk mendeteksi perubahan tema
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateFavicon);
