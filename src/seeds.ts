import { AppDataSource } from "./config/data-source";
import { User } from "./entities/user";
import { Product } from "./entities/product";
import { Order } from "./entities/order";
import { OrderItem } from "./entities/orderItem";
import { UserRole } from "./types/userRole";
import bcrypt from "bcrypt";
import { OrderStatus } from "./types/orderStatus";

const seed = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Connected to DB for seeding...");

    const userRepo = AppDataSource.getRepository(User);
    const productRepo = AppDataSource.getRepository(Product);
    const orderRepo = AppDataSource.getRepository(Order);
    const orderItemRepo = AppDataSource.getRepository(OrderItem);

    // Remove existing data safely (in order: child → parent)
    const existingItems = await orderItemRepo.find();
    await orderItemRepo.remove(existingItems);

    const existingOrders = await orderRepo.find();
    await orderRepo.remove(existingOrders);

    const existingProducts = await productRepo.find();
    await productRepo.remove(existingProducts);

    const existingUsers = await userRepo.find();
    await userRepo.remove(existingUsers);

    // Hash passwords
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    // Create users
    const admin = userRepo.create({
      name: "Admin",
      email: "admin@avila.com",
      password: adminPassword,
      role: UserRole.ADMIN,
    });

    const user = userRepo.create({
      name: "Normal User",
      email: "user@avila.com",
      password: userPassword,
      role: UserRole.USER,
    });

    await userRepo.save([admin, user]);

    // Create products
    const productsData = [
      {
        name: "Laptop",
        description: "Powerful laptop",
        price: 1200,
        stock: 10,
      },
      { name: "Mouse", description: "Wireless mouse", price: 25, stock: 100 },
      {
        name: "Keyboard",
        description: "Mechanical keyboard",
        price: 80,
        stock: 50,
      },
      { name: "Monitor", description: "4K monitor", price: 300, stock: 20 },
      { name: "USB Cable", description: "Type-C cable", price: 10, stock: 200 },
    ];

    const products = productRepo.create(productsData);
    await productRepo.save(products);

    // Create orders
    const order1 = orderRepo.create({
      user,
      status: OrderStatus.COMPLETED,
      items: [
        {
          product: products[0], // Laptop
          quantity: 1,
          priceAtPurchase: products[0].price,
        },
        {
          product: products[1], // Mouse
          quantity: 2,
          priceAtPurchase: products[1].price,
        },
      ],
    });

    const order2 = orderRepo.create({
      user,
      status: OrderStatus.PENDING,
      items: [
        {
          product: products[2], // Keyboard
          quantity: 1,
          priceAtPurchase: products[2].price,
        },
        {
          product: products[4], // USB Cable
          quantity: 3,
          priceAtPurchase: products[4].price,
        },
      ],
    });

    await orderRepo.save([order1, order2]);

    console.log("✅ Seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seed();
