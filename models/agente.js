const { Schema, model } = require('mongoose');

const AgenteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    /*usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },*/
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    
});


AgenteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Agente', AgenteSchema );
