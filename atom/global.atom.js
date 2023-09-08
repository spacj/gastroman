import { atom, atomFamily } from "recoil";

export const userAtom = atom({
  key: "userStateAtom",
  default: null,
});
export const businessAtom = atom({
  key: "businessStateAtom",
  default: null,
});

export const imagesAtom = atom({
  key: "imageStateAtom",
  default: null,
});
export const menuAtom = atom({
  key: "menuStateAtom",
  default: [],
});
