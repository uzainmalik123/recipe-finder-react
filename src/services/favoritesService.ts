import { db } from "@/firebase/firebase";
import type { Favorite } from "@/types/favorite.types";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export async function addFavorite(
  userId: string,
  recipeId: string,
  recipeName: string,
  recipeThumbnail?: string
): Promise<void> {
  const favoriteRef = doc(db, "favorites", `${userId}_${recipeId}`);
  await setDoc(favoriteRef, {
    userId,
    recipeId,
    recipeName,
    recipeThumbnail,
    createAt: new Date().toISOString(),
  });
}

export async function removeFavorite(userId: string, recipeId: string): Promise<void> {
  const favoriteRef = doc(db, "favorites", `${userId}_${recipeId}`);
  await deleteDoc(favoriteRef);
}

export async function getUserFavorites(userId: string): Promise<Favorite[]> {
  const favoriteRef = collection(db, "favorites");
  const q = query(favoriteRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Favorite);
}

export async function isFavorited(userId: string, recipeId: string): Promise<boolean> {
  const favoriteRef = doc(db, "favorites", `${userId}_${recipeId}`);
  const snapshot = await getDoc(favoriteRef);
  return snapshot.exists();
}
