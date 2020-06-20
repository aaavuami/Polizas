import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openMensaje } from '../../Components/Store/mensajeReducer';
import { createClaim, deleteClaim, updateClaim } from '../Store/reclamosReducer';

const Reclamo = () => {

    let polizasGuardadas = useSelector(storeMensaje => (storeMensaje.polizasR && storeMensaje.polizasR.listPolicies))
    let reclamosGuardados = useSelector(storeMensaje => (storeMensaje.reclamosR && storeMensaje.reclamosR.listOfClaims))
    let error = useSelector(storeMensaje => (storeMensaje.reclamosR && storeMensaje.reclamosR.error))
    
    const dispatch = useDispatch()
    const [reclamo, setReclamo] = React.useState({})
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [indice, setIndice] = React.useState(0)

    useEffect(() => {    
        if(error!=""){
            dispatch(openMensaje(error))
        }
    }, [error]);

    function conErrores() {
        let error = "";
        if (reclamo.name == undefined || !reclamo.name.trim()) {
            error = 'Debe indicar el nombre de la póliza...';
            dispatch(openMensaje(error));
        }
        if (reclamo.descripcion == undefined || !reclamo.descripcion.trim()) {
            error = 'Debe indicar la descripción del reclamo...';
            dispatch(openMensaje(error));
        }
        return error != '' ? true : false;
    }

    const agregarReclamo = e => {
        e.preventDefault()
        if (conErrores()) return;

        reclamo.name = reclamo.name.trim();
        reclamo.name = reclamo.name.toUpperCase();

        const indice = polizasGuardadas.findIndex((poliza)=>{
            return poliza.name==reclamo.name
        })
        if(indice<0){
            dispatch(openMensaje("No se puede agregar este reclamo, porque no hay una póliza asociada"));
            return;
        }


        dispatch(createClaim(reclamo.name, reclamo.descripcion));
 
        setReclamo((anterior) => ({
            descripcion: '',
            name:''
        }));
   }

    const eliminarReclamo = name => {
        dispatch(deleteClaim(name));
    }

    const edicion = ident => {
        setReclamo(reclamosGuardados[ident])
        setIndice(ident);
        setModoEdicion(true)
    }

    const editarReclamo = e => {
        e.preventDefault()
        if (conErrores()) return;

        dispatch(updateClaim(reclamo.name, reclamo.descripcion, indice));

        setModoEdicion(false)
        setIndice(0)
        setReclamo((anterior) => ({
            ...anterior,
            name: '',
            descripcion: ''
        }));
    }

    const cambioValores = e => {
        const { name, value } = e.target;

        setReclamo((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar Reclamo' : 'Agregar Reclamo'
                        }
                    </h4>
                </div>
            </div>
            <form onSubmit={modoEdicion ? editarReclamo : agregarReclamo}>
                <div className="row">
                    <div className="col-11">                         
                        <div className="row">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className="form-control NombrePoliza"
                                    placeholder="Ingrese nombre de la Póliza"
                                    name="name"
                                    onChange={cambioValores}
                                    defaultValue={reclamo.name}
                                    value={reclamo.name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className="form-control NombreDescripcion"
                                    placeholder="Ingrese la descripción del Reclamo"
                                    name="descripcion"
                                    onChange={cambioValores}
                                    defaultValue={reclamo.descripcion}
                                    value={reclamo.descripcion}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <button className="btn btnMas btn-dark btn-block" type="submit">
                            {
                                modoEdicion ? (
                                    <i className="fa fas fa-pencil-square-o"></i>
                                ) : (
                                        <i className="fa fas fa-plus"></i>
                                    )
                            }
                        </button>
                    </div>
                </div>
            </form>
            <hr />

            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Lista de Reclamos</h1>
                    <ul className="list-group">
                        {
                            reclamosGuardados.length === 0 ? (
                                <li className="list-group-item">No hay Reclamos</li>
                            ) : (
                                    reclamosGuardados.map((item, posicion) => (
                                        
                                        <li className="list-group-item" key={item.id}>
                                            <span className="lead"><b>{item.name}</b> {item.descripcion} </span>

                                            <button
                                                className="btn btn-danger btn-sm float-right mx-2"
                                                onClick={() => eliminarReclamo(item.name)}
                                            >
                                                <i className="fa fas fa-minus"></i>
                                            </button>

                                            <button
                                                className="btn btn-warning btn-sm float-right"
                                                onClick={() => edicion(posicion)}
                                            >
                                                <i className="fa fas fa-pencil-square-o "></i>
                                            </button>
                                        </li>
                                    ))
                                )

                        }


                    </ul>
                </div>
            </div>
        </div>
    );
}


/* - El método connect conecta un componente (en este caso Form) con la Store.
   - El primer parámetro (que en este caso vale null porque no lo necesitamos) es la función de este componente que recibiŕía el state de la store para pintarlo por pantalla.
   - El segundo parámetro es un objeto que contiene las acciones de redux que vamos a utilizar en el componente.
Tanto el state al que nos hemos suscrito con el primer parámetro, como las acciones del segundo le llegarán al componente como props.*/

export default Reclamo;

//Si fuesen varios métodos a los que nos quisieramos conectar, lo haríamos de esta forma:
//export default connect(null, { modificaPalabra, modificaOtraCosa })(Form)