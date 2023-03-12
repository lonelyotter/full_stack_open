import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { EntryWithoutId } from "../types";

const EntryForm = ({ codes }: { codes: string[] }) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<string>("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const id = useParams().id as string;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (type === "HealthCheck") {
        const newEntry: EntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          healthCheckRating,
        };
        patientService.addEntry(id, newEntry);
      } else if (type === "Hospital") {
        const newEntry: EntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };
        patientService.addEntry(id, newEntry);
      } else if (type === "OccupationalHealthcare") {
        const newEntry: EntryWithoutId = {
          description,
          date,
          specialist,
          diagnosisCodes,
          type,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
        patientService.addEntry(id, newEntry);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 5000);
      }
    }
  };

  const style = {
    border: "1px dashed grey",
    margin: "5px",
    padding: "5px",
  };
  return (
    <div style={style}>
      <h3>Entry form</h3>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <TextField
          label="description"
          fullWidth
          InputLabelProps={{ shrink: true }}
          style={{ margin: "5px" }}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          type={"date"}
          fullWidth
          InputLabelProps={{ shrink: true }}
          style={{ margin: "5px" }}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          InputLabelProps={{ shrink: true }}
          style={{ margin: "5px" }}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel id="code-label">Codes</InputLabel>
        <Select
          id="code-label"
          multiple
          fullWidth
          value={diagnosisCodes}
          style={{ margin: "5px" }}
          onChange={(event) => {
            const { value } = event.target;
            setDiagnosisCodes(
              typeof value === "string" ? value.split(",") : value
            );
          }}
        >
          {codes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          id="type-label"
          fullWidth
          value={type}
          style={{ margin: "5px" }}
          onChange={(event) => {
            const { value } = event.target;
            setType(value);
          }}
        >
          <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>
            OccupationalHealthcare
          </MenuItem>
        </Select>
        {type === "HealthCheck" && (
          <div>
            <InputLabel id="health-check-label">Health check rating</InputLabel>
            <Select
              id="health-check-label"
              fullWidth
              value={healthCheckRating}
              style={{ margin: "5px" }}
              onChange={(event) => {
                const { value } = event.target;
                setHealthCheckRating(Number(value));
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </div>
        )}
        {type === "Hospital" && (
          <div>
            <TextField
              label="discharge date"
              type={"date"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: "5px" }}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="discharge criteria"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: "5px" }}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        )}
        {type === "OccupationalHealthcare" && (
          <div>
            <TextField
              label="employer name"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: "5px" }}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="sick leave start date"
              type={"date"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: "5px" }}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="sick leave end date"
              type={"date"}
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ margin: "5px" }}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </div>
        )}
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
