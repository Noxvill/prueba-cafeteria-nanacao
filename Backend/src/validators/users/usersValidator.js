const { header, param, body, validationResult } = require('express-validator')

const updateValidator = [
    param('id').notEmpty().withMessage('Debes pasar un ID').isInt().withMessage('Debe ser un entero'),
    (req, res, next) => {

        const errors = validationResult(req).mapped()
        console.log(Object.keys(errors))
        if (Object.keys(errors).length) {
            res.send(errors)
        } else {
            next()
        }

    }
]


const addValidator = [
    body('email')
        .notEmpty().withMessage('Debes proporcionar un correo electrónico')
        .isEmail().withMessage('El correo electrónico debe tener un formato válido'),

    body('password')
        .notEmpty().withMessage('Debes proporcionar una contraseña'),

    body('rol')
        .notEmpty().withMessage('Debes proporcionar un rol'),

    body('lenguage')
        .notEmpty().withMessage('Debes proporcionar un lenguaje')
        .isString().withMessage('El lenguaje debe ser una cadena de texto'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


const UsersValidatorCollection = {
    updateValidator,
    addValidator
}


module.exports = {
    UsersValidatorCollection
}