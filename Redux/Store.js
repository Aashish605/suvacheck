import { configureStore } from "@reduxjs/toolkit";
import  SidebarSlice  from "./Sidebar/SidebarSlice";
import  CartSlice  from "./Cart/CartSlice";
import  NumSlice  from "./Num/NumSlice";

export default configureStore({
    reducer: {
        Sidebar: SidebarSlice,
        Cart: CartSlice,
        Num : NumSlice
    }
})