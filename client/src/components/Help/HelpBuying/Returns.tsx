import { Link } from "react-router-dom";

export default function Returns(){
    return(
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>

            <h2>Devoluciones</h2>

            <details>
                <summary>Recibir y devolver productos cuidando la salud de todos</summary>
                    <h3>Si vas a recibir un paquete</h3>
                    <h4>Mantené una distancia segura</h4>
                    <ul>
                        <li>En tu casa, tomá 1 metro (3 pies) de distancia de la persona que te lo entregue.</li>
                        <li>En una sucursal de correo o punto de retiro, mantené 1 metro (3 pies) de distancia del resto de las personas en la fila para retirarlo y del personal de correo en la ventanilla. Si hay mucha gente, esperá afuera.</li>
                    </ul>
                    <h4>No manipules objetos de terceros</h4>
                    <ul>
                        <li>Llevá tu propia birome, en caso de que tengas que firmar la entrega.</li>
                        <li>Muchos servicios están reemplazando la firma digital por una acreditación de identidad. Es posible que te pidan ver, sacarle una foto o tan solo que les dictes tu número de identidad.</li>
                    </ul>
                    <h4>Lavate las manos</h4>
                    <ul>
                        <li>Usá un desinfectante a base de alcohol o con agua y jabón antes y después de manipular el paquete, y evitá tocarte la cara.</li>
                    </ul>
                    <h4>Desinfectá las superficies del paquete</h4>
                    <ul>
                        <li>Pasar un desinfectante común es suficiente para matar el virus.</li>
                    </ul>
                    <h3>Si vas a devolver un producto</h3>
                    <h4>Hacelo en los horarios establecidos</h4>
                    <ul>
                        <li>Si vas a ir a una sucursal de correo o punto de entrega, confirmá si hubo cambios en los horarios de atención o si hay recomendaciones especiales que tengas que tener en cuenta.</li>
                    </ul>
                    <h4>Mantené una distancia segura</h4>
                    <ul>
                        <li>En una sucursal de correo o punto de entrega, mantené 1 metro (3 pies) de distancia del resto de las personas en la fila para despachar y del personal de correo en la ventanilla. Si hay mucha gente, esperá afuera.</li>
                        <li>Si vas a encontrarte con el vendedor, tomá 1 metro (3 pies) de distancia.</li>
                    </ul>
                    <h4>No manipules objetos de terceros</h4>
                    <ul>
                        <li>Llevá tu propia birome siempre, en caso de que tengas que firmar documentación.</li>
                    </ul>
                    <h4>Lavate las manos</h4>
                    <ul>
                        <li>Usá un desinfectante a base de alcohol o con agua y jabón antes y después de manipular el paquete, y evitá tocarte la cara.</li>
                    </ul>
                    <h4>Desinfectá las superficies del paquete</h4>
                    <ul>
                        <li>Pasar un desinfectante común es suficiente para matar el virus</li>
                    </ul>
                    
            </details>
            <details>
                <summary>Cómo devuelvo un producto</summary>
                <ol>
                    <li>Pedí la devolución del producto</li>
                    <p>Para devolver un producto, buscá la opción “Devolver gratis” que aparece en el menú de la compra que ya no querés y seguí los pasos. Te vamos a dar una etiqueta de devolución gratis para que envíes el producto de vuelta. Según la información que tengamos sobre la devolución, a veces te vamos a pedir que hables con el vendedor antes de tener la etiqueta.</p>
                    <p>También vas a tener que hablar con el vendedor si al comprar acordaste la entrega con él. Podrás hacerlo a través de la mensajería o iniciando un reclamo desde la compra, si no se pueden poner de acuerdo. Tené en cuenta que en esos casos no te vamos a dar una etiqueta de devolución pero te vamos a ayudar a que envíes de vuelta tu compra.</p>
                    <li>Prepará el paquete para enviarlo</li>
                    <p>Antes de preparar el paquete, revisá que el producto esté en las mismas condiciones que lo recibiste, sin usar y con todos sus accesorios y etiquetas.</p>
                    <ul>
                        <li>Guardá el producto en su envoltorio original o en uno alternativo si no lo tenés.</li>
                        <li>Embalá el producto. Si es frágil, utilizá un embalaje seguro que lo proteja.</li>
                        <li>Imprimí la etiqueta de devolución y pegala en el paquete.</li>
                        <li>Entregá el paquete al correo o punto de despacho que te asignemos.</li>
                    </ul>
                    <p>Si compraste más de una unidad del mismo producto, tenés que devolver todos los artículos para recuperar tu dinero.</p>
                </ol>
            </details>
            <details>
                <summary>Cuándo recibo el dinero de mi devolución</summary>
            </details>
            <details>
                <summary>Políticas de devolución de tus compras</summary>
            </details>
            <details>
                <summary>Productos que no tienen devolución</summary>
            </details>
        </div>
    )
}