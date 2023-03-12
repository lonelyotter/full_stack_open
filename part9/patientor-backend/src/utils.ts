import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("type" in object) {
    switch (object.type) {
      case "HealthCheck":
        return toNewHealthCheckEntry(object);
      case "Hospital":
        return toNewHospitalEntry(object);
      case "OccupationalHealthcare":
        return toNewOccupationalHealthcareEntry(object);
      default:
        throw new Error("Incorrect or missing data");
    }
  }
  throw new Error("Incorrect or missing data");
};

const toNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "healthCheckRating" in object
  ) {
    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosticCodes(object.diagnosisCodes);
    }

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const toNewHospitalEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "discharge" in object
  ) {
    const newEntry: EntryWithoutId = {
      type: "Hospital",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      discharge: parseDischarge(object.discharge),
    };

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosticCodes(object.diagnosisCodes);
    }

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const toNewOccupationalHealthcareEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "employerName" in object
  ) {
    const newEntry: EntryWithoutId = {
      type: "OccupationalHealthcare",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      employerName: parseString(object.employerName),
    };

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = parseDiagnosticCodes(object.diagnosisCodes);
    }

    if ("sickLeave" in object) {
      newEntry.sickLeave = parseSickLeave(object.sickLeave);
    }

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === "number" || param instanceof Number;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing parameters" + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDiagnosticCodes = (codes: unknown): Array<Diagnosis["code"]> => {
  if (!codes) {
    return [];
  }
  if (!Array.isArray(codes)) {
    throw new Error("Incorrect or missing codes: " + codes);
  }
  codes.forEach((code) => {
    if (!isString(code)) {
      throw new Error("Incorrect or missing codes: " + codes);
    }
  });
  return codes as Array<Diagnosis["code"]>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param.toString());
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }
  if (
    "date" in discharge &&
    "criteria" in discharge &&
    isString(discharge.date) &&
    isDate(discharge.date) &&
    isString(discharge.criteria)
  ) {
    return discharge as Discharge;
  }
  throw new Error("Incorrect or missing discharge: " + discharge);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect or missing sickLeave: " + sickLeave);
  }
  if (
    "startDate" in sickLeave &&
    "endDate" in sickLeave &&
    isString(sickLeave.startDate) &&
    isDate(sickLeave.startDate) &&
    isString(sickLeave.endDate) &&
    isDate(sickLeave.endDate)
  ) {
    return sickLeave as SickLeave;
  }
  throw new Error("Incorrect or missing sickLeave: " + sickLeave);
};
