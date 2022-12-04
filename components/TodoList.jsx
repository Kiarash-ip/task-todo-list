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
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { wrapper, State } from "../redux/store";
import { selectTodosState } from "../redux/todosSlice";
import { setInitState } from "../redux/todosSlice";

export default function TodoList({ todos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const state = useSelector(selectTodosState);
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log(state);

  useEffect(() => {
    dispatch(setInitState());
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
      <Box sx={{ bgcolor: "#0d47a1", height: "100vh", borderRadius: "5px" }}>
        {state.map((todo) => {
          return (
            <TodoComp
              key={todo.id}
              id={todo.id}
              subject={todo.subject}
              description={todo.description}
              isDone={todo.isDone}
            />
          );
        })}
      </Box>
      <ModalComp modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Container>
  );
}
