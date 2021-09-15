/*
    Departamento
    ruta: '/api/departamentos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDepartamentos,
    crearDepartamento,
    actualizarDepartamento,
    borrarDepartamento
} = require('../controllers/departamentos')


const router = Router();

router.get( '/', getDepartamentos );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del departamento es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearDepartamento
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del departamento es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarDepartamento
);

router.delete( '/:id',
    validarJWT,
    borrarDepartamento
);



module.exports = router;
