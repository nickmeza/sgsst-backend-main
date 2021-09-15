/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getAgentes,
    crearAgente,
    actualizarAgente,
    borrarAgente,
    getAgenteById
} = require('../controllers/agentes')


const router = Router();

router.get( '/', validarJWT, getAgentes );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('departamento','El departamento id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearAgente
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('departamento','El departamento id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarAgente
);

router.delete( '/:id',
    validarJWT,
    borrarAgente
);

router.get( '/:id',
    validarJWT,
    getAgenteById
);



module.exports = router;



