require('dotenv').config();

const {database, initDB, clearDB} = require('../database/dbConfig')
const {addCafe} = require('../database/models/cafesModels')


beforeAll(async () =>{

    await initDB()

})

afterEach(async () =>{

    await clearDB()

})

afterAll(async () =>{

    await database.end()

})



describe ('addCafe', () => {

it('Debería agregar un cafe', async () =>{



 const nombre="NombreTest"
 
 const result = await addCafe(nombre);
 expect(result).toEqual({
   data: {
     id: expect.any(Number),
     nombre: nombre
   },
   msg: 'Café Registrado'
 });

    })})