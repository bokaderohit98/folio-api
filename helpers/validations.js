/* eslint-disable camelcase */
const bcrypt = require("bcryptjs");

/**
 * Validate email
 * @param {string} - email
 * @return {boolean} - whether email is valid or not
 */
exports.validateEmail = email => {
  const emailRegExp = RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegExp.test(email.trim());
};

/**
 * Validate Login details
 * @param {object} -request body
 * @returns {Object} - containing request body and error object
 */
exports.validateLoginDetails = ({ email, password, otp }, type) => {
  let errorMessage = "";

  if (!email || !email.trim() || !exports.validateEmail(email))
    errorMessage = "Invalid email";
  else if (type === "password" && (!password || !password.trim()))
    errorMessage = "Invalid password";
  else if (type === "otp" && !otp) errorMessage = "Invalid OTP";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      email: email.trim(),
      password: password && password.trim(),
      otp: otp && otp.trim()
    },
    error: null
  };
};

/**
 * Validates the basic details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateBasicDetails = ({
  name,
  email,
  password,
  dob,
  gender,
  social_handles
}) => {
  let errorMessage = "";

  if (!name || !name.trim()) errorMessage = "Missing name";
  if (!email || !email.trim() || !exports.validateEmail(email))
    errorMessage = "Invalid email";
  else if (!password || !password.trim()) errorMessage = "Missing Password";
  else if (!dob) errorMessage = "Missing Date of Birth";
  else if (!gender || !gender.trim()) errorMessage = "Missing gender";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      dob,
      gender: gender.trim(),
      social_handles
    },
    error: {}
  };
};

/**
 * Validate updated details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedDetails = async ({
  name,
  gender,
  dob,
  social_handles,
  password
}) => {
  let errorMessage = "";

  if (name && !name.trim()) errorMessage = "Invalid name";
  else if (gender && !gender.trim()) errorMessage = "Invalid gender";
  else if (dob > new Date().valueOf()) errorMessage = "Invalid Date of Birth";
  else if (password && !password.trim()) errorMessage = "Invalid password";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (name) body.name = name;
  if (gender) body.gender = gender;
  if (dob) body.dob = dob;
  if (password) body.password = await bcrypt.hash(password, 10);
  if (social_handles) body.social_handles = social_handles;

  return {
    body,
    error: null
  };
};

/**
 * Validates Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateEducation = ({
  from,
  to,
  institute,
  degree,
  specialization
}) => {
  let errorMessage = "";

  if (!from) errorMessage = "Missing starting date";
  else if (!to) errorMessage = "Missing ending date";
  else if (to < from) errorMessage = "Invalid date range";
  else if (!institute || !institute.trim())
    errorMessage = "Missing institute name";
  else if (!degree || !degree.trim()) errorMessage = "Missing Degree";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      from,
      to,
      institute: institute.trim(),
      degree: degree.trim(),
      specialization: specialization && specialization.trim()
    },
    error: null
  };
};

/**
 * Validates Updated Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedEducation = ({
  from,
  to,
  institute,
  degree,
  specialization
}) => {
  let errorMessage = "";

  if (to && from && to < from) errorMessage = "Invalid date range";
  else if (institute && !institute.trim())
    errorMessage = "Invalid institute name";
  else if (degree && !degree.trim()) errorMessage = "Invalid degree";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (from) body.from = from;
  if (to) body.to = to;
  if (institute) body.institute = institute;
  if (degree) body.degree = degree;
  body.specialization = specialization;

  return {
    body,
    error: null
  };
};

/**
 * Validates Work details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateWork = ({ from, to, organization, position }) => {
  let errorMessage = "";

  if (!from) errorMessage = "Invalid starting date";
  else if (!to) errorMessage = "Invalid ending date";
  else if (to < from) errorMessage = "Invalid date range";
  else if (!organization || !organization.trim())
    errorMessage = "Missing organization name";
  else if (!position || !position.trim()) errorMessage = "Missing Position";

  if (errorMessage) return { body: null, error: { error: errorMessage } };
  return {
    body: {
      from,
      to,
      organization: organization.trim(),
      position: position.trim()
    },
    error: null
  };
};

/**
 * Validates Updated Education details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedWork = ({ from, to, organization, position }) => {
  let errorMessage = "";

  if (to && from && to < from) errorMessage = "Invalid date range";
  else if (organization && !organization.trim())
    errorMessage = "Invalid organization name";
  else if (position && !position.trim()) errorMessage = "Invalid Position";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (from) body.from = from;
  if (to) body.to = to;
  if (organization) body.organization = organization;
  if (position) body.position = position;

  return {
    body,
    error: null
  };
};

/**
 * Validates achivement details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateAchivement = ({ date, title, description }) => {
  let errorMessage = "";

  if (!date) errorMessage = "Missing date";
  else if (!title || !title.trim()) errorMessage = "Missing title";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  return {
    body: {
      date,
      title: title.trim(),
      description: description && description.trim()
    },
    error: null
  };
};

/**
 * Validates Updated achivement details
 * @param {Object} - request body
 * @returns {Object} - containing request body and error object
 */
exports.validateUpdatedAchivement = ({ date, title, description }) => {
  let errorMessage = "";

  if (title && !title.trim()) errorMessage = "Invalid title";

  if (errorMessage) return { body: null, error: { error: errorMessage } };

  const body = {};
  if (date) body.date = date;
  if (title) body.title = title;
  body.description = description;

  return {
    body,
    error: null
  };
};
