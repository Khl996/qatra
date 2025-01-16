import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PointsState {
    points: number;
    history: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PointsState = {
    points: 0,
    history: [],
    loading: false,
    error: null
};

const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPoints: (state, action: PayloadAction<number>) => {
            state.points = action.payload;
        },
        setHistory: (state, action: PayloadAction<any[]>) => {
            state.history = action.payload;
        },
        addPoints: (state, action: PayloadAction<number>) => {
            state.points += action.payload;
        }
    }
});

export const { setPoints, setHistory, addPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
