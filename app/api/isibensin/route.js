import { NextResponse } from "next/server";

const allowedFuel = new Set([
  "Pertamina Pertalite",
  "Pertamina Pertamax",
  "Pertamina Pertamax Green",
  "Pertamina Pertamax Turbo",
]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  const amount = Number(body.jumlahPengisian);
  const price = Number(body.hargaPerLiter);
  const odometer = Number(body.odometer);

  if (!body.tanggal || !allowedFuel.has(body.jenisBensin) || amount <= 0 || price <= 0 || odometer < 0) {
    return NextResponse.json({ message: "Data pengisian belum lengkap atau tidak valid." }, { status: 400 });
  }

  // Endpoint demo lokal: bentuknya menyerupai hit penyimpanan, tanpa database atau layanan eksternal.
  const data = {
    tanggal: body.tanggal,
    odometer,
    jumlahPengisian: amount,
    jenisBensin: body.jenisBensin,
    hargaPerLiter: price,
    totalLiter: amount / price,
    jarakSisa: body.jarakSisa ? Number(body.jarakSisa) : null,
    jarakSekarang: body.jarakSekarang ? Number(body.jarakSekarang) : null,
    status: "demo",
  };

  return NextResponse.json({ message: "Catatan demo berhasil diproses.", data }, { status: 201 });
}
