import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from "@material-ui/core";

import { openMensaje } from '../../Components/Store/mensajeReducer';

const Mensaje = () => {

    const dispatch = useDispatch()
    let mensaje = useSelector(storeMensaje => (storeMensaje.mensajes && storeMensaje.mensajes.mensaje))
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        setOpen(mensaje!=="")
    },[mensaje]);

    const onClose = e => {
        dispatch(openMensaje(""))
        setOpen(false)
    }

    return (mensaje==""?"":<Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
            <span id="message-id">
                {mensaje}
            </span>
        }
        onClose={() => { onClose() } }
    ></Snackbar>)
}

export default Mensaje;