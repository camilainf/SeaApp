import { BASE_URL } from "@env";
import { Valoracion, ValoracionCreacion } from "../resources/valoration";

const URL = BASE_URL + "/valoration";

export const obtenerValoracionesServicio = async (idSolicitud: string | null) => {
  const response = await fetch(URL + "/" + idSolicitud, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se ha encontrado proceso de valoracion");
  }
  const valoracionData: Valoracion = await response.json();
  console.log("HOLA ACA LLEGA LA VALORACION DATA",valoracionData)
  return valoracionData;
};

export const crearValoracion = async (idSolicitud: string | null, idCreador: string | undefined, idTrabajadorServicio: string | undefined) => {
  if (!idSolicitud || !idCreador || !idTrabajadorServicio) {
    throw new Error("No se ha podido crear una valoracion");
  }
  const valoracionJSON: ValoracionCreacion = {
    idServicio: idSolicitud,
    idDueñoServicio: idCreador,
    idTrabajadorServicio: idTrabajadorServicio,
  };
  try {
    const response = await fetch(URL + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( valoracionJSON ),
    });
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se ha podido crear una valoracion");
    }
  } catch (error) {
    throw error;
  }
};
