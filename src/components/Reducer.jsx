export const initialState = {
    cart: [],
    user: null
}

export const getCartTotal = (cart) => {
    return cart?.reduce((amount, item) => item.price + amount, 0)
}

const Reducer = (state, action) => {

    switch (action.type) {
        case "addToCart":
            return {
                ...state,
                cart: [...state.cart, action.item],
            }

        case "deleteFromCart":
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            )

            let updateCart = [...state.cart];

            if (index >= 0) {
                updateCart.splice(index, 1)
            }
            else {
                console.warn(`Can't remove product (id: ${action.id} as its not in the cart)`)
            }

            return {
                ...state,
                cart: updateCart,
            }

            case "SET_USER":
                return {
                    ...state,
                    user: action.user
                }

        default:
            return state;
    }
}

export default Reducer;