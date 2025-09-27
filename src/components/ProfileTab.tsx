import { useState } from "react";

export default function ProfileTab() {
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpenPanels((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="px-4 pt-4 pb-24">
      <div className="bg-gray-50 rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-rose-700">Customer Profile</h2>
          <span className="text-sm text-gray-500">iTEKAD AI</span>
        </div>

        <h3 className="text-lg font-semibold">Ahmad’s Kopitiam</h3>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border">
            <div className="text-gray-500">Revenue (avg)</div>
            <div className="font-semibold">RM 12,500</div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <div className="text-gray-500">Expenses</div>
            <div className="font-semibold">RM 8,500</div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <div className="text-gray-500">Surplus</div>
            <div className="font-semibold text-green-600">RM 2,500</div>
          </div>
          <div className="bg-white rounded-lg p-3 border">
            <div className="text-gray-500">Growth</div>
            <div className="font-semibold text-blue-600">+8%</div>
          </div>
        </div>

        <div className="rounded-xl border p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Mule Risk</span>
            <span className="font-semibold text-amber-600">Medium</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Success Probability</span>
            <span className="font-semibold text-green-700">72%</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Business Tenure</span>
            <span className="font-semibold">18 months</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => toggle("analysis")}
            className="w-full py-2 rounded-lg bg-rose-600 text-white font-semibold"
          >
            View Analysis
          </button>
          <button
            onClick={() => toggle("params")}
            className="w-full py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold"
          >
            Show Parameters Used
          </button>
          <button
            onClick={() => toggle("risk")}
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold"
          >
            Show Risk Visual
          </button>
          <button
            onClick={() => toggle("flow")}
            className="w-full py-2 rounded-lg bg-teal-600 text-white font-semibold"
          >
            Show Data Collection Flow
          </button>
        </div>

        {openPanels["analysis"] && (
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold text-red-600 mb-1">⚠ Red Flags</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Frequent small incoming transfers</li>
                <li>Instant withdrawals detected</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-600 mb-1">
                ✅ Positives
              </h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Consistent surplus for 3 months</li>
                <li>Revenue growing steadily</li>
                <li>Expense ratio within safe range</li>
              </ul>
            </div>
          </div>
        )}

        {openPanels["params"] && (
          <div className="space-y-2 text-sm">
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Average Monthly Revenue</div>
              <div className="text-gray-600 text-xs">
                From e‑invoices or estimated if cash‑only (self‑reported sales
                log).
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Expense Ratio</div>
              <div className="text-gray-600 text-xs">
                Expenses ÷ Revenue, indicates cost efficiency.
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Net Surplus</div>
              <div className="text-gray-600 text-xs">
                Revenue – Expenses – Loan Instalments.
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Growth Trend</div>
              <div className="text-gray-600 text-xs">
                Revenue change over 3–6 months.
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Transaction Behavior</div>
              <div className="text-gray-600 text-xs">
                Volume, frequency, in vs out balance (cash vs digital).
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Business Tenure</div>
              <div className="text-gray-600 text-xs">
                Months since registration or from receipts/logbooks.
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Age vs Income Check</div>
              <div className="text-gray-600 text-xs">
                Mismatch can flag mule risk.
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg border">
              <div className="font-semibold">Digitalization Score</div>
              <div className="text-gray-600 text-xs">
                Share of e‑invoice/QR vs cash.
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Cash‑only businesses can still be measured with photo receipts,
              simple sales logs, or a free bookkeeping tool in‑app.
            </p>
          </div>
        )}

        {openPanels["risk"] && (
          <div className="space-y-3 text-sm">
            <h4 className="font-semibold">📊 Mule Risk Profile Matching</h4>
            <p className="text-xs text-gray-600">
              Compared against clusters of past clients.
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>✅ Stable peers: 65% match</li>
              <li>⚠ Risky peers: 25% match</li>
              <li>❌ Mule‑like peers: 10% match</li>
            </ul>
            <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-green-500"
                style={{ width: "65%" }}
              ></div>
              <div
                className="h-full bg-amber-400"
                style={{ width: "25%" }}
              ></div>
              <div className="h-full bg-red-500" style={{ width: "10%" }}></div>
            </div>
            <p className="text-xs text-gray-500">
              Green = Healthy, Amber = Monitor, Red = Mule‑like.
            </p>
          </div>
        )}

        {openPanels["flow"] && (
          <div className="space-y-3 text-sm">
            <h4 className="font-semibold">📥 How Data is Collected</h4>
            <ol className="space-y-2">
              <li className="bg-white p-2 rounded-lg border">
                <strong>1. Upload Documents</strong> — IC, SSM, bank statements
              </li>
              <li className="bg-white p-2 rounded-lg border">
                <strong>2. Sync E‑Invoice</strong> — API pulls sales; cash‑only
                can enter logs
              </li>
              <li className="bg-white p-2 rounded-lg border">
                <strong>3. Bank Feed</strong> — with consent, last 3 months
                patterns
              </li>
              <li className="bg-white p-2 rounded-lg border">
                <strong>4. Biz Info</strong> — short survey: tenure, sector,
                staff, location
              </li>
              <li className="bg-white p-2 rounded-lg border">
                <strong>5. AI Profile</strong> — combine inputs → profile + risk
                scores
              </li>
            </ol>
            <p className="text-xs text-gray-500">
              Secure, consent‑based collection; audit trail retained.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
