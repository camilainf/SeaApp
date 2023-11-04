export function convertirFecha(fecha: string | undefined): string {
    if (fecha === undefined) {
        return "Fecha no disponible";
    }

    const meses: string[] = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    // Descomponer la fecha en día, mes y año
    const [dia, mes, anoCorto] = fecha.split("/");

    // Convertir el año corto (20) a largo (2020)
    const anoLargo = `20${anoCorto}`;

    // Mapear el mes numérico a su versión textual
    const mesTexto = meses[parseInt(mes, 10) - 1]; // los meses comienzan desde 0

    return `${dia} de ${mesTexto} del ${anoLargo}`;
}

export function calcularPromedioCalificaciones(calificaciones :number[] | undefined):number {
    if ( calificaciones === undefined ||calificaciones.length === 0 ) {
        return 0;
    } else{
        let suma = 0;
        for (let i = 0; i < calificaciones.length; i++) {
            suma += calificaciones[i];
        }
        return suma / calificaciones.length;
    }
}