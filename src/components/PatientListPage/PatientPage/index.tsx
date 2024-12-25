import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../../services/patients";
import { Gender, Patient } from "../../../types";
import { Box, CircularProgress, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./EntryDetails"; // Импортируем новый компонент для записи пациента

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id as string);
        setPatient(patient);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };
    void fetchPatient();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!patient) return <Typography variant="h5">Patient not found</Typography>;

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4">
        {patient.name} {genderIcon(patient.gender)}
      </Typography>
      <Typography variant="body1">SSN: {patient.ssn || "N/A"}</Typography>
      <Typography variant="body1">
        Date of Birth: {patient.dateOfBirth || "N/A"}
      </Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>

      <Typography variant="h5" style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries available.</Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} /> // Используем компонент EntryDetails для каждой записи
        ))
      )}
    </Box>
  );
};

export default PatientPage;
