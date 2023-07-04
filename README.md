### Installation and Configuration

- Clone repository

```
git clone https://github.com/LJMartinez07/rnc-service.git
```

- Run in your terminal

```
npm install or yarn install
```

- Copy `.env.example` file to `.env`

- Setup app in `.env` file

```
PORT=3000
```

- Setup database connection in `.env` file

```
MONGOLAB_BROWN_URI=mongodb://127.0.0.1:27017/rnc
```

- Demo API

```
 GET / https://rnc.luismtnez.com/api/entities/:el_rnc_a_verificar
```

List all the RNC with the version 2 of the API

```
query = {
    page: 1,
    limit: 10,
    query: {"estado": "ACTIVO"}
    projection: {"rnc": 1, "nombre_comercial": 1 }
}

 GET / https://rnc.luismtnez.com/api/v2/entities
```

Note: req.query.projection and req.query.query have to be valid JSON.
