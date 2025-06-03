const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/foods", require("./routes/food.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/restaurants", require("./routes/restaurant.routes"));
app.use("/api/reviews", require("./routes/review.routes"));

// Run server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});