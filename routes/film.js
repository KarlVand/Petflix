app.get("/users", (req, res) => {
  // Assuming you have a function to query your database
  database.getUsers((err, users) => {
    if (err) {
      // Handle error
    } else {
      res.render("users", { users: users });
    }
  });
});
