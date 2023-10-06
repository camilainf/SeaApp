import { Float } from "react-native/Libraries/Types/CodegenTypes";



type Usuario = {
  _id: string;
  name: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  telefono: string;
  password: string;
  imagenDePerfil?: string;
  calificacion: number;
};

export { Usuario };