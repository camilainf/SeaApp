// ServicioType.tsx
import { RouteProp } from '@react-navigation/native';

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

export type RootStackParamList = {
  Servicio: { servicioCargado: ServicioData };
  // Puedes agregar otras rutas aquí si las tienes
};

export type ServicioProps = {
  route: RouteProp<RootStackParamList, 'Servicio'>;
};

