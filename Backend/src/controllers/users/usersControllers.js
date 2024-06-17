const { UsersCollection } = require('../../database/models/usersModel')


const add_user_controller = async (req, res, next) => {

    try {
        const { email, password, rol, lenguage } = req.body
        const response = await UsersCollection.addUser(email, password, rol, lenguage)
        // await crearUsuario(email, password)
        res.send(response)
    } catch (error) {
        next
    }
}

const get_profile_controller = async (req, res, next) => {

    try {

        // const { user_id } = req.params
        const { email } = req.user

        res.send({ user: { email } })

    } catch (error) {
        next(error)
    }
}

const login_controller = async (req, res, next) => {

    try {
        const token = req.token

        res.send({ token })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login_controller,
    add_user_controller,
    get_profile_controller
};