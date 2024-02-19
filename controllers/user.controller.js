const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userPost = async (req, res) => {
  const { name, email, password, role, course } = req.body;
  const user = new User({ name, email, password, role, course });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.status(200).json({
    user,
  });
};

const userGet = async (req, res = response) => {
  const { limit, from } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,
    users,
  });
};

const userPut = async (req, res) => {
  const { id } = req.params;
  const { _id, name, email, password, role, course, ...rest } = req.body;

  await User.findByIdAndUpdate(id, rest);
  const user = await User.findOne({ _id: id });

  res.status(200).json({
    msg: 'User updated successfully',
    user,
  });
};

const userGetById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  res.status(200).json({
    user,
  });
};

const userDelete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.status(200).json({
    msg: 'User deleted successfully',
    user,
  });
};

module.exports = {
  userPost,
  userGet,
  userPut,
  userGetById,
  userDelete,
};
