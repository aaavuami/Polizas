// constantes
const global = {
    listPolicies: [],
    error: ''
};

// types
const CREATE_POLICY = 'CREATE_POLICY'
const DELETE_POLICY = 'DELETE_POLICY'
const UPDATE_POLICY = 'UPDATE_POLICY'

// reducer
// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default function polizasReducer(state = global, action) {

    if(action.payload!=null && action.payload.name!=null){
        action.payload.name = action.payload.name.trim();
        action.payload.name = action.payload.name.toUpperCase();
    }

    let error = "";

    switch (action.type) {
        case CREATE_POLICY:;

            /////////////// CONTROLAR PÓLIZAS NO DUPLICADAS
            const existe = state.listPolicies.filter((poliza)=>{
                return poliza.name==action.payload.name
            })
            if(existe.length>0){
                error = "Ya existe una póliza con ese nombre"
                return {
                    ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                    error: error
                }
            }
            /////////////// CONTROLAR PÓLIZAS NO DUPLICADAS

            let objeto = { name: action.payload.name, amount: action.payload.amount};
            const arreglo = [
                ...state.listPolicies, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                objeto,
            ]
            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listPolicies:  arreglo,
                error: error
            }
        case DELETE_POLICY:
            const arregloFiltrado = state.listPolicies.filter((poliza)=>{
                return poliza.name!==action.payload.name
            })
            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listPolicies:  arregloFiltrado,
                error: error
            }
        case UPDATE_POLICY:

            let objetoUpdate = { name: action.payload.name, amount: action.payload.amount, indice: action.payload.indice};
            ///////////// NO SE PUEDE MODIFICAR CON UN NOMBRE YA EXISTENTE

            const indice = state.listPolicies.findIndex((poliza)=>{
                return poliza.name==action.payload.name
            })

            if(indice>=0 && indice!=action.payload.indice ){
                error = "Ya existe una póliza con ese nombre"
                return {
                    ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                    error: error
                }
            }

            ///////////// NO SE PUEDE MODIFICAR CON UN NOMBRE YA EXISTENTE

            let arregloConsulta = state.listPolicies;

            arregloConsulta[objetoUpdate.indice] = objetoUpdate;

            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listPolicies:  arregloConsulta,
                error: error
            }
        default:
            return state;
    }
}

// acciones
export const createPolicy = (name, amount) => async (dispatch, getState) => {
    try {
       dispatch({
            type: CREATE_POLICY,
            payload: {
                name: name,
                amount: amount
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const deletePolicy = (name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_POLICY,
            payload: {
                name: name
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatePolicy = (name, amount, indice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_POLICY,
            payload: {
                name: name,
                amount: amount,
                indice: indice
            }
        })
    } catch (error) {
        console.log(error)
    }
}