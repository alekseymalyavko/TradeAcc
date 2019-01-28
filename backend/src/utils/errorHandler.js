// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
    console.log(err);

    res.status(500).send(err);
}
export default errorHandler;
