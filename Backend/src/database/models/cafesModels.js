const database = require('../dbConfig');


const addCafe = async (nombre) => {
    try {
        const consulta = "INSERT INTO cafes (nombre) VALUES ($1) RETURNING *;";
        const values = [nombre];
        
        const { rowCount, rows } = await database.query(consulta, values);
   
        if (rowCount) {
            return { status: 201, msg: 'Café Registrado', data: rows[0] };
        } else {
            return { status: 404, msg: 'Café no Registrado' };
        }
    } catch (error) {
        return {
            status: 500,
            error: {
                code: 500,
                message: 'Error al registrar el café',
                detail: error.message
            }
        };
    }
}


const getAllCafes = async () => {
    const consulta = 'SELECT * FROM cafes';
    const { rows } = await database.query(consulta);
    return rows;
  };

//   const updateCafe = async (id, { nombre }) => {
//     try {
//         // Verificar si el ID en los parámetros es igual al ID en el payload
//         const cafeExistente = await database.query('SELECT * FROM cafes WHERE id = $1', [id]);
//         if (!cafeExistente.rows.length) {
//             throw new Error('No se encontró el café a actualizar');
//         }

//         const consulta = 'UPDATE cafes SET nombre = $1 WHERE id = $2 RETURNING *';
//         const values = [nombre, id];
//         const { rowCount, rows } = await database.query(consulta, values);
//         if (rowCount) {
//             return { msg: 'Café actualizado', data: rows[0] };
//         } else {
//             return { msg: 'No se encontró el café a actualizar' };
//         }
//     } catch (error) {
//         error.code = 400; // Bad Request
//         error.origin = 'DATABASE';
//         error.type = 'Update coffee';
//         throw error;
//     }
// };


// const updateCafe = async (id, nombre) => {
//     try {
//         const consulta = "UPDATE cafes SET nombre = $1 WHERE id = $2 RETURNING *;";
//         const values = [nombre, id];
        
//         const { rowCount, rows } = await database.query(consulta, values);
   
//         if (rowCount) {
//             return { status: 200, msg: 'Café actualizado', data: rows[0] };
//         } else {
//             return { status: 404, msg: 'Café no encontrado' };
//         }
//     } catch (error) {
//         return {
//             status: 500,
//             error: {
//                 code: 500,
//                 message: 'Error al actualizar el café',
//                 detail: error.message
//             }
//         };
//     }
// }

const updateCafe = async (id, { nombre }) => {
    try {
        const consulta = 'UPDATE cafes SET nombre = $1 WHERE id = $2 RETURNING *';
        const values = [nombre, id];
        const { rowCount, rows } = await database.query(consulta, values);

        if (rowCount) {
            return { msg: 'Café actualizado', data: rows[0] };
        } else {
            return { msg: 'No se encontró el café a actualizar' };
        }
    } catch (error) {
        return {
            status: 500,
            error: {
                code: 500,
                message: 'Error al actualizar el café',
                detail: error.message
            }
        };
    }
};


const deleteCafe = async (id) => {
    try {
        const consulta = 'DELETE FROM cafes WHERE id = $1 RETURNING *;';
        const values = [id];

        const { rowCount } = await database.query(consulta, values);

        if (rowCount) {
            return { status: 200, msg: 'Café eliminado correctamente' };
        } else {
            return { status: 404, msg: 'Café no encontrado' };
        }
    } catch (error) {
        return {
            status: 500,
            error: {
                code: 500,
                message: 'Error al eliminar el café',
                detail: error.message
            }
        };
    }
};



// Exportar el método addCafe
module.exports = {
    addCafe,
    getAllCafes,
    updateCafe,
    deleteCafe
};
