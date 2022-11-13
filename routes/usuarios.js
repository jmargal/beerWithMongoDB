const { application } = require('express')
const express = require('express')
const router = express.Router()

const {addUser,getUsers,getUser,deleteUser,editUser} = require('../controllers/usuarios')

router.get('/',getUsers)
router.get('/:Nick',getUser)
router.post('/',addUser)
router.delete('/:Nick',deleteUser)
router.put('/:Nick',editUser)


module.exports = router