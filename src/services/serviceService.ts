import { ServicioData } from "../resources/service";
import { BASE_URL } from "@env";

const URL = "http://10.0.2.2:9000/api" + '/services';

export const getAllServices = async (): Promise<ServicioData[]> => {
  const response = await fetch(URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener todos los servicios.");
  }

  const serviciosData = await response.json();
  const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
    id: serv._id,
    idCreador: serv.idCreador,
    nombreServicio: serv.nombreServicio,
    categoria: serv.categoria,
    descripcion: serv.descripcion,
    fechaSolicitud: serv.fechaSolicitud,
    horaSolicitud: serv.horaSolicitud,
    direccion: serv.direccion,
    monto: serv.monto,
    imagen: serv.imagen,
    estado: serv.estado,
    fechaCreacion: serv.fechaCreacion
  }));

  return servicios;
};

export const createService = async (service: any) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el servicio.');
  }

  return data;
};

export const getServicesByCategory = async (categoria: string): Promise<ServicioData[]> => {
  console.log("SERVICIOS URL:", URL);
  const response = await fetch(`${URL}/byCategory?categoria=${encodeURIComponent(categoria)}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los servicios por categoría.");
  }

  const serviciosData = await response.json();
  const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
    id: serv._id,
    idCreador: serv.idCreador,
    nombreServicio: serv.nombreServicio,
    categoria: serv.categoria,
    descripcion: serv.descripcion,
    fechaSolicitud: serv.fechaSolicitud,
    horaSolicitud: serv.horaSolicitud,
    direccion: serv.direccion,
    monto: serv.monto,
    imagen: serv.imagen,
    estado: serv.estado,
    fechaCreacion: serv.fechaCreacion
  }));

  return servicios;
};

export const getLastServices = async (skip: number = 0, categoria?: string): Promise<ServicioData[]> => {

  // Si se proporciona una categoría, añadirla a la URL, de lo contrario, no hacer nada
  const categoryQuery = categoria ? `&categoria=${categoria}` : '';
  const response = await fetch(`${URL}/lastServices?skip=${skip}${categoryQuery}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los últimos servicios.");
  }

  const serviciosData = await response.json();
  const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
    id: serv._id,
    idCreador: serv.idCreador,
    nombreServicio: serv.nombreServicio,
    categoria: serv.categoria,
    descripcion: serv.descripcion,
    fechaSolicitud: serv.fechaSolicitud,
    horaSolicitud: serv.horaSolicitud,
    direccion: serv.direccion,
    monto: serv.monto,
    imagen: serv.imagen,
    estado: serv.estado,
    fechaCreacion: serv.fechaCreacion
  }));

  return servicios;
};

export const getServicesByUser = async (idUsuario: string): Promise<ServicioData[]> => {
  const response = await fetch(`${URL}/byUser?idCreador=${encodeURIComponent(idUsuario)}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los servicios por usuario.");
  }
  const serviciosData = await response.json();
  const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
    id: serv._id,
    idCreador: serv.idCreador,
    nombreServicio: serv.nombreServicio,
    categoria: serv.categoria,
    descripcion: serv.descripcion,
    fechaSolicitud: serv.fechaSolicitud,
    horaSolicitud: serv.horaSolicitud,
    direccion: serv.direccion,
    monto: serv.monto,
    imagen: serv.imagen,
    estado: serv.estado,
    fechaCreacion: serv.fechaCreacion
  }));
  return servicios;
};
export const getServicesAcceptedByUser = async (idUsuario: string): Promise<ServicioData[]> => {
  try {
    const response = await fetch(`${URL}/acceptedByUser/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const serviciosData: any[] = await response.json();

    const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
      id: serv._id,
      idCreador: serv.idCreador,
      nombreServicio: serv.nombreServicio,
      categoria: serv.categoria,
      descripcion: serv.descripcion,
      fechaSolicitud: serv.fechaSolicitud,
      horaSolicitud: serv.horaSolicitud,
      direccion: serv.direccion,
      monto: serv.monto,
      imagen: serv.imagen,
      estado: serv.estado,
      fechaCreacion: serv.fechaCreacion,
    }));

    return servicios;
  } catch (error) {
    console.error("Hubo un problema al obtener los servicios aceptados:", error);
    return [];
  }
};

export const getServicesOfferedByUser = async (idUsuario: string): Promise<ServicioData[]> => {
  try {
    const response = await fetch(`${URL}/offeredByUser/${idUsuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const serviciosData: any[] = await response.json();

    const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
      id: serv._id,
      idCreador: serv.idCreador,
      nombreServicio: serv.nombreServicio,
      categoria: serv.categoria,
      descripcion: serv.descripcion,
      fechaSolicitud: serv.fechaSolicitud,
      horaSolicitud: serv.horaSolicitud,
      direccion: serv.direccion,
      monto: serv.monto,
      imagen: serv.imagen,
      estado: serv.estado,
      fechaCreacion: serv.fechaCreacion,
    }));

    return servicios;
  } catch (error) {
    console.error("Hubo un problema al obtener los servicios aceptados:", error);
    return [];
  }
};


export const getServiceById = async (id: string): Promise<ServicioData> => {
  const response = await fetch(URL + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se encontro o cargo el servicio");
  }

  const servicioData = await response.json();
  const servicio: ServicioData = {
    id: servicioData._id,
    idCreador: servicioData.idCreador,
    nombreServicio: servicioData.nombreServicio,
    categoria: servicioData.categoria,
    descripcion: servicioData.descripcion,
    fechaSolicitud: servicioData.fechaSolicitud,
    horaSolicitud: servicioData.horaSolicitud,
    direccion: servicioData.direccion,
    monto: servicioData.monto,
    imagen: servicioData.imagen,
    estado: servicioData.estado,
    fechaCreacion: servicioData.fechaCreacion
  };


  return servicio;
};

export const updateServiceStatus = async (id: string | null, estado: number) => {
  if (!id) {
    throw new Error("No se proporcionó un id válido para actualizar el estado del servicio");
  }
  const response = await fetch(URL + '/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se pudo actualizar el estado del servicio");
  }

  const servicioData = await response.json();
  return servicioData;
}


export const incrementServiceClick = async (id: string) => {
  const response = await fetch(`${URL}/incrementClick/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se pudo incrementar el contador de clics");
  }

  const servicioData = await response.json();
  return servicioData;
}

export const getServicesTopOfWeek = async (): Promise<ServicioData[]> => {
  const response = await fetch(URL + '/topOfWeek');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los servicios destacados de la semana.");
  }

  const serviciosData = await response.json();
  const servicios: ServicioData[] = serviciosData.map((serv: any) => ({
    id: serv._id,
    idCreador: serv.idCreador,
    nombreServicio: serv.nombreServicio,
    categoria: serv.categoria,
    descripcion: serv.descripcion,
    fechaSolicitud: serv.fechaSolicitud,
    horaSolicitud: serv.horaSolicitud,
    direccion: serv.direccion,
    monto: serv.monto,
    imagen: serv.imagen,
    estado: serv.estado,
    fechaCreacion: serv.fechaCreacion
  }));

  return servicios;
};

export const updateService = async (serviceId: string, serviceData: any) => {
  try {
    const url = `${URL}/${serviceId}`;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    console.error("Hubo un problema al actualizar el servicio: ", error);
    throw error;
  }
};

export const deleteService = async (serviceId: string) => {
  try {
    const response = await fetch(`${URL}/${serviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el servicio.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un problema al eliminar el servicio:", error);
    throw error;
  }
};


export const obtenerTextoEstado = (estado: number | undefined) => {
  if (estado === undefined) {
    return "Estado no disponible";
  }
  switch (estado) {
    case 1:
      return "En oferta";
    case 2:
      return "Por iniciar";
    case 3:
      return "Trabajando";
    case 4:
      return "En valoración";
    case 5:
      return "Terminado";
    case 6:
      return "Terminado"; // Termino forzado
    default:
      return "Estado desconocido";
  }
};