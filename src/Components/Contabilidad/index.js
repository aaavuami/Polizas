import React from 'react'
import { useSelector } from 'react-redux'

const Contabilidad = () => {

    let polizasGuardadas = useSelector(storeMensaje => (storeMensaje.polizasR && storeMensaje.polizasR.listPolicies))
    let reclamosGuardados = useSelector(storeMensaje => (storeMensaje.reclamosR && storeMensaje.reclamosR.listOfClaims))

    
    const montoCalculado = () => {

        let total = 0;
        for(let i=0; i<polizasGuardadas.length;i++) {
            let elemento=polizasGuardadas[i];
            let cuenta = parseFloat(elemento.amount);
            total += cuenta; 
        }

        return "$" + (new Intl.NumberFormat("en-US").format(total));;
    }

    return(
        <>
            <div class="row" className="SaltoInicial">&nbsp;</div>
            <div class="row">
                <div class="col-offset-4 col-8">
                    <b>Total de las pólizas:</b> {montoCalculado()}
                </div>
            </div>
            <div class="row" className="SaltoIntermedio">&nbsp;</div>
            <div class="row">
                <div class="col-md-offset-4 col-8">
                    <b>Número de polizas:</b> {polizasGuardadas.length}
                </div>
            </div>
            <div class="row" className="SaltoIntermedio">&nbsp;</div>
            <div class="row">
                <div class="col-md-offset-4 col-8">
                    <b>Número de pólizas con reclamos:</b> {reclamosGuardados.length}
                </div>
            </div>
        </>
    )
}

export default Contabilidad