// constantes
const globalReclamo = {
    listOfClaims: [],
    error: ''
};

// types
const CREATE_CLAIM = 'CREATE_CLAIM'
const DELETE_CLAIM = 'DELETE_CLAIM'
const UPDATE_CLAIM = 'UPDATE_CLAIM'

// reducer
// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default function reclamosReducer(state = globalReclamo, action) {

    if(action.payload!=null && action.payload.name!=null){
        action.payload.name = action.payload.name.trim();
        action.payload.name = action.payload.name.toUpperCase();
    }

    if(action.payload!=null && action.payload.descripcion!=null){
        action.payload.descripcion = action.payload.descripcion.trim();
        action.payload.descripcion = action.payload.descripcion.toUpperCase();
    }

    let error = "";
    let indice = 0;

    switch (action.type) {
        case CREATE_CLAIM:;

            /////////////// CONTROLAR PÓLIZAS NO DUPLICADAS
            const existe = state.listOfClaims.filter((poliza)=>{
                return poliza.name==action.payload.name
            })
            indice = state.listOfClaims.findIndex((poliza)=>{
                return poliza.name==action.payload.name
            })

            let arreglo = []
            let objeto = {};

            if(indice>-1){
                // se actualiza la descripción
                objeto = state.listOfClaims[indice];
                objeto.descripcion = objeto.descripcion + "_____" + action.payload.descripcion;

                arreglo = state.listOfClaims;
                arreglo[indice] = objeto
            }
            else {
                // se agrega un nuevo objeto
                let objeto = { name: action.payload.name, descripcion: action.payload.descripcion};
                arreglo = [
                    ...state.listOfClaims, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                    objeto,
                ]
            }
            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listOfClaims:  arreglo,
                error: error
            }
        case DELETE_CLAIM:
            const arregloFiltrado = state.listOfClaims.filter((poliza)=>{
                return poliza.name!==action.payload.name
            })
            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listOfClaims:  arregloFiltrado,
                error: error
            }
        case UPDATE_CLAIM:

            let objetoUpdate = { name: action.payload.name, descripcion: action.payload.descripcion, indice: action.payload.indice};
            ///////////// NO SE PUEDE MODIFICAR CON UN NOMBRE YA EXISTENTE

            indice = state.listOfClaims.findIndex((poliza)=>{
                return poliza.name==action.payload.name
            })

            if(indice>=0 && indice!=action.payload.indice ){
                error = "Ya existe un reclamo con esa póliza"
                return {
                    ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                    error: error
                }
            }

            ///////////// NO SE PUEDE MODIFICAR CON UN NOMBRE YA EXISTENTE

            let arregloConsulta = state.listOfClaims;

            arregloConsulta[objetoUpdate.indice] = objetoUpdate;

            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                listOfClaims:  arregloConsulta,
                error: error
            }
        default:
            return state;
    }
}

// acciones
export const createClaim = (name, descripcion) => async (dispatch, getState) => {
    try {
       dispatch({
            type: CREATE_CLAIM,
            payload: {
                name: name,
                descripcion: descripcion
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteClaim = (name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_CLAIM,
            payload: {
                name: name
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateClaim = (name, descripcion, indice) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_CLAIM,
            payload: {
                name: name,
                descripcion: descripcion,
                indice: indice
            }
        })
    } catch (error) {
        console.log(error)
    }
}