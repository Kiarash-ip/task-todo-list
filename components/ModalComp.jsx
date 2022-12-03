import React, { useRef } from "react";
import {
  Typography,
  Modal,
  Box,
  TextField,
  Button,
  Fab,
  Grid,
} from "@mui/material";
import { modalStyles } from "../styles/modal";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";

export default function ModalComp({ modalOpen, setModalOpen }) {
  const modalSubjectRef = useRef("");
  const modalDesRef = useRef("");
  const theme = useTheme();

  return (
    <Modal open={modalOpen}>
      <Box sx={modalStyles.box}>
        <Grid
          container
          sx={{ alignItems: "center", marginBottom: theme.spacing(2) }}
        >
          <Typography sx={{ flexGrow: "1" }}>Add New Todo</Typography>
          <Fab onClick={() => setModalOpen(false)} size="small" color="primary">
            <CloseIcon />
          </Fab>
        </Grid>
        <Grid container flexDirection={"column"} rowGap={theme.spacing(2)}>
          <TextField
            id="outlined-disabled"
            label="Subject"
            ref={modalSubjectRef}
            defaultValue=""
          />
          <TextField
            id="filled-multiline-flexible"
            label="Description"
            ref={modalDesRef}
            multiline
            maxRows={5}
            minRows={3}
            variant="outlined"
          />
          <Button variant="contained" color="primary">
            Create
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
