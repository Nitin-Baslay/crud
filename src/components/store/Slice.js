import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
let data = { finalData: [] };
const Slice = createSlice({
  name: "Master",
  initialState: data,
  reducers: {
    fetchData(state, action) {
      state.finalData = action.payload;
    },
    delete(state, action) {
      state.finalData = state.finalData.filter((ele) => {
        return ele.id !== action.payload;
      });
    },
    update(state, action) {
      console.log(action.payload.update);
      state.finalData.map((ele) => {
        if (ele.id == action.payload.type) {
          ele.address.street = action.payload.update;
          ele.address.suite = "";
          ele.address.city = "";
          ele.address.zipcode = "";
        }
      });
    },
  },
});
export const SliceAction = Slice.actions;
export default Slice.reducer;
