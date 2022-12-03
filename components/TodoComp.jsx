import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
  Fab,
  Grid,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function TodoComp() {
  const [expanded, setExpanded] = useState(false);
  const [disable, setDisable] = useState(true);
  const [value, setValue] = useState("Lorem ipsum dolor sit amet");

  return (
    <Accordion
      expanded={expanded}
      onChange={(e, expanded) => {
        if (expanded) {
          setDisable(true);
        }
      }}
    >
      <AccordionSummary sx={{ width: "100%" }}>
        <Grid xs={12} spacing={1} container sx={{ width: "100%" }}>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              onClick={() => setExpanded((prevState) => !prevState)}
              sx={{ flexGrow: "1" }}
            >
              test
            </Typography>
          </Grid>
          <Grid item xs={1.5}>
            <Fab size="small" color="success">
              <EditOutlinedIcon onClick={() => setDisable(false)} />
            </Fab>
          </Grid>
          <Grid item xs={1.5}>
            <Fab size="small" color="secondary">
              <DeleteOutlinedIcon />
            </Fab>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          id="filled-multiline-flexible"
          //   label="Multiline"
          multiline
          maxRows={5}
          minRows={3}
          disabled={disable}
          sx={{ width: "100%" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
        />
      </AccordionDetails>
    </Accordion>
  );
}
