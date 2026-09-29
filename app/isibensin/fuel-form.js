"use client";

import { useEffect, useMemo, useState } from "react";

const fuelOptions = [
  { name: "Pertamina Pertalite", price: 10000 },
  { name: "Pertamina Pertamax", price: 12200 },
  { name: "Pertamina Pertamax Green", price: 13000 },
  { name: "Pertamina Pertamax Turbo", price: 13100 },
];

const emptyForm = {
  tanggal: "",
  odometer: "",
  jumlahPengisian: "",
  jenisBensin: "",
  hargaPerLiter: "",
  jarakSisa: "",
  jarakSekarang: "",
};

const rupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function FuelForm() {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const localDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    setForm((current) => ({ ...current, tanggal: localDate }));
  }, []);

  const totalLiter = useMemo(() => {
    const amount = Number(form.jumlahPengisian);
    const price = Number(form.hargaPerLiter);
    return amount > 0 && price > 0 ? amount / price : 0;
  }, [form.jumlahPengisian, form.hargaPerLiter]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => {
      if (name === "jenisBensin") {
        const selected = fuelOptions.find((option) => option.name === value);
        return {
          ...current,
          jenisBensin: value,
          hargaPerLiter: selected ? String(selected.price) : "",
        };
      }
      return { ...current, [name]: value };
    });
    setError("");
    setReceipt(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setReceipt(null);

    if (!form.tanggal || !form.odometer || !form.jumlahPengisian || !form.jenisBensin || !form.hargaPerLiter) {
      setError("Lengkapi tanggal, odometer, nominal, dan jenis bensin terlebih dahulu.");
      return;
    }
    if (Number(form.odometer) < 0 || Number(form.jumlahPengisian) <= 0) {
      setError("Odometer tidak boleh negatif dan nominal pengisian harus lebih dari nol.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/isibensin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, totalLiter }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Catatan belum dapat disimpan.");
      setReceipt(result.data);
    } catch (submitError) {
      setError(submitError.message || "Terjadi kendala. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    const localDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    setForm({ ...emptyForm, tanggal: localDate });
    setError("");
    setReceipt(null);
  }

  return (
    <section className="fuel-content" aria-labelledby="fuel-form-heading">
      <form className="fuel-card" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="fuel-card-heading">
          <span className="fuel-step">FORM PENGISIAN</span>
          <h2 id="fuel-form-heading">Detail pengisian</h2>
          <p>Isi informasi kendaraan dan bahan bakar yang digunakan.</p>
        </div>

        <div className="fuel-fields">
          <label className="fuel-field">
            <span>Tanggal</span>
            <input name="tanggal" type="date" value={form.tanggal} onChange={updateField} required />
          </label>
          <label className="fuel-field">
            <span>Odometer <small>(km)</small></span>
            <input name="odometer" type="number" min="0" step="1" inputMode="numeric" placeholder="Contoh: 24500" value={form.odometer} onChange={updateField} required />
          </label>
          <label className="fuel-field">
            <span>Jumlah Pengisian <small>(Rp)</small></span>
            <input name="jumlahPengisian" type="number" min="1" step="any" inputMode="numeric" placeholder="Contoh: 100000" value={form.jumlahPengisian} onChange={updateField} required />
          </label>
          <label className="fuel-field">
            <span>Jenis Bensin</span>
            <select name="jenisBensin" value={form.jenisBensin} onChange={updateField} required>
              <option value="">Pilih jenis bensin</option>
              {fuelOptions.map((option) => (
                <option key={option.name} value={option.name}>{option.name}</option>
              ))}
            </select>
          </label>
          <label className="fuel-field">
            <span>Harga per Liter <small>(Rp)</small></span>
            <input name="hargaPerLiter" type="number" min="1" step="any" inputMode="numeric" placeholder="Otomatis dari jenis bensin" value={form.hargaPerLiter} onChange={updateField} required />
          </label>
          <label className="fuel-field">
            <span>Total Liter</span>
            <input type="text" value={totalLiter ? `${totalLiter.toLocaleString("id-ID", { maximumFractionDigits: 2 })} liter` : "Terhitung otomatis"} readOnly aria-live="polite" />
          </label>
          <label className="fuel-field">
            <span>Jarak Sisa <small>(km)</small></span>
            <input name="jarakSisa" type="number" min="0" step="1" inputMode="numeric" placeholder="Opsional" value={form.jarakSisa} onChange={updateField} />
          </label>
          <label className="fuel-field">
            <span>Jarak Sekarang <small>(km)</small></span>
            <input name="jarakSekarang" type="number" min="0" step="1" inputMode="numeric" placeholder="Opsional" value={form.jarakSekarang} onChange={updateField} />
          </label>
        </div>

        {error && <p className="fuel-message fuel-error" role="alert">{error}</p>}

        <div className="fuel-actions">
          <button className="fuel-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan…" : "Simpan catatan"}<span aria-hidden="true">↗</span>
          </button>
          <button className="fuel-reset" type="reset">Reset formulir</button>
        </div>
        <p className="fuel-demo-note">Pengiriman saat ini memakai endpoint demo lokal; data belum disimpan ke database.</p>

        {receipt && (
          <div className="fuel-receipt" role="status" aria-live="polite">
            <div className="receipt-check" aria-hidden="true">✓</div>
            <div>
              <p className="receipt-kicker">CATATAN DEMO BERHASIL</p>
              <h3>Pengisian tercatat.</h3>
              <p>{receipt.jenisBensin} · {receipt.totalLiter.toLocaleString("id-ID", { maximumFractionDigits: 2 })} liter</p>
              <strong>{rupiah(receipt.jumlahPengisian)}</strong>
            </div>
          </div>
        )}
      </form>
      <aside className="fuel-side-note">
        <span className="side-note-icon">✳</span>
        <p>Catatan sederhana untuk membantu Anda memantau pengeluaran bahan bakar dan perjalanan.</p>
      </aside>
    </section>
  );
}
