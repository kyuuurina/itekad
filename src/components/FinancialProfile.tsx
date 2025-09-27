
interface FinancialProfileProps {
  name: string;
  ic: string;
  ekyc: string;
  docs: Record<string, boolean>;
  docsScore: number;
  decision: {
    outcome: string;
    reasons: string[];
  };
  ccris: string;
  ctos: string;
  bankrupt: boolean;
  months: number;
  age: number;
  totals: {
    sales: number;
    expenses: number;
    net: number;
    surplus: number;
    risk: string;
  };
  entries: Array<{
    id: number;
    type: string;
    label: string;
    amount: number;
  }>;
  instalment: number;
}

export default function FinancialProfile({
  name,
  ic,
  ekyc,
  docsScore,
  decision,
  ccris,
  ctos,
  bankrupt,
  months,
  age,
  totals,
  entries,
  instalment
}: FinancialProfileProps) {
  const riskScore = () => {
    let score = 600; // Base score
    
    // Positive factors
    if (ekyc === "pass") score += 50;
    if (docsScore >= 4) score += 30;
    if (decision.outcome === "PASS") score += 100;
    if (ccris === "clean") score += 50;
    if (ctos === "clean") score += 30;
    if (months >= 12) score += 40;
    if (totals.net > 1000) score += 60;
    if (totals.risk === "LOW") score += 50;
    
    // Negative factors
    if (bankrupt) score -= 200;
    if (decision.outcome === "FAIL") score -= 150;
    if (ccris === "default") score -= 100;
    if (ctos === "issue") score -= 50;
    if (totals.risk === "HIGH") score -= 80;
    if (age < 21 || age > 55) score -= 30;
    
    return Math.max(300, Math.min(850, score));
  };

  const score = riskScore();
  const scoreCategory = score >= 750 ? "Excellent" : score >= 650 ? "Good" : score >= 550 ? "Fair" : "Poor";
  const scoreColor = score >= 750 ? "text-green-600" : score >= 650 ? "text-blue-600" : score >= 550 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="space-y-4">
      {/* Risk Score */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="text-3xl font-bold mb-2">
          <span className={scoreColor}>{score}</span>
          <span className="text-gray-400 text-lg">/850</span>
        </div>
        <div className={`text-lg font-semibold ${scoreColor}`}>{scoreCategory}</div>
        <div className="text-sm text-gray-600 mt-1">Risk Assessment Score</div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div 
            className={`h-3 rounded-full transition-all ${
              score >= 750 ? "bg-green-500" : 
              score >= 650 ? "bg-blue-500" : 
              score >= 550 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${(score / 850) * 100}%` }}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Identity</div>
          <div className={`text-sm font-semibold ${ekyc === "pass" ? "text-green-600" : "text-red-600"}`}>
            {ekyc === "pass" ? "✓ Verified" : "✗ Failed"}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Documents</div>
          <div className="text-sm font-semibold text-blue-600">{docsScore}/5 Complete</div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Credit</div>
          <div className={`text-sm font-semibold ${
            decision.outcome === "PASS" ? "text-green-600" : 
            decision.outcome === "FLAG" ? "text-yellow-600" : "text-red-600"
          }`}>
            {decision.outcome}
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Cashflow</div>
          <div className={`text-sm font-semibold ${
            totals.risk === "LOW" ? "text-green-600" : 
            totals.risk === "MEDIUM" ? "text-yellow-600" : "text-red-600"
          }`}>
            {totals.risk} Risk
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">Profile Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{name || "Not provided"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">IC Number:</span>
            <span className="font-medium">{ic ? `${ic.slice(0, 6)}******` : "Not provided"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium">{age} years</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Business Tenure:</span>
            <span className="font-medium">{months} months</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">CCRIS Status:</span>
            <span className={`font-medium ${
              ccris === "clean" ? "text-green-600" : 
              ccris === "minor" ? "text-yellow-600" : "text-red-600"
            }`}>
              {ccris.charAt(0).toUpperCase() + ccris.slice(1)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Net Income:</span>
            <span className="font-medium">RM {totals.net.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Instalment:</span>
            <span className="font-medium">RM {instalment.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Surplus:</span>
            <span className={`font-medium ${totals.surplus >= 0 ? "text-green-600" : "text-red-600"}`}>
              RM {totals.surplus.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3">Assessment Factors</h3>
        <div className="space-y-2">
          {decision.reasons.map((reason, index) => (
            <div key={index} className="flex items-start text-sm">
              <span className="mr-2 text-gray-400">•</span>
              <span className="text-gray-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Summary */}
      {entries.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-800 mb-3">Recent Transactions</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {entries.slice(-3).map((entry) => (
              <div key={entry.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    entry.type === "sale" ? "bg-green-500" : "bg-red-500"
                  }`}></span>
                  <span className="text-gray-700 truncate">{entry.label}</span>
                </div>
                <span className="font-medium">RM {entry.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
          {entries.length > 3 && (
            <div className="text-xs text-gray-500 text-center mt-2">
              Showing last 3 of {entries.length} transactions
            </div>
          )}
        </div>
      )}

      <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
        💡 This profile is generated automatically and updates in real-time as you complete each step. 
        It helps loan officers make informed decisions quickly.
      </div>
    </div>
  );
}
