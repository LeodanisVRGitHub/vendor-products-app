"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Mail, Phone, MapPin, Search } from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Vendor } from "@/types";

export default function VendorsPage() {
  const { t } = useLanguage();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    fetchVendors();
  }, [statusFilter]);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (searchTerm) params.append("search", searchTerm);

      const res = await fetch(`/api/vendors?${params}`);
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchVendors();
  };

  const handleOpenModal = (vendor?: Vendor) => {
    if (vendor) {
      setEditingVendor(vendor);
      setFormData({
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone || "",
        address: vendor.address || "",
        description: vendor.description || "",
        status: vendor.status,
      });
    } else {
      setEditingVendor(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
        status: "active",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingVendor
        ? `/api/vendors/${editingVendor.id}`
        : "/api/vendors";
      const method = editingVendor ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        handleCloseModal();
        fetchVendors();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save vendor");
      }
    } catch (error) {
      console.error("Error saving vendor:", error);
      alert("Failed to save vendor");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("vendors.deleteConfirm"))) return;

    try {
      const res = await fetch(`/api/vendors/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchVendors();
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t("vendors.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("vendors.subtitle")}
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" />
          {t("vendors.addVendor")}
        </Button>
      </motion.div>

      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t("vendors.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search size={20} />
            </Button>
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "", label: t("vendors.allStatus") },
              { value: "active", label: t("vendors.active") },
              { value: "inactive", label: t("vendors.inactive") },
            ]}
          />
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {vendor.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}>
                      {vendor.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(vendor)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(vendor.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="mr-2" />
                    <span>{vendor.email}</span>
                  </div>
                  {vendor.phone && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Phone size={16} className="mr-2" />
                      <span>{vendor.phone}</span>
                    </div>
                  )}
                  {vendor.address && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      <span>{vendor.address}</span>
                    </div>
                  )}
                </div>

                {vendor.description && (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {vendor.description}
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("vendors.products")}:{" "}
                    <span className="font-semibold">
                      {vendor.products?.length || 0}
                    </span>
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingVendor ? t("vendors.editVendor") : t("vendors.addVendor")}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={`${t("vendors.name")} *`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label={`${t("vendors.email")} *`}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <Input
            label={t("vendors.phone")}
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <Input
            label={t("vendors.address")}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("vendors.description")}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <Select
            label={t("vendors.status")}
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            options={[
              { value: "active", label: t("vendors.active") },
              { value: "inactive", label: t("vendors.inactive") },
            ]}
          />
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{editingVendor ? t("common.update") : t("common.create")}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
