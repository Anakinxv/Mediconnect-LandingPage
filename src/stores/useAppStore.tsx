import { create } from 'zustand'
import { createLandingSlice } from './useLandingSlice'
import { type LandingSlice} from './useLandingSlice'
export const useAppStore = create<LandingSlice>(createLandingSlice)