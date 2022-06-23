import { Link } from "react-router-dom";

export default function Posts(){
    return (
        <div>
            <Link to='/help'>
                <button>Ayuda</button>
            </Link>
            <h2>Publicaciones</h2>
            <details>
                <summary>Publicaciones de catálogo</summary>
            </details>
            <details>
                <summary>Cómo hacer una buena publicación</summary>
            </details>
            <details>
                <summary>Agregar stock, pausar, finalizar, eliminar y reactivar una publicación</summary>
                <p>Podés hacer todo esto desde tu listado de publicaciones. Si tienes muchas, te recomendamos usar el editor masivo.</p>
                <h4>Agregar stock</h4>
                <p>Si publicás productos nuevos en Clásica, quedarán inactivas automáticamente cuando te quedes sin stock. Si querés reactivar tu publicación, podrás hacerlo de forma individual, o masivamente, desde el editor masivo.</p>
                <p>Si, en cambio, vendés productos usados, tus publicaciones van a finalizar automáticamente cuando no tengas más stock. Si querés volver a activarlas tenés que crear una nueva publicación.</p>
                <h4>Pausar</h4>
                <p>Si querés pausar tu publicación tené en cuenta que:</p>
                <ul>
                    <li>El tiempo de exposición de tu publicación Gratuita seguirá corriendo, aunque no aparezca en los listados.</li>
                    <li>Tu producto publicado en Clásica no se va a ver en los listados, hasta que lo reactives nuevamente.</li>
                </ul>
                <h4>Eliminar</h4>
                <p>Podés eliminar una publicación siempre que esté inactiva. Tené en cuenta que una vez eliminada, no vas a poder recuperarla.</p>
                <h4>Republicar un producto</h4>
                <p>Podés republicar sin cambios o modificar la publicación antes de hacerlo.</p>
                <p>Si está inactiva y queres reactivarla, asegurate de hacerlo antes de que pasen 60 días, de esta forma vas a mantener las ventas, visitas y preguntas pendientes. Tené en cuenta que si editás el título lo consideraremos una publicación nueva, y va a perder la cantidad de ventas y visitas acumuladas.</p>
                <h4>Republicar un vehículo, inmueble o servicio</h4>
                <p>Si republicás un vehículo, inmueble o servicio dentro de los 60 días, mantenés las visitas.</p>
                <p>Pero además, los inmuebles se pueden republicar gratis dentro de los 30 días, aunque sin exposición en las páginas principales.</p>
                <h4>Si pausás o finalizás un vehículo, inmueble o servicio</h4>
                <p>Para dejar inactiva una publicación, tenés 2 opciones que podés realizar desde el menú de acciones (tres puntos).</p>
                <h5>Pausar</h5>
                <p>Al seleccionar esta opción, la publicación seguirá consumiendo de tu cupo de publicaciones pese a no estar visible.</p>
                <h5>Finalizar</h5>
                <p>Si escogés esta opción, liberás un cupo en tu paquete y podrás tener la publicación inactiva por 7 meses, después se eliminará del listado.</p>
            </details>
            <details>
                <summary>Modificar la publicación</summary>
            </details>
            <details>
                <summary>Cambiar el tipo de publicación</summary>
            </details>
            <details>
                <summary>Productos prohibidos para la venta</summary>
            </details>
            <details>
                <summary>Resolver un problema con una publicación</summary>
            </details>
            <details>
                <summary>Publicar sin infringir derechos de propiedad intelectual</summary>
            </details>
            <details>
                <summary>Recibí una denuncia en mi publicación</summary>
            </details>
            <details>
                <summary>Cómo denunciar una publicación en infracción</summary>
            </details>
        </div>
    )
}