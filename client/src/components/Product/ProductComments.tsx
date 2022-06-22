import { useState } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment } from "src/redux/actions"

export default function ProductComments({idProd,comments}){
  const dispatch = useAppDispatch()
  let userData = useSelector((state:any) => state.userDetails)
  const [newComment,setNewComment] = useState({
    name: userData?.name,
    avatar: userData?.avatar,
    comment: ''
  })
  function handleChange(e:any){
    setNewComment({
      ...newComment,
      comment: e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    if(userData.id){
      dispatch(addProductComment(idProd,newComment))
      setNewComment({
        name: userData?.name,
        avatar: userData?.avatar,
        comment: ''
      })
    }else{
      alert('Debes inciar sesión para poder comentar')
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type='text' value={newComment.comment} onChange={handleChange}/>
        <button type="submit">Enviar</button>
      </form>
      <div>
        {
          comments.length? comments.map((obj:any)=>{
          return(
            <div>
              <div>
                <img src={obj.avatar} alt={obj.name}/>
                <p>{obj.name}</p>
              </div>
              <div>
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