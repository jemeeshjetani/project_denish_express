const validKeys = ["title", "rate"];
const validKeys1 = ["search", "minbPrice", "maxPrice", "page", "limit"];

//for PUT
export function validatePutRequestBody(req, res, next) {
 const keys = Object.keys(req.body); //get array of all keys in req.body object
 const isValid = keys.every((val) => validKeys.includes(val));

 if (!isValid) {
  return res.status(400).json({
   error: "Invalid keys in request body",
  });
 }
 next();
}

//for POST- get all books
export function validateGetAllReqBody(req, res, next) {
 const keys = Object.keys(req.body);
 const isValid = keys.every((val) => validKeys1.includes(val));

 if (!isValid) {
  return res.status(400).json({
   error: "Invalid keys in request body",
  });
 }
 next();
}

export function isEmptyRequestBody(req, res, next) {
 if (Object.keys(req.body).length > 0) {
  return res.status(400).json({
   error: "Request body should be empty when fetching a requested record",
  });
 }
 next();
}
