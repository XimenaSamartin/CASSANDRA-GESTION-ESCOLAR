# **GESTIÓN ESCOLAR - API CASSANDRA**

# **INDEX**
### **INDEX** SERVIDOR. 

``` js
//Creando instancias 
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express(); //crea el servidor
const routs = require("./routes/routes")

// middlewares funciones intermedias que entre que se recibe y responde la soli serán ejecutadas
app.use(morgan('dev')); //Control de mensajes de servidor 
app.use(bodyParser.json()); //Convertir el cuerpo de la soli en un Objeto Json 
app.use(bodyParser.urlencoded({extended:true}));//Permitir carateres especiales y simbolos en la url
app.use("/",routs)//Define la raíz de las rutas

app.listen(3000,()=>console.log('Servidor en puerto 3000')); //Puerto, CallBack
```

# **CONEXION**

### **CONEXION** CASSANDRA Y REDIS. 

``` js
const cassandra = require('cassandra-driver'); //conectar cassandra
const redis = require('redis'); //levantar servidor Redis
//Instancia para que se conecte una BD Cassandra
const clienteCassandra = () => {
  return new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1', 
    keyspace: 'gestionescolar', 
  });
};

const conRedis = () => {
  const client = redis.createClient();
  return client;
};

module.exports = { cassandra: clienteCassandra, redis: conRedis };

```

# **GET**

### **GET** DE ALUMNO, ADMINISTRATIVOS, DOCENTES, ESCUELAS Y MANTENIMIENTO. 

``` js
const conectores = require("../controllers/conexion");
const conexion = conectores.cassandra();
const redis = conectores.redis();

const getAlumnos = (req, res) => {
  redis.connect().then(() => {
    redis.set(`ALUMNO:GET:${new Date().toISOString()}`, `Consulta de alumnos`);
    redis.quit();
  });

  conexion.execute("SELECT * FROM Alumno", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
};

const getAlumno = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ALUMNO:GET:${new Date().toISOString()}`,
      `Consulta de alumno ${req.params.curp}`
    );
    redis.quit();
  });

  conexion.execute(
    "SELECT * FROM Alumno WHERE curp=?",
    [req.params.curp],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows[0]);
    }
  );
};

const getAdministrativos = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ADMINISTRATIVOS:GET:${new Date().toISOString()}`,
      `Consulta de ADMINISTRATIVOS`
    );
    redis.quit();
  });

  conexion.execute("SELECT * FROM Administrativos", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
};

const getAdministrativo = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ADMINISTRATIVOS:GET:${new Date().toISOString()}`,
      `Consulta de ADMINISTRATIVO ${req.params.curp}`
    );
    redis.quit();
  });

  conexion.execute(
    "SELECT * FROM Administrativos where curp=?",
    [req.params.curp],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows[0]);
    }
  );
};

const getDocentes = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `DOCENTES:GET:${new Date().toISOString()}`,
      `Consulta de DOCENTES`
    );
    redis.quit();
  });

  conexion.execute("SELECT * FROM Docentes", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
};

const getDocente = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `DOCENTES:GET:${new Date().toISOString()}`,
      `Consulta de DOCENTE ${req.params.curp}`
    );
    redis.quit();
  });

  conexion.execute(
    "SELECT * FROM Docentes where curp=?",
    [req.params.curp],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows[0]);
    }
  );
};

const getEscuelas = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ESCUELAS:GET:${new Date().toISOString()}`,
      `Consulta de ESCUELAS`
    );
    redis.quit();
  });

  conexion.execute('SELECT * FROM Escuelas', (err, results) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(results.rows);
  });
};

const getEscuela = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ESCUELAS:GET:${new Date().toISOString()}`,
      `Consulta de ESCUELA ${req.params.clave}`
    );
    redis.quit();
  });

  conexion.execute(
    'SELECT * FROM Escuelas where clave=?',
    [req.params.clave],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows[0]);
    }
  );
};

const getMantenimientos = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `MANTENIMIENTO:GET:${new Date().toISOString()}`,
      `Consulta de MANTENIMIENTOS`
    );
    redis.quit();
  });

  conexion.execute('SELECT * FROM Mantenimiento', (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result.rows);
  });
};

const getMantenimiento = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `MANTENIMIENTO:GET:${new Date().toISOString()}`,
      `Consulta de MANTENIMIENTO ${req.params.curp}`
    );
    redis.quit();
  });

  conexion.execute(
    'SELECT * FROM Mantenimiento where curp=?',
    [req.params.curp],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows[0]);
    }
  );
};

const getTutorados = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `DOCENTES:GET:${new Date().toISOString()}`,
      `Consulta de tutorados de ${req.params.curp}`
    );
    redis.quit();
  });

  conexion.execute(
    'SELECT * FROM alumnos_tutor WHERE tutor=?',
    [req.params.curp],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows);
    }
  );
};


const getDocentesEscuela = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ESCUELAS:GET:${new Date().toISOString()}`,
      `Consulta de docentes de ${req.params.clave}`
    );
    redis.quit();
  });

  conexion.execute(
    'SELECT * FROM docentes_escuela WHERE escuela=?',
    [req.params.clave],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows);
    }
  );
};


const getAdministrativosEscuela = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ESCUELAS:GET:${new Date().toISOString()}`,
      `Consulta de Administrativos de ${req.params.clave}`
    );
    redis.quit();
  });

  conexion.execute(
    'SELECT * FROM Administrativos_escuela WHERE escuela=?',
    [req.params.clave],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result.rows);
    }
  );
};

module.exports = {
  getAlumnos,
  getAlumno,
  getAdministrativos,
  getAdministrativo,
  getDocentes,
  getDocente,
  getEscuelas,
  getEscuela,
  getMantenimientos,
  getMantenimiento,
  getTutorados,
  getDocentesEscuela,
  getAdministrativosEscuela
};

```
# **POST**
### **POST** DE ALUMNO, ADMINISTRATIVOS, DOCENTES, ESCUELAS Y MANTENIMIENTO. 
``` js
const conectores = require("../controllers/conexion");
const cassandra = conectores.cassandra();
const redis = conectores.redis();


const postAlumno = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ALUMNOS:POST:${new Date().toISOString()}`,
      `Registro de alumno ${req.body.curp}`
    );
    redis.quit();
  });

  const queries = [
    {
      query:
        'INSERT INTO alumno(curp, nombre, fechaInscripcion, fechaNat, gradoAcademico, tutor, creditoTutoria, tutoriaFirmada, escuela) VALUES(?,?,?,?,?,?,?,?,?)',      params: [
          req.body.curp,        
          req.body.nombre,
          req.body.fechaInscripcion,
          req.body.fechaNat,
          req.body.gradoAcademico,
          req.body.tutor,
          req.body.creditoTutoria,
          req.body.tutoriaFirmada,
          req.body.escuela
      ],
    },
    {
      query:
      'INSERT INTO alumnos_tutor(curp, nombre, fechaInscripcion, fechaNat, gradoAcademico, tutor, creditoTutoria, tutoriaFirmada, escuela) VALUES(?,?,?,?,?,?,?,?,?)',      params: [
        req.body.curp,        
        req.body.nombre,
        req.body.fechaInscripcion,
        req.body.fechaNat,
        req.body.gradoAcademico,
        req.body.tutor,
        req.body.creditoTutoria,
        req.body.tutoriaFirmada,
        req.body.escuela
      ],
    },
  ];

  cassandra.batch(queries, { prepare: true }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
};



const postAdministrativo = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ADMINISTRATIVOS:POST:${new Date().toISOString()}`,
      `Registro de administrativo ${req.body.curp}`
    );
    redis.quit();
  });

  const queries = [
    {
      query:
        'INSERT INTO Administrativos(curp, correo, nocuentabancaria, escuela, extensionTel, funcion, horaEntrada, horaSalida, nombre, telefono) VALUES(?,?,?,?,?,?,?,?,?,?)',
      params: [
        req.body.curp,
        req.body.correo,
        req.body.nocuentaBancaria,
        req.body.escuela,
        req.body.extensionTel,
        req.body.funcion,
        req.body.horaEntrada,
        req.body.horaSalida, 
        req.body.nombre,
        req.body.telefono
      ],
    },
    {
      query:
        'INSERT INTO administrativos_escuela(curp, correo, nocuentabancaria, escuela, extensionTel, funcion, horaEntrada, horaSalida, nombre, telefono) VALUES(?,?,?,?,?,?,?,?,?,?)',
      params: [
        req.body.curp,
        req.body.correo,
        req.body.nocuentaBancaria,
        req.body.escuela,
        req.body.extensionTel,
        req.body.funcion,
        req.body.horaEntrada,
        req.body.horaSalida, 
        req.body.nombre,
        req.body.telefono
      ],
    },
  ];

  cassandra.batch(queries, { prepare: true }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
};


const postDocente = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `DOCENTES:POST:${new Date().toISOString()}`,
      `Registro de docente ${req.body.curp}`
    );
    redis.quit();
  });

  const queries = [
    {
      query:
        'INSERT INTO Docentes(curp, nombre, telefono, nocuentaBancaria, noOficina, especialidad, gradoEstudio, tutorados, tutoriaFirmada, escuela) VALUES(?,?,?,?,?,?,?,?,?,?)',
      params: [
        req.body.curp,
        req.body.nombre,
        req.body.telefono,
        req.body.nocuentaBancaria,
        req.body.noOficina,
        req.body.especialidad,
        req.body.gradoEstudio,
        req.body.tutorados,
        req.body.tutoriaFirmada,
        req.body.escuela   
      ],
    },
    {
      query:
        'INSERT INTO docentes_escuela (curp, nombre, telefono, nocuentaBancaria, noOficina, especialidad, gradoEstudio, tutorados, tutoriaFirmada, escuela) VALUES(?,?,?,?,?,?,?,?,?,?)',
      params: [
        req.body.curp,
        req.body.nombre,
        req.body.telefono,
        req.body.nocuentaBancaria,
        req.body.noOficina,
        req.body.especialidad,
        req.body.gradoEstudio,
        req.body.tutorados,
        req.body.tutoriaFirmada,
        req.body.escuela 
      ],
    },
  ];

  cassandra.batch(queries, { prepare: true }, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
};



const postEscuela = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `ESCUELAS:POST:${new Date().toISOString()}`,
      `Registro de escuela ${req.body.clave}`
    );
    redis.quit();
  });

  cassandra.execute(
    'INSERT INTO Escuelas(clave, nombre, direccion, ciudad, administrativos, docentes, alumnos, mantenimiento) VALUES(?,?,?,?,?,?,?,?)',
    [
      req.body.clave,
      req.body.nombre,
      req.body.direccion,
      req.body.ciudad,
      req.body.administrativos,
      req.body.docentes,
      req.body.alumnos,
      req.body.mantenimiento,
    ],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result);
    }
  );
};


const postMantenimiento = (req, res) => {
  redis.connect().then(() => {
    redis.set(
      `MANTENIMIENTO:POST:${new Date().toISOString()}`,
      `Registro de mantenimiento ${req.body.curp}`
    );
    redis.quit();
  });

  cassandra.execute(
    'INSERT INTO Mantenimiento(curp, nombre, telefono, nocuentaBancaria, telInstitucional, especialidad, escuela) VALUES(?,?,?,?,?,?,?)',
    [
      req.body.curp,
      req.body.nombre,
      req.body.telefono,
      req.body.nocuentaBancaria,
      req.body.telInstitucional,
      req.body.especialidad,
      req.body.escuela,
    ],
    { prepare: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result);
    }
  );
};


module.exports = {
  postAdministrativo,
  postAlumno,
  postDocente,
  postEscuela,
  postMantenimiento,
};

```

# **ROUTES**
### **ROUTES** DE ALUMNO, ADMINISTRATIVOS, DOCENTES, ESCUELAS Y MANTENIMIENTO. 
``` js
const express = require("express"); //servicio express (generar el router)
const router = express.Router(); // instanciar un obj. donde generar/registrar rutas
const get = require ("./controllers/get"); //controladores de funciones de ruta (propios)
const post = require ("./controllers/post");

/// GET
router.get("/alumnos",get.getAlumnos)
router.get("/alumnos/:curp",get.getAlumno)
router.get("/alumnos/tutor/:curp",get.getAlumnosTutor)
router.get("/alumnos/escuelas/:clave",get.getAlumnosEscuela)



router.get("/administrativos",get.getAdministrativos)
router.get("/administrativos/:curp",get.getAdministrativo)
router.get("/administrativos/escuelas/:clave",get.getAdministrativosEscuela)


router.get("/docentes",get.getDocentes)
router.get("/docentes/:curp",get.getDocente)
router.get("/docentes/escuelas/:clave",get.getDocentesEscuelas)

router.get("/escuelas",get.getEscuelas)
router.get("/escuelas/:clave",get.getEscuela)

router.get("/mantenimiento",get.getMantenimientos)
router.get("/mantenimiento/:curp",get.getMantenimiento)
router.get("/mantenimientos/escuela/:clave",get.getMantenimientoEscuela)

/// POST
router.post("/alumno",post.postAlumno)

router.post("/administrativos",post.postAdministrativo)

router.post("/docentes",post.postDocente)

router.post("/escuelas",post.postEscuela)

router.post("/mantenimiento",post.postMantenimiento)


module.exports = router
```

# **MODELS**
### **MODELO** DE ALUMNO. 
``` js
const { Schema, model } = require("mongoose");

const esquema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    curp: String, 
    nombre: String, 
    fechaNat: Schema.Types.Date, 
    fechaInscripcion: Schema.Types.Date, 
    gradoAcademico: String,
    tutor: [Schema.Types.ObjectId],
    creditoTutoria: Schema.Types.Boolean, 
    escuela: [Schema.Types.ObjectId]
  },

  { collection: "Alumno" }
);

const modelo = model("Alumno", esquema);
module.exports = modelo;
```

### **MODELO** DE ADMINISTRATIVOS. 
``` js
const { Schema, model } = require("mongoose");

const esquema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    curp: String, 
    nombre: String, 
    telefono: [Schema.Types.Number], 
    NocuentaBancaria:[Schema.Types.Number], 
    funcion: String, 
    horaEntrada: String, 
    horaSalida: String, 
    extensionTel: [Schema.Types.Number],  
    correo: String, 
    escuela: Schema.Types.ObjectId
  },

  { collection: "Administrativos" }
);

const modelo = model("Administrativos", esquema);
module.exports = modelo;

```

### **MODELO** DE DOCENTES. 
``` js
const { Schema, model } = require("mongoose");

const esquema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    curp: String, 
    nombre: String, 
    telefono: Schema.Types.Number,
    nocuentaBancaria: Schema.Types.Number,
    noOficina: Schema.Types.Number, 
    especialidad: String,
    gradoEstudio:String,
    tutorados: [Schema.Types.ObjectId],
    tutoriaFirmada: Schema.Types.Boolean,
    escuela: Schema.Types.ObjectId
  },

  { collection: "Docentes" }
);

const modelo = model("Docentes", esquema);
module.exports = modelo;

```

### **MODELO** DE ESCUELAS. 
``` js
const { Schema, model } = require("mongoose");

const esquema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    clave: [Schema.Types.Number],
    nombre: String,
    direccion: String,
    ciudad: String,
    administrativos: [Schema.Types.ObjectId],
    docentes: [Schema.Types.ObjectId],
    mantenimiento: [Schema.Types.ObjectId],
    alumnos: [Schema.Types.ObjectId]
  },

  { collection: "Escuelas" }
);

const modelo = model("Escuela", esquema);
module.exports = modelo;
```

### **MODELO** DE MANTENIMIENTO. 
``` js
const { Schema, model } = require("mongoose");

const esquema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    curp: String, 
    nombre: String, 
    telefono: Schema.Types.Number, 
    nocuentaBancaria:Schema.Types.Number,
    telInstitucional: Schema.Types.Number,
    especialidad: String, 
    escuela: Schema.Types.ObjectId
  },

  { collection: "Mantenimiento" }
);

const modelo = model("Mantenimiento", esquema);
module.exports = modelo;

```