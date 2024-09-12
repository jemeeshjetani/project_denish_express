const validKeys = ["title", "rate"];

function validateRequestBody(req, res, next) {
 const keys = Object.keys(req.body);
 const isValid = keys.every((val) => validKeys.includes(val));

 if (!isValid) {
  return res.status(400).json({
   error: "Invalid keys in request body",
  });
 }
 next();
}

export default validateRequestBody;
