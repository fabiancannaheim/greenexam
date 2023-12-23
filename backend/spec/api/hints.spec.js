
const axios = require('axios');
const faker = require('faker');


describe("Hints API", () => {

    const baseURL = "http://localhost:3000";
    let createdHintId;
    let hintData;

    describe("CRUD operations for question hints", () => {

        it("should create a new hint", async () => {
            hintData = {
                content: 'Test Hint',
                question_id: 1
            }
            const resp = await axios.post(`${baseURL}/hints`, hintData)
            createdHintId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created hint", async () => {
            const fetchResponse = await axios.get(`${baseURL}/hints/${createdHintId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdHintId)
            expect(fetchResponse.data[0].name).toBe(hintData.name)
            expect(fetchResponse.data[0].compiler).toBe(hintData.compiler)
            expect(fetchResponse.data[0].executor).toBe(hintData.executor)
        });

        it("should update the created hint", async () => {
            const updateData = {
                content: 'Updated Test Hint',
            }
            const response = await axios.put(`${baseURL}/hints/${createdHintId}`, updateData)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/hints/${createdHintId}`)
            expect(fetchResponse.data[0].executor).toBe(updateData.executor)
        });

        it("should delete the created hint", async () => {
            const response = await axios.delete(`${baseURL}/hints/${createdHintId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/hints/${createdHintId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500
                }
            })
            expect(fetchResponse.status).toBe(404)
        })

    })

})
