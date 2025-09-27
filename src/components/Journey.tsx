import { useEffect, useMemo, useState } from "react";
import ProfileTab from "./ProfileTab";
import PdfTranslate from "./PdfTranslate";
import ClassicUploads from "./ClassicUploads";

export default function Journey() {
  const [activeTopTab, setActiveTopTab] = useState<"journey" | "profile">(
    "journey"
  );
  const steps = [
    {
      icon: "📱",
      title: "Identity",
      desc: "Quick e‑KYC with MyDigitalID. Fill in name + IC.",
    },
    {
      icon: "🗂️",
      title: "Upload Docs",
      desc: "Upload IC, SSM, bank statements & photo of business.",
    },
    {
      icon: "🤖",
      title: "Auto Vetting",
      desc: "System runs CCRIS/CTOS checks.",
    },
    {
      icon: "🎓",
      title: "Interview Prep",
      desc: "Checklist, chatbot, and status updates.",
    },
    {
      icon: "📘",
      title: "Onboarding",
      desc: "Mentoring modules before fund disbursement.",
    },
  ];

  const [stepIdx, setStepIdx] = useState(0);

  // Step 0: Identity
  const [name, setName] = useState("");
  const [ic, setIc] = useState("");

  // Step 2: DSR demo state (derived on click)
  const [dsrKind, setDsrKind] = useState<"pass" | "fail" | null>(null);
  const dsrData = useMemo(() => {
    if (dsrKind === "pass") {
      const income = 3000,
        other = 200,
        repay = 400;
      const total = other + repay;
      const dsr = Math.round((total / income) * 100);
      return {
        income,
        other,
        repay,
        total,
        dsr,
        status: "PASS" as const,
        summary: "DSR is low — applicant can repay. Proceed.",
        color: "green",
      };
    }
    if (dsrKind === "fail") {
      const income = 1500,
        other = 500,
        repay = 700;
      const total = other + repay;
      const dsr = Math.round((total / income) * 100);
      return {
        income,
        other,
        repay,
        total,
        dsr,
        status: "FAIL" as const,
        summary: "DSR too high — manual review needed.",
        color: "red",
      };
    }
    return null;
  }, [dsrKind]);

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
        title: "Scam Awareness",
        desc: "Common scams, red flags, avoiding mule usage, TAC/OTP safety.",
      },
      {
        key: "einvoice",
        title: "e‑Invoice Setup",
        desc: "Create & send e‑invoices; connect to POS/QR for tracking revenue.",
      },
      {
        key: "bookkeeping",
        title: "Bookkeeping (MESINKIRA)",
        desc: "Record daily sales/expenses. Suggested tool: MESINKIRA.",
      },
      {
        key: "cashflow",
        title: "Cash Flow & DSR Basics",
        desc: "Understand income vs commitments; keep DSR within safe range.",
      },
      {
        key: "compliance",
        title: "Compliance & Business Ethics",
        desc: "SSM upkeep, receipt culture, anti‑money‑laundering awareness.",
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

  useEffect(() => {
    // Reset DSR demo when leaving step
    if (stepIdx !== 2) setDsrKind(null);
  }, [stepIdx]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[420px] min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-10 bg-rose-700 text-white">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🕌</span>
              <h1 className="font-semibold">iTEKAD Prototype (Demo)</h1>
            </div>
            <nav className="flex gap-2 text-sm">
              <button
                onClick={() => setActiveTopTab("journey")}
                className={`px-3 py-1 rounded-full font-medium ${
                  activeTopTab === "journey"
                    ? "bg-white text-rose-700"
                    : "bg-white/20 text-white"
                }`}
              >
                Journey
              </button>
              <button
                onClick={() => setActiveTopTab("profile")}
                className={`px-3 py-1 rounded-full font-medium ${
                  activeTopTab === "profile"
                    ? "bg-white text-rose-700"
                    : "bg-white/20 text-white"
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-0">
          {activeTopTab === "journey" ? (
            <>
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
                <h2 className="text-xl font-bold mb-1">
                  {steps[stepIdx].title}
                </h2>
                <p className="text-gray-600 mb-4">{steps[stepIdx].desc}</p>
              </div>

              {stepIdx === 0 && (
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <input
                    value={ic}
                    onChange={(e) => setIc(e.target.value)}
                    placeholder="IC Number (12 digits)"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                  <button className="w-full bg-rose-700 text-white py-2 rounded-lg font-semibold">
                    Verify Identity
                  </button>
                </div>
              )}

              {stepIdx === 1 && (
                <div className="space-y-4 text-left">
                  <ClassicUploads />
                  <div className="border-t pt-3">
                    <div className="text-sm text-gray-600 mb-2">
                      Optional: Try our AI-powered PDF analysis
                    </div>
                    <PdfTranslate />
                  </div>
                </div>
              )}

              {stepIdx === 2 && (
                <div className="space-y-3 text-left">
                  <h4 className="font-semibold">Applicant View</h4>
                  <p className="text-sm">
                    Your documents are being processed automatically. You’ll see
                    if they pass or need manual review.
                  </p>

                  <h4 className="font-semibold mt-4">Bank’s View</h4>
                  <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                    ✔ CCRIS: Clean
                  </div>
                  <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                    ✔ CTOS: No Issues
                  </div>
                  <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                    ✔ Tenure: OK
                  </div>

                  <div className="bg-white border rounded-lg p-3 text-sm mt-3">
                    <h4 className="font-semibold mb-2">
                      🔎 Quick DSR Demo (Bank POV)
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">
                      System-calculated Debt Service Ratio example.
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold"
                        onClick={() => setDsrKind("pass")}
                      >
                        Example: Eligible (PASS)
                      </button>
                      <button
                        className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold"
                        onClick={() => setDsrKind("fail")}
                      >
                        Example: Not Eligible (FAIL)
                      </button>
                    </div>

                    {dsrData && (
                      <div className="mt-4">
                        <div className="bg-gray-50 rounded-lg p-3 border">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <Kpi
                              label="Monthly Income"
                              value={`RM ${dsrData.income.toLocaleString(
                                "en-MY"
                              )}`}
                            />
                            <Kpi
                              label="Existing Loans"
                              value={`RM ${dsrData.other.toLocaleString(
                                "en-MY"
                              )}`}
                            />
                            <Kpi
                              label="Proposed Repayment"
                              value={`RM ${dsrData.repay.toLocaleString(
                                "en-MY"
                              )}`}
                            />
                            <Kpi
                              label="Total Commitments"
                              value={`RM ${dsrData.total.toLocaleString(
                                "en-MY"
                              )}`}
                            />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div>
                              <div className="text-gray-500">DSR</div>
                              <div className="font-semibold text-lg">
                                {dsrData.dsr}%
                              </div>
                            </div>
                            <div
                              className={`font-bold px-3 py-2 rounded-lg text-white ${
                                dsrData.color === "green"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }`}
                            >
                              {dsrData.status === "PASS"
                                ? "✅ PASS"
                                : "❌ FAIL"}
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-gray-700">
                            {dsrData.summary}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {stepIdx === 3 && (
                <div className="text-left space-y-4">
                  <h4 className="font-semibold">
                    Interview Preparation Checklist
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>Bring original IC and SSM certificate</li>
                    <li>Prepare last 3 months’ bank statements</li>
                    <li>Be ready to explain your business model</li>
                    <li>Know your monthly income & expenses</li>
                    <li>Have 1–2 future growth plans</li>
                  </ul>

                  <div className="mt-4 bg-gray-50 p-3 rounded-lg border">
                    <h5 className="font-semibold mb-2">
                      🤖 Chatbot Help / Call Support
                    </h5>
                    <p className="text-xs text-gray-600">
                      Ask any questions before your interview.
                    </p>
                    <textarea
                      placeholder="Type your question here..."
                      className="w-full border rounded p-2 text-sm"
                    />
                    <button className="mt-2 bg-rose-700 text-white px-4 py-1 rounded">
                      Send
                    </button>
                    <p className="text-xs mt-2 text-gray-500">
                      Or call our hotline: 1-800-88-1234
                    </p>
                  </div>

                  {rejected && (
                    <div className="mt-4" id="appealBox">
                      <h5 className="font-semibold mb-1">Appeal</h5>
                      <textarea
                        placeholder="Explain your appeal..."
                        className="w-full border rounded p-2 text-sm"
                      />
                      <button className="mt-2 bg-yellow-600 text-white px-4 py-1 rounded">
                        Submit Appeal
                      </button>
                    </div>
                  )}
                </div>
              )}

              {stepIdx === 4 && (
                <div className="text-left space-y-4">
                  <h4 className="font-semibold">
                    Mandatory Mentoring Before Disbursement
                  </h4>
                  <p className="text-sm text-gray-700">
                    Complete all modules below to unlock fund disbursement.
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
                      <span className="font-semibold">Progress</span>
                      <span className="text-gray-700">
                        {doneCount}/{moduleEntries.length} completed
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
                        ? "Great job! A banker will finalize your disbursement."
                        : "Complete all modules to enable disbursement."}
                    </p>
                  </div>

                  {allDone && (
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                      <p className="font-semibold">
                        ✅ All modules completed. You are eligible for fund
                        disbursement.
                      </p>
                      <p className="text-xs text-gray-600">
                        Bank will verify your completions and proceed.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="pb-4">
              <ProfileTab />
            </div>
          )}
        </div>

        {activeTopTab === "journey" && (
          <div className="px-4 py-3 border-t">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
                className="px-4 py-2 rounded-lg bg-gray-100"
              >
                Back
              </button>
              <div className="text-sm text-gray-500">
                Step {stepIdx + 1}/{steps.length}
              </div>
              <button
                onClick={() =>
                  setStepIdx(Math.min(steps.length - 1, stepIdx + 1))
                }
                className="px-4 py-2 rounded-lg bg-rose-700 text-white"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
