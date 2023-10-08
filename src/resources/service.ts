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
  estado:number
};

export type ServicioData = {
  id: string;
  idCreador: string;
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


