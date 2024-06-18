const database = require('../dbConfig');

const addCafe = async (nombre) => {
    try {
        const consulta = "INSERT INTO cafes (nombre) VALUES ($1) RETURNING *;";
        const values = [nombre];
        
        const { rowCount, rows } = await database.query(consulta, values);
   
        if (rowCount) {
            return { msg: 'Café Registrado', data: rows[0] };
        } else {
            return { msg: 'Café no Registrado' };
        }
    } catch (error) {
        error.code = 404;
        error.origin = 'DATABASE';
        error.type = 'Register coffee';
        throw error;
    }
}

// Exportar el método addCafe
module.exports = {
    addCafe
};
