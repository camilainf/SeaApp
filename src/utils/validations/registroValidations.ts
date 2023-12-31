import * as Yup from "yup";

export const registroSchema = Yup.object({
    nombre: Yup.string().required("Debe ingresar su nombre."),
    apellidoPaterno: Yup.string().required("Debe ingresar su apellido paterno."),
    apellidoMaterno: Yup.string().required("Debe ingresar su apellido materno."),
    descripcion: Yup.string().required("Debe ingresar una descripción.").max(250, "La descripción no puede tener más de 250 carácteres."),
    telefono: Yup.string()
        .required("Debe ingresar su número de teléfono.")
        .matches(/^[0-9]+$/, "El número de teléfono solo debe contener números.")
        .min(9, "El número de teléfono debe tener al menos 9 dígitos."),
    email: Yup.string().email("Ingrese un email válido.").required("Debe ingresar un email."),
    password: Yup.string().required("Debe ingresar una contraseña."),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas deben coincidir.").required("Debe ingresar su contraseña."),
    termsAccepted: Yup.boolean().oneOf([true], "Debe aceptar los términos.").required("Requerido"),
});