"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Store, Package, DollarSign, TrendingUp, FileDown } from "lucide-react";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import type { SalesReport, Vendor } from "@/types";
import { exportReportToPDF } from "@/lib/pdfExport";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [report, setReport] = useState<SalesReport | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    vendorId: "",
    category: "",
    status: "",
  });

  useEffect(() => {
    fetchVendors();
    fetchReport();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`/api/reports?${params}`);
      const data = await res.json();
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    fetchReport();
  };

  const handleExportPDF = () => {
    if (report) {
      exportReportToPDF(report, filters);
    }
  };

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("dashboard.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("dashboard.subtitle")}
          </p>
        </div>
        {report && (
          <Button onClick={handleExportPDF} variant="success">
            <FileDown size={20} className="mr-2" />
            {t("dashboard.exportPDF")}
          </Button>
        )}
      </motion.div>

      {/* Filters */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("dashboard.filters")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Input
            type="date"
            label={t("dashboard.startDate")}
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
          <Input
            type="date"
            label={t("dashboard.endDate")}
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
          <Select
            label={t("dashboard.vendor")}
            value={filters.vendorId}
            onChange={(e) => handleFilterChange("vendorId", e.target.value)}
            options={[
              { value: "", label: t("dashboard.allVendors") },
              ...vendors.map((v) => ({ value: v.id, label: v.name })),
            ]}
          />
          <Input
            type="text"
            label={t("dashboard.category")}
            placeholder={t("dashboard.filterByCategory")}
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          />
          <Select
            label={t("dashboard.status")}
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            options={[
              { value: "", label: t("dashboard.allStatus") },
              { value: "available", label: t("dashboard.available") },
              { value: "out_of_stock", label: t("dashboard.outOfStock") },
              { value: "discontinued", label: t("dashboard.discontinued") },
            ]}
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleApplyFilters}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {t("dashboard.applyFilters")}
          </button>
          {report && (
            <button
              onClick={handleExportPDF}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <FileDown size={18} />
              {t("dashboard.exportPDF")}
            </button>
          )}
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : report ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("dashboard.totalProducts")}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {report.totalProducts}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Package
                      className="text-blue-600 dark:text-blue-300"
                      size={24}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("dashboard.totalVendors")}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {report.totalVendors}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Store
                      className="text-green-600 dark:text-green-300"
                      size={24}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("dashboard.inventoryValue")}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${report.totalValue.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <DollarSign
                      className="text-yellow-600 dark:text-yellow-300"
                      size={24}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}>
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t("dashboard.categories")}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {report.productsByCategory.length}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <TrendingUp
                      className="text-purple-600 dark:text-purple-300"
                      size={24}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("dashboard.productsByCategory")}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={report.productsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="#3B82F6"
                    name={t("dashboard.products")}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t("dashboard.productsByStatus")}
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={report.productsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.status}: ${entry.count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count">
                    {report.productsByStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Products by Vendor */}
          <Card className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("dashboard.productsByVendor")}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={report.productsByVendor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendorName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#10B981"
                  name={t("dashboard.products")}
                />
                <Bar
                  dataKey="value"
                  fill="#F59E0B"
                  name={`${t("dashboard.value")} ($)`}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Products */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("dashboard.recentProducts")}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("dashboard.name")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("dashboard.category")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("dashboard.price")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("dashboard.stock")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t("dashboard.status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {report.recentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            product.status === "available"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }
                          ${
                            product.status === "out_of_stock"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : ""
                          }
                          ${
                            product.status === "discontinued"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                              : ""
                          }
                        `}>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400 py-12">
          {t("common.noData")}
        </div>
      )}
    </div>
  );
}
