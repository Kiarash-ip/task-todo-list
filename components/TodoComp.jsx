import React, { useState, useRef, useTransition } from "react";
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../redux/todosSlice";

import { styled } from "@mui/material";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root.Mui-disabled > input": {
    "-webkit-text-fill-color": "#000",
  },
  "& .MuiInputBase-root.Mui-disabled > textarea": {
    WebkitTextFillColor: "#000",
  },
});

export default function TodoComp({ subject, description, id, isDone }) {
  const [expanded, setExpanded] = useState(false);
  const [disable, setDisable] = useState(true);
  const [subjectValue, setSubjectValue] = useState(subject);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const subjectValueRef = useRef();
  const descriptionValueRef = useRef();
  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();

  function deleteTodoHandler(todoId) {
    dispatch(deleteTodo({ id: todoId }));
  }

  function editTodoHandler(todoId) {
    dispatch(
      editTodo({
        id: todoId,
        subject: subjectValueRef.current.value,
        description: descriptionValueRef.current.value,
      })
    );
    setDisable(true);
  }

  function cancelEditHandler() {
    subjectValueRef.current.value = subject;
    descriptionValueRef.current.value = description;
    setDisable(true);
  }

  function isDoneHandler(todoId) {
    let done;
    if (isDone) {
      done = false;
    } else {
      done = true;
    }
    dispatch(
      editTodo({
        id: todoId,
        isDone: done,
      })
    );
  }

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary sx={{ width: "100%" }}>
        <Grid
          spacing={1}
          container
          columnGap={2}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Grid flexGrow={1}>
            <CustomTextField
              id="filled-multiline-flexible"
              disabled={disable}
              color="primary"
              sx={{
                width: "100%",
                textDecoration: `${isDone ? "line-through" : "none"}`,
              }}
              onClick={() => {
                if (disable) {
                  setExpanded((prevState) => !prevState);
                }
              }}
              defaultValue={subjectValue}
              inputRef={subjectValueRef}
              variant="outlined"
            />
          </Grid>
          <Grid>
            {!isDone && disable ? (
              <Fab size="small" color="primary">
                <DoneAllIcon onClick={() => isDoneHandler(id)} />
              </Fab>
            ) : isDone && disable ? (
              <Fab size="small" color="primary">
                <RemoveDoneIcon onClick={() => isDoneHandler(id)} />
              </Fab>
            ) : (
              <></>
            )}
          </Grid>
          <Grid>
            {disable ? (
              <Fab size="small" color="success" disabled={isDone}>
                <EditOutlinedIcon
                  onClick={() => {
                    setExpanded(true);
                    startTransition(() => {
                      setDisable(false);
                    });
                  }}
                />
              </Fab>
            ) : (
              <Fab size="small" color="error">
                <CloseIcon onClick={() => cancelEditHandler()} />
              </Fab>
            )}
          </Grid>
          <Grid>
            {disable ? (
              <Fab
                size="small"
                color="secondary"
                onClick={() => deleteTodoHandler(id)}
              >
                <DeleteOutlinedIcon />
              </Fab>
            ) : (
              <Fab size="small" color="success">
                <CheckIcon onClick={() => editTodoHandler(id)} />
              </Fab>
            )}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <CustomTextField
          id="filled-multiline-flexible"
          //   label="Multiline"
          multiline
          maxRows={5}
          minRows={3}
          disabled={disable}
          sx={{ width: "100%" }}
          defaultValue={descriptionValue}
          inputRef={descriptionValueRef}
          variant="outlined"
        />
      </AccordionDetails>
    </Accordion>
  );
}
