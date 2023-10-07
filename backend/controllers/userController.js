
const { getUserByIdFromDB, getUserByUsernameFromDB, getAllUsersFromDB, insertUserIntoDB, updateUserByIdInDB, deleteUserByIdInDB } = require('../models/userModel')

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersFromDB()
        res.json(users);
    } catch (error) {
        res.status(500).send(error.toString())
    }
}

const getUserById = async (req, res) => {
  try {
      const id =  req.params.id

      if (isNaN(id)) {
          return res.status(400).send("User ID must be a valid number")
      }

      const user = await getUserByIdFromDB(id)
      res.json(user);
  } catch (error) {
      res.status(500).send(error.toString())
  }
}

const getUserByUsername = async (req, res) => {
  try {
      const username =  req.params.username
      const user = await getUserByUsernameFromDB(username)
      res.json(user);
  } catch (error) {
      res.status(500).send(error.toString())
  }
}

const createUser = (role) => {
    return async (req, res) => {
        try {
          const { username, email, password } = req.body
    
          if (!username || !password || !email) {
              return res.status(400).send("Username, email and password are required.")
          }
    
          const result = await insertUserIntoDB(username, password, role, email)
          res.status(201).json(result)
        } catch (error) {
          res.status(500).send(error.toString())
        }
      };
    
}

const createStudent = createUser('student')
const createAdmin = createUser('admin')

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await updateUserByIdInDB(id, data);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUserByIdInDB(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.toString());
    }
}


module.exports = { getAllUsers, getUserById, getUserByUsername, createStudent, createAdmin, updateUserById, deleteUserById }
