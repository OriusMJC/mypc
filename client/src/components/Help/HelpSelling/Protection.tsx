import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function Protection(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Cómo protegemos a los vendedores</h2>
            <h4>Te ayudamos si surgen problemas</h4>
            <p>Si surge algún problema con una compra, es posible que alguien te haga un reclamo.</p>
            <h4>No te preocupes, la mayoría de las veces se trata de simples malentendidos que se resuelven rapidísimo.</h4>
            <p>Te avisamos apenas recibís el reclamo y te decimos cómo seguir. Si es necesario, podemos mediar para ayudarte a llegar a una solución.</p>
            <h4>Protegemos tu venta ante contracargos</h4>
            <p>Si bien no es común, es posible que algún comprador desconozca el pago que hizo con su tarjeta de crédito.</p>
            <p>A ese desconocimiento lo llamamos “contracargo” y puede pasar porque:</p>
            <ul>
                <li>Alguien utilizó la tarjeta de crédito del comprador sin autorización.</li>
                <li>O el comprador considera que no cumpliste con lo acordado.</li>
            </ul>
            <p>No te preocupes. Para que puedas conservar el dinero de tu venta, creamos el Programa de Protección al Vendedor.</p>
            <h4>Cómo funciona</h4>
            <p>Si recibís un contracargo, te contactamos y te pedimos que compruebes la entrega del producto.</p>
            <p>El Programa funciona solo para los productos físicos. Por ahora, no aplica para la venta de licencias, contrataciones de servicios o cualquiera cosa que sea intangible.</p>
        </div>
    )
}