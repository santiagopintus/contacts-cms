const hola = (req, res,next) => {
  console.log("DOCS");
  next();
};

module.exports = hola;
