import express from "express";
import session from "express-session";
// import authRoutes from ""

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

// session config
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 5 },
  }),
);

app.set("view engine", "ejs");





app.use("/health",(req,res)=>{
    res.send({message: " Hai from server" });
});

app.listen(3000, ()=>{
    console.log("✅ Server running on port 3000");
});
