// @dev npm package
const Joi = require("joi");

const DistributorAuthentication = require("../models/Distributor.Authentication");

module.exports = {
  //@dev user input validation
  validateDistributor: async (req, res, next) => {
    const newDistributorSchema = new Joi.object({
      newNode: Joi.string().required().min(16).max(16),
      first_name: Joi.string().required(),
      isAdmin: Joi.boolean(),
      middle_name: Joi.string().min(0),
      last_name: Joi.string().required(),
      referrer: Joi.string(),
      // referrer: Joi.string().min(16).max(16),
      amount: Joi.string().required(),
      phone: Joi.string().min(10).max(14).required(),
      createdAt: Joi.string().required(),
      expiresAt: Joi.string().required(),
    });

    const { error } = newDistributorSchema.validate(req.body);

    // @dev if there is error while validation return on response
    if (error && error.details)
      return res.status(400).send(error.details[0].message);

    try {
      // // @dev calidate if the user phone number is already used or not
      // const phoneExist = await DistributorAuthentication.findOne({
      //   phone_number: req.body.phone,
      // });

      // if (phoneExist)
      //   return res.status(400).json({
      //     message: "User with given phone already exists!",
      //   });
      // else next();
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
