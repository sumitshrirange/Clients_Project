const Skill = require("../models/Skill");
const buildCrudController = require("../utils/crudFactory");

module.exports = buildCrudController(Skill);
