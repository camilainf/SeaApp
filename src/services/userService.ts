const BASE_URL = 'http://10.0.2.2:9000/api/users';
// const BASE_URL = 'http://localhost:9000/api/users';

export const getAllUsers = async () => {
  const response = await fetch(BASE_URL);
  return await response.json();
};

export const createUser = async (user: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const loginUser = async (credentials: any) => {
    const response = await fetch(BASE_URL + '/login', {
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

