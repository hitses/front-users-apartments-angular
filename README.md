# FrontUsersApartmentsAngular

## Variables de entorno

En la ruta `src/environments` se encuentran los archivos de variables de entorno para cada entorno de desarrollo.

- `environment.development.ts`: Variables de entorno para desarrollo
- `environment.ts`: Variables de entorno para producción

En estos archivos se ha definido la variable `devPort` que sirve para definir el puerto en el que se ejecutará la aplicación.

Por defecto se define el puerto como `3000` para ambos entornos. En caso de necesitar otro, se deberá cambiar únicamente la variable `devPort` en el archivo `environment.development.ts` si se inicia el servicio en modo desarrollo o en el archivo `environment.ts` si se realiza la construcción de la aplicación en modo producción con el comando `ng build` o en ambos para asegurar un correcto funcionamiento de la aplicación en el ordenador del desarrollador.
