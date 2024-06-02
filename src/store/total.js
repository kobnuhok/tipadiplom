import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceTileWallMaterial: 0,
  priceCladdingMaterial: 0,
  priceDrywallJob: 0,
  priceDrywallMaterial: 0,
  pricePlasterJob: 0,
  pricePlasterMaterial: 0,
  priceMasticMaterial: 0,
  priceMasticJob: 0,
  priceRollMaterial: 0,
  priceRollJob: 0,
};

const totalPrice = createSlice({
  name: "totalPrice",
  initialState,
  reducers: {
    setTotalPrice: (state, action) => {
      state.priceTileWallMaterial =
        action.payload.priceTileWallMaterial !== undefined
          ? action.payload.priceTileWallMaterial
          : state.priceTileWallMaterial;
      state.priceCladdingMaterial =
        action.payload.priceCladdingMaterial !== undefined
          ? action.payload.priceCladdingMaterial
          : state.priceCladdingMaterial;
      state.priceTileWallJob =
        action.payload.priceTileWallJob !== undefined
          ? action.payload.priceTileWallJob
          : state.priceTileWallJob;
      state.priceCladdingJob =
        action.payload.priceCladdingJob !== undefined
          ? action.payload.priceCladdingJob
          : state.priceCladdingJob;
      state.priceDrywallJob =
        action.payload.priceDrywallJob !== undefined
          ? action.payload.priceDrywallJob
          : state.priceDrywallJob;
      state.priceDrywallMaterial =
        action.payload.priceDrywallMaterial !== undefined
          ? action.payload.priceDrywallMaterial
          : state.priceDrywallMaterial;
      state.pricePlasterMaterial =
        action.payload.pricePlasterMaterial !== undefined
          ? action.payload.pricePlasterMaterial
          : state.pricePlasterMaterial;
      state.pricePlasterJob =
        action.payload.pricePlasterJob !== undefined
          ? action.payload.pricePlasterJob
          : state.pricePlasterJob;
      state.priceMasticMaterial =
        action.payload.priceMasticMaterial !== undefined
          ? action.payload.priceMasticMaterial
          : state.priceMasticMaterial;
      state.priceMasticJob =
        action.payload.priceMasticJob !== undefined
          ? action.payload.priceMasticJob
          : state.priceMasticJob;
      state.priceRollMaterial =
        action.payload.priceRollMaterial !== undefined
          ? action.payload.priceRollMaterial
          : state.priceRollMaterial;
      state.priceRollJob =
        action.payload.priceRollJob !== undefined
          ? action.payload.priceRollJob
          : state.priceRollJob;
      state.priceFirstAlignMaterial =
        action.payload.priceFirstAlignMaterial !== undefined
          ? action.payload.priceFirstAlignMaterial
          : state.priceFirstAlignMaterial;
      state.priceFirstAlignJob =
        action.payload.priceFirstAlignJob !== undefined
          ? action.payload.priceFirstAlignJob
          : state.priceFirstAlignJob;
      state.priceSecondAlignMaterial =
        action.payload.priceSecondAlignMaterial !== undefined
          ? action.payload.priceSecondAlignMaterial
          : state.priceSecondAlignMaterial;
      state.priceSecondAlignJob =
        action.payload.priceSecondAlignJob !== undefined
          ? action.payload.priceSecondAlignJob
          : state.priceSecondAlignJob;
      state.pricePaintMaterial =
        action.payload.pricePaintMaterial !== undefined
          ? action.payload.pricePaintMaterial
          : state.pricePaintMaterial;
      state.pricePaintJob =
        action.payload.pricePaintJob !== undefined
          ? action.payload.pricePaintJob
          : state.pricePaintJob;
    },
    clearTotalPrice: () => initialState,
  },
});

export const { setTotalPrice, clearTotalPrice } = totalPrice.actions;
export default totalPrice.reducer;
