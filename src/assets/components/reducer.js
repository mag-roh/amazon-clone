export const initialState = {
    basket:[],
    user: null,
}

//selector
export const getBasketTotal = (basket) => 
    basket?.reduce((total, item) => item.price + total, 0);
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_FROM_BASKET":
            //find the index of the element in the basket array and delete the item
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);//find the first occurance of the item with the particular id
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);//remove the item from the array and decrease the length of the array by one
            }
            else {
                console.warn(`Cant remove product (id: ${action.id})as it is not in the basket`);
            }
            return {
                // ...state,
                // basket: state.basket.filter(item => item.id!== action.id),
                ...state,
                basket: newBasket,
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;