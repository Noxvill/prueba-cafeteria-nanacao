const database = require('../dbConfig');

const { handleHashPassword } = require('../../utils/utils')

const addUser = async (email, password, rol, lenguage) => {
    try {
        const passwordHash = await handleHashPassword(password); // Mueve esto antes de usar en values
        const consulta = "INSERT INTO usuarios (id, email, password, rol, lenguage) values(DEFAULT, $1, $2, $3, $4) RETURNING *;";
        const values = [email, passwordHash, rol, lenguage];
        
        const { rowCount } = await database.query(consulta, values);
        
        if (rowCount) {
            return { msg: 'Usuario registrado' };
        } else {
            return { msg: 'Usuario no registrado' };
        }
    } catch (error) {
        error.code = 404;
        error.origin = 'DATABASE';
        error.type = 'Register User';
        throw error;
    }
}


const getUserByEmail = async (email) => {


    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const { rowCount, rows } = await database.query(consulta, values)
    const user = rows[0]
    return user.email
}

const getPasswordUserByEmail = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const { rowCount, rows } = await database.query(consulta, values)
    const user = rows[0]
    return user.password

}




const UsersCollection = {
    getPasswordUserByEmail,
    getUserByEmail,
    addUser
}



module.exports = {
    UsersCollection
}