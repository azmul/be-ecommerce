import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import Patient, { PatientDocument } from "../models/patient";

export async function findUser(query: FilterQuery<PatientDocument>) {
  return Patient.findOne(query).lean();
}

export async function validatePassword({
  email,
  password,
}: {
  email: PatientDocument["email"];
  password: string;
}) {
  const user = await Patient.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
