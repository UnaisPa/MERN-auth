import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false
        },
        signInFailure:(state,action)=>{
            state.loading = false;
            state.error=action.payload;
        },
        signOut:(state)=>{
            state.loading=false,
            state.error=null,
            state.currentUser=null
        },
        updateCurrentUser:(state,action)=>{
            state.currentUser=action.payload
        }
    }
})

export const {signInFailure,signInStart,signInSuccess,signOut,updateCurrentUser} = userSlice.actions;
export default userSlice.reducer;