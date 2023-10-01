
function errorHandlingMiddleware(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({ error: 'Something went wrong!' })
  }
  
module.exports = errorHandlingMiddleware
  