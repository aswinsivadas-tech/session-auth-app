export const showLogin = (req, res) => {
  if (req.session.user) return res.redirect("/dashboard");
  res.render("login", { user: null });
};
export const loginUser = (req, res) => {
  // 1. get the data from the form
  const { username, password } = req.body;

  // debuggin: show up in vs code terminal
  console.log("login attempt:", { username, password });

  //2. define only valid credentials
  const VALID_USER = "admin";
  const VALID_PASS = "123";

  // 3. strict check
  if (username === VALID_USER && password === VALID_PASS) {
    console.log("✅ Login Success");
    req.session.user = username;
    res.redirect("/dashboard");
  } else {
    console.log("❌ Login Failed");
    // redirect back to login if details are wrong
    res.redirect("/auth/login");
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
