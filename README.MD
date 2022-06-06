<div align="center">
  <a href="https://kalium.sh">
    <img src="https://github.com/x07ex/x07ex/blob/main/assets/kalium.svg" alt="" />
  </a>
  <h3 align="center">Kalium</h3>
  <p align="center">
    Source Code in Kalium Forum 
  </p>
</div>

> `Instalacion:`

```diff
- Necesitas tener Angular CLI ya instalado
+ git clone https://github.com/x07ex/Kalium
+ cd Kalium/API && npm i && npm run dev
+ cd ../backend && npm i && ng serve
```

> `Configuracion:` > **[settings.json:](https://github.com/x07ex/Kalium/blob/main/API/src/settings.json)**

```json
{
  /** Configuracion de auth para servicios como database o claves */
  "Auth": {
    "MongoURI": "" /** URI de la conexion a la base de datos de MongoDB */,
    "secretJWT": "admin" /** Password para los JWT (JSON Web Token) */
  },

  /** Configuracion auth para el acceso de correo (gmail) */
  "Mail": {
    "email": "" /** Email de la cuenta de correo */,
    "password": "" /** Contraseña de la cuenta de correo */
  }
}
```
