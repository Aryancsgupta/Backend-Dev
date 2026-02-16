const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../employees.json");

function readData() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

exports.createEmployee = async (req, res) => {
  const employees = readData();

  const newEmployee = {
    id: Date.now().toString(),
    ...req.body
  };

  employees.push(newEmployee);
  writeData(employees);

  res.status(201).json(newEmployee);
};

exports.getEmployees = async (req, res) => {
  const employees = readData();
  res.status(200).json(employees);
};

exports.getEmployee = async (req, res) => {
  const employees = readData();
  const emp = employees.find(e => e.id === req.params.id);

  if (!emp) return res.status(404).json({ message: "Not found" });

  res.status(200).json(emp);
};

exports.updateEmployee = async (req, res) => {
  let employees = readData();
  const index = employees.findIndex(e => e.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  employees[index] = { ...employees[index], ...req.body };
  writeData(employees);

  res.status(200).json(employees[index]);
};

exports.deleteEmployee = async (req, res) => {
  let employees = readData();
  const newList = employees.filter(e => e.id !== req.params.id);

  writeData(newList);

  res.status(200).json({ message: "Deleted" });
};

exports.calculateSalary = async (req, res) => {
  const employees = readData();
  const emp = employees.find(e => e.id === req.params.id);

  if (!emp) return res.status(404).json({ message: "Not found" });

  const basic = Number(emp.basicSalary);
  const hra = basic * 0.2;
  const da = basic * 0.1;
  const pf = basic * 0.05;
  const netSalary = basic + hra + da - pf;

  res.status(200).json({
    basic,
    hra,
    da,
    pf,
    netSalary
  });
};
