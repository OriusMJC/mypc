import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch } from "src/config/config";
import { getOrders } from "src/redux/actions";
import Loading from "../Loading/Loading";
import s from '../Styles/OrderDetails.module.css'

export default function OrderDetails(){
    const user = useSelector((state: any) => state.userDetails);
    const {idProduct} = useParams()
    const order = useSelector((store:any)=> store.orders?.filter((o:any)=> o.id === idProduct))
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(user) {
          dispatch(getOrders(user.id))
        }
      }, [user])
    return(
        <div id={s.orderDetailsContainer}>
            {
                order.length?
                <>
                    <div id={s.containButtons}>
                        <Link to="/">
                            <button className={s.buttonButton}>
                            Inicio
                            </button>
                        </Link>
                        <Link to="/user/detail">
                            <button className={s.buttonButton}>
                            Volver
                            </button>
                        </Link>
                    </div>
                    <div id={s.orderDetails}>
                        <section id={s.headOrder}>
                            <div>
                                <b>Nro de compra</b>
                                <p>{order[0].id}</p>
                            </div>
                            <div>
                                <h5>Fecha: {order[0].date? order[0].date: null}</h5>
                            </div>
                        </section>
                        <h1>Productos</h1>
                        <section id={s.allProductsOrder}>
                            {
                                order[0].product?.map((p:any)=>{
                                    return(
                                        <>
                                            <hr></hr>
                                            <div className={s.orderDetailCard}>
                                                <img src={p.photo} alt={p.title}/>
                                                <div className={s.contTitleCant}>
                                                    <b>{p.title}</b>
                                                    <p>Cant: {p.cant}</p>
                                                </div>
                                                <div>
                                                    <h3>precio: $ {p.price}</h3>
                                                    <Link to={`/detail/${p.id}`}>
                                                        <button>
                                                        VER DETALLES
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </section>
                        <h2>Pago Total: $ <b>{order[0].fullPayment}</b></h2>
                    </div>
                </>
                :
                <Loading load='Buscando orden' msgError="No hay ninguna orden tuya con este Nro de compra" time={2000}/>
            }
        </div>
    )
}