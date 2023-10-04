import { Categoria } from "../resources/categoria";

const BASE_URL = 'http://10.0.2.2:9000/api/categories';
//const BASE_URL = 'http://localhost:9000/api/categories';

export const getAllCategories = async (): Promise<Categoria[]> => {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las categorías.");
  }

  const categoriasData = await response.json();
  const categorias: Categoria[] = categoriasData.map((cat: any) => ({
    id: cat._id,
    nombre: cat.nombre,
    imagen: cat.imagen
  }));
  return categorias;
};
