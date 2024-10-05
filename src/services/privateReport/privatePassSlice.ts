import {createSlice} from '@reduxjs/toolkit';

const privatePassSlice = createSlice({
    name: 'privatePass',
    initialState: {
        isPrivatePassVerified: false,
    },
    reducers: {
        setPrivatePassVerified: (state, action) => {
            state.isPrivatePassVerified = action.payload;
        },
    },
});

export const {setPrivatePassVerified} = privatePassSlice.actions;
export default privatePassSlice.reducer;
