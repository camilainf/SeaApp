// ServicioType.tsx
import { RouteProp } from '@react-navigation/native';

export type ServicioData = {
  nombreServicio: string;
  categoria: string;
  descripcion: string;
  fechaSolicitud: string;
  direccion: string;
  monto: number;
  imagen: string;
};

export type RootStackParamList = {
  Servicio: { servicioCargado: ServicioData };
  // Puedes agregar otras rutas aquí si las tienes
};

export type ServicioProps = {
  route: RouteProp<RootStackParamList, 'Servicio'>;
};
