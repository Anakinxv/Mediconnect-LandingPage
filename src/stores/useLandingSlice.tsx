import { type StateCreator } from "zustand";
import {
  type ContactFormData,
  type NewsletterFormData,
} from "@/types/landingTypes";

export interface LandingSlice {
  isCarouselActive: boolean;
  setisCarouselActive: (active: boolean) => void;

  conctactForm: ContactFormData;
  newletterForm?: NewsletterFormData;
  setcontactForm: (form: ContactFormData) => void;
  setnewsletterForm: (form: NewsletterFormData) => void;
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
  newletterForm: {
    email: "",
  },
  setnewsletterForm: (form: NewsletterFormData) =>
    set(() => ({
      newletterForm: form,
    })),

  setcontactForm: (form: ContactFormData) =>
    set(() => ({
      conctactForm: form,
    })),
});
