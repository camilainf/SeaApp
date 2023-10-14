import * as Yup from "yup";

export const crearServicioSchema = Yup.object({
    nombreServicio: Yup.string().required("Requerido"),
    categoria: Yup.string().notOneOf([""], "Requerido").required("Requerido"),
    descripcion: Yup.string().required("Requerido"),
    fechaSolicitud: Yup.string().required("Requerido"),
    horaSolicitud: Yup.string().required("Requerido"),
    direccion: Yup.string().required("Requerido"),
    monto: Yup.string().required("Requerido"),
});