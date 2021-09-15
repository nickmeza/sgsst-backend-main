const { Schema, model } = require('mongoose');

const RiesgoSchema = Schema({

    estado:{
        type:String,
        default:"Abierto"
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    descripcion: {
        type: String,
        required:true,
    },
    fecha_creado:{
        type: Date,
        default: Date.now
    },
    actualizacion:{
        type: String
    }
});


RiesgoSchema.method('toJSON', function() {
    const { __v,  ...object } = this.toObject();
    return object;
})


module.exports = model( 'Riesgo', RiesgoSchema );
