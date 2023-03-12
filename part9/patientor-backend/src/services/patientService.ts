import { v1 as uuid } from "uuid";

import patients from "../../data/patients";

import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id = uuid();
  const patient = {
    id,
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

const addEntry = (patient: Patient, newEntry: EntryWithoutId): Entry => {
  const id = uuid();
  const entry = {
    id,
    ...newEntry,
  };
  patient.entries.push(entry);
  return entry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};
