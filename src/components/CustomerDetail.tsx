import { useState } from "react";
import ProfileTab from "./ProfileTab";

// Sample customer data
const mockCustomerDetails = {
  1: {
    id: 1,
    name: "Ahmad bin Abdullah",
    ic: "871205-14-5234",
    phone: "012-3456789",
    email: "ahmad@email.com",
    businessType: "Makanan & Minuman",
    businessName: "Warung Ahmad Nasi Lemak",
    loanAmount: 25000,
    monthlyIncome: 4500,
    creditScore: 745,
    status: "approved",
    disbursementDate: "2024-11-15",
    applicationDate: "2024-10-20",
    location: "Petaling Jaya, Selangor",
    repaymentHistory: 95,
    businessAddress: "No. 45, Jalan SS2/24, Petaling Jaya",
    employeeCount: 3,
    businessAge: 18,
    monthlyExpenses: 2800,
    familySize: 4,
    dependents: 2,
    maritalStatus: "Berkahwin",
    education: "SPM",
    previousLoans: 1,
    bankingHistory: 8,
    collateral: "Tiada",
    guarantor: "Siti Aminah binti Hassan (Isteri)",
    financialRecords: {
      monthlyData: [
        {
          month: "Jan",
          income: 4200,
          expenses: 2600,
          profit: 1600,
          zakat: 84,
          savings: 500,
        },
        {
          month: "Feb",
          income: 4800,
          expenses: 2900,
          profit: 1900,
          zakat: 95,
          savings: 600,
        },
        {
          month: "Mar",
          income: 4100,
          expenses: 2500,
          profit: 1600,
          zakat: 82,
          savings: 480,
        },
        {
          month: "Apr",
          income: 5200,
          expenses: 3100,
          profit: 2100,
          zakat: 104,
          savings: 700,
        },
        {
          month: "May",
          income: 4900,
          expenses: 2850,
          profit: 2050,
          zakat: 98,
          savings: 650,
        },
        {
          month: "Jun",
          income: 4600,
          expenses: 2700,
          profit: 1900,
          zakat: 92,
          savings: 580,
        },
      ],
      yearlyTrend: "Meningkat 15% berbanding tahun lepas",
      peakSeason: "Ramadan & Hari Raya",
      challenges: "Kos bahan mentah naik 8%",
    },
    aiSummary: {
      family:
        "Berkahwin dengan 2 orang anak (umur 8 dan 12 tahun). Isteri bekerja sebagai cikgu di sekolah rendah berdekatan. Keluarga tinggal di rumah teres 2 tingkat yang telah dimiliki selama 5 tahun. Anak-anak bersekolah di sekolah kerajaan berdekatan.",
      personal:
        "Ahmad berumur 37 tahun, mempunyai pengalaman 18 bulan dalam perniagaan makanan. Sebelum ini bekerja sebagai chef di restoran selama 10 tahun. Rajin dan komited, membuka kedai dari 6 pagi hingga 10 malam. Mempunyai pelanggan tetap dan reputasi baik dalam komuniti.",
      financialBehavior:
        "Disiplin dalam pengurusan kewangan, selalu bayar bil tepat masa. Mempunyai akaun simpanan dan pelaburan ASB. Tidak mempunyai hutang kad kredit. Rajin menyimpan untuk pendidikan anak-anak dan haji.",
    },
    aiLookalike: {
      similarity: 80,
      approvedRate: 95,
      defaultRate: 5,
      riskFactors: [
        "Kos bahan mentah naik",
        "Persaingan ketat",
        "Bergantung kepada satu sumber pendapatan",
      ],
      positiveFactors: [
        "Sejarah bayaran excellent",
        "Pengalaman luas",
        "Keluarga stabil",
        "Disiplin kewangan",
      ],
      recommendation: "APPROVE",
      confidence: 87,
      processingTime: "2.3 seconds",
      matchedProfiles: 1247,
    },
  },
  2: {
    id: 2,
    name: "Siti Nurhaliza",
    ic: "920508-10-4321",
    phone: "019-8765432",
    email: "siti@email.com",
    businessType: "Kek & Bakeri Online",
    businessName: "Kek Manis Siti",
    loanAmount: 15000,
    monthlyIncome: 1500,
    creditScore: 610,
    status: "rejected",
    disbursementDate: "",
    applicationDate: "2024-10-12",
    location: "Shah Alam, Selangor",
    repaymentHistory: 72,
    businessAddress: "No. 12, Jalan Bunga Raya, Seksyen 7, Shah Alam",
    employeeCount: 1,
    businessAge: 10,
    monthlyExpenses: 1200,
    familySize: 3,
    dependents: 1,
    maritalStatus: "Berkahwin",
    education: "Diploma",
    previousLoans: 0,
    bankingHistory: 3,
    collateral: "Tiada",
    guarantor: "Suami",
    financialRecords: {
      monthlyData: [
        {
          month: "Jan",
          income: 1500,
          expenses: 1100,
          profit: 400,
          zakat: 0,
          savings: 50,
        },
        {
          month: "Feb",
          income: 1500,
          expenses: 1150,
          profit: 350,
          zakat: 0,
          savings: 30,
        },
        {
          month: "Mar",
          income: 1500,
          expenses: 1200,
          profit: 300,
          zakat: 0,
          savings: 20,
        },
        {
          month: "Apr",
          income: 1500,
          expenses: 1180,
          profit: 320,
          zakat: 0,
          savings: 20,
        },
        {
          month: "May",
          income: 1500,
          expenses: 1170,
          profit: 330,
          zakat: 0,
          savings: 20,
        },
        {
          month: "Jun",
          income: 1500,
          expenses: 1190,
          profit: 310,
          zakat: 0,
          savings: 10,
        },
      ],
      yearlyTrend: "Stabil dengan margin kecil",
      peakSeason: "Aidilfitri & Cuti sekolah",
      challenges: "Kos penghantaran dan bahan naik",
    },
    aiSummary: {
      family:
        "Berkahwin dengan seorang anak. Suami bekerja sepenuh masa dan bantu operasi pada hujung minggu.",
      personal:
        "Siti berumur 33 tahun, memulakan perniagaan bakeri online sejak 10 bulan lalu.",
      financialBehavior:
        "Bayaran bil kebanyakan tepat masa tetapi simpanan rendah kerana komitmen tinggi.",
    },
    aiLookalike: {
      similarity: 65,
      approvedRate: 42,
      defaultRate: 18,
      riskFactors: [
        "DSR terlalu tinggi",
        "Pendapatan tidak stabil",
        "Perniagaan baru",
        "Simpanan rendah",
      ],
      positiveFactors: [
        "Tiada sejarah hutang",
        "Komitmen keluarga",
        "Perniagaan berkembang",
      ],
      recommendation: "REJECT",
      confidence: 78,
      processingTime: "1.8 seconds",
      matchedProfiles: 892,
    },
  },
};

interface CustomerDetailProps {
  customerId: number;
  onBack: () => void;
}

const CustomerDetail = ({ customerId, onBack }: CustomerDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const customer =
    mockCustomerDetails[customerId as keyof typeof mockCustomerDetails];

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Customer Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested customer profile could not be found.
          </p>
          <button
            onClick={onBack}
            className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition"
          >
            ← Back to List
          </button>
        </div>
      </div>
    );
  }

  const calculateTotalSavings = () => {
    return customer.financialRecords.monthlyData.reduce(
      (total, month) => total + month.savings,
      0
    );
  };

  const calculateTotalZakat = () => {
    return customer.financialRecords.monthlyData.reduce(
      (total, month) => total + month.zakat,
      0
    );
  };

  const averageMonthlyProfit = () => {
    const total = customer.financialRecords.monthlyData.reduce(
      (total, month) => total + month.profit,
      0
    );
    return total / customer.financialRecords.monthlyData.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="text-white shadow-lg"
        style={{ backgroundColor: "#A2010E" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="text-white mr-4 hover:text-gray-200"
              >
                ← Kembali
              </button>
              <div>
                <h1 className="text-xl font-bold">Profil Pelanggan</h1>
                <p className="text-sm opacity-90">
                  Bank Islam Malaysia - iTEKAD
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">ID: {customer.id}</div>
              <div className="text-xs opacity-75">
                {new Date().toLocaleDateString("ms-MY")}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Customer Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">
                  {customer.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {customer.name}
                </h1>
                <p className="text-gray-600">{customer.businessName}</p>
                <p className="text-sm text-gray-500">
                  {customer.ic} • {customer.phone}
                </p>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-col lg:items-end space-y-2">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  customer.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : customer.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {customer.status === "approved"
                  ? "Diluluskan"
                  : customer.status === "pending"
                  ? "Dalam Semakan"
                  : "Ditolak"}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Skor Kredit</div>
                <div
                  className={`text-2xl font-bold ${
                    customer.creditScore >= 700
                      ? "text-green-600"
                      : customer.creditScore >= 600
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {customer.creditScore}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Ringkasan", icon: "📊" },
                { id: "business", label: "Perniagaan", icon: "🏪" },
                { id: "financial", label: "Kewangan", icon: "💰" },
                { id: "personal", label: "Peribadi", icon: "👤" },
                { id: "profil", label: "Profil", icon: "📋" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <OverviewTab
                customer={customer}
                totalSavings={calculateTotalSavings()}
                totalZakat={calculateTotalZakat()}
                avgProfit={averageMonthlyProfit()}
              />
            )}
            {activeTab === "business" && <BusinessTab customer={customer} />}
            {activeTab === "financial" && <FinancialTab customer={customer} />}
            {activeTab === "personal" && <PersonalTab customer={customer} />}
            {activeTab === "profil" && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <ProfileTab />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function OverviewTab({
  customer,
  totalSavings,
  totalZakat,
  avgProfit,
}: {
  customer: any;
  totalSavings: number;
  totalZakat: number;
  avgProfit: number;
}) {
  const isSiti = customer?.id === 2 || customer?.name === "Siti Nurhaliza";
  const isAhmad = customer?.id === 1 || customer?.name === "Ahmad bin Abdullah";
  const keyMetrics = [
    {
      title: "Pendapatan Bulanan",
      value: `RM ${customer.monthlyIncome.toLocaleString()}`,
      icon: "💵",
      color: "green",
    },
    {
      title: "Purata Keuntungan",
      value: `RM ${Math.round(avgProfit).toLocaleString()}`,
      icon: "📈",
      color: "blue",
    },
    {
      title: "Jumlah Simpanan (6 bulan)",
      value: `RM ${totalSavings.toLocaleString()}`,
      icon: "🏦",
      color: "green",
    },
    {
      title: "Jumlah Zakat (6 bulan)",
      value: `RM ${totalZakat.toLocaleString()}`,
      icon: "🕌",
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div className="text-2xl">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Maklumat Pembiayaan</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Jumlah Pembiayaan:</span>
              <span className="font-medium">
                RM {customer.loanAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                className={`font-medium ${
                  customer.status === "approved"
                    ? "text-green-600"
                    : customer.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {customer.status === "approved"
                  ? "Diluluskan"
                  : customer.status === "pending"
                  ? "Dalam Semakan"
                  : "Ditolak"}
              </span>
            </div>
            {customer.disbursementDate && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tarikh Salur:</span>
                <span className="font-medium">{customer.disbursementDate}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Sejarah Bayaran:</span>
              <span className="font-medium text-green-600">
                {customer.repaymentHistory}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Profil Risiko</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Skor Kredit:</span>
              <span
                className={`font-medium ${
                  customer.creditScore >= 700
                    ? "text-green-600"
                    : customer.creditScore >= 600
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {customer.creditScore}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sejarah Banking:</span>
              <span className="font-medium">
                {customer.bankingHistory} tahun
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pinjaman Terdahulu:</span>
              <span className="font-medium">{customer.previousLoans}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Penjamin:</span>
              <span className="font-medium text-sm">{customer.guarantor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">🤖 Ringkasan AI</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Analisis Keluarga:
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {customer.aiSummary.family}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Profil Peribadi:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {customer.aiSummary.personal}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">
              Tingkah Laku Kewangan:
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {customer.aiSummary.financialBehavior}
            </p>
          </div>
        </div>
      </div>

      {/* Ringkasan Bank */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2">Ringkasan Bank</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <div
            className={`${
              isSiti
                ? "bg-yellow-50 text-yellow-700"
                : "bg-green-50 text-green-700"
            } py-2 rounded-lg px-3`}
          >
            {isSiti ? "⚠ CCRIS: Bertanda" : "✔ CCRIS: Bersih"}
          </div>
          <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
            ✔ CTOS: Tiada Isu
          </div>
          <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
            ✔ Tempoh: OK
          </div>
        </div>

        {isSiti ? (
          <div className="border rounded-lg p-4">
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-500">Pendapatan Bulanan</div>
                  <div className="font-semibold">
                    RM {(1500).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Pinjaman Sedia Ada</div>
                  <div className="font-semibold">
                    RM {(500).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Ansuran Dicadangkan</div>
                  <div className="font-semibold">
                    RM {(700).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Jumlah Komitmen</div>
                  <div className="font-semibold">
                    RM {(500 + 700).toLocaleString("en-MY")}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-500">DSR</div>
                  <div className="font-semibold text-lg">
                    {Math.round(((500 + 700) / 1500) * 100)}%
                  </div>
                </div>
                <div className="font-bold px-3 py-2 rounded-lg text-white bg-red-600">
                  ❌ GAGAL
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700">
                DSR terlalu tinggi — semakan manual diperlukan.
              </div>
            </div>
          </div>
        ) : isAhmad ? (
          <div className="border rounded-lg p-4">
            <div className="bg-gray-50 rounded-lg p-3 border">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-500">Pendapatan Bulanan</div>
                  <div className="font-semibold">
                    RM {(3000).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Pinjaman Sedia Ada</div>
                  <div className="font-semibold">
                    RM {(200).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Ansuran Dicadangkan</div>
                  <div className="font-semibold">
                    RM {(400).toLocaleString("en-MY")}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Jumlah Komitmen</div>
                  <div className="font-semibold">
                    RM {(200 + 400).toLocaleString("en-MY")}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-500">DSR</div>
                  <div className="font-semibold text-lg">
                    {Math.round(((200 + 400) / 3000) * 100)}%
                  </div>
                </div>
                <div className="font-bold px-3 py-2 rounded-lg text-white bg-green-600">
                  ✅ LULUS
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-700">
                DSR rendah — pemohon mampu membayar. Teruskan.
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">🔎 Contoh Pengiraan DSR</h4>
            <p className="text-xs text-gray-600 mb-3">
              Contoh pengiraan DSR oleh sistem.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Pendapatan Bulanan</div>
                    <div className="font-semibold">
                      RM {(3000).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Pinjaman Sedia Ada</div>
                    <div className="font-semibold">
                      RM {(200).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ansuran Dicadangkan</div>
                    <div className="font-semibold">
                      RM {(400).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Jumlah Komitmen</div>
                    <div className="font-semibold">
                      RM {(200 + 400).toLocaleString("en-MY")}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-gray-500">DSR</div>
                    <div className="font-semibold text-lg">
                      {Math.round(((200 + 400) / 3000) * 100)}%
                    </div>
                  </div>
                  <div className="font-bold px-3 py-2 rounded-lg text-white bg-green-600">
                    ✅ LULUS
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-700">
                  DSR rendah — pemohon mampu membayar. Teruskan.
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Pendapatan Bulanan</div>
                    <div className="font-semibold">
                      RM {(1500).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Pinjaman Sedia Ada</div>
                    <div className="font-semibold">
                      RM {(500).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Ansuran Dicadangkan</div>
                    <div className="font-semibold">
                      RM {(700).toLocaleString("en-MY")}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Jumlah Komitmen</div>
                    <div className="font-semibold">
                      RM {(500 + 700).toLocaleString("en-MY")}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-gray-500">DSR</div>
                    <div className="font-semibold text-lg">
                      {Math.round(((500 + 700) / 1500) * 100)}%
                    </div>
                  </div>
                  <div className="font-bold px-3 py-2 rounded-lg text-white bg-red-600">
                    ❌ GAGAL
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-700">
                  DSR terlalu tinggi — semakan manual diperlukan.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessTab({ customer }: { customer: any }) {
  return (
    <div className="space-y-6">
      {/* Business Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Maklumat Perniagaan</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Perniagaan:</span>
              <span className="font-medium">{customer.businessName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jenis:</span>
              <span className="font-medium">{customer.businessType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Alamat:</span>
              <span className="font-medium text-sm">
                {customer.businessAddress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Umur Perniagaan:</span>
              <span className="font-medium">{customer.businessAge} bulan</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bilangan Pekerja:</span>
              <span className="font-medium">
                {customer.employeeCount} orang
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Prestasi Perniagaan</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Pendapatan Bulanan:</span>
              <span className="font-medium text-green-600">
                RM {customer.monthlyIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Perbelanjaan Bulanan:</span>
              <span className="font-medium text-red-600">
                RM {customer.monthlyExpenses.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Keuntungan Bersih:</span>
              <span className="font-medium text-blue-600">
                RM{" "}
                {(
                  customer.monthlyIncome - customer.monthlyExpenses
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Margin Keuntungan:</span>
              <span className="font-medium">
                {(
                  ((customer.monthlyIncome - customer.monthlyExpenses) /
                    customer.monthlyIncome) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">📈 Analisis Perniagaan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Trend Tahunan:</h4>
            <p className="text-sm text-gray-600">
              {customer.financialRecords.yearlyTrend}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Musim Puncak:</h4>
            <p className="text-sm text-gray-600">
              {customer.financialRecords.peakSeason}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Cabaran:</h4>
            <p className="text-sm text-gray-600">
              {customer.financialRecords.challenges}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          Prestasi Bulanan (6 Bulan Terkini)
        </h3>
        <div className="space-y-4">
          {customer.financialRecords.monthlyData.map(
            (month: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800">{month.month}</h4>
                  <div className="text-sm text-gray-600">
                    Keuntungan:{" "}
                    <span className="font-medium text-green-600">
                      RM {month.profit.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Pendapatan</div>
                    <div className="font-medium text-green-600">
                      RM {month.income.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Perbelanjaan</div>
                    <div className="font-medium text-red-600">
                      RM {month.expenses.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Zakat</div>
                    <div className="font-medium text-purple-600">
                      RM {month.zakat}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Simpanan</div>
                    <div className="font-medium text-blue-600">
                      RM {month.savings}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Baki</div>
                    <div className="font-medium">
                      RM{" "}
                      {(
                        month.profit -
                        month.zakat -
                        month.savings
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function FinancialTab({ customer }: { customer: any }) {
  const totalIncome = customer.financialRecords.monthlyData.reduce(
    (sum: number, month: any) => sum + month.income,
    0
  );
  const totalExpenses = customer.financialRecords.monthlyData.reduce(
    (sum: number, month: any) => sum + month.expenses,
    0
  );
  const totalProfit = customer.financialRecords.monthlyData.reduce(
    (sum: number, month: any) => sum + month.profit,
    0
  );
  const totalZakat = customer.financialRecords.monthlyData.reduce(
    (sum: number, month: any) => sum + month.zakat,
    0
  );
  const totalSavings = customer.financialRecords.monthlyData.reduce(
    (sum: number, month: any) => sum + month.savings,
    0
  );

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            title: "Jumlah Pendapatan",
            value: totalIncome,
            color: "text-green-600",
            icon: "💰",
          },
          {
            title: "Jumlah Perbelanjaan",
            value: totalExpenses,
            color: "text-red-600",
            icon: "💸",
          },
          {
            title: "Jumlah Keuntungan",
            value: totalProfit,
            color: "text-blue-600",
            icon: "📈",
          },
          {
            title: "Jumlah Zakat",
            value: totalZakat,
            color: "text-purple-600",
            icon: "🕌",
          },
          {
            title: "Jumlah Simpanan",
            value: totalSavings,
            color: "text-teal-600",
            icon: "🏦",
          },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div className="text-xs text-gray-600 mb-1">{item.title}</div>
            <div className={`text-lg font-bold ${item.color}`}>
              RM {item.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">(6 bulan)</div>
          </div>
        ))}
      </div>

      {/* Income vs Expenses Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          Perbandingan Pendapatan vs Perbelanjaan
        </h3>
        <div className="space-y-4">
          {customer.financialRecords.monthlyData.map(
            (month: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{month.month}</span>
                  <span className="text-gray-600">
                    Margin: {((month.profit / month.income) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="relative">
                  <div className="flex h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(month.income / 8000) * 100}%` }}
                    >
                      {month.income >= 1000
                        ? `${(month.income / 1000).toFixed(1)}k`
                        : month.income}
                    </div>
                    <div
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(month.expenses / 8000) * 100}%` }}
                    >
                      {month.expenses >= 1000
                        ? `${(month.expenses / 1000).toFixed(1)}k`
                        : month.expenses}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Pendapatan
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Perbelanjaan
          </div>
        </div>
      </div>

      {/* Zakat and Savings Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">💜 Analisis Zakat</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Jumlah Zakat (6 bulan):</span>
              <span className="font-bold text-purple-600">RM {totalZakat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purata Bulanan:</span>
              <span className="font-medium">
                RM {Math.round(totalZakat / 6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">% daripada Keuntungan:</span>
              <span className="font-medium">
                {((totalZakat / totalProfit) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <div className="text-sm text-purple-800">
                <strong>Analisis:</strong> Pelanggan konsisten membayar zakat,
                menunjukkan komitmen terhadap kewajipan agama dan disiplin
                kewangan yang baik.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">🏦 Analisis Simpanan</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Jumlah Simpanan (6 bulan):</span>
              <span className="font-bold text-teal-600">RM {totalSavings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Purata Bulanan:</span>
              <span className="font-medium">
                RM {Math.round(totalSavings / 6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">% daripada Keuntungan:</span>
              <span className="font-medium">
                {((totalSavings / totalProfit) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="mt-4 p-3 bg-teal-100 rounded-lg">
              <div className="text-sm text-teal-800">
                <strong>Analisis:</strong> Kadar simpanan yang sihat menunjukkan
                kemampuan menguruskan kewangan dan potensi untuk menampung
                bayaran balik pinjaman.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Health Score */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          🎯 Skor Kesihatan Kewangan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">85</div>
            <div className="text-sm text-gray-600">Pengurusan Aliran Tunai</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">78</div>
            <div className="text-sm text-gray-600">Kestabilan Pendapatan</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">92</div>
            <div className="text-sm text-gray-600">Disiplin Simpanan</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalTab({ customer }: { customer: any }) {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">👤 Maklumat Peribadi</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Penuh:</span>
              <span className="font-medium">{customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">No. MyKad:</span>
              <span className="font-medium">{customer.ic}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Telefon:</span>
              <span className="font-medium">{customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-sm">{customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status Perkahwinan:</span>
              <span className="font-medium">{customer.maritalStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tahap Pendidikan:</span>
              <span className="font-medium">{customer.education}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">👨‍👩‍👧‍👦 Maklumat Keluarga</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Saiz Keluarga:</span>
              <span className="font-medium">{customer.familySize} orang</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggungan:</span>
              <span className="font-medium">{customer.dependents} orang</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lokasi:</span>
              <span className="font-medium">{customer.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Penjamin:</span>
              <span className="font-medium text-sm">{customer.guarantor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cagaran:</span>
              <span className="font-medium">{customer.collateral}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Banking History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-4">🏦 Sejarah Perbankan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {customer.bankingHistory}
            </div>
            <div className="text-sm text-gray-600">Tahun Hubungan Banking</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {customer.previousLoans}
            </div>
            <div className="text-sm text-gray-600">Pinjaman Terdahulu</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {customer.repaymentHistory}%
            </div>
            <div className="text-sm text-gray-600">Rekod Bayaran Balik</div>
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          🤖 Analisis Mendalam AI
        </h3>

        {/* Family Analysis */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
          <h4 className="font-bold text-green-800 mb-3">
            👨‍👩‍👧‍👦 Analisis Keluarga
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            {customer.aiSummary.family}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Kestabilan Keluarga</div>
              <div className="text-lg font-bold text-green-600">Tinggi</div>
              <div className="text-xs text-gray-500">
                Keluarga yang stabil dengan komitmen jangka panjang
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Sokongan Kewangan</div>
              <div className="text-lg font-bold text-blue-600">Sederhana</div>
              <div className="text-xs text-gray-500">
                Isteri menyumbang pendapatan keluarga
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Tanggungan</div>
              <div className="text-lg font-bold text-yellow-600">Terkawal</div>
              <div className="text-xs text-gray-500">
                Bilangan tanggungan yang munasabah
              </div>
            </div>
          </div>
        </div>

        {/* Personal Analysis */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
          <h4 className="font-bold text-blue-800 mb-3">👤 Analisis Peribadi</h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            {customer.aiSummary.personal}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Pengalaman Perniagaan</div>
              <div className="text-lg font-bold text-blue-600">
                Berpengalaman
              </div>
              <div className="text-xs text-gray-500">
                Latar belakang kukuh dalam industri
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Dedikasi</div>
              <div className="text-lg font-bold text-green-600">Tinggi</div>
              <div className="text-xs text-gray-500">
                Komited terhadap perniagaan
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Reputasi</div>
              <div className="text-lg font-bold text-purple-600">Baik</div>
              <div className="text-xs text-gray-500">
                Dikenali dalam komuniti
              </div>
            </div>
          </div>
        </div>

        {/* Financial Behavior Analysis */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <h4 className="font-bold text-purple-800 mb-3">
            💰 Analisis Tingkah Laku Kewangan
          </h4>
          <p className="text-gray-700 leading-relaxed mb-4">
            {customer.aiSummary.financialBehavior}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Disiplin Bayaran</div>
              <div className="text-lg font-bold text-green-600">Excellent</div>
              <div className="text-xs text-gray-500">
                Selalu bayar tepat masa
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Pengurusan Hutang</div>
              <div className="text-lg font-bold text-green-600">Baik</div>
              <div className="text-xs text-gray-500">
                Hutang terkawal dengan baik
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Pelaburan</div>
              <div className="text-lg font-bold text-blue-600">Aktif</div>
              <div className="text-xs text-gray-500">
                Mempunyai portfolio pelaburan
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-600">Perancangan</div>
              <div className="text-lg font-bold text-purple-600">Strategik</div>
              <div className="text-xs text-gray-500">
                Merancang untuk masa depan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">
          ⚖️ Penilaian Risiko Keseluruhan
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Faktor Positif:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">Sejarah bayaran yang excellent</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">
                  Pengalaman luas dalam bidang perniagaan
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">
                  Keluarga yang stabil dan menyokong
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">
                  Disiplin dalam pengurusan kewangan
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-sm">
                  Komitmen terhadap kewajipan agama (zakat)
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">
              Faktor Perhatian:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span className="text-sm">
                  Persaingan yang semakin ketat dalam industri
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span className="text-sm">Kenaikan kos bahan mentah</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚠</span>
                <span className="text-sm">
                  Bergantung kepada pendapatan perniagaan sahaja
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-800 mb-2">📋 Cadangan Bank:</h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            Pelanggan ini menunjukkan profil risiko yang rendah dengan potensi
            pertumbuhan yang baik. Disyorkan untuk meneruskan pembiayaan dengan
            pemantauan berkala terhadap prestasi perniagaan. Pertimbangkan untuk
            menawarkan produk perbankan tambahan seperti akaun perniagaan dan
            kemudahan overdraft.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">📞 Maklumat Hubungan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Hubungan Utama:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Telefon:</span>
                <span className="font-medium">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alamat Perniagaan:</span>
                <span className="font-medium text-xs">
                  {customer.businessAddress}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">
              Hubungan Kecemasan:
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Penjamin:</span>
                <span className="font-medium text-xs">
                  {customer.guarantor}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hubungan:</span>
                <span className="font-medium">
                  {customer.guarantor.includes("Isteri")
                    ? "Isteri"
                    : customer.guarantor.includes("Suami")
                    ? "Suami"
                    : customer.guarantor.includes("Abang")
                    ? "Abang"
                    : "Keluarga"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
