const hola = (req, res, next) => {
  console.log("MESSAGES");
  next();
};

module.exports = hola;
