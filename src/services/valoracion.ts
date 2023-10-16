
import { BASE_URL } from "@env";
import { Valoracion } from "../resources/valoration";

const URL = BASE_URL + '/valorations';

export const obtenerValoracionesServicio = async (idSolicitud : string ) => {
    const response = await fetch(URL +'/'+ idSolicitud,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se ha encontrado proceso de valoracion");
      }
    const valoracionData: Valoracion = await response.json();

    return valoracionData;
  };

  export const crearValoracion = async (idSolicitud : string, idCreador: string, idTrabajadorServicio: string) => {
    
  };