import { UsuarioCasted } from "../resources/user";
import { BASE_URL } from "@env";

const URL = BASE_URL + '/users';

export const getAllUsers = async (): Promise<UsuarioCasted[]> => {
  const response = await fetch(URL);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener los usuarios");
  }


  const users: UsuarioCasted[] = await response.json();
  return users;
};

export const createUser = async (user: any) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el usuario.');
  }

  return data;
};

export const loginUser = async (credentials: any) => {
  const response = await fetch(URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return await response.json();
};

export const logout = () => {
  // código para cerrar sesión, borrando tokens, restableciendo estados, etc.
}

export const getUserById = async (id: string): Promise<UsuarioCasted> => {
  const response = await fetch(URL + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "No se encontró o cargo el usuario");
  }

  const userData: UsuarioCasted = await response.json();
  return userData;
};

export const updateUserProfilePic = async (userId: string, newImageUrl: string) => {
  console.log(URL);
  try {
    const response = await fetch(`${URL}/${userId}/updateProfilePic`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: newImageUrl }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar la foto de perfil:", error);
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    const url = `${URL}/${userId}`;

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();

  } catch (error) {
    console.error("Hubo un problema con la operación fetch: ", error);
    throw error;
  }
};
