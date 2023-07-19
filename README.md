### Instalación y Configuración

- Clona el repositorio

```
git clone https://github.com/LJMartinez07/rnc-service.git
```

- Ejecuta el siguiente comando en tu terminal

```
npm install or yarn install
```

- Copia el archivo `.env.example` a `.env`

- Configura la app en el archivo `.env`

```
PORT=3000
```

- Configura la base de datos en el archivo `.env`

```
MONGOLAB_BROWN_URI=mongodb://127.0.0.1:27017/rnc
```

- Demo API

```
 GET / https://rnc.luismtnez.com/api/entities/:el_rnc_a_verificar
```

Lista todos los RNC en la version 2 de la API

```
query = {
    page: 1,
    limit: 10,
    query: {"estado": "ACTIVO"}
    projection: {"rnc": 1, "nombre_comercial": 1 }
}
GET / https://rnc.luismtnez.com/api/v2/entities
```

NOTA: req.query.projection y req.query.query Deben de ser un JSON valido.
