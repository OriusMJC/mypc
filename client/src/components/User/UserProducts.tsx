import { useEffect, useLayoutEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllComponents } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'
import Graphic from '../Graphics/Graphic';
import s from '../Styles/UserProducts.module.css'
import sBtn from "../Styles/userDetails.module.css";

import fav from '../Styles/Fav.module.css'
import Loading from '../Loading/Loading';
import swal from 'sweetalert';

function UserProducts() {
  const dispatch = useAppDispatch();
  const products = useSelector((state:any) => state.allComponents);
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
  }, []);

  function handleDelete(e){
    swal({         
      text: "Estas seguro de eliminar el producto?",
      icon: "warning",
      buttons: ["No", "Si"]
    }).then(respuesta =>{
      if(respuesta){
         swal({text: "Producto eliminado correctamente" , icon: "success"})
         dispatch(deleteProduct(e.target.value))
         dispatch(getAllComponents());
      }
    })
  }

  // let ventas= [2,4,3,17,13,24,9,11,8,7,22,18]
  // let publicaciones =[8,25,13,14,9,23,5,3,6,25,15,12]
  const [ventas,setVentas] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const [publicaciones,setPublicaciones] = useState([0,0,0,0,0,0,0,0,0,0,0,0])
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  
  function estadisticas(admin){
    let newVe = [...ventas]
    let newPubl = [...publicaciones]
    if(admin){
      products.forEach((prod:any)=>{
        let num = Number(prod.createdAt.slice(5,7))
        newPubl[num -1] = newPubl[num -1] + prod.stockInitial
        if(prod.sell){
          newVe[num -1]= newVe[num -1] + (prod.stockInitial - prod.cant)
        }
      })
    }else{
      productsCreated.forEach((prod:any)=>{
        let num = Number(prod.createdAt.slice(5,7))
        newPubl[num -1] = newPubl[num -1] + prod.stockInitial
        if(prod.sell){
          newVe[num -1]= newVe[num -1] + (prod.stockInitial - prod.cant)
        }
      })
    }
    setVentas(newVe)
    setPublicaciones(newPubl)
    setRefresh(refresh+1)
  }
  if(!user.admin && productsCreated.length && refresh < 2){
    estadisticas(false)
  }else if(user.admin && products.length && refresh < 2){
    estadisticas(true)
  }
  

  return (
    <div className={s.userProducstContainer}>
      <Link to ='/user/detail' className={s.buttonHome}>
        <button>
          Regresar
        </button>
      </Link>
      {
        user && user.id ?
          !productsCreated.length && !user.admin
            ?   
            swal({
              title: "No tienes ningun producto para vender",            
              icon: "warning",
              timer: 1500,
            }) &&
            <Loading load='Cargando' msgError={<Link to = "/user/createProduct">
              <button className={sBtn.buttonButton}>
                Vender
              </button>
            </Link>}  time={1500} />
            :
            <div className={s.prodAndGrapCont}>
              <h2>Mis Estadísticas</h2>
              <div className={s.graphicContainer}>
                <Graphic 
                  labels={months} 
                  score={ventas} 
                  text='Vendidos'
                  score2={publicaciones} 
                  text2='Publicados'
                  />
              </div>
              {/* <div className={s.graphicContainer}>
                <Graphic labels={months} score={publicaciones} text='Mis Publicaciones'/>
              </div> */}
              <div className={s.prodContainer}>
                <h2>{!user.admin ? 'Mis productos' : 'Todos los productos'}</h2>
                <b>Cant: {!user.admin? productsCreated.length : products.length}</b>
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
                                <h3>Precio: ${prod.price}</h3>
                                <h4>Likes: {prod.likes}</h4>
                              </div>
                            </div>
                          </div>
                          <div className={fav.extra}>
                            <h4>{prod.status}</h4>
                            <p>Stock: {prod.cant + '/' + prod.stockInitial}</p>
                            <div className={fav.buttons}>
                              <h4 className={prod.sell? s.sellColor: s.publicColor}>{
                                  prod.sell? 'Vendido' : 'Publicado'
                                }</h4>
                              <button onClick = {handleDelete} value={prod.id} className={s.button}>X</button>
                              <Link to ={`/user/userEditProduct/${prod.id}`}>
                                <button className={s.button}>EDITAR</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                })
                :
                products.map(prod => {
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
                              <h3>Precio: ${prod.price}</h3>
                              <h4>Likes: {prod.likes}</h4>
                            </div>
                          </div>
                        </div>
                        <div className={fav.extra}>
                          <h4>{prod.status}</h4>
                          <p>Stock: {prod.cant + '/' + prod.stockInitial}</p>
                          <div className={fav.buttons}>
                            <h4 className={prod.sell? s.sellColor: s.publicColor}>{
                                prod.sell? 'Vendido' : 'Publicado'
                              }</h4>
                            <button onClick = {handleDelete} value={prod.id} className={s.button}>X</button>
                            <Link to ={`/user/userEditProduct/${prod.id}`}>
                              <button className={s.button}>EDITAR</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
              })
              }
              </div>
            </div>
          :
          <Loading load='Cargando' msgError='Debes loguearte para ver tus estadísticas!' time={3000} />
      }
    </div>
  )
}

export default UserProducts;