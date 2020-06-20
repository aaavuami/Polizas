import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openMensaje } from '../../Components/Store/mensajeReducer';
import { createPolicy, deletePolicy, updatePolicy } from '../Store/polizasReducer';

const Poliza = () => {

    let polizasGuardadas = useSelector(storeMensaje => (storeMensaje.polizasR && storeMensaje.polizasR.listPolicies))
    let reclamosGuardados = useSelector(storeMensaje => (storeMensaje.reclamosR && storeMensaje.reclamosR.listOfClaims))
    let error = useSelector(storeMensaje => (storeMensaje.polizasR && storeMensaje.polizasR.error))
    
    const dispatch = useDispatch()
    const [poliza, setPoliza] = React.useState({})
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [indice, setIndice] = React.useState(0)

    useEffect(() => {    
        if(error!=""){
            dispatch(openMensaje(error))
        }
    }, [error]);

    function conErrores() {
        let error = "";
        if (poliza.name == undefined || !poliza.name.trim()) {
            error = 'Debe indicar el nombre de la póliza...';
            dispatch(openMensaje(error));
        }
        if (poliza.amount == undefined || !poliza.amount.trim()) {
            error = 'Debe indicar el monto de la póliza...';
            dispatch(openMensaje(error));
        }
        return error != '' ? true : false;
    }

    const agregarPoliza = e => {
        e.preventDefault()
        if (conErrores()) return;

        dispatch(createPolicy(poliza.name, poliza.amount));
 
        setPoliza((anterior) => ({
            amount: '',
            name:''
        }));
   }

    const eliminarPoliza = name => {

        const indice = reclamosGuardados.findIndex((reclamo)=>{
            return reclamo.name==name
        })
        
        if(indice>=0){
            dispatch(openMensaje("No se puede eliminar esta póliza, porque tiene reclamos asociados"));
            return;
        }

        dispatch(deletePolicy(name));
    }

    const edicion = ident => {
        setPoliza(polizasGuardadas[ident])
        setIndice(ident);
        setModoEdicion(true)
    }

    const editarPoliza = e => {
        e.preventDefault()
        if (conErrores()) return;

        dispatch(updatePolicy(poliza.name, poliza.amount, indice));

        setModoEdicion(false)
        setIndice(0)
        setPoliza((anterior) => ({
            ...anterior,
            name: '',
            amount: ''
        }));
    }

    const cambioValores = e => {
        const { name, value } = e.target;

        setPoliza((anterior) => ({
            ...anterior,
            [name]: value
        }));
    }

    const montoCalculado = valor => {
        return (new Intl.NumberFormat("en-US").format(valor));;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar Poliza' : 'Agregar Póliza'
                        }
                    </h4>
                </div>
            </div>
            <form onSubmit={modoEdicion ? editarPoliza : agregarPoliza}>
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
                                    defaultValue={poliza.name}
                                    value={poliza.name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Ingrese el monto de la Póliza"
                                    name="amount"
                                    onChange={cambioValores}
                                    defaultValue={poliza.amount}
                                    value={poliza.amount}
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
                    <h1 className="text-center">Lista de Pólizas</h1>
                    <ul className="list-group">
                        {
                            polizasGuardadas.length === 0 ? (
                                <li className="list-group-item">No hay Pólizas</li>
                            ) : (
                                    polizasGuardadas.map((item, posicion) => (
                                        
                                        <li className="list-group-item" key={item.id}>
                                            <span className="lead">{item.name} - ${montoCalculado(item.amount)}</span>

                                            <button
                                                className="btn btn-danger btn-sm float-right mx-2"
                                                onClick={() => eliminarPoliza(item.name)}
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

export default Poliza;

//Si fuesen varios métodos a los que nos quisieramos conectar, lo haríamos de esta forma:
//export default connect(null, { modificaPalabra, modificaOtraCosa })(Form)