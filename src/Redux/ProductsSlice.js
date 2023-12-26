import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getProducts= createAsyncThunk("productSlice/getproduct",
    async ()=>{
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      return data.data
    }
)

let initialState={products:[],loading:false,isError:null}

let productSlice= createSlice({
    name:'productSlice',
    initialState,
    extraReducers:(bulider)=>{
        bulider.addCase(getProducts.pending, (state,action) =>{
            state.loading=true
        });

        bulider.addCase(getProducts.fulfilled, (state,action)=>{
            state.products=action.payload;
            state.loading=false
        });
        bulider.addCase(getProducts.rejected, (state,action)=>{
            state.isError=action.payload;
            state.loading=false
        });

    }

})

export let productReducer=productSlice.reducer;