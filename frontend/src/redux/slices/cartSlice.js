import { act } from "react";
import { createAppSlice } from "../createAppSlice";

export const cartSlice = createAppSlice({
  name: "cart",
  initialState: {
    error: null,
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],
    loading: false,
    status: "idle",
    hasOutOfStockProduct: false,
  },
  reducers: (create) => ({
    manageCart: create.asyncThunk(
      async ({ item, cart }) => {
        try {
          let itemFound = false;
          let outOfStock = false;
          let cartCount = cart.cartCount;
          let cartTotal = cart.cartTotal;
          let cartItems = JSON.parse(JSON.stringify(cart.cartItems || []));

          if (cartItems.length) {
            cartItems = cartItems.map((cItem) => {
              if (cItem.stock <= 0) outOfStock = true;

              if (cItem.id === item.id) {
                cartCount++;
                cItem.count++;
                itemFound = true;
                cartTotal += item.price;
                cItem.itemTotal += item.price;
              }

              return cItem;
            });

            if (!itemFound) {
              cartCount++;
              cartTotal += item.price;
              cartItems.push({ ...item, count: 1, itemTotal: item.price });
            }
          } else {
            cartCount++;
            cartTotal += item.price;
            cartItems.push({ ...item, count: 1, itemTotal: item.price });
          }

          const data = {
            cartCount,
            cartItems,
            hasOutOfStockProduct: outOfStock,
            cartTotal: parseFloat(cartTotal.toFixed(2)),
          };

          return data;
        } catch (error) {
          console.error(error);
        }
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.cartCount = action.payload.cartCount;
          state.cartItems = action.payload.cartItems;
          state.cartTotal = action.payload.cartTotal;
          state.hasOutOfStockProduct = action.payload.hasOutOfStockProduct;
        },
        rejected: (state) => {
          state.status = "failed";
          console.error({ state });
        },
      }
    ),
    updateCartData: (state, action) => {
      state.status = "idle";
      state.cartCount = action.payload.cartCount;
      state.cartItems = action.payload.cartItems;
      state.cartTotal = action.payload.cartTotal;
      state.hasOutOfStockProduct = action.payload.hasOutOfStockProduct;
    },
    updateCartDefault: (state) => {
      state.cartCount = 0;
      state.cartTotal = 0;
      state.cartItems = [];
      state.hasOutOfStockProduct = false;
    },
  }),
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
export const { manageCart, updateCartData, updateCartDefault } =
  cartSlice.actions;
