api.call("Get", {
    typeName: "ExceptionEvent",
    search: {
        ruleSearch: { 
            id: "ah9ThILKZPUKrCHXkqohvvA" 
        },
        fromDate: "2017-07-27T12:00:00.083",
        toDate: "2017-07-27T15:00:00.083"
    }
}, function (result) {
    if (result.length > 0) {
        for (i = 0; i < result.length; i++) {
            var DATOS='Fecha entrada: '+result[i]['activeFrom']+"\n"+"Fecha salida: "+result[i]['activeTo']+"\n"+"Permanencia: "+result[i]['duration']+"\n"+"ID dispositivo: "+result[i]['device']['id']+"\n"+"Cantidad: "+result.length+"\n";
            getPosition(result[i]['activeFrom'],result[i]['duration'],result[i]['device']['id'],DATOS);
        }
    } else {
        alert("No hay resultados");
    }
}, function (error) {
    alert(error);
});

function getPosition(date,perm,idVehicle,DATOS) {
    api.call("Get", {
        typeName: "LogRecord",
        search: {
            deviceSearch: {
                id: idVehicle
            },
            fromDate: date,
            toDate: date
        }
    }, function (result) {
        if (result.length > 0) {
            DATOS += "Longitud: "+result[0]['longitude']+"\n"+"Latitud: "+result[0]['latitude']+"\n";
            getZone(result[0]['longitude'],result[0]['latitude'],DATOS);
        } else {
            alert("No hay resultados");
        }
    }, function (error) {
        alert(error);
    });
}

function getZone(longitude, latitude, DATOS){
    api.call("GetAddresses", {
        coordinates: [{"x":longitude, "y":latitude}]
    }, function (result) {
        getZoneName(result[0]['zones'], DATOS);
    }, function (error) {
        alert(error);
    });
}

function getZoneName(idZones, DATOS){
    for (k = 0; k < idZones.length; k++) {
        api.call("Get", {
            typeName: "Zone",
            search: {
                id: idZones[k]['id']
            }
        }, function (result) {
            DATOS += "Nombre zona: "+result[0]['name']+"\n";
            printData(DATOS);
        }, function (error) {
            alert(error);
        });
    }
}

function printData(DATOS){
    console.log(DATOS);
}






