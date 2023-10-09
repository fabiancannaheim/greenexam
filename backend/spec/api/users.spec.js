
const axios = require('axios');
const faker = require('faker');


describe("User API", () => {

    const baseURL = "http://localhost:3000";
    let createdUserId;
    let userData;

    describe("CRUD operations for an admin user", () => {

        it("should create a new admin user", async () => {
            userData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }

            const resp = await axios.post(`${baseURL}/users/admin`, userData)
            createdUserId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created user by ID", async () => {
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdUserId)
            expect(fetchResponse.data[0].username).toBe(userData.username)
            expect(fetchResponse.data[0].email).toBe(userData.email)
        });

        it("should update the created user", async () => {
            const updateData = {
                username: faker.internet.userName(),
            }
            const response = await axios.put(`${baseURL}/users/${createdUserId}`, updateData)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`)
            expect(fetchResponse.data[0].username).toBe(updateData.username)
        });

        it("should delete the created user", async () => {
            const response = await axios.delete(`${baseURL}/users/${createdUserId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500; 
                }
            });
            expect(fetchResponse.status).toBe(404)
        })

    })

    describe("CRUD operations for a student user", () => {

        it("should create a new student user", async () => {
            userData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
            const resp = await axios.post(`${baseURL}/users/student`, userData)
            createdUserId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created user by ID", async () => {
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdUserId)
            expect(fetchResponse.data[0].username).toBe(userData.username)
            expect(fetchResponse.data[0].email).toBe(userData.email)
        });

        it("should update the created user", async () => {
            const updateData = {
                username: faker.internet.userName(),
            }
            const response = await axios.put(`${baseURL}/users/${createdUserId}`, updateData)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`)
            expect(fetchResponse.data[0].username).toBe(updateData.username)
        });

        it("should delete the created user", async () => {
            const response = await axios.delete(`${baseURL}/users/${createdUserId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/users/${createdUserId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500; 
                }
            });
            expect(fetchResponse.status).toBe(404)
        })

    })

})
