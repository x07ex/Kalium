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
+ cd Kalium/API && npm i -g @angular/cli && npm i
+ cd ../backend && npm i
```

> `Configuracion:` > **[settings.json:](https://github.com/x07ex/Kalium/blob/main/API/src/settings.json)**

```json
{
  "Auth": {
    "MongoURI": "MongoURI here",
    "secretJWT": "Key JSON WEB TOKEN here"
  },

  "Mail": {
    "email": "Mail account here (gmail)",
    "password": "Password account here (gmail)"
  }
}
```

> `Run:` > **Server:**

```fix
cd Kalium/API && npm run dev (Con nodemon)
```

**Backend / panel:**

```fix
cd ../backend && ng serve (Con Angular-CLI)
```

---
