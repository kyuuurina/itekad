import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";

type AdminView = "dashboard" | "customers" | "customer-detail";

const AdminApp = () => {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard");
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  const handleSelectCustomer = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setCurrentView("customer-detail");
  };

  const handleBackToCustomers = () => {
    setSelectedCustomerId(null);
    setCurrentView("customers");
  };

  // Removed unused handleBackToDashboard function

  // Mobile Navigation Component
  const MobileNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setCurrentView("dashboard")}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
            currentView === "dashboard"
              ? "bg-rose-100 text-rose-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg mb-1">📊</span>
          <span className="text-xs font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentView("customers")}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
            currentView === "customers" || currentView === "customer-detail"
              ? "bg-rose-100 text-rose-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <span className="text-lg mb-1">👥</span>
          <span className="text-xs font-medium">Customers</span>
        </button>

        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.delete("admin");
            window.location.href = url.pathname;
          }}
          className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          <span className="text-lg mb-1">📱</span>
          <span className="text-xs font-medium">App View</span>
        </button>
      </div>
    </div>
  );

  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🏛️</div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Bank Islam</h1>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-4 space-y-2">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`group w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                currentView === "dashboard"
                  ? "bg-rose-100 text-rose-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3 text-lg">📊</span>
              Dashboard
            </button>

            <button
              onClick={() => setCurrentView("customers")}
              className={`group w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition ${
                currentView === "customers" || currentView === "customer-detail"
                  ? "bg-rose-100 text-rose-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3 text-lg">👥</span>
              Customer Profiles
            </button>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete("admin");
                  window.location.href = url.pathname;
                }}
                className="group w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="mr-3 text-lg">📱</span>
                Switch to App View
              </button>
            </div>
          </nav>

          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-rose-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@bankislam.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar />
      <MobileNav />

      {/* Main Content Area */}
      <div className="md:pl-64 pb-16 md:pb-0">
        {currentView === "dashboard" && <AdminDashboard />}

        {currentView === "customers" && (
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        )}

        {currentView === "customer-detail" && selectedCustomerId && (
          <CustomerDetail
            customerId={selectedCustomerId}
            onBack={handleBackToCustomers}
          />
        )}
      </div>
    </div>
  );
};

export default AdminApp;
