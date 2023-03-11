const hola = (req, res, next) => {
  console.log("CONTACTS");
  next();
}

module.exports = hola;