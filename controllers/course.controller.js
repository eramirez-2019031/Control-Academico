const { response, json } = require('express');
const Course = require('../models/course');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { courseName, courseTeacher } = req.body;
  const course = new Course({ courseName, courseTeacher });

  try {
    await course.save();
    res.status(201).json({
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

const getCourses = async (req, res = response) => {
  const { limit, from } = req.query;
  const query = {};

  try {
    const total = await Course.countDocuments(query);
    const courses = await Course.find(query).skip(Number(from)).limit(Number(limit));

    res.status(200).json({
      total,
      courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json({
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { courseName, courseTeacher, ...rest } = req.body;

  try {
    const course = await Course.findByIdAndUpdate(id, { courseName, courseTeacher, ...rest }, { new: true });

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.status(200).json({
      msg: 'Course updated successfully',
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json({
      msg: 'Course deleted successfully',
      course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
