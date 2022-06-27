import { Link } from "react-router-dom";
import s from "../../Styles/Help.module.css";

export default function Buys(){
    return (
        <div className={s.container}>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Compras</h2>
            <details>
                <summary>¿Cómo elegir a qué vendedor comprarle?</summary>
                <p>Si te gustó un producto y tenés dudas sobre el vendedor, te damos algunos consejos para que tengas en cuenta:</p>

                <h4>Revisá la reputación del vendedor</h4>

                <h4>Fijate el color como vendedor</h4>
                <p>Los vendedores que tienen color verde son aquellos que ofrecen un buen servicio a sus compradores. Si es gris, es un vendedor sin ventas o con pocas, pero no quiere decir que sea malo.</p>

                <h4>Si hay medalla, mucho mejor</h4>
                <p>Es un MercadoLíder, un vendedor avalado por la cantidad de ventas que hizo, la buena experiencia que brinda a sus compradores y el cumplimiento de normas fiscales.
                </p>

                <h4>Si estás buscando un servicio, te recomendamos que leas las opiniones de las personas que ya lo contrataron.</h4>

                <h4>Y si querés comprar un auto o un inmueble, siempre es bueno llamar al anunciante para coordinar una visita y sacarte todas las dudas sobre lo que querés comprar.</h4>
                <p>Leé en detalle la publicación
                    <ul>
                        <li>Revisá atentamente toda la publicación: prestá atención a la descripción y a las fotos para estar seguro de las condiciones de venta que propone el vendedor.</li>
                        <li>Si el producto es nuevo, asegurate de que tenga garantía y que puedas devolverlo en caso de ser necesario.</li>
                    </ul>
                    Sacate todas las dudas
                    <br></br>
                    Si después de leer toda la publicación todavía tenés dudas, <b>preguntale al vendedor todo lo que necesites saber</b>.<br/>Por ejemplo: <b>si necesitás la factura</b> de tu compra, hacele una pregunta y <b>asegurate de que te la envíe</b>.
                </p>
            </details>
            <details>
                <summary>¿Cómo pagar tu compra?</summary>
                <p>Podés pagar con cualquiera de estos medios y tu compra va a estar 100% protegida. Si el producto no es lo que esperabas, te devolveremos el dinero.
                </p>
                <p>Las reservas de vehículos y las contrataciones de servicios también se pagan con estos medios. Así, protegemos tu dinero hasta que nos confirmes que ya te entregaron el vehículo o te brindaron el servicio.</p>
                <p>Elegí entre cualquiera de estos medios de pago:
                    <br></br>Visa Mastercard American Express Naranja Argencard Cabal Cencosud Nativa Tarjeta Shopping Cordobesa CMR Cordial
                </p>
                <p>Tarjeta de crédito</p>
                <p>Hasta 12 cuotas sin interés</p>
                <p>Ver promociones bancarias</p>
                <p>Acreditación instantánea
                    <br/>Costo de financiación para tarjetas de crédito
                </p>
                <p>Visa Maestro Cabal</p>
                <p>Tarjeta de débito
                    <br/>1 pago	Acreditación instantánea
                </p>
                <p>Mercado crédito
                    <br/>En cuotas sin usar tarjeta: seleccioná Mercado Crédito como medio de pago, elegí las cuotas, ¡y listo!
                    <br/>Conocé más
                    <br/>Hasta 12 cuotas
                    <br/>Acreditación instantánea
                </p>
                <p>Dinero en cuenta MercadoPago
                    <br/>Dinero en Mercado Pago: se transfiere al instante a la cuenta del receptor.
                    <br/>1 pago  Acreditación instantánea
                </p>
                <p>Tambien podés pagar en efectivo:
                    <br/>Rapipago Pago Fácil
                    <br/>En efectivo con Rapipago y Pago Fácil: te damos un número para pagar.
                    <br/>1 pago	 Rapipago se acredita al instante y Pago Fácil en 2 horas después de pagar
                </p>
            </details>
            <details>
                <summary>¿Cómo recibir o retirar el producto?</summary>
                <p>Recibir el producto en mi casa</p>
                <p>Si el vendedor ofrece Mercado Envíos, podés recibir el producto por correo en todo el país. En Capital Federal y algunas localidad de GBA tenés opciones más rápidas.</p>
                <p>Calculás el costo de envío desde la publicación y pagás todo junto por MercadoPago. En adelante, podés hacer el seguimiento del envío desde tu compras.</p>
                <p>Si la publicación no tiene Mercado Envíos, podés acordar el envío directamente con el vendedor.</p>
            </details>
            <details>
                <summary>Resolver un problema con una compra</summary>
                <p>Login:
                    <br/><a href="https://www.mercadolibre.com/jms/mla/lgz/login?platform_id=ML&go=https%3A%2F%2Fmyaccount.mercadolibre.com.ar%2Fmy_purchases%2Flist&loginType=explicit">https://www.mercadolibre.com/jms/mla/lgz/login?platform_id=ML&go=https%3A%2F%2Fmyaccount.mercadolibre.com.ar%2Fmy_purchases%2Flist&loginType=explicit</a>
                </p>
            </details>
            <details>
                <summary>No reconozco un cobro en mi resumen de tarjeta</summary>
                <p>Si al revisar los consumos en tu tarjeta de crédito o débito hay alguno que no identificás, te recomendamos revisar en la sección Actividad. Ahí encontrarás los consumos que pagaste usando Mercado Pago y podrás verificar si el cargo de la tarjeta corresponde a una de esas operaciones. Fijate en el día, la hora y el monto del pago para identificar la operación.</p>
                <p>¿No encontraste el consumo en Actividad?</p>
                <p>Si no encontraste el consumo en Actividad, entonces puede que haya ocurrido una de las siguientes situaciones:</p>
                <ul>
                    <li>Otra persona con acceso a tu tarjeta, como por ejemplo un familiar, hizo una operación desde su cuenta de Mercado Libre o Mercado Pago y usó tu tarjeta para pagar.</li>
                    <li>Pagaste con Mercado Pago sin que hayas iniciado sesión, por lo que el consumo no aparece en Actividad. Te sugerimos revisar tu correo electrónico y buscar el e-mail de confirmación de compra, según la fecha del consumo que no reconoces.</li>
                </ul>
                <p>Si aún no encontrás el consumo en Actividad, contactanos y te ayudaremos.</p>
            </details>
            <details>
                <summary>Todo sobre pagos con QR</summary>
                <details>
                    <summary>¿Qué es el código QR?</summary>
                    <h4>Cuando pagás escaneando un QR</h4>
                    <p>El QR es un código único vinculado a la cuenta de Mercado Pago de un vendedor que te permite hacer pagos presenciales sin sacar la billetera.</p>
                    <h4>¿Por qué pagar con QR?</h4>
                    <ul>
                        <li>Solo necesitás la app de Mercado Libre o Mercado Pago.</li>
                        <li>Tenés todos tus medios de pago en un solo lugar: tarjeta de crédito, débito y dinero en Mercado Pago.</li>
                        <li>Accedés a cientos de descuentos antes y después de cada pago.</li>
                    </ul>
                    <p>El código QR suele estar impreso en un cartel con los logos de Mercado Libre y Mercado Pago. Encuentra códigos QR en miles de locales.</p>
                    <h4>Cuando pagás mostrando tu QR</h4>
                    <p>Tu QR es un código vinculado a tu propia cuenta de Mercado Pago, que también te permite pagar en locales solo con tu celular. </p>
                    <p>Tu código QR tiene tus medios de pago asociados para que no tengas que hacer casi nada, solo mostrar el celular. Para proteger tus pagos, el código se renueva luego de unos segundos.</p>
                    <p>Además, podés pagar mostrando tu QR aunque no estés conectado a internet.</p>
                </details>
            </details>
        </div>
    )
}