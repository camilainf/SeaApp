import * as Yup from "yup";

export const crearServicioSchema = Yup.object({
    nombreServicio: Yup.string().required("El nombre del servicio es obligatorio."),
    categoria: Yup.string().notOneOf([""], "La categoría del servicio es obligatoria.").required("La categoría del servicio es obligatoria."),
    descripcion: Yup.string().required("La descripción del servicio es obligatorio."),
    fechaSolicitud: Yup.string().required("La fecha es obligatoria."),
    horaSolicitud: Yup.string().required("La hora es obligatoria."),
    direccion: Yup.string().required("La dirección del servicio es obligatoria."),
    monto: Yup.string().required("El monto del servicio es obligatorio."),
});