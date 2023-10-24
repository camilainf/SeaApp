import { Alert } from "react-native";
import { UsuarioCasted } from "../resources/user";
import { BASE_URL } from "@env";
import { HttpError } from "../resources/httpError";

const URL = "http://10.0.2.2:9000/api" + '/users';

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
    throw {
      message,
      status: response.status,
    } as HttpError;
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
    console.error("Hubo un problema al actualizar los datos personales: ", error);
    throw error;
  }
};

export const handleEnviarValoracion = async (idUsuario: string |undefined, valoracion: number) => {
  try {

      const response = await fetch(`${URL}/uptateCalification/${idUsuario}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ calificacion: valoracion }),
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudo enviar la valoración.');
      }

  } catch (error) {
      console.error('Error al enviar valoración:', error);
      Alert.alert('Error', 'No se pudo enviar la valoración. Por favor, intenta de nuevo.');
  } 
};



export const obtenerDieneroGanadoUsuario = async (idUsuario: string | undefined): Promise<number> => {
  // Verificando si el idUsuario es válido
  if (!idUsuario) {
    console.error('No se proporcionó un idUsuario válido');
    return 0;
  }
  
  try {
    // Definiendo la URL del endpoint
    
    
    // Haciendo la solicitud al back-end
    const response = await fetch(URL + '/getMoneyEarnUser/' + idUsuario, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });;

    // Verificando si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'No se pudo obtener el monto ganado');
    }

    // Parseando la respuesta a JSON
    const data: any = await response.json();
    const montoGanado: number = data.totalEarnings;
    return montoGanado;
  } catch (error) {
    console.error('Error al obtener el monto ganado:', (error as Error).message);
    return 0;
  }
};

export const deactivateUser = async (userId: string) => {
  try {
    const url = `${URL}/deactivateUser/${userId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Hubo un problema al desactivar el usuario:", error);
    throw error;
  }
};

