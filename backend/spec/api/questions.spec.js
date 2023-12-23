
const axios = require('axios');
const faker = require('faker');


describe("Questions API", () => {

    const baseURL = "http://localhost:3000";
    let createdQuestionId;
    let questionData;

    describe("CRUD operations for exam questions", () => {

        it("should create a new exam question", async () => {
            questionData = {
                title: 'Test Question',
                description: 'Lorem Ipsum Dolor ...',
                skeleton: 'public static void main (String[] args) { /* some code */ }',
                solution: 'public static void main (String[] args) { /* actual code */ }',
                points: 5,
                exam_id: 1,
                lang_id: 1
            }
            const resp = await axios.post(`${baseURL}/questions`, questionData)
            createdQuestionId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created question", async () => {
            const fetchResponse = await axios.get(`${baseURL}/questions/${createdQuestionId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdQuestionId)
            expect(fetchResponse.data[0].name).toBe(questionData.name)
            expect(fetchResponse.data[0].compiler).toBe(questionData.compiler)
            expect(fetchResponse.data[0].executor).toBe(questionData.executor)
        });

        it("should update the created question", async () => {
            const updateData = {
                title: 'Updated Test Question',
            }
            const response = await axios.put(`${baseURL}/questions/${createdQuestionId}`, updateData)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/questions/${createdQuestionId}`)
            expect(fetchResponse.data[0].executor).toBe(updateData.executor)
        });

        it("should delete the created question", async () => {
            const response = await axios.delete(`${baseURL}/questions/${createdQuestionId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/questions/${createdQuestionId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500
                }
            })
            expect(fetchResponse.status).toBe(404)
        })

    })

})
