// GET /auth/login
export const showLogin = (req, res) => {
  // If they are already logged in, send them to the dashboard
  if (req.session.user) return res.redirect("/dashboard");
  
  // 1. Grab the error from the session (if there is one)
  const errorMessage = req.session.error || null;
  
  // 2. Clear the error immediately so it doesn't get stuck there forever
  req.session.error = null;
  
  // 3. Pass the error down to the EJS template
  res.render("login", { user: null, error: errorMessage }); 
};

// POST /auth/login
export const loginUser = (req, res) => {
  const { username, password } = req.body;
  
  const VALID_USER = "admin";
  const VALID_PASS = "123";

  // Check 1: Is the username wrong?
  if (username !== VALID_USER) {
    req.session.error = "❌ User does not exist.";
    // We MUST use req.session.save() here to prevent a race condition!
    return req.session.save(() => {
      res.redirect("/auth/login"); 
    });
  }

  // Check 2: Is the password wrong?
  if (password !== VALID_PASS) {
    req.session.error = "❌ Incorrect password.";
    return req.session.save(() => {
      res.redirect("/auth/login"); 
    });
  }

  // Success: Log them in!
  req.session.user = username;
  req.session.save(() => {
    res.redirect("/dashboard");
  });
};

// GET /auth/logout
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};