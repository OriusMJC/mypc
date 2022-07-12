import { useEffect, useLayoutEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllComponents, getAllOrders, getAllUsers, getOrders } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'
import Graphic from '../Graphics/Graphic';
import GraphicUsers from '../Graphics/GraphicUsers';
import s from '../Styles/UserProducts.module.css'
import s2 from "../Styles/userDetails.module.css";
import sBtn from "../Styles/userDetails.module.css";
import fav from '../Styles/Fav.module.css'
import Loading from '../Loading/Loading';
import swal from 'sweetalert';

function UserProducts() {
  const spanish = useSelector((state: any) => state.spanish);
  const dispatch = useAppDispatch();
  const products = useSelector((state:any) => state.allComponents);
  const orders = useSelector((state:any) => state.orders);
  const allUsers = useSelector((state:any)=> state.allUsers)
  const user = useSelector((state:any) => state.userDetails);
  const [refresh,setRefresh] = useState(1)
  let productsCreated = [];

  products.map((prod:any) =>{
    if(prod.sellerInfo.id?.includes(user.id)){
      productsCreated.push(prod)
    }
  })
  
  useEffect(() => {
    dispatch(getAllComponents())
    if(user.admin){
      dispatch(getAllOrders())
      dispatch(getAllUsers())
    }
  }, [user]);

  function handleDelete(e){
    swal({         
      text: spanish ? "Estas seguro de eliminar el producto?" : "Are you sure to delete the product?",
      icon: "warning",
      buttons: ["No", spanish ? "Si" : "Yes"]
    }).then(respuesta =>{
      if(respuesta){
         swal({text: spanish ? "Producto eliminado correctamente" : "Product removed successfully" , icon: "success"})
         dispatch(deleteProduct(e.target.value))
         dispatch(getAllComponents());
      }
    })
  }

  // let ventas= [2,4,3,17,13,24,9,11,8,7,22,18]
  // let publicaciones =[8,25,13,14,9,23,5,3,6,25,15,12]
  const [ventas,setVentas] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [publicaciones,setPublicaciones] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [cantUsers,setCantUsers] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
  function estadisticas(admin){
    let newVe = [...ventas]
    let newPubl = [...publicaciones]
    if(admin){
      products.forEach((prod:any)=>{
        let num = Number(prod.createdAt.slice(5,7))
        newPubl[num -1] = newPubl[num -1] + prod.stockInitial
        if(prod.sell){
          newVe[num -1]= newVe[num -1] + prod.cantSell
        }
      })
    }else{
      productsCreated.forEach((prod:any)=>{
        let num = Number(prod.createdAt.slice(5,7))
        newPubl[num -1] = newPubl[num -1] + prod.stockInitial
        if(prod.sell){
          newVe[num -1]= newVe[num -1] + prod.cantSell
        }
      })
    }
    setVentas(newVe)
    setPublicaciones(newPubl)
    setRefresh(refresh+1)
  }
  function statsAllUsers(){
    let usersPerMonths = [...cantUsers]
      allUsers.forEach((user:any)=>{
        let num = Number(user.createdAt?.slice(5,7))
       usersPerMonths[num -1] = usersPerMonths[num -1] + 1
      })
    
    setCantUsers(usersPerMonths)
    setRefresh(refresh+1)
  }
  if(!user.admin && productsCreated.length && refresh < 2){
    estadisticas(false)
  }else if(user.admin && allUsers.length && refresh < 2){
    estadisticas(true)
    statsAllUsers()
  }
  

  return (
    <div className={s.userProducstContainer}>
      <div className={s.btnhome}>
      <Link to ='/user/detail' className={s.buttonHome}>
        <button>
          {spanish ? "Regresar" : "Go back"}
        </button>
      </Link>
      </div>
      {
        user && user.id ?
          !productsCreated.length && !user.admin
            ?   
            // swal({
            //   title: "No tienes ningun producto para vender",            
            //   icon: "warning",
            //   timer: 1500,
            // }) &&
            <Loading load={spanish ? 'Cargando' : "Loading"} msgError={<Link to = "/user/createProduct">
              <button className={sBtn.buttonButton}>
                {spanish ? "Vender" : "Sell"}
              </button>
            </Link>}  time={1500} />
            :
            <div className={s.prodAndGrapCont}>
              <h2>{!user.admin ? spanish ? 'Mis Estadísticas' : "My Stats" : spanish ? 'Estadísticas de MyPc' : "Stats of MyPC"}</h2>
              <div className={s.graphicContainer}>
                <Graphic 
                  labels={months} 
                  score={ventas} 
                  text={spanish ? 'Vendidos' : "Sold"}
                  score2={publicaciones} 
                  text2={spanish ? 'Publicados' : "Published"}
                  />
              </div>
              {user.admin &&
                <div className={s.graphicContainer}>
                  <GraphicUsers 
                    labels={months} 
                    score={cantUsers} 
                    text={spanish ? 'Usuarios' : "Users"}
                    />
                </div>
              }
              {/* <div className={s.graphicContainer}>
                <Graphic labels={months} score={publicaciones} text='Mis Publicaciones'/>
              </div> */}
              <div className={s.prodContainer}>
                <h2>{!user.admin ? spanish ? 'Mis productos' : "My products" : spanish ? 'Todas las órdenes' : "All orders"}</h2>
                <b>{spanish ? "Cant: " : "Qty: "}{!user.admin? productsCreated.length : orders.length}</b>
                { 
                  !user.admin?
                  productsCreated.map(prod => {
                    return (
                        <div className={fav.prodFav}>
                          <hr/>
                          <div className={fav.containerProduct}>
                            <Link to={`/detail/${prod.id}`}>
                              <div className={fav.imgProdFav}>
                                <img src={prod.photo} alt="" />
                              </div>
                            </Link>
                            <div className={fav.infoProduct}>
                              <Link to={`/detail/${prod.id}`}>
                                <h2>{prod.title}</h2>
                              </Link>
                              <div className={fav.infoDetailsProduct}>
                                <h3>{spanish ? "Precio: $" : "Price: $"}{prod.price}</h3>
                                <h4>Likes: {prod.likes}</h4>
                              </div>
                            </div>
                          </div>
                          <div className={fav.extra}>
                            <h4>{prod.status}</h4>
                            <p>Stock: {prod.cant + '/' + prod.stockInitial}</p>
                            <div className={s.publish}>
                            <div className={fav.buttons}>
                              <h4 className={prod.sell? s.sellColor: s.publicColor}>{
                                  prod.sell? spanish ? 'Vendido' : "Sold" : spanish ? 'Publicado' : "Published"
                                }</h4>
                              <button onClick = {handleDelete} value={prod.id} className={s.button}>X</button>
                              <Link to ={`/user/userEditProduct/${prod.id}`}>
                                <button className={s.button}>{spanish ? "EDITAR" : "EDIT"}</button>
                              </Link>
                            </div>
                            </div>
                          </div>
                        </div>
                      )
                })
                :
                orders.map((c) => {
                  return (
                    <>
                      <hr></hr>
                      <div className={s2.orderCard}>
                        <div>
                          <b>{spanish ? "Nro de compra" : "Purchase Number: "}</b>
                          <p>{c.id}</p>
                          <h5>{spanish ? "Fecha: " : "Date: "}{c.date? c.date: null}</h5>
                        </div>
                        <div>
                          <h3>{spanish ? "Monto: $ " : "Amount: $ "}{c.fullPayment}</h3>
                            {/* <Link to={`order/${c.id}`}>
                              <button>
                                VER DETALLES
                              </button>
                            </Link> */}
                          <h3>{spanish ? "Estado: " : "State: "}{c.status}</h3>
                        </div>
                      </div>
                    </>
                  );
                }) 
              }
              </div>
            </div>
          :
          <Loading load={spanish ? 'Cargando' : "Loading"} msgError={spanish ? 'Debes loguearte para ver tus estadísticas!' : "You must login to see your stats!"} time={3000} />
      }
    </div>
  )
}

export default UserProducts;