import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimitter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);
app.use(express.json());

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("DB initialized successfully");
    } catch (error) {
        console.log("Error initializing DB", error);
        process.exit(1);
    }
}

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/api/transactions/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
      `;
        console.log("Transactions fetched successfully", transactions);
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error getting the transactions", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/api/transactions", async (req, res) => {
    try {
        const { title, amount, category, user_id } = req.body;
        if (!title || !user_id || !category || !amount === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;

        console.log("Transaction created successfully", transaction);
        res.status(201).json(transaction[0]);

    } catch (error) {
        console.log("Error creating the transaction", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (NaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const transaction = await sql`
        DELETE FROM transactions WHERE id = ${id}
        RETURNING *
        `;

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        console.log("Error Deleting Transaction", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/api/transactions/summary/:userId", async (req, res) => {
    try {
    const { userId } = req.params;

    const balanceResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as income FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `;

    const expensesResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
      WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expenses: expensesResult[0].expenses,
    });
    } catch (error) {
        console.log("Error getting the transactions summary", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})