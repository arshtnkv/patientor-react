import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"; // Импорт иконки HealthAndSafetyIcon
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../../../../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Box
      style={{
        border: "1px solid gray",
        borderRadius: "5px",
        padding: "1em",
        marginBottom: "1em",
      }}
    >
      <Typography variant="body1">
        <strong>{entry.date}</strong>: {entry.description}
      </Typography>
      <Typography variant="body2">Specialist: {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}

      {(() => {
        switch (entry.type) {
          case "Hospital":
            return (
              <>
                <LocalHospitalIcon /> {/* Иконка для Hospital */}
                <Typography>Discharge: {entry.discharge.date}</Typography>
                <Typography>Criteria: {entry.discharge.criteria}</Typography>
              </>
            );
          case "OccupationalHealthcare":
            return (
              <>
                <WorkIcon /> {/* Иконка для OccupationalHealthcare */}
                <Typography>Employer: {entry.employerName}</Typography>
                {entry.sickLeave && (
                  <Typography>
                    Sick leave: {entry.sickLeave.startDate} -{" "}
                    {entry.sickLeave.endDate}
                  </Typography>
                )}
              </>
            );
          case "HealthCheck":
            return (
              <>
                <HealthAndSafetyIcon /> {/* Иконка для HealthCheck */}
                <Typography>
                  Health Rating:{" "}
                  <FavoriteIcon
                    style={{
                      color:
                        entry.healthCheckRating === HealthCheckRating.Healthy
                          ? "green"
                          : entry.healthCheckRating ===
                            HealthCheckRating.LowRisk
                          ? "yellow"
                          : entry.healthCheckRating ===
                            HealthCheckRating.HighRisk
                          ? "orange"
                          : "red",
                    }}
                  />
                </Typography>
              </>
            );
          default:
            throw new Error(`Unhandled entry type`);
        }
      })()}
    </Box>
  );
};

export default EntryDetails;
