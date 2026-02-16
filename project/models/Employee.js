import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    joiningDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
