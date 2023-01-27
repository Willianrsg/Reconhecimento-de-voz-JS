let watchId;
let isMonitoring = false;

const checkLocation = () => {
    if(!navigator.geolocation){
        console.log("Navegador não suporta geolocalização!");
        return;
    }

    watchId = navigator.geolocation.watchPosition(updateCoordinates);
}

const updateCoordinates = (position) => {
    const {latitude: lat, longitude: lon} = position.coords;

    document.getElementById('lat').innerHTML = lat;
    document.getElementById('lon').innerHTML = lon;
}

const getAddress = (lat, lon) => {
    const apiKey = 'cefe642bc080437ab59cb7aa848ece54';

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    fetch (url).then((response) => response.json()).then((data) => {
        const address = data.results[0].formatted;

        document.getElementById("address").innerHTML = address;
    });
}

const toggleMonitoring = () => {
    if(isMonitoring){
        stopMonitoring();
    } else {
        startMonitoring();
    }
}

const startMonitoring = () => {
    checkLocation();

    document.getElementById('stop-watching').innerHTML = "Parar de Monitorar";

    isMonitoring = true;
}

const stopMonitoring = () => {
    navigator.geolocation.clearWatch(watchId);

    document.getElementById('stop-watching').innerHTML = "Retomar monitoramento";

    isMonitoring = false;
}
