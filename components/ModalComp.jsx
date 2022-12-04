import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todosSlice";
import { v4 as uuidv4 } from "uuid";

export default function ModalComp({ modalOpen, setModalOpen }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();

  function createTodoHandler() {
    dispatch(
      addTodo({
        id: uuidv4(),
        subject,
        description,
        isDone: false,
      })
    );
    setSubject("");
    setDescription("");
    setModalOpen(false);
  }

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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            defaultValue=""
          />
          <TextField
            id="filled-multiline-flexible"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            maxRows={5}
            minRows={3}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={createTodoHandler}
          >
            Create
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
}
