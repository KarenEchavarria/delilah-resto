# Delilah Restó

## ¿Qué es?

Delilah Resó es un sistema de pedidos online para el restaurante.

## ¿Cómo puedo correr el proyecto?

1.  Instala todas las dependencias que el proyecto necesita ejecutando en la consola:

    `npm i`

2.  Completa todas las variables que aparecen en el archivo `.envREMOVE` y guárdalo como `.env`.

    > En `JWT_SIGN` debes poner la firma que elegiste para tu JSON Web Token, en `NAME_DB` debes colocar el nombre de tu base de datos, en `USER_DB` debes anotar el usuario de tu base de datos y en `PASSWORD_DB` debes poner la contraseña de tu base de datos

3.  Para iniciar el servidor, ejecuta en la consola:

    ```
    npm run devStart

    ```

    La aplicación corre en el puerto **http://localhost:3005/**.

## ¿Cómo crear tienda estando en modo _desarrollo_?

Para poder crear una tienda y poder probar el código de forma local debemos tener las siguientes cosas:

- Variables del archivo .env.development completas.
- Tener corriendo el proyecto haciendo uso de los comandos.

```bash
# yarn
yarn && yarn dev

# o si usas npm
npm install && npm run dev
```

> Para mayor información sobre la aplicación puedes revisar la [**documentación**](https://app.swaggerhub.com/apis/karen-echavarria/delilah-resto/2.0.0).
