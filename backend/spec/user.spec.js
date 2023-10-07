const request = require('request')

describe("User Endpoints", function() {
  it("returns status code 200", function(done) {
    request.get("http://localhost:3000/users", function(error, response, body) {
      expect(response.statusCode).toBe(200)
      done()
    })
  })
})
