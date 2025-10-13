export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  sku: string;
  category: string;
  status: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
  vendor?: Vendor;
}

export interface CreateVendorInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  description?: string;
  status?: string;
}

export interface UpdateVendorInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  status?: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  status?: string;
  vendorId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  sku?: string;
  category?: string;
  status?: string;
  vendorId?: string;
}

export interface ReportFilters {
  startDate?: string;
  endDate?: string;
  vendorId?: string;
  category?: string;
  status?: string;
}

export interface SalesReport {
  totalProducts: number;
  totalVendors: number;
  totalValue: number;
  productsByCategory: { category: string; count: number; value: number }[];
  productsByVendor: { vendorName: string; count: number; value: number }[];
  productsByStatus: { status: string; count: number }[];
  recentProducts: Product[];
}
