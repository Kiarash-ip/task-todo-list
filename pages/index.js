import Head from "next/head";
import { Container } from "@mui/material";
import TodoList from "../components/TodoList";
import { ThemeProvider } from "@mui/system";
import { theme } from "../styles/theme";

export default function Home() {
  // console.log(todos);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <title>Todo List</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TodoList />
      </div>
    </ThemeProvider>
  );
}
