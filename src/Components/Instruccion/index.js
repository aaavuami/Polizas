import React from 'react'

const Instruccion = () => {

    return(
        <>
            <div class="row" className="SaltoInicial">&nbsp;</div>
            <div class="row">
                <div class="col-12">
                    <h1>Reglas de negocio:</h1>
                </div>
            </div>
            <div class="row SaltoIntermedio">&nbsp;</div>
            <div class="row">
                <div class="col-12">
                    <ul>
                        <li><b>Póliza:</b> No se pueden duplicar por nombre de pólizas, ya sea alta o edición</li>
                        <li><b>Póliza:</b> Se debe indicar el nombre de la pólizas</li>
                        <li><b>Póliza:</b> Se debe indicar el monto de la pólizas</li>
                        <li><b>Póliza:</b> No se puede eliminar una póliza con reclamos</li>
                        <li><b>Reclamo:</b> No se pueden agregar un reclamo sin póliza asociada</li>
                        <li><b>Reclamo:</b> Se debe indicar el número de póliza</li>
                        <li><b>Reclamo:</b> Se debe indicar la descripción de la póliza</li>
                        <li><b>Reclamo:</b> Sí se agrega un reclamo para una póliza que ya tiene reclamo, se le añade la descripción</li>
                        <li><b>Reclamo:</b> Sí se edita un reclamo, no se puede duplicar pólizas</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Instruccion