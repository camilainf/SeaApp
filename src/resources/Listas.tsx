import { ServicioData } from "./service";
import { Usuario } from "./user";

export const listaUsuarios = [
  {
    id: "1",
    nombre: "Camila",
    apellido: "Escobedo",
    rut: "19.708.80-5",
    contraseña: "cami123",
    email: "cami@mail.cl",
    fechaDeNacimiento: "23/11/1999",
    calificacion: 4.5,
    tipoEntidad: "usuario",
  },
  {
    id: "2",
    nombre: "Sebastian",
    apellido: "Moyano",
    rut: "18.708.80-5",
    contraseña: "seba123",
    email: "seba@mail.cl",
    fechaDeNacimiento: "03/11/1999",
    calificacion: 4.5,
    tipoEntidad: "usuario",
  },
  {
    id: "3",
    nombre: "CaSe",
    apellido: "Escoyano",
    rut: "14.708.80-5",
    contraseña: "case123",
    email: "case@mail.cl",
    fechaDeNacimiento: "13/11/1999",
    calificacion: 4.5,
    tipoEntidad: "usuario",
  },
];

export const listaServicios = [
  {
    id: "1",
    nombre: "Jardineria en verano",
    categoria: "Jardineria",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    direccion: "Calle 123",
    monto: "5000",
    imagen: "https://via.placeholder.com/150",
    tipoEntidad: "usuario",
  },
  {
    id: "2",
    nombre: "Pasear perro puddle",
    categoria: "Paseador de perro",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    direccion: "Calle 123",
    monto: "5000",
    imagen: "https://via.placeholder.com/150",
    tipoEntidad: "usuario",
  },
  {
    id: "3",
    nombre: "Cuidar niño chico",
    categoria: "Cuidador de niño",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    direccion: "Calle 123",
    monto: "5000",
    imagen: "https://via.placeholder.com/150",
    tipoEntidad: "usuario",
  },
  {
    id: "4",
    nombre: "Programar pagina web",
    categoria: "Programación",
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    direccion: "Calle 123",
    monto: "5000",
    imagen: "https://via.placeholder.com/150",
    tipoEntidad: "usuario",
  },
];

export const listaCategorias = [
  { id: "1", nombre: "Jardineria", tipoEntidad: "categoria" },
  { id: "2", nombre: "Paseador de perro", tipoEntidad: "categoria" },
  { id: "3", nombre: "Cocina", tipoEntidad: "categoria" },
  { id: "4", nombre: "Programación", tipoEntidad: "categoria" },
  { id: "5", nombre: "Cuidador de niño", tipoEntidad: "categoria" },
];

export const solicitudesTerminadas: ServicioData[] = [
  {
    id: 4,
    idCreador: 1,
    nombreServicio: "Profesor particular de matematicas",
    descripcion:
      "Se necesita profesor que ayude a mi hijo que es medio porro en matematicas",
    categoria: "Pedagogia",
    fechaSolicitud: "03/11/23",
    horaSolicitud: "12:00",
    direccion: "La qubrada del aji #333",
    monto: 40000,
    imagen:
      "https://www.65ymas.com/uploads/s1/85/00/69/calos-maxi-profesor-matematicas-tiktok.jpeg",
    estado: 4,
  },
  {
    id: 5,
    idCreador: 1,
    nombreServicio: "Diseñador para pagina web",
    descripcion:
      "Necesito un diseñador que sepa de como estructurar una pagina web, para el diseño de una",
    categoria: "Diseñador grafico",
    fechaSolicitud: "23/01/22",
    horaSolicitud: "12:00",
    direccion: "Remoto",
    monto: 49832,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjeG0X7bEtCE1Xv-oqGtJJSvGfaqr2eVG0A&usqp=CAU",
    estado: 2,
  },
  {
    id: 6,
    idCreador: 1,
    nombreServicio: "Conductor privado para gala",
    descripcion:
      "Necesito urgente alguien que pueda de hace de conductor privado para llevar a mi hija a sus XV",
    categoria: "Conductor",
    fechaSolicitud: "01/01/23",
    horaSolicitud: "12:00",
    direccion: "Gomez carreño, los trigos, #450",
    monto: 15000,
    imagen:
      "https://media.istockphoto.com/id/1182697204/es/foto/elegante-y-guapo-conductor-dando-pulgares-hacia-arriba.jpg?s=612x612&w=0&k=20&c=Ejkw989OevI0iHfssU8_yBYUuvOpCpi-bii7Vts9UQg=",
    estado: 3,
  },
  {
    id: 7,
    idCreador: 1,
    nombreServicio: "Ayudante sobre ramo de anatomia y farmacos",
    descripcion:
      "Necesito a alguien que sepa sobre la asignatura de anatomia y farmacos para mi examen de este ramo",
    categoria: "Ayudantia",
    fechaSolicitud: "23/09/23",
    horaSolicitud: "12:00",
    direccion:
      "Quilpue, huechuraba, macul, las condes, cerca del patio italiano #44",
    monto: 9000,
    imagen: "https://www.uc.cl/site/assets/files/15931/700x532.700x532.jpg",
    estado: 2,
  },
];
export const solicitudesPropias: ServicioData[] = [
    {
      id: 1,
      idCreador: 1,
      nombreServicio: "Promotor de departamentos  ",
      descripcion: "Se necesita trabajador en el area de promotor de departamentos ya que nadie quiere :c",
      categoria: "Promotor",
      fechaSolicitud: "23/01/23",
      horaSolicitud: "12:00",
      direccion: "Viña del mar, San alfonso #343",
      monto: 40000,
      imagen: "https://img.freepik.com/free-photo/young-happy-man-with-thumbs-up-sign-casuals-isolated_186202-6699.jpg",
      estado: 1,
    },
    {
      id: 2,
      idCreador: 1,
      nombreServicio: "Paseo de perros",
      descripcion: "Necesito que alguien pasee a mi perro este dia viernes a las 12, porque estoy muy cansao y mi perro ta un poco loco",
      categoria: "Miscelanea",
      fechaSolicitud: "09/10/23",
      horaSolicitud: "12:00",
      direccion: "Viña del mar, San alfonso #343",
      monto: 40000,
      imagen: "https://www.fanaticosdelasmascotas.cl/wp-content/uploads/2021/03/portada-1.png",
      estado: 2
    },
    {
      id: 3,
      idCreador: 1,
      nombreServicio: "Quiropraxia a domicilio",
      descripcion: "Se necesita persona con conocimientos en quiropraxia para atender a adulto de 30 años con problemas de espalda chueca",
      categoria: "Kinesiologia",
      fechaSolicitud: "01/12/23",
      horaSolicitud: "12:00",
      direccion: "Valparaiso, Juan gomez con calle Quebrada #23",
      monto: 89000,
      imagen: "https://img.europapress.es/fotoweb/fotonoticia_20200329075935_1200.jpg",
      estado: 3
    },
  ];

  export const UsuarioP: Usuario = {
    id: 1,
    nombre: "Francisco",
    apellidos: "Fuensalida Fuente alba",
    rut: "12345678-9",
    contraseña: "1234",
    email: "sebastian.moyano.r@mail.pucv.cl",
    fechaDeNacimiento: "23/45/1980",
    imagenDePerfil:"https://dims.apnews.com/dims4/default/cd0d974/2147483647/strip/false/crop/2700x2700+0+0/resize/1486x1486!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F52%2F07%2F94c79693022fc6811604e443c418%2Fb73a1555afe8488ea0a6938a6b177eba",
    calificacion: 4.5,
  };