const services = [
  {
    number: "01",
    icon: "◉",
    title: "Database Consulting",
    description:
      "Desain, pengembangan, dan optimasi database seperti Oracle, MySQL, dan MariaDB agar data mudah dikelola dan sistem berjalan responsif.",
  },
  {
    number: "02",
    icon: "⌘",
    title: "IT Governance",
    description:
      "Membangun tata kelola IT yang efektif dan efisien, selaras dengan proses bisnis, kebutuhan organisasi, dan tujuan digitalisasi.",
  },
  {
    number: "03",
    icon: "⌁",
    title: "Web Development",
    description:
      "Pengembangan website yang responsif dan dinamis sesuai kebutuhan bisnis menggunakan PHP dan CodeIgniter.",
  },
];

function Arrow() {
  return <span aria-hidden="true" className="arrow">↗</span>;
}

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Frans, ke halaman utama">FRANS<span>.</span></a>
          <details className="menu">
            <summary aria-label="Buka navigasi"><span></span><span></span></summary>
            <nav className="menu-panel" aria-label="Navigasi utama">
              <a href="#eran">Tentang</a>
              <a href="#services">Jasa</a>
              <a href="/isibensin">Isi Bensin</a>
              <a href="#contact">Kontak</a>
            </nav>
          </details>
        </header>
        <div className="hero-content">
          <div className="monogram" aria-label="Inisial Frans">f</div>
          <a className="hero-link" href="#eran">Mari Mulai! <span aria-hidden="true">↓</span></a>
        </div>
        <a className="scroll-cue" href="#eran" aria-label="Gulir ke bagian tentang">SCROLL <span>↓</span></a>
      </section>

      <section className="about section" id="eran">
        <div className="section-inner about-grid">
          <div className="section-label"><span>01 / TENTANG</span><i></i></div>
          <div className="about-copy">
            <p className="eyebrow">KENALAN DULU</p>
            <h1>Siapakah <em>Eran?</em></h1>
            <p className="intro">Saya adalah seorang Analis Sistem Informasi yang udah pernah kerja di dunia jasa keuangan dan pemerintahan. Jago ngulik database seperti Oracle, MySQL Enterprise, dan MariaDB. Plus, punya spesialisasi di Tata Kelola IT biar urusan digitalisasi makin rapi. Soal coding, main-main sama PHP masih bisa sedikitlah buat bantu kebutuhan teknis tertentu. Intinya, paham teknis, ngerti strategi, siap bantu bikin sistem lebih efisien dan inovatif!</p>
            <div className="strengths">
              <article className="strength-card">
                <span className="card-mark">↗</span>
                <h2>Jagoan Data yang Bikin Sistem Ngebut!</h2>
                <p>Punya jam terbang tinggi dalam mengoptimalkan database sehingga sistem jadi super responsif.</p>
              </article>
              <article className="strength-card">
                <span className="card-mark">✳</span>
                <h2>Problem Solver Handal di Era Digital</h2>
                <p>Doyan ngeliatin masalah sistem yang bikin pusing. Punya skill menerjemahkan kebutuhan kompleks jadi solusi teknologi yang user-friendly.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-inner">
          <div className="section-label"><span>02 / LAYANAN</span><i></i></div>
          <div className="services-heading">
            <div><p className="eyebrow">YANG BISA SAYA BANTU</p><h2>Jasa <em>untuk Anda.</em></h2></div>
            <p>Ada beberapa jasa yang Frans tawarkan nih, antara lain:</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <a className="service-item" href="#contact" key={service.number}>
                <span className="service-number">{service.number}</span>
                <span className="service-icon" aria-hidden="true">{service.icon}</span>
                <span className="service-text"><h3>{service.title}</h3><p>{service.description}</p></span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-inner contact-inner">
          <div className="section-label"><span>03 / KONTAK</span><i></i></div>
          <div className="contact-content">
            <p className="eyebrow">ADA YANG INGIN DITANYAKAN?</p>
            <h2>Butuh penjelasan<br />lebih lanjut<span>?</span></h2>
            <p>Hubungi saya via Telegram</p>
            <a className="contact-button" href="https://t.me/eranst?text=Halo%20Frans,%20mau%20tanya%20tentang%20" target="_blank" rel="noreferrer">Telegramku! <Arrow /></a>
          </div>
          <div className="contact-note">Mari berdiskusi tentang solusi yang tepat untuk kebutuhan Anda.</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <a className="footer-name" href="#home">Frans Nasution<span>.</span></a>
          <p className="footer-caption">Analis Sistem Informasi<br />Database · IT Governance · Web</p>
          <div className="socials" aria-label="Media sosial">
            <a href="https://www.facebook.com/rancena" target="_blank" rel="noreferrer">Facebook <Arrow /></a>
            <a href="https://www.instagram.com/__nasution.eran" target="_blank" rel="noreferrer">Instagram <Arrow /></a>
            <a href="https://www.linkedin.com/in/fransnasution" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
          <div className="copyright"><span>© {new Date().getFullYear()} Frans Nasution. All rights reserved.</span><a href="#home">Kembali ke atas ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
