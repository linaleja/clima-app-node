const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


/*lugar.getLugarLatLng(argv.direccion)
    .then(resp => {
        console.log(`Direccion: ${resp.nombre}, Latitud: ${resp.lat}, Longitud: ${resp.lng}`);
    })
    .catch(e => {
        console.log('Error: ', e)
    })


clima.getClima(-22.969999, -49.869999)
    .then(console.log)
    .catch(e => {
        console.log('Error: ', e)
    })*/

const getInfo = async(direccion) => {
    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${direccion} es de ${temp}`
    } catch (error) {
        return `No se pudo determinar el clima de ${direccion}`
    }


    return {
        direccion,
        temp
    };
}


getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log)