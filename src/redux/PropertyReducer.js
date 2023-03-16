import * as actions from './Constants'
import firestore from '@react-native-firebase/firestore'
const initialState = {
    AllProperties: [],
    PropertiesForFilter: [],
    AllRooms: [],
    DropdownProperties: [], 
    SingleProperty:[]
}

export default function PropertyReducer(state = initialState, action) {
    switch (action.type) {
        case actions.Get_All_Properties_Action:
            {
                let property = action.payload;  
               
            return {
                 ...state,
                AllProperties: Object.assign([], property),
                PropertiesForFilter: Object.assign([], property)
            }
        }
        case actions.Add_New_Property:
            {
                let { AllProperties } = state;
                let tempproperties = AllProperties.slice();
    
                // something cool
                let property = action.payload;
                tempproperties.push(property);
                let tempproperties1 = tempproperties.map(item => {
                    return {
                        label: item.PropertyName,
                        value:item.id
                      }
                  });
                return {
                    ...state,
                    AllProperties: Object.assign([], tempproperties),
                    DropdownProperties: Object.assign([], tempproperties1),
                }
            }
        case actions.Add_Drop_Down_Properties_Action:
        {
                    let { AllProperties } = state;
                    let tempproperties = AllProperties.slice();
                let tempproperties1 = tempproperties.map(item => {
                    return {
                        label: item.PropertyName,
                        value:item.id
                      }
                  });
                    return {
                        ...state,
                        DropdownProperties: Object.assign([], tempproperties1),
                    }
        }
        case actions.Add_new_Room_Action:
            {
                const { AllProperties } = state;

                let tempproperties = AllProperties.slice();
    
                
                let room = action.payload;
                let tempsingle = [];
                tempsingle.push(room)
                // tempproperties.push(room); 
                let tempproperties1 = tempproperties.filter(item => item.id !== room.id);
                tempproperties1.unshift(room)
    // console.log(room);
                return {
                    ...state,
                    AllProperties: Object.assign([], tempproperties1),
                    PropertiesForFilter: Object.assign([], tempproperties1),
                    SingleProperty:Object.assign([], tempsingle),
            }
}
        case actions.PropertyRooms_Action:
            {
            let { AllProperties } = state;
    
                let properties = AllProperties.slice();
                let propertyId = action.payload;
            let temproperties =   properties.filter(item=>{
                   if (item.id == propertyId ) {
                    return item.Rooms
                   }
            })  
            return {
                ...state,
                DropdownProperties: Object.assign([], temproperties),

                }
            }
        case actions.Filter_SingleProperty_By_Id_Action:
                {
                let { AllProperties } = state;
        
                    let properties = AllProperties.slice();
                    let propertyId = action.payload;
                let temproperties =   properties.filter(item=>{
                       if (item.id == propertyId ) {
                        return item
                       }
                })  
                return {
                    ...state,
                    SingleProperty: Object.assign([], temproperties),
                    }
            }
            case actions.Update_Property_Action:
                {
                let { AllProperties, PropertiesForFilter } = state;
        
                    let properties = PropertiesForFilter.slice();
                    let property = action.payload;
                let temproperties =   properties.filter(item=>{
                       if (item.id !== property.id ) {
                        return item
                       }
                })  
                temproperties.push(property);
                return {
                    ...state,
                    PropertiesForFilter: Object.assign([], temproperties),
                    AllProperties: Object.assign([], temproperties),

                    }
            }
            case actions.Delete_Property_Action:
                {
                let { PropertiesForFilter } = state;
        
                    let properties = PropertiesForFilter.slice();
                    let property = action.payload;
                let temproperties =   properties.filter(item=> item.id != property.id)
                   
                return {
                    ...state,
                    AllProperties: Object.assign([], temproperties),
                    }
            }
        default:
            return state
    }

}
export const Delete_Property_Action = (data) => ({
    type: actions.Delete_Property_Action,
    payload: data
});
export const Add_New_Property_Action = (data) => ({
    type: actions.Add_New_Property,
    payload: data
});
export const Update_Property_Action = (data) => ({
    type: actions.Update_Property_Action,
    payload: data
});

export const Add_New_Room_Action = (data) => ({
    type: actions.Add_new_Room_Action,
    payload: data
});
export const PropertyRooms_Action = (data) => ({
    type: actions.PropertyRooms_Action,
    payload: data
});
export const Filter_SingleProperty_By_Id_Action = (data) => ({
    type: actions.Filter_SingleProperty_By_Id_Action,
    payload: data
});
export const Add_Dropdown_Properties_Action = () => ({
    type: actions.Add_Drop_Down_Properties_Action,
    
});
// get All properties
export const Get_All_Properties_Action = (data) => {
    return async dispatch => {
        let tempproperties = [];
        await firestore().collection("Properties").doc(data.OwnerId).collection("property").get().then(res => {
            res.docs.map(docs => {
                // console.log(docs.data(),"data ni poa man ");
                tempproperties.push({
                    id: docs.id,
                    ...docs.data()
                    })
            })

            dispatch({
                type: actions.Get_All_Properties_Action,
                payload:tempproperties
            })
            })
    }
}