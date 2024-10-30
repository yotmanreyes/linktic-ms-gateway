const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(morgan("combined")); // Log HTTP requests

// Proxy all routes to the Laravel eCommerce microservice
app.use(
  "/api",
  createProxyMiddleware({ target: "http://localhost:8000", changeOrigin: true })
);

// Health check endpoint
app.get("/api-status", (req, res) => {
  res.status(200).json({ status: "UP" });
});

app.use(
  "/",
  createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true })
);

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
