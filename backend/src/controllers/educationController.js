const Education = require("../models/Education");
const buildCrudController = require("../utils/crudFactory");

module.exports = buildCrudController(Education);
