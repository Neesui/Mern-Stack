const initialdata = {
  cartCount: 0,
};

const cartReducer = (state = initialdata, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cartCount: state.cartCount + 1 };
    case "REDUCE_TO_CART":
      if (state.cartCount === 0) return state;
      return { ...state, cartCount: state.cartCount - 1 };

    default:
      return state;
  }
};
export default cartReducer;
