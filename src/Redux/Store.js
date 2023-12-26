import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlice";
import { brandsReducer } from "./brandSlice";
import { categoriyReducer } from "./CategorySlice";
import { productReducer } from "./ProductsSlice";


export let store =configureStore({
    reducer:{
        counter:counterReducer,
        brands:brandsReducer,
        category:categoriyReducer,
        product:productReducer
    }
})