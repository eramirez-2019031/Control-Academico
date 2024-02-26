const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarUsuarioTeacher } = require('../middlewares/validar-campos');
const { existeCursoById, existeCursoByNombre} = require('../helpers/db-validators');

const { cursoPost, cursoGet, getCursoByid, cursoPut, cursoDelete } = require('../controllers/curso.controller');

const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], getCursoByid);

router.put(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos,
        validarUsuarioTeacher
    ], cursoPut);

router.delete(
        "/:id",
        [
            check("id","El id no es un formato válido de MongoDB").isMongoId(),
            check("id").custom(existeCursoById),
            validarCampos,
            validarUsuarioTeacher
        ], cursoDelete);

        
router.post(
    "/", 
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("nombre").custom(existeCursoByNombre),
        check("maestro","Debes escribir tu correo, no tu usuario").isEmail(),
        validarCampos
    ], cursoPost); 

module.exports = router;