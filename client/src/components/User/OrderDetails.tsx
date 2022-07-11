import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { useAppDispatch } from "src/config/config";
import { getOrders } from "src/redux/actions";
import Loading from "../Loading/Loading";
import s from '../Styles/OrderDetails.module.css'

export default function OrderDetails(){
    const spanish = useSelector((state: any) => state.spanish);
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
                            {spanish ? "Inicio" : "Start"}
                            </button>
                        </Link>
                        <Link to="/user/detail">
                            <button className={s.buttonButton}>
                            {spanish ? "Volver" : "Return"}
                            </button>
                        </Link>
                    </div>
                    <div id={s.orderDetails}>
                        <section id={s.headOrder}>
                            <div>
                                <b>{spanish ? "Nro. de compra" : "Purchase Number"}</b>
                                <p>{order[0]?.id}</p>
                            </div>
                            <div>
                                <h5>{spanish ? "Fecha: " : "Date: "}{order[0].date? order[0].date: null}</h5>
                            </div>
                        </section>
                        <h1>{spanish ? "Productos" : "Products"}</h1>
                        <section id={s.allProductsOrder}>
                            {
                                order[0].product.length && order[0].product?.map((p:any)=>{
                                    return(
                                        <>
                                            <hr></hr>
                                            <div className={s.orderDetailCard}>
                                                <img src={p.photo[0]} alt={p.title}/>
                                                <div className={s.contTitleCant}>
                                                    <b>{p.title}</b>
                                                    <p>{spanish ? "Cant: " : "Qty: "}{p.cant}</p>
                                                    <h3>{spanish ? "Precio: $" : "Price: $"} {p.price}</h3>
                                                </div>
                                                <div>
                                                    <Link to={`/direction/${p.id}`}>
                                                        <button>
                                                            {spanish ? "Ver dirección de entrega" : "See delivery address"}
                                                        </button>
                                                    </Link>
                                                    <Link to={`/chatbuild/${order[0].user}/${p.seller?.id}`} >
                                                        <button>
                                                            {spanish ? "Iniciar chat" : "Start chat"}
                                                        </button>
                                                    </Link>
                                                    <Link to={`/detail/${p?.id}`}>
                                                        <button>
                                                            {spanish ? "Ver detalles" : "See details"}
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </section>
                        <h2>{spanish ? "Pago Total: $" : "Total Payment: $"} <b>{order[0].fullPayment}</b></h2>
                    </div>
                </>
                :
                <Loading load={spanish ? 'Buscando orden' : "Looking for order"} msgError={spanish ? "No hay ninguna orden tuya con este Nro de compra" : "There is no order from you with this Purchase Number"} time={2000}/>
            }
        </div>
    )
}