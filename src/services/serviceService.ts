import { ServicioData, ServicioDataNew } from "../resources/service";

const BASE_URL = 'http://10.0.2.2:9000/api/services';
//const BASE_URL = 'http://localhost:9000/api/services';

export const getAllServices = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
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
  const servicios: ServicioDataNew[] = serviciosData.map((serv: any) => ({
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

export const getLastServices = async (skip: number = 0): Promise<ServicioData[]> => {
  const response = await fetch(`${BASE_URL}/lastServices?skip=${skip}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los últimos servicios.");
  }

  const serviciosData = await response.json();
  const servicios: ServicioDataNew[] = serviciosData.map((serv: any) => ({
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

export const getServicesByUser = async (idUsuario: string): Promise<ServicioDataNew[]> => {
  const response = await fetch(`${BASE_URL}/byUser?idCreador=${encodeURIComponent(idUsuario)}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los servicios por usuario.");
  }
  const serviciosData = await response.json();
  const servicios: ServicioDataNew[] = serviciosData.map((serv: any) => ({
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

export const getServiceById = async (id: string): Promise<ServicioDataNew> => {
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
  
  const servicioData: ServicioDataNew = await response.json();
  return servicioData;
};
