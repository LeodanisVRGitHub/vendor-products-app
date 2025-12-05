import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "@/lib/prismaErrorHandler";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vendorId = searchParams.get("vendorId");
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Prisma.ProductWhereInput = {};

    if (vendorId) {
      where.vendorId = vendorId;
    }

    if (category) {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { sku: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        vendor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return handlePrismaError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      stock,
      sku,
      category,
      status,
      image,
      vendorId,
    } = body;

    if (!name || !price || !sku || !category || !vendorId) {
      return NextResponse.json(
        { error: "Name, price, SKU, category, and vendorId are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        sku,
        category,
        status: status || "available",
        image: image || null,
        vendorId,
      },
      include: {
        vendor: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
}
