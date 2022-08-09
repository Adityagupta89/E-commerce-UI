
import { createSlice } from "@reduxjs/toolkit";
const initialAuthState={
    isLogin:false,
    token:null,
    isAdmin:false,
    user_id:''
}
const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state){
            state.isLogin=true;
        },
        logout(state){
            state.isLogin=false;
        },
        admin(state,action){
            state.isAdmin=action.payload.value;
        },
        setToken(state,action){
          state.token=action.payload.token;  
        }
    }
});
export const authAction=authSlice.actions;
export const authReducer= authSlice.reducer;