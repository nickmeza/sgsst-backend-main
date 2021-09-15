const { response } = require('express');

const Usuario = require('../models/usuario');
const Agente = require('../models/agente');
const Departamento = require('../models/departamento');
const Riesgo = require ('../models/riesgo')


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, agentes, departamentos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Agente.find({ nombre: regex }),
        Departamento.find({ nombre: regex }),
        Riesgo.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        agentes,
        departamentos,
        riesgo
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'agentes':
            data = await Agente.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('departamento', 'nombre img');
        break;

        case 'departamentos':
            data = await Departamento.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        case 'riesgo':
            data = await Riesgo.find({ nombre: regex });
        
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/riesgos/departamento'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

