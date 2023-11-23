import { BASE_URL } from "@env";

const URL = "http://10.0.2.2:9000/api" + '/image';

export const uploadImage = async (base64Image: string) => {
  try {
    const response = await fetch(URL + '/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error("Error uploading the image:", error);
  }
};
