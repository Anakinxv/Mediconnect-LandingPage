import { type StateCreator } from "zustand";

export interface LandingSlice {
  isCarouselActive: boolean;
  setisCarouselActive: (active: boolean) => void;

  conctactForm: {
    name: string;
    email: string;
    message: string;
  };
}

export const createLandingSlice: StateCreator<LandingSlice> = (set) => ({
  isCarouselActive: false,
  setisCarouselActive: (active: boolean) =>
    set(() => ({
      isCarouselActive: active,
    })),
  conctactForm: {
    name: "",
    email: "",
    message: "",
  },
});
