# Delilah Restó

## ¿Qué es?

Delilah Resó es un sistema de pedidos online para el restaurante.

## ¿Cómo puedo correr el proyecto?

1.  Instala todas las dependencias que el proyecto necesita ejecutando en la consola:

    ```
    npm i
    ```

2.  Completa todas las variables que aparecen en el archivo `.env.template` y guárdalo como `.env`

    > En `JWT_SIGN` debes poner la firma que elegiste para tu JSON Web Token, en `NAME_DB` debes colocar el nombre de tu base de datos, en `USER_DB` debes anotar el usuario de tu base de datos y en `PASSWORD_DB` debes poner la contraseña de tu base de datos

3.  Para iniciar el servidor, ejecuta en la consola:

    ```
    npm run devStart
    ```

    La aplicación corre en el puerto **http://localhost:3005/**

4.  Para crear las tablas y los permisos en la base de datos, envía un POST request al endpoint `http://localhost:3005/createdb`. Tienes un modelo listo para ejecutar en `request.rest` línea 5.

    Puedes elegir el proveedor de base de datos que más te convega, no olvides registrar [los datos de autenticación](#%c2%bfc%c3%b3mo-puedo-correr-el-proyecto) en `.env`


    > También vas a encontrar las queries para SQL en el archivo `dbcreation.sql` en caso de que prefieras correrlas directamente en tu proveedor de base de datos.

## Probando los Endpoints

- En el archivo `request.rest` vas a encontrar ejemplos de request para probar los diferentes endponts de acuerdo con los roles _client_ y _admin_, también tienes una opción _No authenticated_.
- Para enviar los request debes presionar la opción `send request` que está arriba de cada uno de los request pre-construidos.
- Al inicio del archivo vas a ver 2 variables denominadas `@clientToken` y `@adminToken` que van a ser necesarias para authenticar cada request que realices.

  - Para actualizar el valor del token de las variables has un request al `loggin` (línea 48 para client y 57 para admin) y copia el valor del token del response, debe verse así:

  ```
  @clientToken = eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoiY2xpZW50In0.5y4Qp3AHt7J4uY3buJ8hw5PzcmzgNRy0DhE9k_6GJQ0
  @adminToken = eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJyb2xlIjoiYWRtaW4ifQ.dpk5e2gya_aPZkNASdhHAcBOAmTcsH3gPprF3L3Vo5o
  ```

## Documentación

> Para mayor información sobre la aplicación puedes revisar la [**documentación**](https://app.swaggerhub.com/apis/karen-echavarria/delilah-resto/2.0.0).

## Tengo una pregunta o aporte

Mándame un mail a karen-0212@hotmail.com
