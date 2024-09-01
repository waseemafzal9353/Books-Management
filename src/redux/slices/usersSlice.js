import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    username: '',
    email: '',
  },
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action) => {
      const { username, email } = action.payload;
      state.userInfo.username = username;
      state.userInfo.email = email;
    },
  },
});

export const { userInfo } = usersSlice.actions;
export default usersSlice.reducer;