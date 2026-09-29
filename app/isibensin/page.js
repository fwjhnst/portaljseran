import FuelForm from "./fuel-form";

export const metadata = {
  title: "Isi Bensin — Frans Nasution",
  description: "Catat pengisian bensin dan lihat ringkasan pengisian kendaraan.",
};

export default function IsiBensinPage() {
  return (
    <main className="fuel-page">
      <header className="fuel-header">
        <a className="wordmark" href="/" aria-label="Frans, kembali ke halaman utama">FRANS<span>.</span></a>
        <a className="fuel-home-link" href="/">Kembali ke beranda <span aria-hidden="true">↗</span></a>
      </header>
      <section className="fuel-title">
        <p className="eyebrow">CATATAN KENDARAAN / 01</p>
        <h1>Form Isi Bensin</h1>
        <p>Catat pengisian hari ini, biar perjalanan berikutnya lebih terukur.</p>
      </section>
      <FuelForm />
      <footer className="fuel-footer">© {new Date().getFullYear()} Frans Nasution <span>·</span> Catatan pengisian bensin</footer>
    </main>
  );
}
