import { Entry, Diagnosis } from "../types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  const style = {
    border: "1px solid black",
    borderRadius: "5px",
    margin: "5px",
    padding: "5px",
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={style}>
          <div>
            {entry.date} <LocalHospitalIcon />
          </div>
          <div>
            <i>{entry.description}</i>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
              </li>
            ))}
          </ul>
          <div>
            discharge: {entry.discharge.date} {entry.discharge.criteria}
          </div>
          <div>diagnosed by: {entry.specialist}</div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={style}>
          <div>
            {entry.date} <WorkIcon /> {entry.employerName}
          </div>
          <div>
            <i>{entry.description}</i>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
              </li>
            ))}
          </ul>
          {entry.sickLeave && (
            <div>
              {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </div>
          )}
          <div>diagnosed by: {entry.specialist}</div>
        </div>
      );
    case "HealthCheck":
      return (
        <div style={style}>
          <div>
            {entry.date} <MedicalServicesIcon />
          </div>
          <div>
            <i>{entry.description}</i>
          </div>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code}{" "}
                {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
              </li>
            ))}
          </ul>
          <div>health check rating: {entry.healthCheckRating}</div>
          <div>diagnosed by: {entry.specialist}</div>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
