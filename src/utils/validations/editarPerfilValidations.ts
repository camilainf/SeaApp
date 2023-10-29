import * as Yup from 'yup';

export const editarPerfilSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido').max(20, "El nombre es demasiado largo"),
    apellidoPaterno: Yup.string().required('El apellido paterno es requerido').max(20, "El apellido paterno es demasiado largo"),
    apellidoMaterno: Yup.string().required('El apellido materno es requerido').max(20, "El apellido materno es demasiado largo"),
    descripcion: Yup.string().required('La descripción es requerida'),
    telefono: Yup.string().required('El número telefónico es requerido').matches(/^[0-9]+$/, 'Número inválido'),
});