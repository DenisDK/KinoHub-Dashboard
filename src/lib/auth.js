// auth.js
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "./firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Проверяем, есть ли пользователь в базе данных
    const userDocRef = doc(db, "Users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        nickname: user.displayName,
        profile_image: user.photoURL,
        friends: [],
        isPremium: false,
        isAdmin: false,
        AbandonedMovies: [],
        PlannedMovies: [],
        WatchedMovies: [],
      });
    }
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
