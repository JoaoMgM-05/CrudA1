const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const data_base = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin13',
    database: 'user_crud',
});

// Verifica la conexión a la base de datos
data_base.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Ruta para crear un nuevo empleado
app.post('/create', (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    data_base.query(
        'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)',
        [nombre, edad, pais, cargo, anios],
        (err, result) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                res.status(500).send('Error al registrar el usuario');
            } else {
                res.status(200).send('Usuario registrado con éxito');
            }
        }
    );
});

// Ruta para obtener todos los empleados
app.get('/empleados', (req, res) => {
    data_base.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.error('Error al obtener los empleados:', err);
            res.status(500).send('Error al obtener los empleados');
        } else {
            res.status(200).send(result);
        }
    });
});

// Ruta para actualizar un empleado
// Ruta para actualizar un empleado
app.put('/update', (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    data_base.query(
        'UPDATE empleados SET nombre = ?, edad = ?, pais = ?, cargo = ?, anios = ? WHERE id = ?',
        [nombre, edad, pais, cargo, anios, id],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar el usuario:', err);
                res.status(500).send('Error al actualizar el usuario');
            } else {
                res.status(200).send('Usuario actualizado con éxito');
            }
        }
    );
});

// Inicia el servidor
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});