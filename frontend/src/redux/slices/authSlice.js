import { createAppSlice } from "../createAppSlice";
import { fetchUser } from "../../services/userService";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    return { user, isLoggedIn: !!user };
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState: {
    status: "idle",
    ...getStoredUser(),
  },
  reducers: (create) => ({
    getUser: create.asyncThunk(
      async () => {
        const response = await fetchUser();
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.auths = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updateUser: (state, action) => {
      const user = action.payload;
      // localStorage.setItem("E_COM_TOKEN", user.token);
      // localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.isLoggedIn = !!user;
    },
  }),
});

const authReducer = authSlice.reducer;

// Action creators are generated for each case reducer function
export default authReducer;
export const { getUser, updateUser } = authSlice.actions;
