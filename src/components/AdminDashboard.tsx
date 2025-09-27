import { useState } from "react";

// Mock data for the dashboard
const mockMetrics = {
  total: 1247,
  successful: 856,
  pending: 234,
  rejected: 157,
  thisMonth: {
    applications: 89,
    approvals: 62,
    approvalRate: 69.7,
  },
};

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState("30days");

  const MetricCard = ({
    title,
    value,
    percentage,
    trend,
    color = "blue",
  }: {
    title: string;
    value: number | string;
    percentage?: number;
    trend?: "up" | "down";
    color?: "blue" | "green" | "yellow" | "red";
  }) => {
    const colorClasses = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
      red: "bg-red-50 border-red-200 text-red-800",
    };

    return (
      <div className={`rounded-xl border-2 p-6 ${colorClasses[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-75">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {percentage && (
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-semibold ${
                    trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend === "up" ? "↗" : "↘"} {percentage}%
                </span>
                <span className="text-xs text-gray-600 ml-2">
                  berbanding bulan lepas
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const QuickActions = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Tindakan Pantas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="flex items-center justify-center p-4 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition">
          <span className="mr-2">📋</span>
          <span className="font-medium text-rose-800">Semak Menunggu</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
          <span className="mr-2">📊</span>
          <span className="font-medium text-blue-800">Jana Laporan</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
          <span className="mr-2">✅</span>
          <span className="font-medium text-green-800">Proses Kelulusan</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition">
          <span className="mr-2">🔍</span>
          <span className="font-medium text-purple-800">Cari Profil</span>
        </button>
      </div>
    </div>
  );

  const RecentActivity = () => {
    const activities = [
      {
        id: 1,
        customer: "Ahmad Bin Hassan",
        action: "Permohonan Diluluskan",
        time: "2 mins ago",
        status: "success",
      },
      {
        id: 2,
        customer: "Siti Nurhaliza",
        action: "Dokumen Dimuat Naik",
        time: "15 mins ago",
        status: "info",
      },
      {
        id: 3,
        customer: "Muhammad Ali",
        action: "Temuduga Dijadualkan",
        time: "1 hour ago",
        status: "warning",
      },
      {
        id: 4,
        customer: "Fatimah Abdullah",
        action: "Permohonan Ditolak",
        time: "2 hours ago",
        status: "error",
      },
      {
        id: 5,
        customer: "Hassan Yusof",
        action: "Profil Dibuat",
        time: "3 hours ago",
        status: "info",
      },
    ];

    const statusColors = {
      success: "bg-green-100 text-green-800",
      info: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Aktiviti Terkini
        </h3>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.customer}</p>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[activity.status as keyof typeof statusColors]
                  }`}
                >
                  {activity.action.split(" ")[1] ||
                    activity.action.split(" ")[0]}
                </span>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Removed Quick DSR demo; moved into Ringkasan tab of customer profile

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Pentadbir
            </h1>
            <p className="text-gray-600 mt-1">Program Bank Islam iTEKAD</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500"
            >
              <option value="7days">7 hari lepas</option>
              <option value="30days">30 hari lepas</option>
              <option value="90days">90 hari lepas</option>
              <option value="1year">Tahun lepas</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Jumlah Permohonan"
            value={mockMetrics.total.toLocaleString()}
            color="blue"
          />
          <MetricCard
            title="Permohonan Berjaya"
            value={mockMetrics.successful.toLocaleString()}
            percentage={12.5}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Menunggu Semakan"
            value={mockMetrics.pending.toLocaleString()}
            percentage={5.2}
            trend="down"
            color="yellow"
          />
          <MetricCard
            title="Permohonan Ditolak"
            value={mockMetrics.rejected.toLocaleString()}
            percentage={8.1}
            trend="down"
            color="red"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Prestasi Bulan Ini
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Permohonan Baru</span>
                <span className="font-bold text-blue-600">
                  {mockMetrics.thisMonth.applications}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Kelulusan</span>
                <span className="font-bold text-green-600">
                  {mockMetrics.thisMonth.approvals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Kadar Kelulusan</span>
                <span className="font-bold text-purple-600">
                  {mockMetrics.thisMonth.approvalRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Taburan Status Permohonan
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Diluluskan</span>
                <span className="font-medium">68.7%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Menunggu</span>
                <span className="font-medium">18.8%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Ditolak</span>
                <span className="font-medium">12.5%</span>
              </div>
            </div>
          </div>

          <QuickActions />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Gambaran Penilaian Risiko
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Risiko Rendah (750-850)
                  </span>
                </div>
                <span className="font-medium">342 permohonan</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Risiko Baik (650-749)
                  </span>
                </div>
                <span className="font-medium">514 permohonan</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Risiko Sederhana (550-649)
                  </span>
                </div>
                <span className="font-medium">234 permohonan</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Risiko Tinggi (&lt;550)
                  </span>
                </div>
                <span className="font-medium">157 permohonan</span>
              </div>
            </div>
          </div>

          {/* Enhanced AI Output (Stage 2 – Lookalike Matching) */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Output AI Dipertingkat (Peringkat 2 – Padanan Serupa)
            </h3>
            {/* Stepper */}
            <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
              <div className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                Langkah 1: Profil Pemohon Dijana
              </div>
              <div className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                Langkah 2: Perbandingan Pangkalan Data AI
              </div>
              <div className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                Langkah 3: Pandangan Serupa
              </div>
              <div className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                Langkah 4: Keputusan Pantas
              </div>
            </div>

            {/* Insights Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-600">
                  Persamaan dengan pemohon terdahulu
                </div>
                <div className="mt-1 text-3xl font-extrabold text-gray-900">
                  80%
                </div>
                <div className="mt-2 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-600">
                  Yang serupa diluluskan & dibayar balik dengan jayanya
                </div>
                <div className="mt-1 text-3xl font-extrabold text-green-700">
                  95%
                </div>
                <div className="mt-2 w-full bg-green-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: "95%" }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Kebarangkalian tinggi untuk hasil yang berjaya
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <div className="text-sm text-gray-600">
                  Mungkir dalam kalangan yang serupa
                </div>
                <div className="mt-1 text-3xl font-extrabold text-rose-700">
                  5%
                </div>
                <div className="mt-2 w-full bg-rose-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-600"
                    style={{ width: "5%" }}
                  ></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs border border-rose-200">
                    ⚠ Komitmen tinggi
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs border border-rose-200">
                    ⚠ Pendapatan tidak tetap
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs border border-rose-200">
                    ⚠ Tempoh perniagaan muda
                  </span>
                </div>
              </div>
            </div>

            {/* Outcome Hint */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                🧠 AI membina ringkasan kewangan pemohon dan membandingkan
                dengan profil sejarah
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-green-800 border border-green-200">
                ⚡ Kakitangan melihat cadangan + kebarangkalian → pinjaman yang
                lebih pantas dan konsisten
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
