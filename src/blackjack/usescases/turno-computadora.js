import { pedirCarta } from "./";
import { crearCartaHtml } from "./crear-carta-html";

export const turnoComputadora = (
    puntosMinimos,
    puntosHTML,
    divCartasComputadora,
    deck,
    acumularPuntos,
    crearCarta,
    determinarGanador
) => {

    if (!puntosMinimos) throw new Error("Puntos mínimos son necesarios");

    let puntosComputadora = 0;

   do {
    const carta = pedirCarta(deck); // ✔ primero se crea

    puntosComputadora = acumularPuntos(carta, 1);
    crearCarta(carta, 1);

} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
};