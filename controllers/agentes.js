const { response } = require('express');

const Agente = require('../models/agente');

const bcrypt = require('bcryptjs');

const getAgentes = async(req, res = response) => {

    const agentes = await Agente.find()
                                //.populate('usuario','nombre img')
                                .populate('departamento','nombre img')


    res.json({
        ok: true,
        agentes
    })
}

const getAgenteById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const agente = await Agente.findById(id)
                                    //.populate('usuario','nombre img')
                                    .populate('departamento','nombre img');
    
        res.json({
            ok: true,
            agente
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearAgente = async (req, res = response) => {

    const { email, password } = req.body;

    const uid = req.uid;
    


    try {

        const existeEmail = await Agente.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const agente = new Agente({
            usuario: uid,
            ...req.body
        });


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        agente.password = bcrypt.hashSync( password, salt );

        const agenteDB = await agente.save();

        
        res.json({
            ok: true,
            agente: agenteDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarAgente = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const agente = await Agente.findById( id );

        if ( !agente ) {
            return res.status(404).json({
                ok: true,
                msg: 'agente no encontrado por id',
            });
        }

        const cambiosAgente = {
            ...req.body,
            usuario: uid
        }

        const agenteActualizado = await Agente.findByIdAndUpdate( id, cambiosAgente, { new: true } );


        res.json({
            ok: true,
            agente: agenteActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarAgente = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const agente = await Agente.findById( id );

        if ( !agente ) {
            return res.status(404).json({
                ok: true,
                msg: 'Agente no encontrado por id',
            });
        }

        await Agente.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Agente borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



module.exports = {
    getAgentes,
    crearAgente,
    actualizarAgente,
    borrarAgente,
    getAgenteById
}