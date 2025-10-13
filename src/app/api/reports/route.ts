import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const vendorId = searchParams.get("vendorId");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const where: Prisma.ProductWhereInput = {};

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (vendorId) {
      where.vendorId = vendorId;
    }

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    // Get all products with filters
    const products = await prisma.product.findMany({
      where,
      include: {
        vendor: true,
      },
    });

    // Get all vendors
    const vendors = await prisma.vendor.findMany({
      include: {
        products: {
          where,
        },
      },
    });

    // Calculate statistics
    const totalProducts = products.length;
    const totalVendors = vendors.filter((v) => v.products.length > 0).length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

    // Products by category
    const categoryMap = new Map<string, { count: number; value: number }>();
    products.forEach((p) => {
      const existing = categoryMap.get(p.category) || { count: 0, value: 0 };
      categoryMap.set(p.category, {
        count: existing.count + 1,
        value: existing.value + p.price * p.stock,
      });
    });
    const productsByCategory = Array.from(categoryMap.entries()).map(
      ([category, data]) => ({
        category,
        ...data,
      })
    );

    // Products by vendor
    const vendorMap = new Map<
      string,
      { vendorName: string; count: number; value: number }
    >();
    products.forEach((p) => {
      const existing = vendorMap.get(p.vendorId) || {
        vendorName: p.vendor?.name || "Unknown",
        count: 0,
        value: 0,
      };
      vendorMap.set(p.vendorId, {
        vendorName: p.vendor?.name || "Unknown",
        count: existing.count + 1,
        value: existing.value + p.price * p.stock,
      });
    });
    const productsByVendor = Array.from(vendorMap.values());

    // Products by status
    const statusMap = new Map<string, number>();
    products.forEach((p) => {
      statusMap.set(p.status, (statusMap.get(p.status) || 0) + 1);
    });
    const productsByStatus = Array.from(statusMap.entries()).map(
      ([status, count]) => ({
        status,
        count,
      })
    );

    // Recent products (last 10)
    const recentProducts = products
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 10);

    const report = {
      totalProducts,
      totalVendors,
      totalValue,
      productsByCategory,
      productsByVendor,
      productsByStatus,
      recentProducts,
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
