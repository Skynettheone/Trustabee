import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SampleSubmission } from '../../pages/farmer/SampleSubmissionStepper';

export interface Sample extends SampleSubmission {
  id: string;
  status: 'pending' | 'collected' | 'analyzed' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
}

interface FarmerState {
  samples: Sample[];
  loading: boolean;
  error: string | null;
}

const initialState: FarmerState = {
  samples: [],
  loading: false,
  error: null,
};

const farmerSlice = createSlice({
  name: 'farmer',
  initialState,
  reducers: {
    addSample: (state, action: PayloadAction<Sample>) => {
      state.samples.push(action.payload);
    },
    updateSampleStatus: (state, action: PayloadAction<{ id: string; status: Sample['status'] }>) => {
      const sample = state.samples.find(s => s.id === action.payload.id);
      if (sample) {
        sample.status = action.payload.status;
        sample.updatedAt = new Date().toISOString();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addSample,
  updateSampleStatus,
  setLoading,
  setError,
} = farmerSlice.actions;

export default farmerSlice.reducer; 