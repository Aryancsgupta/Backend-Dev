import fs from "fs";

let logfun = (req, res, next) => {
  let logText = `timestamp:${new Date().toISOString()} URL:${req.url} Method:${req.method}\n`;
  fs.appendFileSync("./log.txt", logText);
  next();
};

const userValidation = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "username and password require",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "password strength is weak",
    });
  }

  next();
};



const authMiddleware = (req, res, next) => {
  const { token } = req.query;

  if (token !== "admin123") {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  next();
};

export { logfun, userValidation, authMiddleware };
