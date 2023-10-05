import { ServicioData } from "../resources/service";

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
    estado: serv.estado
  }));

  return servicios;
};


