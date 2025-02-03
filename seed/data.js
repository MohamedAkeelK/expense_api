import db from "../db/connection.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import Goal from "../models/Goal.js";
import bcrypt from "bcrypt";

const seedDatabase = async () => {
  try {
    // Clear existing data
    await db.dropDatabase();

    // Users
    const users = await User.insertMany([
      {
        username: "john_doe",
        email: "john@example.com",
        password_digest: await bcrypt.hash("!a$ecureP@ssw0Rd55!", 11),
        profilePicture: "https://via.placeholder.com/150",
        dob: new Date("2025-01-06T00:59:19.117Z"),
        totalMoney: 10000,
      },
      {
        username: "jane_doe",
        email: "jane@example.com",
        password_digest: await bcrypt.hash("!$h0pp3R1", 11),
        profilePicture: "https://via.placeholder.com/150",
        dob: new Date("2025-01-06T00:59:19.117Z"),
        totalMoney: 15000,
      },
      {
        username: "monkey_king",
        email: "monkeyking@example.com",
        password_digest: await bcrypt.hash("monkeyman234", 11),
        profilePicture: "https://via.placeholder.com/150",
        dob: new Date("2025-01-06T00:59:19.117Z"),
        totalMoney: 30000,
      },
    ]);

    console.log("User Data:", users);

    console.log("Users seeded:", users);

    // Expenses
    const expenses = await Expense.insertMany([
      {
        userId: users[0]._id,
        amount: 200,
        categoryTags: ["Groceries"],
        description: "Weekly grocery shopping",
        paymentMethod: "cash",
        isRecurring: false,
        notes: "Bought at local market",
        status: "paid",
      },
      {
        userId: users[1]._id,
        amount: 500,
        categoryTags: ["Rent"],
        description: "Monthly house rent",
        paymentMethod: "credit",
        isRecurring: true,
        recurringPeriod: "monthly",
        notes: "Rent for the apartment",
        status: "paid",
      },
      {
        userId: users[2]._id,
        amount: 1200,
        categoryTags: ["Rent"],
        description: "Monthly house rent",
        paymentMethod: "credit",
        isRecurring: true,
        recurringPeriod: "monthly",
        notes: "Rent for the apartment",
        status: "paid",
      },
    ]);

    console.log("Expenses seeded:", expenses);

    // Incomes
    const incomes = await Income.insertMany([
      {
        userId: users[0]._id,
        amount: 3000,
        source: "Salary",
        description: "Monthly salary",
        paymentMethod: "bank transfer",
        isRecurring: true,
        recurringPeriod: "monthly",
        notes: "Direct deposit from employer",
        status: "recieved",
        nextPaymentDate: new Date("2024-02-01"),
      },
      {
        userId: users[1]._id,
        amount: 100,
        source: "Freelance",
        description: "Project payment",
        paymentMethod: "cash",
        isRecurring: false,
        notes: "Payment for web development project",
        status: "recieved",
      },
      {
        userId: users[2]._id,
        amount: 400,
        source: "Other",
        description: "Project payment",
        paymentMethod: "cash",
        isRecurring: false,
        notes: "Payment for landscaping",
        status: "recieved",
      },
    ]);

    console.log("Incomes seeded:", incomes);

    // Goals
    const goals = await Goal.insertMany([
      {
        userId: users[0]._id,
        title: "Save for Vacation",
        targetAmount: 2000,
        currentProgress: 500,
        deadline: new Date("2026-06-01"),
        category: "Vacation",
      },
      {
        userId: users[1]._id,
        title: "Emergency Fund",
        targetAmount: 5000,
        currentProgress: 1500,
        category: "Emergency Fund",
      },
      {
        userId: users[2]._id,
        title: "Emergency Fund",
        targetAmount: 10000,
        currentProgress: 2000,
        category: "Emergency Fund",
      },
    ]);

    console.log("Goals seeded:", goals);

    console.log("Database seeding completed!");
    process.exit(); // Exit the process once seeding is done
  } catch (error) {
    console.log("Error seeding database:", error);
    process.exit(1); // Exit with an error code
  }
};

// Run the seed function
seedDatabase();
