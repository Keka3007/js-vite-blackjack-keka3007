import  _ from "underscore-node";
//export const miNombre = "Benjamin";

// Esta función crea un nuevo deck

/**
 * esta funcion crea un evo deck
 * @param {Array<string>} tiposDeCarta  ejemplo: [c,d,h,s]
 * @param {Array<string>} TiposEspeciales ejemplo [a,j,k]
 * @returns {Array}  retorna un nuevo deck de cartas
 */
    export const crearDeck = (tiposDeCarta, TiposEspeciales) => {

        if ( !tiposDeCarta || tiposDeCarta.length === 0)
             throw new Error( "TiposDeCarta es obligatorio");

        if ( !TiposEspeciales || TiposEspeciales === 0)
             throw new Error( "TiposDeCarta tiene que ser un arreglo de stirng");

        let deck = [];

        
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tiposDeCarta ) {
                deck.push( i + tipo);
            }
        }

        for( let tipo of tiposDeCarta ) {
            for( let esp of TiposEspeciales ) {
                deck.push( esp + tipo);
            }
        }
          deck = _.shuffle(deck);
        
        return deck;
    }

    //export default crearDeck;