
const axios = require('axios');
const faker = require('faker');


describe("Programming Language API", () => {

    const baseURL = "http://localhost:3000";
    let createdProgLangId;
    let progLangData;

    describe("CRUD operations for a programming language", () => {

        it("should create a new programming language", async () => {
            progLangData = {
                name: 'C',
                compiler: '/bin/gcc',
                executor: './'
            }
            const resp = await axios.post(`${baseURL}/progLang`, progLangData)
            createdProgLangId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created user by ID", async () => {
            const fetchResponse = await axios.get(`${baseURL}/progLang/${createdProgLangId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdProgLangId)
            expect(fetchResponse.data[0].name).toBe(progLangData.name)
            expect(fetchResponse.data[0].compiler).toBe(progLangData.compiler)
            expect(fetchResponse.data[0].executor).toBe(progLangData.executor)
        });

        it("should update the created programming language", async () => {
            const updateData = {
                executor: '/bin/gcc2',
            }
            const response = await axios.put(`${baseURL}/progLang/${createdProgLangId}`, updateData)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/progLang/${createdProgLangId}`)
            expect(fetchResponse.data[0].executor).toBe(updateData.executor)
        });

        it("should delete the created programming language", async () => {
            const response = await axios.delete(`${baseURL}/progLang/${createdProgLangId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/progLang/${createdProgLangId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500
                }
            })
            expect(fetchResponse.status).toBe(404)
        })

    })

})
