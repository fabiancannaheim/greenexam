
const axios = require('axios')


describe("Exam API", () => {

    const api = "exams"
    const baseURL = "http://localhost:3000";

    let examData;
    let createdExamId;
    
    describe("CRUD operations for an exam", () => {

        beforeAll(async () => {
            const loginResponse = await axios.post(`${baseURL}/auth/login`, {
                username: 'annahfab_admin',
                password: 'annahfab123admin'
            })
            const sessionCookie = loginResponse.headers['set-cookie'][0]
            axios.defaults.headers['Cookie'] = sessionCookie
        })

        it("should create a new exam", async () => {
            examData = {
                title: 'Programmieren 3',
                user_id: 1
            }
            const resp = await axios.post(`${baseURL}/${api}`, examData)
            createdExamId = resp.data.insertId
            expect(resp.status).toBe(201)
            expect(resp.data.affectedRows).toBe(1)
        });

        it("should fetch the created exam by ID", async () => {
            const fetchResponse = await axios.get(`${baseURL}/${api}/${createdExamId}`)
            expect(fetchResponse.status).toBe(200)
            expect(fetchResponse.data[0].id).toBe(createdExamId)
            expect(fetchResponse.data[0].title).toBe(examData.title)
            expect(fetchResponse.data[0].user_id).toBe(examData.user_id)
        });

        it("should update the created exam", async () => {
            const updateData = {
                title: 'Programmieren 4',
            }
            const response = await axios.put(`${baseURL}/${api}/${createdExamId}`, updateData)
            expect(response.status).toBe(200)

            const fetchResponse = await axios.get(`${baseURL}/${api}/${createdExamId}`)
            expect(fetchResponse.data[0].title).toBe(updateData.title)
        });

        it("should delete the created exam", async () => {
            const response = await axios.delete(`${baseURL}/${api}/${createdExamId}`)
            expect(response.status).toBe(200)
            const fetchResponse = await axios.get(`${baseURL}/${api}/${createdExamId}`, {
                validateStatus: function (status) { 
                    return status >= 200 && status < 500
                }
            });
            expect(fetchResponse.status).toBe(404)
        })

    })

})
