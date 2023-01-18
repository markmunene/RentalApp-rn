import * as actions from './Constants'
const initialState = {
    Authenticated_landlord: [],
    PropertiesForFilter:[]
}

export default function OwnerReducer (state = initialState, action) {
    switch (action.type) {
        case actions.Authenticated_user_action:
            // something cool
            let user = action.payload;

            return {
                ...state,
                Authenticated_landlord: Object.assign([], user)
            }
        default:
            return state
    }

}
export const Add_Auth_Landord_action = (data) => ({
    type: actions.Authenticated_user_action,
    payload:data
})