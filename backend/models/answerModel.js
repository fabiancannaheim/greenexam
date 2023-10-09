const pool = require('../db/db')
const baseModel = require('./base/baseModel')

const answerModel = baseModel('answers')

answerModel.getAllByExamAndUser = async (examId, userId) => {
    const [items] = await pool.execute(`
                    SELECT a.* 
                    FROM answers a
                    LEFT JOIN questions q ON q.ID = a.question_id
                    LEFT JOIN exams e ON e.ID = q.exam_id
                    WHERE a.user_id = ? AND e.ID = ?
                   `, [userId, examId])
    return items
}

module.exports = answerModel
