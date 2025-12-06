import { type StateCreator } from "zustand";


export interface LandingSlice {
  
    conctactForm: {
   name: string;
    email: string;
    message: string;
      };



  


}


export const createLandingSlice: StateCreator<LandingSlice> = (set) => ({
  
    conctactForm: {
   name: "",
    email: "",
    message: "",
      },
  
});