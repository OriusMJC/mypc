import { Link } from "react-router-dom";

export default function Subscriptions(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Suscripciones</h2>
            <details>
                <summary>Cómo me suscribo</summary>
                <p>Ingresá a la sección Películas y series, elegí la que quieras activar y suscribite</p>
            </details>
            <details>
                <summary>Cómo activo una prueba gratis</summary>
            </details>
            <details>
                <summary>Cómo vincular mi cuenta para ver el contenido una vez que me suscribí</summary>
            </details>
            <details>
                <summary>Cómo accedo al contenido de mi suscripción</summary>
            </details>
            <details>
                <summary>Cómo pago mi suscripción</summary>
            </details>
            <details>
                <summary>Cómo modifico el medio de pago de mi suscripción</summary>
            </details>
            <details>
                <summary>Qué sucede cuando finaliza mi prueba gratis</summary>
            </details>
            <details>
                <summary>Veo un precio diferente en el cobro de mi suscripción</summary>
            </details>
            <details>
                <summary>Cómo cancelo mi prueba gratis o mi suscripción</summary>
            </details>
            <details>
                <summary>Cancelé mi suscripción y quiero volver a activarla</summary>
            </details>
            <details>
                <summary>Qué sucede si ya tengo una suscripción activa fuera de Mercado Libre</summary>
            </details>
            <details>
                <summary>Cómo accedo a Combo+ si ya tengo una suscripción activa de Disney+ o Star+ dentro de Mercado Libre</summary>
            </details>
        </div>
    )
}