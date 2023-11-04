import { BASE_URL } from "@env";

const URL = BASE_URL + '/image';
// const URL = "https://seajob-2a7634f714d7.herokuapp.com/api" + '/image';

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
