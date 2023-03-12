import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import EntryDetails from "./EntryDetails";

import { Patient, Diagnosis } from "../types";
import EntryForm from "./EntryForm";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getById(id);
        setPatient(patient);
      };
      const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      };
      void fetchPatient();
      void fetchDiagnoses();
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <EntryForm codes={diagnoses.map((diagnosis) => diagnosis.code)} />
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
