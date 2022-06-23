import { Link } from "react-router-dom";

export default function Changes(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Cómo funcionan los cambios</h2>
            <p>Si bien no podemos cambiar tu producto, podés devolverlo y recuperar tu dinero para comprar otra cosa. Para devolverlo debés ingresar al estado de la compra y seleccionar “Devolver gratis” o  “Quiero devolver el producto” desde “Ayuda con la compra”.</p>
            <p>Si ya tenés un reclamo abierto, podés acordar con el vendedor la posibilidad de reemplazar el producto. Si no llegan a un acuerdo, podrás devolverlo y recuperar tu dinero para comprar lo que quieras, cuando quieras.</p>
        </div>
    )
}