const initalState = {
  todos: [],
};

export function reducer(state = initalState, action) {
  switch (action.type) {
    case "set_init_state":
      state.todos = action.payload;
      console.log(state);
      return;
  }
}
