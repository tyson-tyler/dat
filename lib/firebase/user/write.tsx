import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const createUser = async ({ uid, displayName, photoURL }: any) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      displayName: displayName,
      photoURL: photoURL ?? "",
      timestampCreate: Timestamp.now(),
    },
    { merge: true }
  );
};

export const updateFavorites = async ({ uid, list }: any) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      favorites: list,
    },
    {
      merge: true,
    }
  );
};

export const updateCarts = async ({ uid, list }: any) => {
  await setDoc(
    doc(db, `users/${uid}`),
    {
      carts: list,
    },
    {
      merge: true,
    }
  );
};
