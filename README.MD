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
+ git clone https://github.com/x07ex/Kalium
+ cd Kalium/API && npm i && npm run dev 
+ cd ../backend && npm i && ng serve
```

> `Configuracion:` 
**[settings.json:](https://github.com/x07ex/Kalium/blob/main/API/src/settings.json)**
```fix
{
  "Mail": {
    "email": "", // Correo del servicio de correo (gmail)
    "password": "" // Password del servicio de correo (gmail)
  },
  "secretJWT": "admin" // Secret de clave JWT (json web token)
}
```
