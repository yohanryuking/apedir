const dateConverter = (date) => {
    let fecha = new Date(date);

    let dia = fecha.getUTCDate(); // Utiliza getUTCDate en lugar de getDate
    let mes = fecha.getUTCMonth() + 1; // Utiliza getUTCMonth en lugar de getMonth
    let anio = fecha.getUTCFullYear(); // Utiliza getUTCFullYear en lugar de getFullYear
    
    let hora = fecha.getUTCHours() 
    let minuto = fecha.getUTCMinutes(); 
    let segundo = fecha.getUTCSeconds();

    let ampm = hora >= 12 ? 'PM' : 'AM';
    hora = hora % 12;
    hora = hora ? hora : 12; 


    let fechaFormateada = dia + "/" + mes + "/" + anio + " " + hora + ":" + minuto + ":" + segundo + " " + ampm;
    
    return fechaFormateada
};

export default dateConverter;
