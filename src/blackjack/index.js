import _ from "underscore-node";
import { crearDeck, pedirCarta, valorCarta, turnoComputadora, crearCartaHtml } from "./usescases";

const miModulo = (() => {
    'use strict';

    let deck         = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    deck = crearDeck(tipos, especiales);
    console.log(deck);

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego 
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck(tipos, especiales);

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = crearCartaHtml(carta);
        divCartasJugadores[turno].append(imgCarta);
    };

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {
            if( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana');
            }
        }, 500 );
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, 0 );

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            
            turnoComputadora(
                puntosJugadores[0],
                puntosHTML[1],
                divCartasJugadores[1],
                deck,
                acumularPuntos,
                crearCarta,
                determinarGanador
            );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled   = true;
            btnDetener.disabled = true;
            
            turnoComputadora(
                puntosJugadores[0],
                puntosHTML[1],
                divCartasJugadores[1],
                deck,
                acumularPuntos,
                crearCarta,
                determinarGanador
            );
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled   = true;
        btnDetener.disabled = true;

        turnoComputadora(
            puntosJugadores[0], 
            puntosHTML[1],
            divCartasJugadores[1],
            deck,
            acumularPuntos,
            crearCarta,
            determinarGanador
        );
    });

    btnNuevo.addEventListener('click', () => {
         inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();