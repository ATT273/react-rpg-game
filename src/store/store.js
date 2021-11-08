import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player/playerSlice";

export default configureStore({
    reducer: {
        player: playerSlice
    }
})