import express from "express";
import pg from "pg"; 
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const { Pool } = pg; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const pool = new Pool
({
    user: "postgres",        
    host: "localhost",        
    database: "finance",      
    password: "basketball3",  
    port: 5432,               
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));

app.get("/signup", (req, res) => res.render("signup"));
app.post("/signup", async (req, res) => 
{
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }
    try {
        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: "Username already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ error: "Error during signup." });
    }
});

app.get("/signin", (req, res) => res.render("signin"));
app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ error: "Invalid username or password." });
        }
        const user = userResult.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid username or password." });
        }
        res.status(200).json({ message: "Login successful.", userId: user.user_id });
    } catch (err) {
        console.error("Error during signin:", err);
        res.status(500).json({ error: "Error during signin." });
    }
});

app.get("/home/:user_id", async (req, res) =>
 {
    const { user_id } = req.params;
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        if (userResult.rows.length === 0) {
            return res.status(404).send("User not found.");
        }
        const user = userResult.rows[0];
        res.render("home", { user });
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send("Error fetching user.");
    }
});

app.get("/balance/:user_id", async (req, res) => 
{
    const { user_id } = req.params;
    try {
        const balanceResult = await pool.query(
            "SELECT balance, account_number FROM accounts WHERE user_id = $1",
            [user_id]
        );
        if (balanceResult.rows.length === 0) {
            return res.status(404).send("Account not found.");
        }
        const account = balanceResult.rows[0];
        res.render("account_balance", { balance: account.balance, accountNumber: account.account_number });
    } catch (err) {
        console.error("Error fetching balance:", err);
        res.status(500).send("Error fetching balance.");
    }
});

app.get("/transactions/:user_id", async (req, res) => 
{
    const { user_id } = req.params;
    try {
        const transactions = await pool.query(
            "SELECT * FROM transactions WHERE user_id = $1 ORDER BY transaction_date DESC",
            [user_id]
        );
        res.render("transactions", { transactions: transactions.rows });
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).send("Error fetching transactions.");
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));