/**
 * 2C = two of clubs
 * 2D = two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Speades 

*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


const puntosHtml = document.querySelectorAll('small');
 
// esta funcion crea una nueva baraja
const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo)
        }
    }
    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;

}
crearDeck();

// esta funcion me permite tomar una carta
let pedirCarta = () => {

    if ( deck.length === 0 ){
        throw 'no hay mas cartas en el deck'
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);

    return (isNaN( valor )) ? 
            ( valor === 'A' ) ? 11 : 10
        :   ( parseInt(valor));
        
}
// const valor = valorCarta(pedirCarta());
// console.log({valor});

// turno de la computadora 
const turnoComputadora = ( puntosMinimos ) => {
    

    do {
    const carta = pedirCarta();
    
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if ( puntosMinimos > 21 ){
        break;
    }


}while( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ));
    
setTimeout(() => {
    

        if (  puntosComputadora === puntosMinimos){
            alert('Nadie gana :(');
        }else if( puntosJugador === puntosComputadora ){
            alert('Nadie gana!!!');
        }else if( puntosMinimos > 21 ){
            alert('computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador Gana!!');
        }else{
            alert('Computador Gana!');
        }
    }, 100);
}




// Eventos 

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log(puntosJugador);
    puntosHtml[0].innerText = puntosJugador
    // document.querySelector('small').innerHTML = puntosJugador

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    
    if (puntosJugador > 21){
        alert('Has perdido');
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }else if( puntosJugador === 21){
        alert('21, Has Ganado!!!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

});

btnNuevo.addEventListener( 'click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;


});

