
const axios = require('axios');
const faker = require('faker');


describe("Authentication & User API", () => {

    const baseURL = "http://localhost:3000";
    let userData;

    describe("Operations for app authentication", () => {

        it("should login a user", async () => {
            userData = {
                username: 'annahfab_admin',
                password: 'annahfab123admin'
            }
            const resp = await axios.post(`${baseURL}/auth/login`, userData)
            expect(resp.status).toBe(201)
            expect(resp.data.message).toBe('Login successful')
            expect(resp.data.token).toBeDefined
        });

        it("should logout a user", async () => {
            const resp = await axios.post(`${baseURL}/auth/logout`, userData)
            expect(resp.status).toBe(201)
            expect(resp.data.message).toBe('Logged out sucessfully')
        })

    })

})
