import * as Yup from "yup";

export const registroSchema = Yup.object({
    //profilePic: Yup.string().required("Requerido"),
    nombre: Yup.string().required("Requerido").max(20, "El nombre es demasiado largo"),
    apellidoPaterno: Yup.string().required("Requerido").max(20, "El apellido paterno es demasiado largo"),
    apellidoMaterno: Yup.string().required("Requerido").max(20, "El apellido materno es demasiado largo"),
    descripcion: Yup.string().required("Debe ingresar una descripción.").max(250, "La descripción no puede tener más de 250 carácteres."),
    telefono: Yup.string().required("Requerido"),
    email: Yup.string().email("Ingrese un email válido.").required("Debe ingresar un email."),
    password: Yup.string().required("Requerido"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas deben coincidir.").required("Debe ingresar su contraseña."),
    termsAccepted: Yup.boolean().oneOf([true], "Debe aceptar los términos.").required("Requerido"),
});