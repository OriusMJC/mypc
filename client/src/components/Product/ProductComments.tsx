import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment, deleteProductComment, addSellerResp, getAllDetails, deleteSellerResp} from "src/redux/actions"
import s from '../Styles/ProductComments.module.css'
import swal from 'sweetalert';

export default function ProductComments({idProd,comments, boolean, idProduct}){
  const arrId = comments.map((c:any) => Number(c.id));
  const id = arrId.length ? Math.max(...arrId) + 1 : 0;
  const dispatch = useAppDispatch()
  let userData = useSelector((state:any) => state.userDetails)
  const admin = useSelector((state:any)=> state.userDetails?.admin)
  
  const d = new Date();
  const [date, setDate] = useState(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`)

  const dataUser = {
    avatar: userData.avatar,
    name: userData.name
  }
  const [refresh, setRefresh] = useState([1]);
  const [newComment,setNewComment] = useState('')
  const [actualPosition, setActualPosition] = useState([null,null]);
  const [sellerResponse, setSellerResponse] = useState({
    avatar: dataUser.avatar,
    comment: '',
    id: null,
    name: dataUser.name,
    response: false,
    date: date,
  })

  function handleChange(e:any){
    setNewComment(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(newComment.length){
      if(userData.id && userData.name && userData.avatar){
        dispatch(addProductComment(idProd,{id: id, name:userData.name,avatar:userData.avatar,comment: newComment,sellerResponse: sellerResponse, date: date}))
        swal({text: "comentario agregado", icon: "success", timer: 1000})
        setNewComment('');
      }else{
        e.preventDefault();
        // alert('Debes inciar sesión para poder comentar')
        swal({
          title: "No estas Logueado",
          text: "Debes inciar sesión para poder comentar",
          icon: "warning",
        });  
      }
    }else{
      swal({
        title: "Error",
        text: "No puedes enviar un comentario vacio",
        icon: "error",
      })     
      // alert('No puedes enviar un comentario vacio')  
    }
  }

  function handleDeleteComment(e){
    e.preventDefault();   
    swal({
      title: "Cuidado",
      text: "Estas seguro de eliminar tu comentario?",
      icon: "warning",
      buttons: ["No", "Si"]
    }).then(response =>{
        if(response){
          swal({text: "comentario eliminado", icon: "success", timer: 1000})
          dispatch(deleteProductComment(idProduct, Number(e.target.value)))
        }
    })
  }

  function handleActualPos(e){
    setActualPosition(e.target.value.split(','))
    setSellerResponse({
      ...sellerResponse,
      comment: '' 
    })
    setRefresh([...refresh, 1])
  }

  function handleSellerResponse(e){
    setSellerResponse({
      ...sellerResponse,
      [e.target.name]: e.target.value,
    })
  }

  function handleCancelResp(){
    setActualPosition([null,null])
  }

  function handleDeleteResp(id){     
    swal({
      title: "Cuidado",
      text: "Estas seguro de eliminar tu respuesta?",
      icon: "warning",
      buttons: ["No", "Si"]
    }).then(response =>{
        if(response){
          swal({text: "respuesta eliminado", icon: "success", timer: 1000})         
          dispatch(deleteSellerResp(idProduct, {
            ...sellerResponse,
            id: Number(id),
            comment: '',
      response: false,
    }))
    dispatch(getAllDetails(idProduct));
    dispatch(getAllDetails(idProduct));
    dispatch(getAllDetails(idProduct));
  }
})
  }

  function handleResponseSubmit(e){
    e.preventDefault();
    setRefresh([...refresh, 1])
    dispatch(addSellerResp(idProduct, {
      ...sellerResponse,
      id: Number(actualPosition[1]),
      response: true,
    }))
    swal({text: "respuesta enviada", icon:"success", timer: 1000})
    dispatch(getAllDetails(idProduct))
    dispatch(getAllDetails(idProduct))
    setActualPosition([null,null]);
    setSellerResponse({
      ...sellerResponse,
      id: null,
      comment: '',
      response: false,
    })
  }

  useEffect(() => {
    setDate(`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`)
  }, [])


  return (
    <section id={s.sectionComments}>
        <h3>Haz tu pregunta aquí</h3>
      <form onSubmit={handleSubmit}>
        <input name="comment" type='text' value={newComment} onChange={handleChange}/>
        <button className={s.btnSend} type="submit">Enviar</button>
      </form>
      {
          //visualizacion respuesta
          actualPosition[0] !== null &&
          <div className = {s.sellerContainer}>
            <div className = {s.sellerCont}>
              <button onClick = {handleCancelResp} className = {s.xButton}>X</button>
            <div className = {s.resp3}>
              <label>Respondiendo al comentario de: {comments[actualPosition[0]].name}</label>
              <p>{comments[actualPosition[0]].comment}</p>
            </div>
            {
            <div>
              <div className = {s.resp}>
                <div className = {s.resp1}>
                <img src = {comments[actualPosition[0]].sellerResponse.avatar && comments[actualPosition[0]].sellerResponse.avatar}></img>
                </div>
                  <div className = {s.resp2}>
                    <h4>{comments[actualPosition[0]].sellerResponse.name && comments[actualPosition[0]].sellerResponse.name}</h4>
                    <p>{sellerResponse.comment}</p>
                  </div>
                </div>
                <form onSubmit = {handleResponseSubmit}>
                  <input name = "comment" value = {sellerResponse.comment} onChange = {handleSellerResponse} placeholder = " Tu respuesta.."/>
                  <button type = 'submit'>Enviar</button>
                </form>
              </div>
            }
            </div>
          </div>
       }
      <div id={s.commentsContainer}>
        {
          typeof comments !== null && refresh.length && comments.length? comments.map((obj:any, i:number)=>{
          let arr = [i, obj.id]
          return(
            <>
            <div className={s.comments}>
              <img src={obj.avatar} alt={obj.name}/>
              <div>
                <p className = {s.date}>{obj.date}</p>
                <h4>{obj.name}</h4>
                <p>{obj.comment}</p>
              {
                (boolean || admin)
                &&
                <div className={s.btnsComSeller}>
                  <button value={obj.id} onClick = {handleDeleteComment}>X</button>
                  <button value={arr} 
                  onClick = {handleActualPos}>
                    Responder
                  </button>
                </div>
              }
              </div>
            </div>
              {
                obj.sellerResponse.response &&
                  <div className={`${s.comments} ${s.sellerResponse}`}>
                    <img src = {obj.sellerResponse.avatar && obj.sellerResponse.avatar}></img>
                    <div>
                      <p className = {s.dateSeller}>{obj.sellerResponse.date && obj.sellerResponse.date}</p>
                      <h5>Vendedor</h5>
                      <h4>{obj.sellerResponse.name && obj.sellerResponse.name}</h4>
                      <p>{obj.sellerResponse.comment && obj.sellerResponse.comment}</p>
                      <div className={s.btnsComSeller}>
                      {
                        (boolean || admin) &&
                        <button value = {obj.id} onClick = {() => handleDeleteResp(obj.id)}>X</button>
                      }
                      </div>
                    </div>
                  </div>
              }
            </> 
            )
          })
          :
          <h4> Aún no hay comentarios. Sé el primero en hacer uno!</h4>
        }

      </div>
        
    </section>
  )
}