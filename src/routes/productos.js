const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all usuarios
router.get('/productos', (req, res) => {
  mysqlConnection.query('SELECT * FROM producto', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An usuario
router.get('/buscarProducto/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// DELETE An usuario
router.delete('/eliminarProducto/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Employee Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An usuario
router.post('/insertarProducto', (req, res) => {
  const {id, nombre, descripcion, fotografia, idCatalogo} = req.body;
  console.log(id, nombre, descripcion, fotografia, idCatalogo);
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @descripcion = ?;
    SET @fotografia = ?;
    SET @idCatalogo = ?;
    CALL AddOrEditProducto(@id, @nombre, @descripcion, @fotografia, @idCatalogo);
  `;
  mysqlConnection.query(query, [id, nombre, descripcion, fotografia, idCatalogo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Saved'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE An usuario
router.put('/actualizarUsuario/:id', (req, res) => {
  const { nombre, descripcion, fotografia, idCatalogo } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @descripcion = ?;
    SET @fotografia = ?;
    SET @idCatalogo = ?;
    CALL AddOrEditProducto(@id, @nombre, @descripcion, @fotografia, @idCatalogo);
  `;
  mysqlConnection.query(query, [id, nombre, descripcion, fotografia, idCatalogo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;