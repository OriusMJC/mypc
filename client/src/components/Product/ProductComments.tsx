import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment, deleteProductComment, addSellerResp, getAllDetails, deleteSellerResp} from "src/redux/actions"
import { userData as userData1 } from "src/services/userFirebase";
import s from '../Styles/ProductComments.module.css'
import swal from 'sweetalert';

export default function ProductComments({idProd,comments, boolean, idProduct}){
  const dispatch = useAppDispatch()

  useEffect(() => {
    let res = userData1();
  }, [])

  const arrId = comments.map((c:any) => Number(c.id));
  const id = arrId.length ? Math.max(...arrId) + 1 : 0;
  let userData = useSelector((state:any) => state.userDetails)
  let userId = userData && userData.id
  const admin = useSelector((state:any)=> state.userDetails?.admin)

  // console.log(userData);
  
  function actualDate(){
    const d = new Date();
    let date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return date;
  }
  
  const dataUser = {
    avatar: userData && userData.avatar,
    name: userData && userData.name
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
    date: null,
  })

  function handleChange(e:any){
    setNewComment(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(newComment.length){
      if(userData.id && userData.name && userData.avatar){
        dispatch(addProductComment(idProd,{id: id, userId: userId, name:userData.name,avatar:userData.avatar,comment: newComment,sellerResponse: sellerResponse, date: actualDate()}))
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
      date: actualDate(),
    }))
    // swal({text: "respuesta enviada", icon:"success", timer: 1000})
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


  return (
    <section id={s.sectionComments}>
        <h3>Haz tu pregunta aquí</h3>
      <form onSubmit={handleSubmit}>
        <input name="comment" type='text' value={newComment} onChange={handleChange}/>
        <button className={s.btnSend} type="submit">Enviar</button>
      </form>
      <div>
      {
          //visualizacion respuesta
          actualPosition[0] !== null &&
          <div>
          <button onClick = {handleCancelResp}>X</button>
          <h4>respondiendo al comentario: {comments[actualPosition[0]].comment}</h4>
          {
          <div>
            <img src = {comments[actualPosition[0]].sellerResponse.avatar && comments[actualPosition[0]].sellerResponse.avatar}></img>
            <div>
              <h4>{comments[actualPosition[0]].sellerResponse.name && comments[actualPosition[0]].sellerResponse.name}</h4>
              <p>{sellerResponse.comment}</p>
              <form onSubmit = {handleResponseSubmit}>
              <input name = "comment" value = {sellerResponse.comment} onChange = {handleSellerResponse} />
              <button type = 'submit'>Enviar</button>
              </form>
              </div>
            </div>
          }
          </div>
        }
      </div>
      <div id={s.commentsContainer}>
        {
          typeof comments !== null && refresh.length && comments.length? comments.map((obj:any, i:number)=>{
          let arr = [i, obj.id]
          return(
            <>
            <div>
            <div className={s.comments}>
              <img src={obj.avatar && obj.avatar} alt={obj.name}/>
              <div>
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
              {
                userId === obj.userId && !boolean &&
                <div className = {s.deleteCom}>
                  <button value={obj.id} onClick = {handleDeleteComment} className = {s.deleteCUser}>X</button>
                </div>
              }
            </div>
              {
                
                obj.sellerResponse.response &&
                  <div className={`${s.comments} ${s.sellerResponse}`}>
                    <img src = {obj.sellerResponse.avatar && obj.sellerResponse.avatar}></img>
                    <div>
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
            </div>
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