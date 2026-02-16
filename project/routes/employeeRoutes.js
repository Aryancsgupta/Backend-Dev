const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.post("/", controller.createEmployee);
router.get("/", controller.getEmployees);
router.get("/:id", controller.getEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);
router.get("/payroll/:id", controller.calculateSalary);

module.exports = router;
