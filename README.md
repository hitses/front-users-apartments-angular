# FrontUsersApartmentsAngular

Parte frontend del proyecto UsersApartments.

## Requisitos

- [Node.js](https://nodejs.org/es/) 22.X.X (versión utilizada en el desarrollo 22.13.0)
- [Angular](https://angular.io/) (versión utilizada en el desarrollo 19.2.0)

## Instalación

Para instalar las dependencias de Angular, se debe ejecutar el comando en la carpeta raíz del proyecto el siguiente comando:

```bash
npm install
```

## Variables de entorno

En la ruta `src/environments` se encuentran los archivos de variables de entorno para cada entorno de desarrollo.

- `environment.development.ts`: Variables de entorno para desarrollo
- `environment.ts`: Variables de entorno para producción

En estos archivos se ha definido la variable `devPort` que sirve para definir el puerto en el que se ejecutará la aplicación.

Por defecto se define el puerto como `3000` para ambos entornos. En caso de necesitar otro, se deberá cambiar únicamente la variable `devPort` en el archivo `environment.development.ts` si se inicia el servicio en modo desarrollo o en el archivo `environment.ts` si se realiza la construcción de la aplicación en modo producción con el comando `ng build` o en ambos para asegurar un correcto funcionamiento de la aplicación en el ordenador del desarrollador.

## Consideraciones

Si se ejecuta el proyecto sin haber ejecutado anteriormente el servidor en el mismo ordenador éste no cargará ningún tipo de información, pero tampoco mostrará ningún error.
