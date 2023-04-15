const setLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(Array.from(data)));
};

const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name)) || [];
};

export { setLocalStorage, getLocalStorage };