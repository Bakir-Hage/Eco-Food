import {
  getDocs,
  collection,
  setDoc,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "./firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

/***************************************************** */
// Function to sign up a new user and store their information in Firestore
/***************************************************** */
export const signUpNewUser = async (
  email: string,
  password: string,
  // latitude: number, // add latitude and longitude parameters after linking the location picker with google maps
  // longitude: number,
  phoneNumber: string,
  userName: string,
) => {
  if (
    !email ||
    !password ||
    // !latitude ||
    // !longitude ||
    !phoneNumber ||
    !userName
  ) {
    return { success: false, error: "Missing required fields" };
  }
  const phoneQuery = await getDocs(
    query(collection(db, "Users"), where("phoneNumber", "==", phoneNumber)),
  );
  if (!phoneQuery.empty)
    return { success: false, error: "phone-already-in-use" };
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const UID = userCredential.user.uid;
    await setDoc(doc(db, "Users", UID), {
      // location: location,
      phoneNumber: phoneNumber,
      userName: userName,
    });
    return { success: true, UID };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use")
      return { success: false, error: "email-already-in-use" };

    return { success: false, error: "something-went-wrong" };
  }
};
/***************************************************** */
//sign in / sign up with google
/***************************************************** */

export const signInWithGoogle = async (mode: "login" | "signup") => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "Users", user.uid));
    const isExistingUser = userDoc.exists();

    if (mode === "signup" && isExistingUser)
      return { success: false, error: "account-already-exists" };

    if (mode === "login" && !isExistingUser)
      return { success: false, error: "no-account-found" };

    if (!isExistingUser) {
      await setDoc(doc(db, "Users", user.uid), {
        userName: user.displayName,
        phoneNumber: user.phoneNumber ?? "",
      });
    }
    return { success: true, UID: user.uid };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    if (
      error instanceof FirebaseError &&
      error.code === "auth/popup-closed-by-user"
    )
      return { success: false, error: "popup-closed" };

    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to sign in an existing user with email and password
/***************************************************** */
export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, UID: userCredential.user.uid };
  } catch (error: any) {
    console.log("Firebase auth error:", error);
    console.log("Error code:", error.code);
    console.log("Error message:", error.message);

    if (error.code === "auth/invalid-credential")
      return { success: false, error: "wrong-password-or-email" };

    return { success: false, error: "something-went-wrong" };
  }
};
