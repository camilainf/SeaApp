import { Categoria, CategoriaPopular } from "../resources/category";
import { BASE_URL } from "@env";

const URL = BASE_URL + '/categories';
// const URL = "https://seajob-2a7634f714d7.herokuapp.com/api" + '/categories';

export const getAllCategories = async (): Promise<Categoria[]> => {
  const response = await fetch(URL);

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

export const getPopularCategories = async (): Promise<CategoriaPopular[]> => {
  const response = await fetch(URL + '/popular');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener las categorías populares.");
  }

  const categoriasPopularesData = await response.json();
  const categoriasPopulares: CategoriaPopular[] = categoriasPopularesData.map((cat: any) => ({
    id: cat._id,
    nombre: cat.nombre,
    imagen: cat.imagen,
    contador: cat.count
  }));

  return categoriasPopulares;
};
