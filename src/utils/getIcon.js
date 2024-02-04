
function getIcon(category) {
    console.log(category)

    if (category === 'Servicios técnicos')
        return ['fas', 'screwdriver-wrench'];
    if (category === 'Manufactura')
        return ['fas', 'hammer'];
    if (category === 'Comercio y gastronomía')
        return 'fa-solid fa-shopping-cart';
    if (category === 'Transporte')
        return 'fa-solid fa-truck';
    // if (category === 'Salud y Belleza')
    //     return ['fas', 'spa'];
    if (category === 'Servicios Profesionales')
        return 'fa-solid fa-brief-if(';
    if (category === 'Alojamiento y Turismo')
        return 'fa-solid fa-bed';
    if (category === 'Arte, deporte, recreación y entretenimiento')
        return 'fa-solid fa-masks-theater';
    if (category === 'Construcción')
        return 'fa-solid fa-hard-hat';
    if (category === 'Industrias')
        return 'fa-solid fa-industry';

    // return 'fa-solid fa-circle-question';

}


export default getIcon