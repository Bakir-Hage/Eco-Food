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
    if (error.code === "auth/invalid-credential")
      return { success: false, error: "wrong-password-or-email" };

    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to get all food items from Firestore
/***************************************************** */
export const getAllFoodItems = async () => {
  try {
    const foodCollection = collection(db, "Food");
    const foodSnapshot = await getDocs(foodCollection);
    const foodItems = foodSnapshot.docs.map((doc) => {
      const data = doc.data();
      const expiresAtValue = data.expiresAt;
      let expiresAt = expiresAtValue;

      if (expiresAtValue?.toDate) {
        expiresAt = expiresAtValue.toDate().toISOString();
      } else if (expiresAtValue instanceof Date) {
        expiresAt = expiresAtValue.toISOString();
      }

      return {
        id: doc.id,
        ...data,
        expiresAt,
      };
    });
    return { success: true, foodItems };
  } catch (error) {
    console.error("Error fetching food items:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to add a new food item to Firestore
/***************************************************** */
export const addFoodItem = async (foodData: {
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  expiresAt: Date;
  description: string;
}) => {
  try {
    const newFoodRef = doc(collection(db, "Food"));
    await setDoc(newFoodRef, foodData);
    return { success: true, id: newFoodRef.id };
  } catch (error) {
    console.error("Error adding food item:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to get a single food item by ID from Firestore
/***************************************************** */
export const getFoodItemById = async (id: string) => {
  try {
    const foodDoc = await getDoc(doc(db, "Food", id));
    if (foodDoc.exists()) {
      return { success: true, foodItem: { id: foodDoc.id, ...foodDoc.data() } };
    } else {
      return { success: false, error: "food-item-not-found" };
    }
  } catch (error) {
    console.error("Error fetching food item:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to get food items by category from Firestore
/***************************************************** */
export const getFoodItemsByCategory = async (category: string) => {
  try {
    const foodCollection = collection(db, "Food");
    const categoryQuery = query(
      foodCollection,
      where("category", "==", category),
    );
    const foodSnapshot = await getDocs(categoryQuery);
    const foodItems = foodSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, foodItems };
  } catch (error) {
    console.error("Error fetching food items by category:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to get food items by price range from Firestore
/***************************************************** */
export const getFoodItemsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
) => {
  try {
    const foodCollection = collection(db, "Food");
    const priceQuery = query(
      foodCollection,
      where("discountedPrice", ">=", minPrice),
      where("discountedPrice", "<=", maxPrice),
    );
    const foodSnapshot = await getDocs(priceQuery);
    const foodItems = foodSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { success: true, foodItems };
  } catch (error) {
    console.error("Error fetching food items by price range:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to add food item to user's cart in Firestore
/***************************************************** */
export const addToCart = async (userId: string, foodItemId: string) => {
  try {
    const userCartRef = doc(db, "Carts", userId);
    const userCartDoc = await getDoc(userCartRef);
    if (userCartDoc.exists()) {
      const existingCart = userCartDoc.data();
      const updatedCart = {
        ...existingCart,
        items: [...(existingCart?.items || []), foodItemId],
      };
      await setDoc(userCartRef, updatedCart);
    } else {
      await setDoc(userCartRef, { items: [foodItemId] });
    }
    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

export const getUserCartDetails = async (userId: string) => {
  try {
    const userCartRef = doc(db, "Carts", userId);
    const userCartDoc = await getDoc(userCartRef);

    if (!userCartDoc.exists()) {
      return { success: true, cartItems: [] as any[] };
    }

    const existingCart = userCartDoc.data();
    const itemIds: string[] = existingCart?.items || [];
    const quantityMap = itemIds.reduce<Record<string, number>>((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const cartItems: any[] = [];
    for (const id of Object.keys(quantityMap)) {
      const foodDoc = await getDoc(doc(db, "Food", id));
      if (foodDoc.exists()) {
        cartItems.push({
          foodItem: { id: foodDoc.id, ...(foodDoc.data() as any) },
          quantity: quantityMap[id],
        });
      }
    }

    return { success: true, cartItems };
  } catch (error) {
    console.error("Error loading cart details:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

export const updateCart = async (userId: string, items: string[]) => {
  try {
    const userCartRef = doc(db, "Carts", userId);
    await setDoc(userCartRef, { items });
    return { success: true };
  } catch (error) {
    console.error("Error updating cart:", error);
    return { success: false, error: "something-went-wrong" };
  }
};

/***************************************************** */
// Function to delete user cart from Firestore
/***************************************************** */
export const clearCart = async (userId: string) => {
  try {
    await setDoc(doc(db, "Carts", userId), { items: [] });
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return { success: false, error: "something-went-wrong" };
  }
};
