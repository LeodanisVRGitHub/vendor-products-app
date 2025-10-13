import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create vendors
  const vendor1 = await prisma.vendor.create({
    data: {
      name: "Tech Supplies Inc",
      email: "contact@techsupplies.com",
      phone: "+1-234-567-8900",
      address: "123 Tech Street, Silicon Valley, CA 94025",
      description: "Leading supplier of technology products and electronics",
      status: "active",
    },
  });

  const vendor2 = await prisma.vendor.create({
    data: {
      name: "Office Essentials Ltd",
      email: "sales@officeessentials.com",
      phone: "+1-234-567-8901",
      address: "456 Business Ave, New York, NY 10001",
      description: "Your trusted partner for office supplies and furniture",
      status: "active",
    },
  });

  const vendor3 = await prisma.vendor.create({
    data: {
      name: "Eco Products Co",
      email: "info@ecoproducts.com",
      phone: "+1-234-567-8902",
      address: "789 Green Road, Portland, OR 97201",
      description: "Sustainable and eco-friendly products",
      status: "active",
    },
  });

  console.log("✅ Created 3 vendors");

  // Create products for vendor1 (Tech Supplies Inc)
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Pro 15"',
        description: "High-performance laptop with 16GB RAM and 512GB SSD",
        price: 1299.99,
        stock: 45,
        sku: "TECH-LAP-001",
        category: "Electronics",
        status: "available",
        vendorId: vendor1.id,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 29.99,
        stock: 200,
        sku: "TECH-MOU-001",
        category: "Accessories",
        status: "available",
        vendorId: vendor1.id,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB backlit mechanical keyboard with blue switches",
        price: 89.99,
        stock: 120,
        sku: "TECH-KEY-001",
        category: "Accessories",
        status: "available",
        vendorId: vendor1.id,
      },
      {
        name: '27" 4K Monitor',
        description: "Ultra HD monitor with HDR support",
        price: 449.99,
        stock: 30,
        sku: "TECH-MON-001",
        category: "Electronics",
        status: "available",
        vendorId: vendor1.id,
      },
      {
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with multiple ports",
        price: 49.99,
        stock: 0,
        sku: "TECH-HUB-001",
        category: "Accessories",
        status: "out_of_stock",
        vendorId: vendor1.id,
      },
    ],
  });

  // Create products for vendor2 (Office Essentials Ltd)
  await prisma.product.createMany({
    data: [
      {
        name: "Executive Office Chair",
        description: "Ergonomic leather office chair with lumbar support",
        price: 299.99,
        stock: 25,
        sku: "OFF-CHR-001",
        category: "Furniture",
        status: "available",
        vendorId: vendor2.id,
      },
      {
        name: "Standing Desk",
        description: "Adjustable height standing desk with memory settings",
        price: 599.99,
        stock: 15,
        sku: "OFF-DSK-001",
        category: "Furniture",
        status: "available",
        vendorId: vendor2.id,
      },
      {
        name: "Paper Shredder",
        description: "Cross-cut paper shredder for sensitive documents",
        price: 79.99,
        stock: 40,
        sku: "OFF-SHR-001",
        category: "Office Equipment",
        status: "available",
        vendorId: vendor2.id,
      },
      {
        name: "Whiteboard Set",
        description: "Magnetic whiteboard with markers and eraser",
        price: 129.99,
        stock: 8,
        sku: "OFF-WHT-001",
        category: "Office Supplies",
        status: "available",
        vendorId: vendor2.id,
      },
      {
        name: "Filing Cabinet",
        description: "4-drawer metal filing cabinet with lock",
        price: 189.99,
        stock: 12,
        sku: "OFF-FIL-001",
        category: "Furniture",
        status: "available",
        vendorId: vendor2.id,
      },
    ],
  });

  // Create products for vendor3 (Eco Products Co)
  await prisma.product.createMany({
    data: [
      {
        name: "Bamboo Notebook Set",
        description: "Eco-friendly notebooks made from bamboo paper",
        price: 19.99,
        stock: 150,
        sku: "ECO-NOT-001",
        category: "Stationery",
        status: "available",
        vendorId: vendor3.id,
      },
      {
        name: "Reusable Water Bottle",
        description: "Stainless steel insulated water bottle",
        price: 24.99,
        stock: 200,
        sku: "ECO-BOT-001",
        category: "Drinkware",
        status: "available",
        vendorId: vendor3.id,
      },
      {
        name: "Recycled Pen Set",
        description: "Set of 10 pens made from recycled materials",
        price: 12.99,
        stock: 300,
        sku: "ECO-PEN-001",
        category: "Stationery",
        status: "available",
        vendorId: vendor3.id,
      },
      {
        name: "Organic Cotton Tote Bag",
        description: "Reusable tote bag made from organic cotton",
        price: 14.99,
        stock: 100,
        sku: "ECO-BAG-001",
        category: "Bags",
        status: "available",
        vendorId: vendor3.id,
      },
      {
        name: "Solar-Powered Calculator",
        description: "Scientific calculator powered by solar energy",
        price: 18.99,
        stock: 0,
        sku: "ECO-CAL-001",
        category: "Electronics",
        status: "discontinued",
        vendorId: vendor3.id,
      },
    ],
  });

  console.log("✅ Created 15 products");

  // Get counts
  const vendorCount = await prisma.vendor.count();
  const productCount = await prisma.product.count();

  console.log("\n📊 Database seeded successfully!");
  console.log(`   • ${vendorCount} vendors`);
  console.log(`   • ${productCount} products\n`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
