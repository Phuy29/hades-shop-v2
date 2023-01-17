export const localStorage = {
  setToken: (accessToken: string) => {
    window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
  },
  getToken: () => {
    return JSON.parse(window.localStorage.getItem('accessToken') as string);
  },
  removeToken: () => {
    window.localStorage.removeItem('accessToken');
  }
};
