import * as Yup from 'yup';

export const editarPerfilSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellidoPaterno: Yup.string().required('El apellido paterno es requerido'),
    apellidoMaterno: Yup.string().required('El apellido materno es requerido'),
    descripcion: Yup.string().required('La descripción es requerida'),
    telefono: Yup.string().required('El número telefónico es requerido').matches(/^[0-9]+$/, 'Número inválido'),
});