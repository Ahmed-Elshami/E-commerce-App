import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


  export let getCategoriy=createAsyncThunk('CategoriySlice/getCategoriy',
     async ()=>{
     let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
     return data.data
   }
   )

let initialState={categoriy:[],loading:false,isError:null}

let categoriySlice=createSlice({
    name:'categoriySlice',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getCategoriy.pending, (state,action)=>{
            state.loading=true
        });
        builder.addCase(getCategoriy.fulfilled , (state,action)=>{
            state.categoriy=action.payload;
            state.loading=false;
        });
        builder.addCase(getCategoriy.rejected , (state,action)=>{
            state.isError=action.payload;
            state.loading=false;
        })

    }
})

export let categoriyReducer=categoriySlice.reducer

