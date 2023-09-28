export const initialState = {
    cart: [],
}

export const getCartTotal = (cart) => {
    return cart?.reduce((amount, item) => item.price + amount, 0)
}

// 2:34:49

const Reducer = (state, action) => {

    console.log(action);
    switch (action.type) {
        case "addToCart":
            return {
                ...state,
                cart: [...state.cart, action.item],
            }

        default:
            return state;
    }
}

export default Reducer;