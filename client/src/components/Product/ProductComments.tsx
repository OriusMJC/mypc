import { useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment } from "src/redux/actions"
import s from '../Styles/ProductComments.module.css'

export default function ProductComments({idProd,comments}){
  const dispatch = useAppDispatch()
  let userData = useSelector((state:any) => state.userDetails)
  const [newComment,setNewComment] = useState('')
  function handleChange(e:any){
    setNewComment(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(newComment.length){
      if(userData.id && userData.name && userData.avatar){
        dispatch(addProductComment(idProd,{name:userData.name,avatar:userData.avatar,comment: newComment}))
        setNewComment('')
      }else{
        alert('Debes inciar sesión para poder comentar')
      }
    }else{
      alert('No puedes enviar un comentario vacio')
    }
  }
 
  return (
    <section id={s.sectionComments}>
        <h3>Haz tu pregunta aquí</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' value={newComment} onChange={handleChange}/>
        <button type="submit">Enviar</button>
      </form>
      <div id={s.commentsContainer}>
        {
          typeof comments !== null && comments.length? comments.map((obj:any)=>{
          return(
            <div className={s.comments}>
              <img src={obj.avatar} alt={obj.name}/>
              <div>
                <h4>{obj.name}</h4>
                <p>{obj.comment}</p>
              </div>
            </div>
            )
          })
          :
          <h4> Aún no hay comentarios. Sé el primero en hacer uno!</h4>
        }
      </div>
        
    </section>
  )
}