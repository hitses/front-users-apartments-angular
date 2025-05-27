// Variable que sirve para definir el puerto en el que se ejecutará la aplicación y que se crea fuera de las variables de entorno para su uso en la variable de entorno 'url'
const devPort = 3000;

// Variables de entorno para desarrollo
export const environment = {
  url: `http://localhost:${devPort}`,
};
