const { response } = require('express');

const Departamento = require('../models/departamento');


const getDepartamentos = async(req, res = response) => {

    const departamentos = await Departamento.find()
                                    .populate('usuario','nombre img');

    res.json({
        ok: true,
        departamentos
    })
}

const crearDepartamento = async(req, res = response) => {

    const uid = req.uid;
    const departamento = new Departamento({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const departamentoDB = await departamento.save();
        

        res.json({
            ok: true,
            departamento: departamentoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarDepartamento = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const departamento = await Departamento.findById( id );

        if ( !departamento ) {
            return res.status(404).json({
                ok: true,
                msg: 'Departamento no encontrado por id',
            });
        }

        const cambiosDepartamento = {
            ...req.body,
            usuario: uid
        }

        const departamentoActualizado = await Departamento.findByIdAndUpdate( id, cambiosDepartamento, { new: true } );


        res.json({
            ok: true,
            departamento: departamentoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarDepartamento = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const departamento = await Departamento.findById( id );

        if ( !departamento ) {
            return res.status(404).json({
                ok: true,
                msg: 'Departamento no encontrado por id',
            });
        }

        await Departamento.findByIdAndDelete( id );


        res.json({
            ok: true,
            msg: 'Departamento eliminado'
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
    getDepartamentos,
    crearDepartamento,
    actualizarDepartamento,
    borrarDepartamento
}