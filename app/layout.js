import "./globals.css";

export const metadata = {
  title: "Frans Nasution — Analis Sistem Informasi",
  description:
    "Profil Frans Nasution, Analis Sistem Informasi dengan keahlian database, tata kelola IT, dan pengembangan web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
