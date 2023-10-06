export type ServicioData = {
  id: number;
  idCreador: number;
  nombreServicio: string;
  categoria: string;
  descripcion: string;
  fechaSolicitud: string;
  horaSolicitud: string;
  direccion: string;
  monto: number;
  imagen: string;
  estado:number
};

export type ServicioDataNew = {
  id: number;
  idCreador: number;
  nombreServicio: string;
  categoria: string;
  descripcion: string;
  fechaSolicitud: string;
  horaSolicitud: string;
  direccion: string;
  monto: number;
  imagen: string;
  estado:number;
  fechaCreacion: string;
};


