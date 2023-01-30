import * as actions from './Constants'
import firestore from '@react-native-firebase/firestore'
const initialState = {
    Tenants: [],
    TenantsForFilter: [],
    SingleTeanant: [],
    Transactions: [],
    Transactions_ForFilter:[],
}

export default function TenantReducer (state = initialState, action) {
    switch (action.type) {
        case actions.Add_New_Tenant_Action:
            {
                // something cool
            const { Tenants } = state;
            let tempTenants = Tenants.slice();
            const tenant = action.payload;
            tempTenants.push(tenant)

            return {
                ...state,
                Tenants:Object.assign([], tempTenants)
            }
            }
            
        case actions.Add_New_Transaction_Action:
                {
                    // something cool
                const { Transactions } = state;
                let tempTrans = Transactions.slice();
                const Trans = action.payload;
                tempTrans.push(Trans)
    
                return {
                    ...state,
                    Transactions: Object.assign([], tempTrans),
                    Transactions_ForFilter:Object.assign([], tempTrans)
                }
        }
        case actions.Get_All_Tenants_Action:
            {
                let tenants = action.payload;  
            return {
                 ...state,
                 Tenants: Object.assign([], tenants),
                 TenantsForFilter: Object.assign([], tenants)
            }
            }
        case actions.Get_All_Transactions_Action:
            {
                let Transactions = action.payload; 
                let tempTransactions = Transactions.sort((a, b)=>b?.CreatedAt > a?.CreatedAt ? 1:-1)
            return {
                 ...state,
                 Transactions: Object.assign([], tempTransactions),
                 Transactions_ForFilter:Object.assign([], tempTransactions),
            }
        }
        case actions.Filter_Tenant_By_Name_Action:
            {
                let { TenantsForFilter } = state;
                let tempTenants = TenantsForFilter.slice();
                    // filter funcion
             function contains(text, sequence) {
                      for (var i = 0, j = 0; i < text.length && j < sequence.length; i++) {
                             if (text.length - i < sequence.length - j) return false
                              if (text[i] === sequence[j]) j++
                                }
                            return j === sequence.length
                }
                
                let Tenant = action.payload; 
                
                let TenantAfterFilter = tempTenants.filter(filteredTenants => {
                    if (Tenant =='') { 
                      return filteredTenants;  
                      
                    }
                    else if (
                     
                      contains(filteredTenants.Tenant.toLowerCase().replace(/\s+/g, ''), Tenant.toLowerCase().replace(/\s+/g, ''))
                     
                    ) {
                      return filteredTenants;
                    }
                });
                
                return {
                     ...state,
                     Tenants: Object.assign([], TenantAfterFilter),
                     
                }
         }
         case actions.Filter_SingleTenant_By_Id_Action:
         {
                let { TenantsForFilter } = state;
        
                    let tempTenants = TenantsForFilter.slice();
                    let TenantId = action.payload;
                let tempTenant1 =   tempTenants.filter(item=>{
                       if (item.id == TenantId ) {
                        return item
                       }
                })  
                return {
                    ...state,
                    SingleTeanants: Object.assign([], tempTenant1),
                    }
            }

         case actions.Filter_Transactions_By_Name_Action:
                {
                       let { Transactions_ForFilter } = state;
               
                           let tempTransactions = Transactions_ForFilter.slice();
                let TenantId = action.payload;
              
                       let tempTransactions1 =   tempTransactions.filter(item=>{
                              if (item.Tenant == TenantId ) {
                               return item
                              }
                       })  
                       return {
                           ...state,
                           Transactions: Object.assign([], tempTransactions1),
                           }
            }
            case actions.Filter_Tenant_By_Property_Action:
                {
                       let { TenantsForFilter } = state;
               
                           let tempTenants = TenantsForFilter.slice();
                let PropertyName = action.payload;
              
                       let tempTenant1 =   tempTenants.filter(item=>{
                              if (item.PropertyName == PropertyName ) {
                               return item
                              }
                       })  
                       return {
                           ...state,
                           Tenants: Object.assign([], tempTenant1),
                           }
            }
            case actions.Filter_Tenant_By_BalanceAmount_Action:
                {
                       let { TenantsForFilter } = state;
               
                           let tempTenants = TenantsForFilter.slice();
                let Balance = action.payload;
              
                       let tempTenant1 =   tempTenants.filter(item=>{
                              if (item.Balance >= Balance ) {
                               return item
                              }
                       })  
                       return {
                           ...state,
                           Tenants: Object.assign([], tempTenant1),
                           }
            }
            case actions.Update_Tenant_By_Name_Action:
             {
                let { TenantsForFilter } = state;
                let tempTenant12 = TenantsForFilter.slice();
                let Tenant = action.payload;
                let temptenant = [];
                temptenant.push(Tenant);
                let tempTenant1 = tempTenant12.filter(item => item.id !== Tenant.id);
                tempTenant1.unshift(Tenant);      
                return {
                           ...state,
                           SingleTeanants: Object.assign([], temptenant),
                           Tenants: Object.assign([], tempTenant1),
                           TenantsForFilter: Object.assign([], tempTenant1),
                           }
            }
        default:
            return state
    }

}

export const Add_New_Transaction_Action = (data) => ({
    type: actions.Add_New_Transaction_Action,
    payload: data
});
export const Add_New_Tenant_Action = (data) => ({
    type: actions.Add_New_Tenant_Action,
    payload: data
});

export const Filter_Tenant_By_Name_Action = (data) => ({
    type: actions.Filter_Tenant_By_Name_Action,
    payload: data
});
export const Filter_Tenant_By_Property_Action = (data) => ({
    type: actions.Filter_Tenant_By_Property_Action,
    payload: data
});
export const Filter_Tenant_By_BalanceAmount_Action = (data) => ({
    type: actions.Filter_Tenant_By_BalanceAmount_Action,
    payload: data
});

export const Filter_Transactions_By_Name_Action = (data) => ({
    type: actions.Filter_Transactions_By_Name_Action,
    payload: data
});
export const Update_Tenant_By_Name_Action = (data) => ({
    type: actions.Update_Tenant_By_Name_Action,
    payload: data
});
export const Filter_SingleTenant_By_Id_Action = (data) => ({
    type: actions.Filter_SingleTenant_By_Id_Action,
    payload: data
});
// get All properties
export const Get_All_tenants_Action = (data) => {
    return async dispatch => {
        let tempproperties = [];
        await firestore().collection("Properties").doc(data.OwnerId).collection("tenants").get().then(res => {
            res.docs.map(docs => {
                // console.log(docs.data(),"data ni poa man ");
                tempproperties.push({
                    id: docs.id,
                    ...docs.data()
                    })
            })

            dispatch({
                type: actions.Get_All_Tenants_Action,
                payload:tempproperties
            })
            })
    }
}

// get All properties
export const Get_All_Transactions_Action = (data) => {
    return async dispatch => {
        let TempTransactions = [];
        await firestore().collection("Properties").doc(data.OwnerId).collection("Transactions")
        .doc(data.id).collection("rent").get().then(res => {
            res.docs.map(docs => {
                // console.log(docs.data(),"data ni poa man ");
                TempTransactions.push({
                    id: docs.id,
                    ...docs.data()
                    })
            })

            dispatch({
                type: actions.Get_All_Transactions_Action,
                payload:TempTransactions
            })
            })
    }
}

