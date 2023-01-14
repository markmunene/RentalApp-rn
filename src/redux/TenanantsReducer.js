import * as actions from './Constants'
const initialState = {
    AllProperties: [],
    PropertiesForFilter:[]
}

export default function TenantReducer (state = initialState, action) {
    switch (action.type) {
        case actions.Add_New_Property:
            // something cool
            return {...state}
        default:
            return state
    }

}