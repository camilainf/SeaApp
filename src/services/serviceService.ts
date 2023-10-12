import { ServicioData, ServicioDataNew } from "../resources/service";

const BASE_URL = 'http://10.0.2.2:9000/api/services';
//const BASE_URL = 'http://localhost:9000/api/services';
// const BASE_URL = 'http://192.168.0.112:9000/api/services';

export const getAllServices = async (): Promise<ServicioData[]> => {
  const response = await fetch(BASE_URL);

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
  const response = await fetch(BASE_URL, {
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
  const response = await fetch(`${BASE_URL}/byCategory?categoria=${encodeURIComponent(categoria)}`);

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
  const response = await fetch(`${BASE_URL}/lastServices?skip=${skip}${categoryQuery}`);

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
  const response = await fetch(`${BASE_URL}/byUser?idCreador=${encodeURIComponent(idUsuario)}`);

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

export const getServiceById = async (id: string): Promise<ServicioData> => {
  const response = await fetch(BASE_URL + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se encontro o cargo el servicio");
  }

  const servicioData: ServicioData = await response.json();
  return servicioData;
};

export const updateServiceStatus = async (id: string, estado: number) => {
  const response = await fetch(BASE_URL + '/' + id, {
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
  const response = await fetch(`${BASE_URL}/incrementClick/${id}`, {
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
  const response = await fetch(BASE_URL + '/topOfWeek');

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
    default:
      return "Estado desconocido";
  }
};