export type Oferta = {
  id: string;
  idServicio: string; // Referencia al servicio
  idCreadorOferta: string; // ID del usuario que hizo la oferta
  montoOfertado: number;
  estaEscogida: boolean; // Si esta oferta fue la escogida por el creador del servicio
};
export type Postoferta ={
  idServicio: string; // Referencia al servicio
  idCreadorOferta: string; // ID del usuario que hizo la oferta
  montoOfertado: number;
}
