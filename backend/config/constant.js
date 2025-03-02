exports.allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

exports.originOption = (origin, callback) => {
  if (!origin || this.allowedOrigins.includes(origin) || origin === "null")
    callback(null, true);
  else callback(new Error("Not allowed by CORS"));
};
