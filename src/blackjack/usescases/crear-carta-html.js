/**
 * Crea una carta en formato HTML (imagen)
 * @param {String} carta Ej: "10H", "AS", "KD"
 * @returns {HTMLImageElement}
 */

export const crearCartaHtml = (carta) => {

    if (!carta) {
        throw new Error("La carta es un argumento obligatorio");
    }

    const imgCarta = document.createElement("img");

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    return imgCarta;
};