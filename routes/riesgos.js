/*
    Ruta: /api/riesgos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { getRiesgos, 
        crearRiesgo, 
        actualizarRiesgo, 
        borrarRiesgo } = require('../controllers/riesgos');


const router = Router();


router.get('/',
    getRiesgos);

router.post('/',
    [
        check('descripcion', 'La descripción es necesaria').not().isEmpty(),
        validarCampos

    ],
    crearRiesgo
);

router.put('/:id',
    [

    ],
    actualizarRiesgo
);

router.delete('/:id',
    [

    ],
    borrarRiesgo
);

module.exports = router;
