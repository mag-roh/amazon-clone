import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types'

//prepares the datalayer
export const StateContext = createContext();

//wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
    
    
StateProvider.propTypes = {
    reducer: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    }
//pull information from the data layer 
export const useStateValue = () => useContext(StateContext);