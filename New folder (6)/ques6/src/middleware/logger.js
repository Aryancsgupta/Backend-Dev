const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  console.log(`[${timestamp}] ${method} ${path}`);

  const originalSend = res.send;
  res.send = function (data) {
    console.log(`[${timestamp}] Response: ${res.statusCode}`);
    return originalSend.call(this, data);
  };

  next();
};

module.exports = logger;
