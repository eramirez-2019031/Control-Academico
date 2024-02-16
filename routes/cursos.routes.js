const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cursoPost, getCursoByid, } = require('../controllers/cursos.controller');

const { existeCursoById } = require('../helpers/db-validators');

const router = Router();

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], getCursoByid);

router.post(
    "/", 
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("profesor","El profesor es obligatorio").not().isEmpty(),
        validarCampos,
    ], cursoPost); 


module.exports = router;