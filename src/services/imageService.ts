
const BASE_URL = 'http://10.0.2.2:9000/api/image';
//const BASE_URL = 'http://localhost:9000/api/image';
// const BASE_URL = 'http://192.168.0.112:9000/api/image';

export const uploadImage = async (base64Image: string) => {
    try {
      const response = await fetch(BASE_URL + '/upload', {
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
