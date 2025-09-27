import { useMemo, useState } from "react";
import ClassicUploads from "./ClassicUploads";

export default function Journey() {
  const steps = [
    {
      icon: "📱",
      title: "Identiti",
      desc: "e‑KYC pantas dengan MyDigitalID. Isi nama + IC.",
    },
    {
      icon: "🗂️",
      title: "Muat Naik Dokumen",
      desc: "Muat naik IC, SSM, penyata bank & foto perniagaan.",
    },
    {
      icon: "🤖",
      title: "Penyaringan Automatik",
      desc: "Semak status permohonan anda",
    },
    {
      icon: "🎓",
      title: "Persiapan Temuduga",
      desc: "Senarai semak, chatbot, dan kemas kini status.",
    },
    {
      icon: "📘",
      title: "Pengenalan",
      desc: "Modul bimbingan sebelum pencairan dana.",
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);
  // Step 2: Auto Vetting scenario toggle (demo)
  const [vettingScenario, setVettingScenario] = useState<
    "processing" | "approved" | "problem"
  >("processing");

  // Step 0: Identity
  const [name, setName] = useState("");
  const [ic, setIc] = useState("");

  // DSR demo moved to Admin Dashboard

  // Step 4: Mentoring modules
  type ModuleKey =
    | "scam"
    | "einvoice"
    | "bookkeeping"
    | "cashflow"
    | "compliance";
  const [modules, setModules] = useState<Record<ModuleKey, boolean>>({
    scam: false,
    einvoice: false,
    bookkeeping: false,
    cashflow: false,
    compliance: false,
  });
  const moduleEntries: Array<{ key: ModuleKey; title: string; desc: string }> =
    [
      {
        key: "scam",
        title: "Kesedaran Penipuan",
        desc: "Penipuan biasa, tanda amaran, elak penggunaan mule, keselamatan TAC/OTP.",
      },
      {
        key: "einvoice",
        title: "Penyediaan e‑Invois",
        desc: "Cipta & hantar e‑invois; sambung ke POS/QR untuk jejak hasil.",
      },
      {
        key: "bookkeeping",
        title: "Penyimpanan Rekod (MESINKIRA)",
        desc: "Rekod jualan/perbelanjaan harian. Alat dicadangkan: MESINKIRA.",
      },
      {
        key: "cashflow",
        title: "Asas Aliran Tunai & DSR",
        desc: "Fahami pendapatan vs komitmen; jaga DSR dalam julat selamat.",
      },
      {
        key: "compliance",
        title: "Pematuhan & Etika Perniagaan",
        desc: "Penyelenggaraan SSM, budaya resit, kesedaran anti-pengubahan wang haram.",
      },
    ];
  const doneCount = useMemo(
    () => Object.values(modules).filter(Boolean).length,
    [modules]
  );
  const percent = useMemo(
    () => Math.round((doneCount / moduleEntries.length) * 100),
    [doneCount]
  );
  const allDone = doneCount === moduleEntries.length;

  // Appeal box visibility (demo only)
  const rejected = false;

  //

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[420px] min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-10 bg-rose-700 text-white">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🕌</span>
              <h1 className="font-semibold">Prototaip iTEKAD (Demo)</h1>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-0">
          <div className="text-center">
            <div className="flex justify-between mb-3 text-xs">
              {steps.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setStepIdx(i)}
                  className={`px-2 py-1 rounded ${
                    i === stepIdx ? "bg-rose-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {s.title.replace(/ .*/, "")}
                </button>
              ))}
            </div>

            <div className="text-5xl mb-2">{steps[stepIdx].icon}</div>
            <h2 className="text-xl font-bold mb-1">{steps[stepIdx].title}</h2>
            <p className="text-gray-600 mb-4">{steps[stepIdx].desc}</p>
          </div>

          {stepIdx === 0 && (
            <div className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Penuh"
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                value={ic}
                onChange={(e) => setIc(e.target.value)}
                placeholder="Nombor IC (12 digit)"
                className="w-full border rounded-lg px-3 py-2"
              />
              <button className="w-full bg-rose-700 text-white py-2 rounded-lg font-semibold">
                Sahkan Identiti
              </button>
            </div>
          )}

          {stepIdx === 1 && (
            <div className="space-y-4 text-left">
              <ClassicUploads />
            </div>
          )}

          {stepIdx === 2 && (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Status Permohonan</h4>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Pemprosesan"
                    title="Pemprosesan"
                    onClick={() => setVettingScenario("processing")}
                    className={`w-2.5 h-2.5 rounded-full bg-yellow-400 ${
                      vettingScenario === "processing"
                        ? "ring-1 ring-yellow-600"
                        : ""
                    }`}
                  />
                  <button
                    aria-label="Diluluskan"
                    title="Diluluskan"
                    onClick={() => setVettingScenario("approved")}
                    className={`w-2.5 h-2.5 rounded-full bg-green-500 ${
                      vettingScenario === "approved"
                        ? "ring-1 ring-green-700"
                        : ""
                    }`}
                  />
                  <button
                    aria-label="Masalah"
                    title="Masalah"
                    onClick={() => setVettingScenario("problem")}
                    className={`w-2.5 h-2.5 rounded-full bg-red-500 ${
                      vettingScenario === "problem" ? "ring-1 ring-red-700" : ""
                    }`}
                  />
                </div>
              </div>
              {vettingScenario === "processing" && (
                <p className="text-sm text-gray-700">
                  Kami sedang menyemak permohonan anda. Sila tunggu 5–24 jam.
                </p>
              )}
              {vettingScenario === "approved" && (
                <p className="text-sm text-gray-700">
                  Berita baik! Anda lulus. Bersiaplah untuk temuduga ringkas.
                </p>
              )}
              {vettingScenario === "problem" && (
                <p className="text-sm text-gray-700">
                  Terdapat masalah pembayaran. Sila bayar jumlah tertunggak dan
                  hubungi atau lawati bank anda.
                </p>
              )}
            </div>
          )}

          {stepIdx === 3 && (
            <div className="text-left space-y-4">
              <h4 className="font-semibold">
                Senarai Semak Persiapan Temuduga
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>Bawa IC asal dan sijil SSM</li>
                <li>Sediakan penyata bank 3 bulan terakhir</li>
                <li>Bersedia untuk menerangkan model perniagaan anda</li>
                <li>Tahu pendapatan & perbelanjaan bulanan anda</li>
                <li>Ada 1–2 pelan pertumbuhan masa depan</li>
              </ul>

              <div className="mt-4 bg-gray-50 p-3 rounded-lg border">
                <h5 className="font-semibold mb-2">
                  🤖 Bantuan Chatbot / Sokongan Panggilan
                </h5>
                <p className="text-xs text-gray-600">
                  Tanya sebarang soalan sebelum temuduga anda.
                </p>
                <textarea
                  placeholder="Taip soalan anda di sini..."
                  className="w-full border rounded p-2 text-sm"
                />
                <button className="mt-2 bg-rose-700 text-white px-4 py-1 rounded">
                  Hantar
                </button>
                <p className="text-xs mt-2 text-gray-500">
                  Atau hubungi talian panas kami: 1-800-88-1234
                </p>
              </div>

              {rejected && (
                <div className="mt-4" id="appealBox">
                  <h5 className="font-semibold mb-1">Rayuan</h5>
                  <textarea
                    placeholder="Jelaskan rayuan anda..."
                    className="w-full border rounded p-2 text-sm"
                  />
                  <button className="mt-2 bg-yellow-600 text-white px-4 py-1 rounded">
                    Hantar Rayuan
                  </button>
                </div>
              )}
            </div>
          )}

          {stepIdx === 4 && (
            <div className="text-left space-y-4">
              <h4 className="font-semibold">
                Bimbingan Wajib Sebelum Pencairan Dana
              </h4>
              <p className="text-sm text-gray-700">
                Lengkapkan semua modul di bawah untuk membuka pencairan dana.
              </p>

              <div className="space-y-2">
                {moduleEntries.map((m) => (
                  <label
                    key={m.key}
                    className="flex items-start gap-3 bg-white border rounded-lg p-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      aria-label={m.title}
                      className="mt-1 module-check"
                      checked={modules[m.key]}
                      onChange={() =>
                        setModules((prev) => ({
                          ...prev,
                          [m.key]: !prev[m.key],
                        }))
                      }
                    />
                    <div>
                      <div className="font-semibold">{m.title}</div>
                      <p className="text-xs text-gray-600">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-gray-50 border rounded-lg p-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold">Kemajuan</span>
                  <span className="text-gray-700">
                    {doneCount}/{moduleEntries.length} selesai
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {allDone
                    ? "Kerja yang bagus! Seorang banker akan menyelesaikan pencairan anda."
                    : "Lengkapkan semua modul untuk membolehkan pencairan."}
                </p>
              </div>

              {allDone && (
                <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                  <p className="font-semibold">
                    ✅ Semua modul selesai. Anda layak untuk pencairan dana.
                  </p>
                  <p className="text-xs text-gray-600">
                    Bank akan menyahkan penyiapan anda dan meneruskan.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              Kembali
            </button>
            <div className="text-sm text-gray-500">
              Langkah {stepIdx + 1}/{steps.length}
            </div>
            <button
              onClick={() =>
                setStepIdx(Math.min(steps.length - 1, stepIdx + 1))
              }
              className="px-4 py-2 rounded-lg bg-rose-700 text-white"
            >
              Seterusnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//
