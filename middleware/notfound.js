const notFound = (req, res, next) => {
 // Catch-all route for handling 404 Not Found errors
 //const err = new Error("Not found!");
 //err.status = 404;
 //next(err);

 res.status(404).json({
  message: "not found",
  error: `The requested resource ${req.originalUrl} was not found on this server.`,
 });
};

export default notFound;
