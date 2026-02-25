import express from "express";
import session from "express-session";
import authRoutes from "./routes/auth.js";

const app = express();

// --- THE FIX IS HERE ---
// 1. Parses data from standard HTML forms (Your EJS pages and x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// 2. NEW: Parses raw JSON data (This is what Postman often uses by default!)
app.use(express.json()); 

// Tell Express where the public folder is (for style.css)
app.use(express.static("public"));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 5 },
  })
);

app.set("view engine", "ejs");

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/auth/login");
};

app.get("/", (req, res) => {
  res.render("homepage", { user: req.session.user || null });
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send({ message: " Hai form server" });
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});