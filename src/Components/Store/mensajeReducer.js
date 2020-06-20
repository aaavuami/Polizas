// constantes
const dataInicial = {
    mensaje: '',
}

// types
const OPEN_SNACKBAR = 'OPEN_SNACKBAR'

// reducer
// action es el valor devuelto por el action
//action.payload será el valor que quiero añadir, borrar, etc
export default function mensajeReducer(state = dataInicial, action) {
    switch (action.type) {
        case OPEN_SNACKBAR:
            return {
                ...state, //Lo que devuelve un reducer es lo que se quedará en el state, por tanto, debe devolver todo lo que había antes (además de la información que cambia)
                mensaje: action.payload
            }
        default:
            return state
    }
}

// acciones
export const openMensaje = (mensaje) => async (dispatch, getState) => {
    try {
        dispatch({
            type: OPEN_SNACKBAR,
            payload: mensaje
        })
    } catch (error) {
        console.log(error)
    }
}