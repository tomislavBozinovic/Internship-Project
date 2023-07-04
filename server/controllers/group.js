const { validationResult } = require('express-validator');
const Group = require('../models/groups');
const loggerHelper = require('../logger/helper');
const { setServerErrorMessage } = require('../constants/helper');
const sendEmail = require('../node-mailer/index');
const infoMessages = require('../constants/info');
const { saveImage } = require('../constants/helper');

const createGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { group: groupData, img } = req.body;
    const newGroup = Group(groupData);
    const group = await Group.findOne({ name: newGroup.name });
    if (group) {
      loggerHelper.logGroupNameExists();
      return res.status(409).json({ message: infoMessages.GROUP_NAME_EXISTS});
    }
    if (img) {
      const publicId = await saveImage(img);
      newGroup.imagePublicId = publicId;
    }
    loggerHelper.logOperationSuccessful(req);
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const fetchGroups = async (req, res) => {
  try {
    const groups = await Group.find({});
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json({ totalResults: groups.length, groups });
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const fetchGroup = async (req, res) => {
  try {
    const withEmployees = req.body.populate || false;
    const query = withEmployees
      ? () => Group.findById(req.params.id).populate('employees')
      : () => Group.findById(req.params.id);
    const group = await query();
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json(group);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const deleteGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const group = await Group.findByIdAndDelete(id);
    loggerHelper.logOperationSuccessful(req);
    res.status(202).json(group);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

const updateGroup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    loggerHelper.logValidationErrors(errors, req);
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { group, img } = req.body;
    if (img) {
      const publicId = await saveImage(img);
      group.imagePublicId = publicId;
    }
    const groupUpdate = await Group
      .findByIdAndUpdate(req.params.id, group, { returnOriginal: false });
    if(!groupUpdate) {
      loggerHelper.logGroupNotFound();
      return res.status(404).json({ message: infoMessages.GROUP_NOT_FOUND });
    }
    loggerHelper.logOperationSuccessful(req);
    res.status(200).json(groupUpdate);
  } catch (error) {
    sendEmail(setServerErrorMessage(req, error));
    loggerHelper.logServerError(error, req);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  fetchGroup,
  createGroup,
  fetchGroups,
  deleteGroup,
  updateGroup
}