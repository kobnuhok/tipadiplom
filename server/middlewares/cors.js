function cors(req, res, next) {
  const { origin } = req.headers;

  const allowedCors = ["http://localhost:3005", "http://localhost:3000"];

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); 
  }

  next();
}

module.exports = cors;
