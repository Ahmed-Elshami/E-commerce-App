import { createSlice } from "@reduxjs/toolkit";


let initialState={counter:0 , userName:'Ahmed'}
let counterSlice= createSlice({
    name:'counterSlice',
    initialState,
    reducers:{
        inc:(state)=>{
            state.counter+=1
        },
        dec:(state)=>{
           state.counter-=1
        },
        hii:(state,action)=>{
         state.counter+=action.payload
        }
    }

})

export let counterReducer=counterSlice.reducer;
export let {inc,dec,hii}=counterSlice.actions