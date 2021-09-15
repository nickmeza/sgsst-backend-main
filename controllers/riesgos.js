const { response } = require('express');

const Riesgo = require('../models/riesgo');


const getRiesgos = async(req, res) => {

    const desde = Number(req.query.desde)  || 0;

    const [riesgos, total ] = await Promise.all([

        Riesgo
            .find()
            .populate('departamento', 'nombre')
            .populate('usuario' , 'nombre')
            .skip( desde )
            .limit(10),

        Riesgo.countDocuments()
        

    ]);
    
    res.json({
        ok: true,
        riesgos,
        total
    });

}

const crearRiesgo = async(req, res = response) => {
    
    const uid = req.uid;

    const riesgo = new Riesgo({
            
        usuario: uid,
        ...req.body
    });
    
    console.log(riesgo)


    try {


        const riesgoDB = await riesgo.save();
        
        res.json({
            ok: true,
            riesgo:riesgoDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarRiesgo = async (req, res = response) => {


    // TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = req.params.id;

    try {

        const riesgoDB = await Riesgo.findById(uid);


        const {  ...campos } = req.body;
        //console.log(req.body);
        //console.log(req.params.id)
        const estado = campos.estado;

        if ( riesgoDB.estado === "cerrado"){
            const estadoRiesgo = await Riesgo.findOne({estado});
            if (estadoRiesgo){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya se encuentra cerrado el riesgo'
                })
            }
        }

        if ( !riesgoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un riesgo por ese id'
            });
        }

        const riesgoActualizado = await Riesgo.findByIdAndUpdate(  uid, campos,  {new:true});
        console.log(riesgoActualizado)
        res.json({
            ok: true,
            riesgo: riesgoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarRiesgo = async(req, res = response ) => {

    

    try {

        

        
        res.json({
            ok: true,
            msg: 'riesgo eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    getRiesgos,
    crearRiesgo,
    actualizarRiesgo,
    borrarRiesgo
}