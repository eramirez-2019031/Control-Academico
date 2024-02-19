const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } = require('../controllers/course.controller');

const router = Router();

router.post(
  '/',
  [
    check('courseName', 'Course name is required').not().isEmpty(),
    check('courseTeacher', 'Course teacher is required').not().isEmpty(),
    validarCampos,
  ],
  createCourse
);

router.get('/', getCourses);

router.get(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(courseExistsById),
    validarCampos,
  ],
  getCourseById
);

router.put(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(courseExistsById),
    validarCampos,
  ],
  updateCourse
);

router.delete(
  '/:id',
  [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(courseExistsById),
    validarCampos,
  ],
  deleteCourse
);

module.exports = router;
