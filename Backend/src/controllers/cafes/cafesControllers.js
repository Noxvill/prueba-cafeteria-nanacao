const { addCafe } = require('../../database/models/cafesModels');

const add_cafe_controller = async (req, res, next) => {

    try {
        const {nombre} = req.body;
        console.log('Nombre del café a agregar:', nombre);

        const response = await addCafe(nombre);
        console.log('Respuesta de la base de datos:', response);
       
        res.send(response);
        
    } catch (error) {
        console.error('Error al agregar café:', error);
        next(error);
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
    add_cafe_controller,
    get_profile_controller
};