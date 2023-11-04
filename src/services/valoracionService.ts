import { Valoracion, ValoracionCreacion } from "../resources/valoration";
import { BASE_URL } from "@env";

const URL = BASE_URL + '/valoration';
// const URL = "https://seajob-2a7634f714d7.herokuapp.com/api" + '/valoration';

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
  const valoracionData: any = await response.json();
  const valoracion: Valoracion = {
      id: valoracionData._id,
      idServicio: valoracionData.idServicio,
      idDueñoServicio: valoracionData.idDueñoServicio,
      idTrabajadorServicio: valoracionData.idTrabajadorServicio,
      dueñoValoro: valoracionData.dueñoValoro,
      trabajadorValoro: valoracionData.trabajadorValoro
  };
  return valoracion;
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

export const actualizarValoracion = async (
  idValoracion: string | undefined,
  dueñoValoro: boolean | null,
  trabajadorValoro: boolean | null
): Promise<any> => {
  const body = {
    idValoracion,
    dueñoValoro,
    trabajadorValoro,
  };
  try {
    const response = await fetch(`${URL}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'No se ha podido actualizar la valoración');
    }
    const updatedValoracion = await response.json();
    return updatedValoracion;
  } catch (error) {
    throw error;
  }
};
