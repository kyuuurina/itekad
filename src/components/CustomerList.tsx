import { useState } from "react";

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "Ahmad Bin Hassan",
    ic: "850312*****",
    business: "Nasi Lemak Stall",
    applicationDate: "2024-01-15",
    status: "approved",
    riskScore: 752,
    monthlyIncome: 3500,
    location: "Kuala Lumpur",
    phone: "012-345****",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    ic: "920508*****",
    business: "Online Bakery",
    applicationDate: "2024-01-12",
    status: "rejected",
    riskScore: 580,
    monthlyIncome: 1500,
    location: "Selangor",
    phone: "019-876****",
  },
  {
    id: 3,
    name: "Muhammad Ali",
    ic: "880720*****",
    business: "Car Wash Service",
    applicationDate: "2024-01-10",
    status: "approved",
    riskScore: 725,
    monthlyIncome: 4200,
    location: "Johor",
    phone: "017-234****",
  },
  {
    id: 4,
    name: "Fatimah Abdullah",
    ic: "910403*****",
    business: "Tailoring Shop",
    applicationDate: "2024-01-08",
    status: "rejected",
    riskScore: 485,
    monthlyIncome: 1500,
    location: "Penang",
    phone: "012-567****",
  },
  {
    id: 5,
    name: "Hassan Yusof",
    ic: "870614*****",
    business: "Motorcycle Repair",
    applicationDate: "2024-01-05",
    status: "approved",
    riskScore: 698,
    monthlyIncome: 3200,
    location: "Perak",
    phone: "013-890****",
  },
  {
    id: 6,
    name: "Aminah Ismail",
    ic: "900925*****",
    business: "Handicraft Store",
    applicationDate: "2024-01-03",
    status: "pending",
    riskScore: 620,
    monthlyIncome: 2100,
    location: "Kelantan",
    phone: "019-123****",
  },
];

interface CustomerListProps {
  onSelectCustomer: (customerId: number) => void;
}

const CustomerList = ({ onSelectCustomer }: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 650) return "text-blue-600";
    if (score >= 550) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredCustomers = mockCustomers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.ic.includes(searchTerm);
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "risk":
          return b.riskScore - a.riskScore;
        case "income":
          return b.monthlyIncome - a.monthlyIncome;
        default:
          return (
            new Date(b.applicationDate).getTime() -
            new Date(a.applicationDate).getTime()
          );
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Customer Financial Profiles
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredCustomers.length} customers found
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name, business, or IC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-500"
              >
                <option value="date">Application Date</option>
                <option value="name">Name</option>
                <option value="risk">Risk Score</option>
                <option value="income">Monthly Income</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customer Cards - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer.id)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-600">{customer.business}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status.charAt(0).toUpperCase() +
                    customer.status.slice(1)}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Risk Score</p>
                  <p
                    className={`text-lg font-bold ${getRiskScoreColor(
                      customer.riskScore
                    )}`}
                  >
                    {customer.riskScore}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Monthly Income</p>
                  <p className="text-lg font-bold text-gray-800">
                    RM {customer.monthlyIncome.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">IC Number:</span>
                  <span className="font-medium">{customer.ic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{customer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Applied:</span>
                  <span className="font-medium">
                    {new Date(customer.applicationDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">{customer.phone}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-rose-50 text-rose-700 font-medium py-2 rounded-lg hover:bg-rose-100 transition text-sm">
                  View Full Profile →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No customers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
