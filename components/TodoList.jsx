import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Typography,
  Modal,
  Box,
  TextField,
  Button,
  Fab,
  Grid,
} from "@mui/material";
import TodoComp from "./TodoComp";
import { useTheme } from "@emotion/react";
import ModalComp from "./ModalComp";
import { useDispatch } from "react-redux";

export default function TodoList({ todoItems }) {
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "set_init_state",
      payload: localStorage.getItem("todos") || [],
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography variant="h1" align="center">
        Todo List
      </Typography>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ marginBottom: theme.spacing(2) }}
      >
        Add New Todo
      </Button>
      <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        {[1, 2, 3].map((todo) => {
          return <TodoComp />;
        })}
      </Box>
      <ModalComp modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
}
