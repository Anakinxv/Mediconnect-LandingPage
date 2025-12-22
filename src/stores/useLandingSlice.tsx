import { type StateCreator } from "zustand";
import { type ContactFormData } from "@/types/landingTypes";

export interface LandingSlice {
  isCarouselActive: boolean;
  setisCarouselActive: (active: boolean) => void;

  conctactForm: ContactFormData;

  setcontactForm: (form: ContactFormData) => void;
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

  setcontactForm: (form: ContactFormData) =>
    set(() => ({
      conctactForm: form,
    })),
});
