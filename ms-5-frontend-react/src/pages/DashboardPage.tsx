import { useEffect, useState } from "react";

import SummaryCard from "../components/dashboard/SummaryCard";

import type { DashboardSummary } from "../types/dashboard";

import { getDashboardSummary } from "../services/dashboardService";
import { extractErrorMessage } from "../utils/errorUtils";

function DashboardPage() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    try {
      setLoading(true);

      const data =
        await getDashboardSummary();

      setSummary(data);
    } catch (error) {
      console.error(
        "Failed to load dashboard summary:",
        error
      );

      alert(
        extractErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="alert alert-info shadow-sm">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning shadow-sm">
          No dashboard data available.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="page-header">
        <h1 className="mb-2">
          Dashboard
        </h1>
        <p className="mb-0">
          Real-time overview of your
          order management system.
        </p>
      </div>

      <div className="row">
        <SummaryCard
          title="Products"
          value={summary.totalProducts}
          icon="📦"
          color="primary"
        />

        <SummaryCard
          title="Inventory Records"
          value={summary.totalInventory}
          icon="🏬"
          color="success"
        />

        <SummaryCard
          title="Orders"
          value={summary.totalOrders}
          icon="🧾"
          color="info"
        />

        <SummaryCard
          title="Low Stock Alerts"
          value={summary.lowStockCount}
          icon="⚠️"
          color="danger"
        />
      </div>
    </div>
  );
}

export default DashboardPage;