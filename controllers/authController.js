// GET /auth/login
export const showLogin = (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  
  // 1. Check for Session Errors (Wrong password/username)
  const errorMessage = req.session.error || null;
  req.session.error = null;
  
  // 2. Check for Logout Success (Looking at the URL for ?logout=true)
  let successMessage = null;
  if (req.query.logout === "true") {
    successMessage = "👋 Come back soon! You have been securely logged out.";
  }
  
  // 3. Pass both to the EJS template
  res.render("login", { user: null, error: errorMessage, success: successMessage }); 
};

// POST /auth/login
export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const VALID_USER = "admin";
  const VALID_PASS = "12345";

  if (username !== VALID_USER) {
    req.session.error = "❌ User does not exist.";
    return req.session.save(() => res.redirect("/auth/login"));
  }

  if (password !== VALID_PASS) {
    req.session.error = "❌ Incorrect password.";
    return req.session.save(() => res.redirect("/auth/login"));
  }

  req.session.user = username;
  req.session.save(() => res.redirect("/dashboard"));
};

// GET /auth/logout
export const logoutUser = (req, res) => {
  // Destroy the session entirely
  req.session.destroy(() => {
    // Redirect to login, but add a query string to the URL!
    res.redirect("/auth/login?logout=true");
  });
};