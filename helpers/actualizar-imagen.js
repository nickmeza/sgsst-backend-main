const Usuario = require('../models/usuario');
const fs = require('fs');

const Agente = require('../models/agente');
const Departamento = require('../models/departamento');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'agentes':
            const agentes = await Agente.findById(id);
            if ( !agentes ) {
                console.log('No es un agente por id');
                return false;
            }

            pathViejo = `./uploads/agentes/${ medico.img }`;
            borrarImagen( pathViejo );

            agentes.img = nombreArchivo;
            await agentes.save();
            return true;

        break;
        
        case 'departamentos':
            const departamento = await Departamento.findById(id);
            if ( !departamento ) {
                console.log('No es un departamento por id');
                return false;
            }

            pathViejo = `./uploads/departamentos/${ departamento.img }`;
            borrarImagen( pathViejo );

            departamento.img = nombreArchivo;
            await departamento.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/departamentos/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
