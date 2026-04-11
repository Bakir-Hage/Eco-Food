import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser, signUpNewUser } from "../Config/firebaseLogic";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Config/firebaseConnection";

export const signupUser = createAsyncThunk(
  "user/signup",
  async (
    {
      email,
      password,
      phoneNumber,
      userName,
    }: {
      email: string;
      password: string;
      phoneNumber: string;
      userName: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await signUpNewUser(
        email,
        password,
        phoneNumber,
        userName,
      );
      if (result.success) {
        const uid = result.UID as string;
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            uid,
            email,
            userName: data.userName || null,
            phoneNumber: data.phoneNumber || null,
          };
        } else {
          return rejectWithValue("User profile not found");
        }
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue("something-went-wrong");
    }
  },
);
export const loginUser = createAsyncThunk(
  "user/signin",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await signInUser(email, password);
      if (result.success) {
        const uid = result.UID as string;
        const userDoc = await getDoc(doc(db, "Users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          return {
            uid,
            email,
            userName: data.userName || null,
            phoneNumber: data.phoneNumber || null,
          };
        } else {
          return rejectWithValue("User profile not found");
        }
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue("something-went-wrong");
    }
  },
);

// export const signInWithGoogle = createAsyncThunk(
//   "user/signInWithGoogle",
//   async (mode: "login" | "signup", { rejectWithValue }) => {
//     try {
//       const result = await signInWithGoogle(mode);
//       if (result.success) {
//         return result.UID;
//       } else {
//         return rejectWithValue(result.error);
//       }
//     } catch (error) {
//       return rejectWithValue("something-went-wrong");
//     }
//   },
// );
