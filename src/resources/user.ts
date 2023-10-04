import { Float } from "react-native/Libraries/Types/CodegenTypes";

type Usuario = {
  id: number;
  nombre: string;
  apellidos: string;
  rut: string; //
  fechaDeNacimiento: string; // Puedes usar una cadena si prefieres, como "string"
  email: string;
  contraseña: string;
  imagenDePerfil?: string; // El '?' indica que es opcional. Si todas las veces vas a tener la imagen, puedes quitar el '?'
  calificacion: number;
};

type NuevoUsuario = {
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

export { Usuario, NuevoUsuario };