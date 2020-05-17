const axios = require('axios'); // Permite hacer peticions http con promesas



const getLugarLatLng = async(direccion) => {

    const encodeUrl = encodeURI(direccion); // encodeUri convierte el texto en una url segura, los espacios los elimina y pone caracteres especiales

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
        headers: { 'x-rapidapi-key': '736775ecbfmsh7f10105af389345p12b143jsn3133bc1d864f' }
    });


    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para la ciudad: ${direccion}`);
    }

    const data = resp.data.Results[0];
    const nombre = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        nombre,
        lat,
        lng
    }

}


module.exports = {
    getLugarLatLng
}