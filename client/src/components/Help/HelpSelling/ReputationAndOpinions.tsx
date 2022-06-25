import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function ReputationAndOpinions(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Reputación y opiniones</h2>
            <details>
                <summary>Qué es y cómo funciona la reputación como vendedor</summary>
            </details>
            <details>
                <summary>Cuáles son las reglas de exclusión de reclamos</summary>
                <h4>Cuándo podés pedir una exclusión</h4>
                <h5>Podrás hacerlo cuando el comprador indique en los mensajes de la venta que:</h5>
                <ul>
                    <li>Inició el reclamo o la devolución por error.</li>
                    <li>No reconoce la compra.</li>
                    <li>Se arrepintió de la compra, pero el producto está en perfectas concidiones.</li>
                </ul>
                <h5>También podrás pedir exclusión si:</h5>
                <ul>
                    <li>Tu comprador inició un reclamo por demoras en el correo o por problemas con Mercado Envíos, pero vos despachaste a tiempo.</li>
                    <li>No recibió el producto pero el envío aparece "entregado".</li>
                    <li>El reclamo se debe a algún problema de nuestra plataforma.</li>
                    <li>El comprador hizo el reclamo antes de que respondieras los mensajes de la venta, pero aún no pasaron 24 horas hábiles desde que recibiste su mensaje. </li>
                    <li>El comprador usó el reclamo o la devolución como medio de contacto.</li>
                </ul>
                <h4>Cuándo no podés pedir exclusión</h4>
                <h5>No podrás pedirnos que excluyamos tu reclamo cuando:</h5>
                <ul>
                    <li>El reclamo está abierto.</li>
                    <li>El producto es defectuoso.</li>
                    <li>El producto es diferente al que el comprador esperaba.</li>
                    <li>El comprador recibió menos productos de los que compró.</li>
                    <li>Le sugeriste al comprador no abrir un reclamo con algún contexto negativo hacia Mercado Libre.</li>
                    <li>El comprador no recibió el producto porque lo despachaste fuera de tiempo o no lo despachaste.</li>
                    <li>No contestaste la Mensajería en 24 horas hábiles desde que recibiste su mensaje.</li>
                </ul>
                <h4>Cómo pedir una exclusión</h4>
                <p>Para pedir la exclusión de tu reclamo debés ir al listado de tus ventas y desde cada una podrás hacer la solicitud de exclusión de tu reputación.</p>
            </details>
        </div>
    )
}