import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    imageName: '',
    filters: '',
    newFileFullName: '',
    canvasUrl:'',
    allowDownload: false,
    showOverlay: true
}

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers:{
        uploadImg:(state, action) => {
            state.imageName = action.payload.imageName;
            state.canvasUrl = action.payload.canvasUrl;
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        },
        setNewFileFullName: (state, action) => {
            state.newFileFullName = action.payload;
            state.allowDownload = true;
        },
        // updateCanvasUrl: (state, action) => {
        //     state.canvasUrl = action.payload
        // },
        setShowOverlay: (state, action) => {
            state.showOverlay = action.payload
        }
    }
})

export const { uploadImg, updateFilters, setNewFileFullName,  setShowOverlay } =  imageSlice.actions
export default imageSlice.reducer