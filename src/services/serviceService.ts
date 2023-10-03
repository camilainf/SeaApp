const BASE_URL = 'http://10.0.2.2:9000/api/services';
//const BASE_URL = 'http://localhost:9000/api/services';

export const getAllServices = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

export const createService = async (service: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(service),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el servicio.');
  }

  return data;
};

