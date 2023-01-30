import * as actions from './Constants'
const initialState = {
    Authenticated_landlord: [],
    WhichAuthScreen : ["Login"]
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
        case actions.Which_AuthScreen_Action:
            let screen = action.payload;
            let temp = [];
            temp.push(screen);
            return {
                ...state,
                WhichAuthScreen:Object.assign([], temp)
            }
        default:
            return state
    }

}
export const Add_Auth_Landord_action = (data) => ({
    type: actions.Authenticated_user_action,
    payload: data
});

export const Add_Auth_Screen_Action = (data) => ({
    type: actions.Which_AuthScreen_Action,
    payload:data
})