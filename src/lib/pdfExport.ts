import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { SalesReport } from "@/types";

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: {
    finalY: number;
  };
}

export function exportReportToPDF(
  report: SalesReport,
  filters?: {
    startDate?: string;
    endDate?: string;
    vendorId?: string;
    category?: string;
    status?: string;
  }
) {
  const doc = new jsPDF() as jsPDFWithAutoTable;

  // Set document properties
  doc.setProperties({
    title: "Ventas y Compras Leo Report",
    subject: "Sales and Inventory Report",
    author: "Ventas y Compras Leo",
    keywords: "sales, inventory, report",
    creator: "Ventas y Compras Leo Application",
  });

  let yPosition = 20;

  // Title
  doc.setFontSize(24);
  doc.setTextColor(37, 99, 235); // Blue color
  doc.text("Ventas y Compras Leo Report", 105, yPosition, { align: "center" });

  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(107, 114, 128); // Gray color
  doc.text("Sales and Inventory Analytics", 105, yPosition, {
    align: "center",
  });

  yPosition += 15;

  // Report Date
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPosition);
  yPosition += 5;

  // Applied Filters
  if (filters) {
    const filterText: string[] = [];
    if (filters.startDate) filterText.push(`From: ${filters.startDate}`);
    if (filters.endDate) filterText.push(`To: ${filters.endDate}`);
    if (filters.category) filterText.push(`Category: ${filters.category}`);
    if (filters.status) filterText.push(`Status: ${filters.status}`);

    if (filterText.length > 0) {
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(`Filters: ${filterText.join(" | ")}`, 14, yPosition);
      yPosition += 8;
    }
  }

  // Add separator line
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(14, yPosition, 196, yPosition);
  yPosition += 10;

  // Summary Statistics
  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text("Summary Statistics", 14, yPosition);
  yPosition += 10;

  const summaryData = [
    ["Total Products", report.totalProducts.toString()],
    ["Total Vendors", report.totalVendors.toString()],
    [
      "Total Inventory Value",
      `$${report.totalValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ],
    ["Product Categories", report.productsByCategory.length.toString()],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [["Metric", "Value"]],
    body: summaryData,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 11,
    },
    bodyStyles: {
      fontSize: 10,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
    margin: { left: 14, right: 14 },
  });

  yPosition = (doc as jsPDFWithAutoTable).lastAutoTable?.finalY
    ? (doc as jsPDFWithAutoTable).lastAutoTable!.finalY + 15
    : yPosition;

  // Products by Category
  if (report.productsByCategory.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Products by Category", 14, yPosition);
    yPosition += 10;

    const categoryData = report.productsByCategory.map((item) => [
      item.category,
      item.count.toString(),
      `$${item.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Category", "Product Count", "Total Value"]],
      body: categoryData,
      theme: "striped",
      headStyles: {
        fillColor: [16, 185, 129],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [236, 253, 245],
      },
      margin: { left: 14, right: 14 },
    });

    yPosition = (doc as jsPDFWithAutoTable).lastAutoTable?.finalY
      ? (doc as jsPDFWithAutoTable).lastAutoTable!.finalY + 15
      : yPosition;
  }

  // Products by Vendor
  if (report.productsByVendor.length > 0) {
    // Check if we need a new page
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Products by Vendor", 14, yPosition);
    yPosition += 10;

    const vendorData = report.productsByVendor.map((item) => [
      item.vendorName,
      item.count.toString(),
      `$${item.value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Vendor Name", "Product Count", "Total Value"]],
      body: vendorData,
      theme: "striped",
      headStyles: {
        fillColor: [245, 158, 11],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [254, 243, 199],
      },
      margin: { left: 14, right: 14 },
    });

    yPosition = (doc as jsPDFWithAutoTable).lastAutoTable?.finalY
      ? (doc as jsPDFWithAutoTable).lastAutoTable!.finalY + 15
      : yPosition;
  }

  // Products by Status
  if (report.productsByStatus.length > 0) {
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Products by Status", 14, yPosition);
    yPosition += 10;

    const statusData = report.productsByStatus.map((item) => [
      item.status.toUpperCase().replace("_", " "),
      item.count.toString(),
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Status", "Product Count"]],
      body: statusData,
      theme: "grid",
      headStyles: {
        fillColor: [139, 92, 246],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 11,
      },
      bodyStyles: {
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: [245, 243, 255],
      },
      margin: { left: 14, right: 14 },
    });

    yPosition = (doc as jsPDFWithAutoTable).lastAutoTable?.finalY
      ? (doc as jsPDFWithAutoTable).lastAutoTable!.finalY + 15
      : yPosition;
  }

  // Recent Products
  if (report.recentProducts.length > 0) {
    if (yPosition > 180) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Recent Products", 14, yPosition);
    yPosition += 10;

    const recentProductsData = report.recentProducts.map((product) => [
      product.name,
      product.category,
      product.sku,
      `$${product.price.toFixed(2)}`,
      product.stock.toString(),
      product.status.replace("_", " "),
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Product Name", "Category", "SKU", "Price", "Stock", "Status"]],
      body: recentProductsData,
      theme: "striped",
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [239, 246, 255],
      },
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 32 },
      },
    });
  }

  // Add footer to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
    doc.text(
      "Ventas y Compras Leo - Vendor & Product Management System",
      14,
      doc.internal.pageSize.getHeight() - 10
    );
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `VentasYComprasLeo_Report_${timestamp}.pdf`;

  // Save the PDF
  doc.save(filename);
}
