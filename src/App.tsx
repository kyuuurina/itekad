import { useMemo, useState, useEffect } from "react";
import FinancialProfile from "./components/FinancialProfile";
import ProfileTab from "./components/ProfileTab";
import AdminApp from "./components/AdminApp";

export default function ItekadMobileApp() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState<"journey" | "profile">(
    "journey"
  );

  useEffect(() => {
    // Check if URL contains /admin to determine if we should show admin interface
    const pathname = window.location.pathname;
    const search = window.location.search;

    console.log("Pathname:", pathname);
    console.log("Search:", search);

    if (
      pathname.includes("/admin") ||
      pathname === "/admin" ||
      search.includes("admin=true")
    ) {
      console.log("Setting admin mode to true");
      setIsAdminMode(true);
    }
  }, []);

  const steps = [
    {
      key: "apply",
      title: "Identity & Basics",
      icon: "📱",
      shortTitle: "Identity",
    },
    {
      key: "docs",
      title: "Documents Upload",
      icon: "🗂️",
      shortTitle: "Documents",
    },
    { key: "vet", title: "Auto Vetting", icon: "🤖", shortTitle: "Vetting" },
    { key: "prep", title: "Interview Prep", icon: "🎓", shortTitle: "Prep" },
    {
      key: "onboard",
      title: "Onboarding & e‑Invoicing",
      icon: "📊",
      shortTitle: "Onboard",
    },
    {
      key: "profile",
      title: "Financial Profile",
      icon: "📋",
      shortTitle: "Profile",
    },
    { key: "fraud", title: "Scam Checker", icon: "⚠️", shortTitle: "Safety" },
    { key: "grad", title: "Graduation", icon: "🚀", shortTitle: "Graduate" },
  ];

  const [stepIdx, setStepIdx] = useState(0);

  // All hooks must be declared at the top level
  // Step 1: Identity & Basics (e‑KYC simulation)
  const [name, setName] = useState("");
  const [ic, setIc] = useState("");
  const [ekyc, setEkyc] = useState("idle");

  // Step 2: Documents Upload
  const [docs, setDocs] = useState({
    ic: false,
    ssm: false,
    bank3m: false,
    plan: false,
    photo: false,
  });
  const docsScore = useMemo(
    () => Object.values(docs).filter(Boolean).length,
    [docs]
  );

  // Step 3: Auto Vetting
  const [ccris, setCcris] = useState("clean");
  const [ctos, setCtos] = useState("clean");
  const [bankrupt, setBankrupt] = useState(false);
  const [months, setMonths] = useState(6);
  const [age, setAge] = useState(30);

  const decision = useMemo(() => {
    const reasons = [];
    if (bankrupt) {
      reasons.push("Listed in Insolvency/bankruptcy");
      return { outcome: "FAIL", reasons };
    }
    if (age < 18 || age > 60) {
      reasons.push("Age outside eligible range (18–60)");
      return { outcome: "FAIL", reasons };
    }

    const tenureOK = months >= 6;
    if (!tenureOK) reasons.push("Business tenure < 6 months");

    if (ccris === "default") reasons.push("CCRIS: severe default(s)");
    if (ctos === "issue") reasons.push("CTOS: adverse record");

    const thinFile = ccris === "clean" && ctos === "clean" && docsScore <= 2;

    if (!tenureOK || ccris === "default") {
      return { outcome: "FAIL", reasons };
    }

    if (ccris === "minor" || ctos === "issue" || thinFile) {
      if (thinFile) reasons.push("Thin file: limited documents");
      return {
        outcome: "FLAG",
        reasons: reasons.length ? reasons : ["Manual review needed"],
      };
    }

    return { outcome: "PASS", reasons: ["Clean credit & meets tenure"] };
  }, [bankrupt, age, months, ccris, ctos, docsScore]);

  // Step 5: e‑Invoicing
  const [entries, setEntries] = useState<
    Array<{ id: number; type: string; label: string; amount: number }>
  >([]);
  const [label, setLabel] = useState("");
  const [amt, setAmt] = useState(0);
  const [etype, setEtype] = useState("sale");
  const [instalment, setInstalment] = useState(500);

  const totals = useMemo(() => {
    const sales = entries
      .filter((e) => e.type === "sale")
      .reduce((s, e) => s + e.amount, 0);
    const expenses = entries
      .filter((e) => e.type === "expense")
      .reduce((s, e) => s + e.amount, 0);
    const net = sales - expenses;
    const surplus = net - instalment;
    const risk = surplus >= 500 ? "LOW" : surplus >= 0 ? "MEDIUM" : "HIGH";
    return { sales, expenses, net, surplus, risk };
  }, [entries, instalment]);

  // Step 6: Scam checker
  const [sms, setSms] = useState("");
  const scamFindings = useMemo(() => {
    const hits = [];
    const lower = sms.toLowerCase();
    if (/otp|tac|kod|6\s*digit/.test(lower)) hits.push("Asking for OTP/TAC");
    if (
      /transfer|bayar|yuran|fee/.test(lower) &&
      /proses|processing/.test(lower)
    )
      hits.push("Asking for upfront fee");
    if (/klik|click|link|pautan/.test(lower))
      hits.push("Suspicious link present");
    if (/akaun.*disekat|account.*suspend|blok/.test(lower))
      hits.push("Account blocking threat");
    if (/whatsapp.*agent|pegawai.*bank/.test(lower))
      hits.push("Impersonation of bank staff");
    return hits;
  }, [sms]);

  const runEkyc = () => {
    const ok = /^\d{12}$/.test(ic) && name.trim().length >= 3;
    setEkyc(ok ? "pass" : "fail");
  };

  const addEntry = () => {
    if (!label || !amt) return;
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), type: etype, label, amount: Math.abs(amt) },
    ]);
    setLabel("");
    setAmt(0);
  };

  // If in admin mode, show admin interface
  if (isAdminMode) {
    return <AdminApp />;
  }

  const MobileHeader = () => (
    <div className="sticky top-0 z-20 bg-rose-600 text-white">
      <div className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTopTab("journey")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              activeTopTab === "journey"
                ? "bg-white text-rose-600"
                : "bg-rose-700 text-white"
            }`}
          >
            Journey
          </button>
          <button
            onClick={() => setActiveTopTab("profile")}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              activeTopTab === "profile"
                ? "bg-white text-rose-600"
                : "bg-rose-700 text-white"
            }`}
          >
            Profile
          </button>
        </div>
        {activeTopTab === "journey" && (
          <div className="mt-2 text-sm text-center opacity-90">
            Step {stepIdx + 1} of {steps.length}: {steps[stepIdx].shortTitle}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-rose-700">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }}
        />
      </div>

      {activeTopTab === "journey" && (
        <div className="flex overflow-x-auto px-2 py-2 scrollbar-hide">
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setStepIdx(i)}
              className={`flex-shrink-0 mx-1 px-3 py-2 rounded-full text-xs font-medium transition ${
                i === stepIdx
                  ? "bg-white text-rose-600"
                  : "bg-rose-700 text-white hover:bg-rose-500"
              }`}
            >
              <span className="mr-1">{s.icon}</span>
              {s.shortTitle}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const MobileCard = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader />

      <div className="px-4 py-4">
        {activeTopTab === "profile" && <ProfileTab />}

        {activeTopTab === "profile" ? null : (
          <>
            {/* STEP 1: Identity & Basics */}
            {stepIdx === 0 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[0].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[0].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Verify your identity with e-KYC
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Siti Aminah"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MyKad / IC (12 digits)
                    </label>
                    <input
                      value={ic}
                      onChange={(e) => setIc(e.target.value)}
                      placeholder="912345678901"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      type="tel"
                    />
                  </div>

                  <button
                    onClick={runEkyc}
                    className="w-full bg-rose-600 text-white font-semibold py-3 rounded-lg text-base active:bg-rose-700 transition"
                  >
                    Simulate e‑KYC Verification
                  </button>

                  {ekyc === "pass" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-800 text-sm">
                      ✅ e‑KYC verification passed successfully!
                    </div>
                  )}

                  {ekyc === "fail" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
                      ❌ e‑KYC failed. Please check IC format & name.
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                  💡 This simulates MyDigitalID verification: selfie + IC match,
                  liveness check, and sanctions screening.
                </div>
              </MobileCard>
            )}

            {/* STEP 2: Documents Upload */}
            {stepIdx === 1 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[1].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[1].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload required documents
                  </p>
                </div>

                <div className="space-y-3">
                  {Object.entries({
                    "IC Copy": "ic",
                    "SSM Certificate": "ssm",
                    "Bank Statement (3m)": "bank3m",
                    "Business Plan": "plan",
                    "Business Photo": "photo",
                  }).map(([label, key]) => (
                    <label
                      key={key}
                      className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg active:bg-gray-100 transition"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={docs[key as keyof typeof docs]}
                          onChange={() =>
                            setDocs((prev) => ({
                              ...prev,
                              [key]: !prev[key as keyof typeof prev],
                            }))
                          }
                          className="mr-3 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                      {docs[key as keyof typeof docs] && (
                        <span className="text-green-600 text-sm">✓</span>
                      )}
                    </label>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm font-medium">
                    Progress: {docsScore} / 5 documents uploaded
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-rose-600 h-2 rounded-full transition-all"
                      style={{ width: `${(docsScore / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                  💡 OCR technology verifies that names & numbers match across
                  all documents.
                </div>
              </MobileCard>
            )}

            {/* STEP 3: Auto Vetting */}
            {stepIdx === 2 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[2].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[2].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Automated risk assessment
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CCRIS
                      </label>
                      <select
                        value={ccris}
                        onChange={(e) => setCcris(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="clean">Clean</option>
                        <option value="minor">Minor Issues</option>
                        <option value="default">Defaults</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CTOS
                      </label>
                      <select
                        value={ctos}
                        onChange={(e) => setCtos(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="clean">Clean</option>
                        <option value="issue">Issue Present</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Business Tenure
                      </label>
                      <input
                        type="number"
                        value={months}
                        onChange={(e) =>
                          setMonths(parseInt(e.target.value || "0"))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder="Months"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) =>
                          setAge(parseInt(e.target.value || "0"))
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        placeholder="Years"
                      />
                    </div>
                  </div>

                  <label className="flex items-center p-3 bg-gray-50 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={bankrupt}
                      onChange={() => setBankrupt((v) => !v)}
                      className="mr-3 w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                    />
                    <span className="text-sm font-medium">
                      Bankruptcy/Insolvency Record
                    </span>
                  </label>
                </div>

                <div
                  className={`mt-4 rounded-lg p-4 border ${
                    decision.outcome === "PASS"
                      ? "border-green-300 bg-green-50"
                      : decision.outcome === "FAIL"
                      ? "border-red-300 bg-red-50"
                      : "border-amber-300 bg-amber-50"
                  }`}
                >
                  <div className="font-bold text-lg mb-2">
                    Assessment: {decision.outcome}
                  </div>
                  <ul className="space-y-1">
                    {decision.reasons.map((r, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                  {decision.outcome !== "PASS" && (
                    <div className="mt-2 text-xs opacity-75">
                      Cases requiring review are forwarded to loan officers with
                      full context.
                    </div>
                  )}
                </div>
              </MobileCard>
            )}

            {/* STEP 4: Interview Prep */}
            {stepIdx === 3 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[3].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[3].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Get ready for your interview
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-3 text-gray-800">
                      📋 Checklist
                    </h3>
                    <div className="space-y-2">
                      {[
                        "Last 3 months bank statements",
                        "Sample e‑invoice or sales records",
                        "Cost breakdown (rent, utilities, supplies)",
                        "Business photos (location/stall)",
                        "Fund usage plan (equipment/working capital)",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="mr-2 text-gray-400">•</span>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-3 text-gray-800">
                      🤖 AI Assistant
                    </h3>
                    <ChatbotMobile />
                  </div>
                </div>
              </MobileCard>
            )}

            {/* STEP 5: Onboarding & e-Invoicing */}
            {stepIdx === 4 && (
              <div className="space-y-4">
                <MobileCard>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{steps[4].icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {steps[4].title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Track your business cashflow
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        placeholder="e.g. Nasi lemak sales (Monday)"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount (RM)
                        </label>
                        <input
                          type="number"
                          value={amt}
                          onChange={(e) =>
                            setAmt(parseFloat(e.target.value || "0"))
                          }
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={etype}
                          onChange={(e) => setEtype(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        >
                          <option value="sale">Sale</option>
                          <option value="expense">Expense</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={addEntry}
                      className="w-full bg-rose-600 text-white font-semibold py-2 rounded-lg text-sm active:bg-rose-700 transition"
                    >
                      Add Entry
                    </button>
                  </div>
                </MobileCard>

                <MobileCard>
                  <h3 className="font-bold mb-3 text-gray-800">
                    Monthly Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <KPIMobile
                      label="Sales"
                      value={`RM ${totals.sales.toFixed(2)}`}
                      color="green"
                    />
                    <KPIMobile
                      label="Expenses"
                      value={`RM ${totals.expenses.toFixed(2)}`}
                      color="red"
                    />
                    <KPIMobile
                      label="Net Income"
                      value={`RM ${totals.net.toFixed(2)}`}
                      color="blue"
                    />
                    <KPIMobile
                      label="Risk Level"
                      value={totals.risk}
                      color={
                        totals.risk === "LOW"
                          ? "green"
                          : totals.risk === "MEDIUM"
                          ? "yellow"
                          : "red"
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Instalment: RM {instalment}
                    </label>
                    <input
                      type="range"
                      min={200}
                      max={1500}
                      value={instalment}
                      onChange={(e) => setInstalment(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-1">
                      <span
                        className={`text-sm font-medium ${
                          totals.surplus >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Surplus: RM {totals.surplus.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <EntriesListMobile
                    entries={entries}
                    setEntries={setEntries}
                  />
                </MobileCard>
              </div>
            )}

            {/* STEP 6: Financial Profile Generation */}
            {stepIdx === 5 && (
              <div className="space-y-4">
                <MobileCard>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{steps[5].icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {steps[5].title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Comprehensive risk assessment report
                    </p>
                  </div>

                  <FinancialProfile
                    name={name}
                    ic={ic}
                    ekyc={ekyc}
                    docs={docs}
                    docsScore={docsScore}
                    decision={decision}
                    ccris={ccris}
                    ctos={ctos}
                    bankrupt={bankrupt}
                    months={months}
                    age={age}
                    totals={totals}
                    entries={entries}
                    instalment={instalment}
                  />
                </MobileCard>
              </div>
            )}

            {/* STEP 7: Scam Checker */}
            {stepIdx === 6 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[6].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[6].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Protect yourself from fraud
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paste suspicious message:
                    </label>
                    <textarea
                      value={sms}
                      onChange={(e) => setSms(e.target.value)}
                      placeholder="Paste suspicious SMS/WhatsApp here..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm h-32 resize-none"
                    />
                  </div>

                  <div
                    className={`rounded-lg p-4 border ${
                      scamFindings.length
                        ? "border-red-300 bg-red-50"
                        : "border-green-300 bg-green-50"
                    }`}
                  >
                    {scamFindings.length ? (
                      <>
                        <div className="font-bold text-red-700 mb-2">
                          ⚠️ Scam Alert!
                        </div>
                        <ul className="space-y-1">
                          {scamFindings.map((f, i) => (
                            <li
                              key={i}
                              className="text-sm text-red-700 flex items-start"
                            >
                              <span className="mr-2">•</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="text-green-700 font-medium">
                        ✅ No obvious red flags detected
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-800">
                      <strong>Remember:</strong> Bank Islam will never ask for
                      your OTP/TAC or request upfront processing fees.
                    </div>
                  </div>
                </div>
              </MobileCard>
            )}

            {/* STEP 8: Graduation */}
            {stepIdx === 7 && (
              <MobileCard>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{steps[7].icon}</div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {steps[7].title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Ready for the next level?
                  </p>
                </div>

                <GraduationMobile totals={totals} months={months} />
              </MobileCard>
            )}
          </>
        )}
      </div>

      {/* Fixed bottom navigation */}
      {activeTopTab === "profile" ? null : (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex justify-between">
            <button
              onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
              disabled={stepIdx === 0}
              className={`px-6 py-2 rounded-lg font-medium ${
                stepIdx === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 active:bg-gray-200"
              }`}
            >
              ← Back
            </button>

            {/* Admin Mode Toggle - Hidden for regular users */}
            <button
              onClick={() => {
                window.location.href = window.location.href + "?admin=true";
              }}
              className="px-3 py-2 text-xs bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition"
              title="Admin Access"
            >
              🏛️
            </button>

            <button
              onClick={() =>
                setStepIdx(Math.min(steps.length - 1, stepIdx + 1))
              }
              disabled={stepIdx === steps.length - 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                stepIdx === steps.length - 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-rose-600 text-white active:bg-rose-700"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatbotMobile() {
  const [q, setQ] = useState("");
  const [a, setA] = useState<string | null>(null);

  const ask = () => {
    const lower = q.toLowerCase();
    let ans =
      "Saya akan cuba bantu. Sila bawa dokumen asas: bank statement 3 bulan, SSM, pelan perniagaan.";
    if (/(dokumen|document)/.test(lower))
      ans =
        "Bawa IC, SSM, 3 bulan bank statement, contoh e‑invois, dan pelan penggunaan pembiayaan.";
    if (/(temu bual|interview|soalan)/.test(lower))
      ans =
        "Soalan lazim: aliran tunai sebulan, kos tetap & berubah, sumber pelanggan, dan bagaimana dana akan digunakan.";
    if (/(e-?invoice|invois)/.test(lower))
      ans =
        "e‑Invois digunakan untuk rekod jualan. Dalam app, pergi ke Pocket CFO > Tambah Invois.";
    if (/(yuran|bayaran|upfront|fee)/.test(lower))
      ans =
        "Hati‑hati. Bank Islam tidak mengenakan yuran proses di hadapan. Elak bayar kepada individu.";
    setA(ans);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask anything... (BM/EN)"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
        <button
          onClick={ask}
          className="px-4 py-2 rounded-lg bg-rose-600 text-white font-medium text-sm active:bg-rose-700 transition"
        >
          Ask
        </button>
      </div>
      {a && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
          {a}
        </div>
      )}
    </div>
  );
}

function GraduationMobile({
  totals,
  months,
}: {
  totals: { net: number };
  months: number;
}) {
  const [onTimePct, setOnTimePct] = useState(90);
  const eligible = totals.net > 0 && onTimePct >= 85 && months >= 12;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <KPIMobile
          label="Monthly Net"
          value={`RM ${totals.net.toFixed(2)}`}
          color="blue"
        />
        <KPIMobile label="Tenure" value={`${months} months`} color="blue" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          On-time Repayment: {onTimePct}%
        </label>
        <input
          type="range"
          min={50}
          max={100}
          value={onTimePct}
          onChange={(e) => setOnTimePct(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div
        className={`rounded-lg p-4 border ${
          eligible
            ? "border-green-300 bg-green-50"
            : "border-amber-300 bg-amber-50"
        }`}
      >
        <div className="font-bold text-lg mb-2">Graduation Assessment</div>
        <div className="space-y-1 text-sm mb-3">
          <div className="flex items-center justify-between">
            <span>Net cashflow positive</span>
            <span
              className={totals.net > 0 ? "text-green-600" : "text-red-600"}
            >
              {totals.net > 0 ? "✓" : "✗"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>On-time repayment ≥ 85%</span>
            <span
              className={onTimePct >= 85 ? "text-green-600" : "text-red-600"}
            >
              {onTimePct >= 85 ? "✓" : "✗"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Business tenure ≥ 12 months</span>
            <span className={months >= 12 ? "text-green-600" : "text-red-600"}>
              {months >= 12 ? "✓" : "✗"}
            </span>
          </div>
        </div>

        <div className="font-bold text-center">
          {eligible ? (
            <span className="text-green-700">🎉 Ready to Graduate! ✅</span>
          ) : (
            <span className="text-amber-700">
              📈 Keep Building Your Track Record
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function KPIMobile({
  label,
  value,
  color = "blue",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-800",
    red: "bg-red-50 border-red-200 text-red-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };

  return (
    <div
      className={`rounded-lg border p-3 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <div className="text-xs opacity-75 mb-1">{label}</div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  );
}

function EntriesListMobile({
  entries,
  setEntries,
}: {
  entries: Array<{ id: number; type: string; label: string; amount: number }>;
  setEntries: React.Dispatch<
    React.SetStateAction<
      Array<{ id: number; type: string; label: string; amount: number }>
    >
  >;
}) {
  if (entries.length === 0) {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
        No entries yet. Add your sales and expenses above.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="font-bold mb-2 text-gray-800">Recent Entries</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {entries.slice(-5).map((e) => (
          <div
            key={e.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    e.type === "sale"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e.type}
                </span>
                <span className="text-xs font-medium truncate">{e.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-bold">
                RM {e.amount.toFixed(2)}
              </span>
              <button
                onClick={() =>
                  setEntries((prev) => prev.filter((x) => x.id !== e.id))
                }
                className="text-red-500 text-xs p-1"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      {entries.length > 5 && (
        <div className="text-xs text-gray-500 text-center mt-2">
          Showing last 5 entries ({entries.length} total)
        </div>
      )}
    </div>
  );
}
