// backend/routes/api/users.js
const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');



// Validate sign up Middleware
const validateSignup = [
  check('firstName')
  .exists({ checkFalsy: true })
  .withMessage('First Name is required.'),
check('lastName')
  .exists({ checkFalsy: true })
  .withMessage('Last Name is required.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username,firstName, lastName } = req.body;

    try {
      const errors = {};

      const emailExists = await User.findOne({ where: { email } });
      const usernameExists = await User.findOne({ where: { username } });

      if (emailExists) errors.email = 'User with that email already exists';
      if (usernameExists) errors.username = 'User with that username already exists';
      
      if (Object.keys(errors).length) {
        const err = new Error('User already exists');
        err.status = 403; 
        err.errors = errors;
        return next(err); 
      }
      

    const hashedPassword = bcrypt.hashSync(password);
    
    const user = await User.create({ email, username, hashedPassword: hashedPassword, firstName, lastName });


    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.status(201).json({
      user: safeUser
    });
  } catch (err) {
    console.error(err); 
    next(err);
  }
  }
);

module.exports = router;