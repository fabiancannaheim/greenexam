
const { getAllUsersFromDB, insertUserIntoDB } = require('../models/userModel')

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const createUser = (role) => {
    return async (req, res) => {
        try {
          const { username, email, password } = req.body;
    
          if (!username || !password || !email) {
            return res.status(400).send("Username, email and password are required.");
          }
    
          const result = await insertUserIntoDB(username, password, role, email);
          res.status(201).json(result);
        } catch (error) {
          res.status(500).send(error.toString());
        }
      };
    
}

const createStudent = createUser('student')
const createAdmin = createUser('admin')

module.exports = { getAllUsers, createStudent, createAdmin }
