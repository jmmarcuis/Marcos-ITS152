 const TOKEN_KEY = 'auth-token';
const USERNAME_KEY = 'username'; 
export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY); 
};

export const saveUsername = (username: string) => {
    localStorage.setItem(USERNAME_KEY, username);
};

export const getUsername = () => {
    return localStorage.getItem(USERNAME_KEY);
};
