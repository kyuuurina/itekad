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
                  vs last month
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
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button className="flex items-center justify-center p-4 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition">
          <span className="mr-2">📋</span>
          <span className="font-medium text-rose-800">Review Pending</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
          <span className="mr-2">📊</span>
          <span className="font-medium text-blue-800">Generate Report</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition">
          <span className="mr-2">✅</span>
          <span className="font-medium text-green-800">Process Approvals</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition">
          <span className="mr-2">🔍</span>
          <span className="font-medium text-purple-800">Search Profiles</span>
        </button>
      </div>
    </div>
  );

  const RecentActivity = () => {
    const activities = [
      {
        id: 1,
        customer: "Ahmad Bin Hassan",
        action: "Application Approved",
        time: "2 mins ago",
        status: "success",
      },
      {
        id: 2,
        customer: "Siti Nurhaliza",
        action: "Documents Uploaded",
        time: "15 mins ago",
        status: "info",
      },
      {
        id: 3,
        customer: "Muhammad Ali",
        action: "Interview Scheduled",
        time: "1 hour ago",
        status: "warning",
      },
      {
        id: 4,
        customer: "Fatimah Abdullah",
        action: "Application Rejected",
        time: "2 hours ago",
        status: "error",
      },
      {
        id: 5,
        customer: "Hassan Yusof",
        action: "Profile Created",
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
          Recent Activity
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

  // Quick DSR demo state (Bank POV)
  const [dsrKind, setDsrKind] = useState<"pass" | "fail" | null>(null);
  let dsrData: null | {
    income: number;
    other: number;
    repay: number;
    total: number;
    dsr: number;
    status: "PASS" | "FAIL";
    summary: string;
    color: "green" | "red";
  } = null;
  if (dsrKind === "pass") {
    const income = 3000;
    const other = 200;
    const repay = 400;
    const total = other + repay;
    dsrData = {
      income,
      other,
      repay,
      total,
      dsr: Math.round((total / income) * 100),
      status: "PASS",
      summary: "DSR is low — applicant can repay. Proceed.",
      color: "green",
    };
  } else if (dsrKind === "fail") {
    const income = 1500;
    const other = 500;
    const repay = 700;
    const total = other + repay;
    dsrData = {
      income,
      other,
      repay,
      total,
      dsr: Math.round((total / income) * 100),
      status: "FAIL",
      summary: "DSR too high — manual review needed.",
      color: "red",
    };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Bank Islam iTEKAD Program</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Applications"
            value={mockMetrics.total.toLocaleString()}
            color="blue"
          />
          <MetricCard
            title="Successful Applications"
            value={mockMetrics.successful.toLocaleString()}
            percentage={12.5}
            trend="up"
            color="green"
          />
          <MetricCard
            title="Pending Review"
            value={mockMetrics.pending.toLocaleString()}
            percentage={5.2}
            trend="down"
            color="yellow"
          />
          <MetricCard
            title="Rejected Applications"
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
              This Month Performance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Applications</span>
                <span className="font-bold text-blue-600">
                  {mockMetrics.thisMonth.applications}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approvals</span>
                <span className="font-bold text-green-600">
                  {mockMetrics.thisMonth.approvals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approval Rate</span>
                <span className="font-bold text-purple-600">
                  {mockMetrics.thisMonth.approvalRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Application Status Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Approved</span>
                <span className="font-medium">68.7%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Pending</span>
                <span className="font-medium">18.8%</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                <span className="text-sm text-gray-600 flex-1">Rejected</span>
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
              Risk Assessment Overview
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Low Risk (750-850)
                  </span>
                </div>
                <span className="font-medium">342 applications</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Good Risk (650-749)
                  </span>
                </div>
                <span className="font-medium">514 applications</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Fair Risk (550-649)
                  </span>
                </div>
                <span className="font-medium">234 applications</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">
                    Poor Risk (&lt;550)
                  </span>
                </div>
                <span className="font-medium">157 applications</span>
              </div>
            </div>
          </div>

          {/* Bank POV: Quick DSR Demo moved from Journey */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Bank’s View
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                ✔ CCRIS: Clean
              </div>
              <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                ✔ CTOS: No Issues
              </div>
              <div className="bg-green-50 text-green-700 py-2 rounded-lg px-3">
                ✔ Tenure: OK
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">
                🔎 Quick DSR Demo (Bank POV)
              </h4>
              <p className="text-xs text-gray-600 mb-3">
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
                      <div>
                        <div className="text-gray-500">Monthly Income</div>
                        <div className="font-semibold">
                          RM {dsrData.income.toLocaleString("en-MY")}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Existing Loans</div>
                        <div className="font-semibold">
                          RM {dsrData.other.toLocaleString("en-MY")}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Proposed Repayment</div>
                        <div className="font-semibold">
                          RM {dsrData.repay.toLocaleString("en-MY")}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Total Commitments</div>
                        <div className="font-semibold">
                          RM {dsrData.total.toLocaleString("en-MY")}
                        </div>
                      </div>
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
                        {dsrData.status === "PASS" ? "✅ PASS" : "❌ FAIL"}
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
