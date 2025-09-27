import { useCallback, useMemo, useRef, useState } from "react";

// We use the UMD build via CDN worker to avoid bundling worker ourselves
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - worker file is shipped alongside the package
import pdfWorker from "pdfjs-dist/build/pdf.worker?worker";

// Configure worker from the same package version to avoid version mismatch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new pdfWorker();

type LoanData = {
  pendapatanTahunan: number;
  pendapatanMonthly: number;
  tahunPerniagaan: number;
  pinjamanLain: number;
  monthlyRepayment: number;
};

const DEFAULT_DATA: LoanData = {
  pendapatanTahunan: 0,
  pendapatanMonthly: 0,
  tahunPerniagaan: 0,
  pinjamanLain: 0,
  monthlyRepayment: 0,
};

const DSR_THRESHOLD = 60; // %

export default function PdfTranslate() {
  const [activeTab, setActiveTab] = useState<"pdf" | "manual">("pdf");
  const [extracted, setExtracted] = useState<LoanData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [results, setResults] = useState<{
    dsr: number;
    pass: boolean;
    totalCommitments: number;
  } | null>(null);

  const manualFormRef = useRef<HTMLFormElement | null>(null);

  const onDrop = useCallback(async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      setAiSummary(null);
      setResults(null);
      const text = await extractTextFromPDF(file);
      const parsed = await parseExtractedData(text);
      setExtracted(parsed);
    } catch (e) {
      setExtracted(null);
      setError(e instanceof Error ? e.message : "Failed to process PDF");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f && f.type === "application/pdf") {
        await onDrop(f);
      }
    },
    [onDrop]
  );

  const analyze = useCallback(async () => {
    setError(null);
    setLoading(true);
    setAiSummary(null);
    setResults(null);

    try {
      let data: LoanData = extracted || { ...DEFAULT_DATA };

      if (activeTab === "manual" && manualFormRef.current) {
        if (!manualFormRef.current.reportValidity()) {
          throw new Error(
            "Please ensure Monthly Income and Monthly Repayment are valid, non-zero numbers."
          );
        }
        const fd = new FormData(manualFormRef.current);
        data = {
          pendapatanTahunan:
            parseFloat((fd.get("pendapatanTahunan") as string) || "0") || 0,
          pendapatanMonthly:
            parseFloat((fd.get("pendapatanMonthly") as string) || "0") || 0,
          tahunPerniagaan:
            parseInt((fd.get("tahunPerniagaan") as string) || "0") || 0,
          pinjamanLain:
            parseFloat((fd.get("pinjamanLain") as string) || "0") || 0,
          monthlyRepayment:
            parseFloat((fd.get("monthlyRepayment") as string) || "0") || 0,
        };
      }

      if (data.pendapatanTahunan > 0 && data.pendapatanMonthly === 0) {
        data.pendapatanMonthly = data.pendapatanTahunan / 12;
      }

      if (data.pendapatanMonthly <= 0 || data.monthlyRepayment <= 0) {
        throw new Error(
          "Please ensure Monthly Income and Monthly Repayment are valid, non-zero numbers."
        );
      }

      const totalCommitments = data.pinjamanLain + data.monthlyRepayment;
      const dsr = (totalCommitments / data.pendapatanMonthly) * 100;
      const dsrRounded = Math.round(dsr * 100) / 100;
      const pass = dsrRounded < DSR_THRESHOLD;

      const incomeStr = data.pendapatanMonthly.toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const commitmentsStr = totalCommitments.toLocaleString("en-MY", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const prompt = `You are a loan officer analyzing a loan application. Provide a brief professional analysis (2-3 sentences) for this decision:\nAPPLICATION DATA:\n- Monthly Income: RM ${incomeStr}\n- Total Monthly Commitments: RM ${commitmentsStr} (including existing loans of RM ${data.pinjamanLain.toLocaleString(
        "en-MY",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )} and new proposed repayment of RM ${data.monthlyRepayment.toLocaleString(
        "en-MY",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )})\n- DSR Ratio: ${dsrRounded}%\n- Years in Business: ${
        data.tahunPerniagaan || "N/A"
      }\n\nDECISION: ${
        pass ? "APPROVED" : "REJECTED"
      } (DSR threshold: ${DSR_THRESHOLD}%)\n\nExplain the key factors (DSR, income vs. commitment) that led to this decision. Keep it professional and concise.`;

      try {
        const ai = await callOpenAI(prompt);
        setAiSummary(ai);
      } catch (e) {
        // Provide fallback and record diagnostic for developers
        // eslint-disable-next-line no-console
        console.warn("AI Analysis failed, using rule-based summary.", e);
        setAiSummary(
          pass
            ? `Rule-based: DSR ${dsrRounded}% below threshold ${DSR_THRESHOLD}%. Monthly income RM ${incomeStr} sufficiently covers total commitments RM ${commitmentsStr}.`
            : `Rule-based: DSR ${dsrRounded}% exceeds threshold ${DSR_THRESHOLD}%. Total commitments RM ${commitmentsStr} are high relative to monthly income RM ${incomeStr}.`
        );
      }

      setResults({ dsr: dsrRounded, pass, totalCommitments });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  }, [activeTab, extracted]);

  const dropHandlers = useMemo(() => {
    return {
      onDragOver: (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add("border-rose-400", "bg-rose-50");
      },
      onDragLeave: (e: React.DragEvent<HTMLButtonElement>) => {
        e.currentTarget.classList.remove("border-rose-400", "bg-rose-50");
      },
      onDrop: async (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-rose-400", "bg-rose-50");
        const file = e.dataTransfer.files?.[0];
        if (file && file.type === "application/pdf") {
          await onDrop(file);
        }
      },
    };
  }, [onDrop]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "pdf"
              ? "bg-rose-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("pdf")}
        >
          📄 PDF Upload
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "manual"
              ? "bg-rose-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setActiveTab("manual")}
        >
          📝 Manual Entry
        </button>
      </div>

      {activeTab === "pdf" ? (
        <div>
          <button
            type="button"
            className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
            {...dropHandlers}
            onClick={() => document.getElementById("pdfInputHidden")?.click()}
          >
            <div className="text-2xl mb-1">📄</div>
            <div className="font-semibold">Upload Loan Application PDF</div>
            <div className="text-xs text-gray-600">
              Drag & drop your PDF here, or click to browse
            </div>
            <input
              id="pdfInputHidden"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </button>

          {extracted && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded p-3 text-sm">
              <div className="font-semibold mb-2">Extracted Information</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <li>
                  <span className="text-gray-600">Pendapatan Tahunan:</span>{" "}
                  <span className="font-semibold">
                    RM{" "}
                    {extracted.pendapatanTahunan.toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600">Pendapatan Monthly:</span>{" "}
                  <span className="font-semibold">
                    RM{" "}
                    {extracted.pendapatanMonthly.toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600">Tahun Perniagaan:</span>{" "}
                  <span className="font-semibold">
                    {extracted.tahunPerniagaan}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600">Existing Commitments:</span>{" "}
                  <span className="font-semibold">
                    RM{" "}
                    {extracted.pinjamanLain.toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600">Proposed Repayment:</span>{" "}
                  <span className="font-semibold">
                    RM{" "}
                    {extracted.monthlyRepayment.toLocaleString("en-MY", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </li>
              </ul>
              <div className="mt-2 text-xs text-green-700">
                ✅ PDF processed successfully! Click Analyze to proceed.
              </div>
            </div>
          )}
        </div>
      ) : (
        <form
          ref={manualFormRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <TextField
            name="pendapatanTahunan"
            label="Pendapatan Tahunan (RM)"
            type="number"
            step="0.01"
            min={0}
          />
          <TextField
            name="pendapatanMonthly"
            label="Pendapatan Monthly (RM)"
            type="number"
            step="0.01"
            min={0.01}
            required
          />
          <TextField
            name="tahunPerniagaan"
            label="Tahun Dalam Perniagaan"
            type="number"
            min={0}
          />
          <TextField
            name="pinjamanLain"
            label="Pinjaman Lain (RM)"
            type="number"
            step="0.01"
            min={0}
          />
          <TextField
            name="monthlyRepayment"
            label="Monthly Repayment (RM)"
            type="number"
            step="0.01"
            min={0.01}
            required
          />
        </form>
      )}

      <button
        onClick={analyze}
        disabled={loading}
        className={`mt-4 w-full rounded-lg py-2 font-semibold ${
          loading ? "bg-rose-300" : "bg-rose-600 hover:bg-rose-700"
        } text-white`}
      >
        {loading ? "Analyzing..." : "🔍 Analyze Loan Application with AI"}
      </button>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {results && (
        <div className="mt-4 space-y-2">
          <div className="rounded-lg p-3 border bg-gray-50">
            <div className="flex items-center justify-between text-sm py-1 border-b">
              <span className="text-gray-600">Monthly Income</span>
              <span className="font-semibold">
                RM{" "}
                {((extracted?.pendapatanMonthly ?? 0) > 0
                  ? extracted?.pendapatanMonthly ?? 0
                  : 0
                ).toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1 border-b">
              <span className="text-gray-600">Monthly Repayment (total)</span>
              <span className="font-semibold">
                RM{" "}
                {results.totalCommitments.toLocaleString("en-MY", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm py-1">
              <span className="text-gray-600">DSR Ratio</span>
              <span className="font-bold text-rose-600">{results.dsr}%</span>
            </div>
          </div>

          <div
            className={`rounded-lg p-3 text-center font-semibold ${
              results.pass
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {results.pass
              ? `✅ LOAN ELIGIBLE (DSR < ${DSR_THRESHOLD}%)`
              : `❌ LOAN REJECTED (DSR > ${DSR_THRESHOLD}%)`}
          </div>

          {aiSummary && (
            <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 text-sm text-blue-800">
              <div className="font-semibold mb-1">
                🤖 AI Analysis & Recommendation
              </div>
              <div>{aiSummary}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TextField(
  props: Readonly<{
    name: string;
    label: string;
    type?: string;
    step?: string;
    min?: number;
    required?: boolean;
  }>
) {
  const { name, label, type = "text", step, min, required } = props;
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        step={step}
        min={min}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        placeholder="0"
      />
    </div>
  );
}

async function extractTextFromPDF(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ("str" in item ? (item as { str: string }).str : ""))
      .join(" ");
    fullText += pageText + " ";
  }
  return fullText;
}

async function parseExtractedData(text: string): Promise<LoanData> {
  const simple = parseWithPatterns(text);
  if (simple.confidence >= 0.7) return simple.data;
  return await parseWithAI(text);
}

function parseWithPatterns(text: string): {
  data: LoanData;
  confidence: number;
} {
  const patterns: Record<keyof LoanData, RegExp> = {
    pendapatanTahunan:
      /(?:pendapatan\s*tahunan|annual\s*income|yearly\s*income)[\s:]*(?:rm\s*)?([\d,.]+)/i,
    pendapatanMonthly:
      /(?:pendapatan\s*monthly|monthly\s*income|monthly\s*salary)[\s:]*(?:rm\s*)?([\d,.]+)/i,
    tahunPerniagaan:
      /(?:tahun\s*dalam\s*perniagaan|years\s*in\s*business|business\s*years)[\s:]*(\d+)/i,
    pinjamanLain:
      /(?:pinjaman\s*dengan\s*institusi\s*lain|existing\s*loans|other\s*loans)[\s:]*(?:rm\s*)?([\d,.]+)/i,
    monthlyRepayment:
      /(?:monthly\s*repayment|monthly\s*payment|repayment\s*monthly|new\s*loan\s*repayment)[\s:]*(?:rm\s*)?([\d,.]+)/i,
  };

  const data: LoanData = { ...DEFAULT_DATA };
  let found = 0;

  (Object.keys(patterns) as Array<keyof LoanData>).forEach((k) => {
    const m = patterns[k].exec(text);
    if (m) {
      const v = m[1].replace(/,/g, "");
      data[k] = k === "tahunPerniagaan" ? parseInt(v) || 0 : parseFloat(v) || 0;
      if ((data as unknown as Record<string, number>)[k] > 0) found++;
    }
  });

  if (data.pendapatanTahunan && !data.pendapatanMonthly) {
    data.pendapatanMonthly = data.pendapatanTahunan / 12;
  }

  return { data, confidence: found / 5 };
}

async function parseWithAI(text: string): Promise<LoanData> {
  const truncated = text.slice(0, 4000);
  const prompt = `Extract loan data from this PDF text. Return ONLY a JSON object with these keys. If a value is not found or is clearly zero, use 0.\nTEXT: "${truncated}"\n\nFind these values (use 0 if not found):\n- pendapatanTahunan: annual income in RM\n- pendapatanMonthly: monthly income in RM\n- tahunPerniagaan: years in business (integer)\n- pinjamanLain: total existing monthly loan/credit obligations in RM\n- monthlyRepayment: proposed new monthly repayment in RM\n\nReturn only JSON: {"pendapatanTahunan": 0, "pendapatanMonthly": 0, "tahunPerniagaan": 0, "pinjamanLain": 0, "monthlyRepayment": 0};`;
  const raw = await callOpenAI(prompt);
  const clean = raw.replace(/```json|```|\n/g, "").trim();
  try {
    const parsed = JSON.parse(clean);
    const validated: LoanData = {
      pendapatanTahunan: parseFloat(parsed.pendapatanTahunan) || 0,
      pendapatanMonthly: parseFloat(parsed.pendapatanMonthly) || 0,
      tahunPerniagaan: parseInt(parsed.tahunPerniagaan) || 0,
      pinjamanLain: parseFloat(parsed.pinjamanLain) || 0,
      monthlyRepayment: parseFloat(parsed.monthlyRepayment) || 0,
    };
    if (validated.pendapatanTahunan > 0 && validated.pendapatanMonthly === 0) {
      validated.pendapatanMonthly = validated.pendapatanTahunan / 12;
    }
    return validated;
  } catch {
    return { ...DEFAULT_DATA };
  }
}

async function callOpenAI(prompt: string): Promise<string> {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, temperature: 0.1, maxTokens: 300 }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI proxy error: ${txt}`);
  }
  const data = (await res.json()) as { content: string };
  return data.content?.trim?.() || "";
}
