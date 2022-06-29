import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment, deleteProductComment, addSellerResp, getAllDetails} from "src/redux/actions"
import s from '../Styles/ProductComments.module.css'

export default function ProductComments({idProd,comments, boolean, idProduct}){
  const arrId = comments.map((c:any) => Number(c.id));
  const id = arrId.length ? Math.max(...arrId) + 1 : 0;
  const dispatch = useAppDispatch()
  let userData = useSelector((state:any) => state.userDetails)
  const admin = useSelector((state:any)=> state.userDetails?.admin)

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
  })

  function handleChange(e:any){
    setNewComment(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(newComment.length){
      if(userData.id && userData.name && userData.avatar){
        dispatch(addProductComment(idProd,{id: id, name:userData.name,avatar:userData.avatar,comment: newComment,sellerResponse: sellerResponse}))
        setNewComment('');
      }else{
        alert('Debes inciar sesión para poder comentar')
      }
    }else{
      alert('No puedes enviar un comentario vacio')
    }
  }

  function handleDeleteComment(e){
    dispatch(deleteProductComment(idProduct, Number(e.target.value)))
  }

  function handleActualPos(e){
    setActualPosition(e.target.value.split(','))
    setSellerResponse({
      ...sellerResponse,
      comment: '' 
    })
  }

  function handleCancelResp(){
    setActualPosition([null,null])
  }

  function handleSellerResponse(e){
    setSellerResponse({
      ...sellerResponse,
      [e.target.name]: e.target.value,
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
        <input type='text' value={newComment} onChange={handleChange}/>
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
            <div className={s.comments}>
              <img src={obj.avatar} alt={obj.name}/>
              <div>
                <h4>{obj.name}</h4>
                <p>{obj.comment}</p>
              {
                (boolean || admin)
                &&
                <div>
                <button value={obj.id} onClick = {handleDeleteComment}>X</button>
                <button value={arr} 
                onClick = {handleActualPos}
                >Responder</button>
                </div>
              }
              </div>
            </div>
            <div>
              {
                obj.sellerResponse.response &&
                <div>
                <img src = {obj.sellerResponse.avatar && obj.sellerResponse.avatar}></img>
                <div>
                  <h4>{obj.sellerResponse.name && obj.sellerResponse.name}</h4>
                  <p>{obj.sellerResponse.comment && obj.sellerResponse.comment}</p>
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