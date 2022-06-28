import { useState} from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "src/config/config"
import { addProductComment, deleteProductComment, addSellerResp} from "src/redux/actions"
import s from '../Styles/ProductComments.module.css'

export default function ProductComments({idProd,comments, boolean, idProduct}){
  const arrId = comments.map((c:any) => Number(c.id));
  const id = arrId.length ? Math.max(...arrId) + 1 : 0;
  const dispatch = useAppDispatch()
  let userData = useSelector((state:any) => state.userDetails)

  
  const [newComment,setNewComment] = useState('')
  // const [actualId, setActualId] = useState(0);
  // const [sellerResponse, setSellerResponse] = useState({
  //   avatar: userData.avatar,
  //   comment: '',
  //   id: 0,
  //   name: userData.name,
  //   response: false,
  // })


  function handleChange(e:any){
    setNewComment(e.target.value)
  }

  function HandleSubmit(e){
    e.preventDefault();
    if(newComment.length){
      if(userData.id && userData.name && userData.avatar){
        dispatch(addProductComment(idProd,{id: id, name:userData.name,avatar:userData.avatar,comment: newComment, 
          // sellerResponse: sellerResponse
        }))
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

  // function handleActualId(e){
  //   setActualId(e.target.value)
  // }

  // function handleSellerResp(e){
  //   setSellerResponse({
  //     ...sellerResponse,
  //     comment: e.target.value,
  //     id: actualId,
  //   })
  // }

  // function handleResponseSubmit(e){
  //   e.preventDefault();
  //   dispatch(addSellerResp(idProduct, {
  //     ...sellerResponse,
  //     response: true,
  //   }))
  //   alert('Resp enviada')
  // }

  return (
    <section id={s.sectionComments}>
        <h3>Haz tu pregunta aquí</h3>
      <form onSubmit={HandleSubmit}>
        <input type='text' value={newComment} onChange={handleChange}/>
        <button type="submit">Enviar</button>
      </form>
      <div id={s.commentsContainer}>
        {
          typeof comments !== null && comments.length? comments.map((obj:any)=>{
          return(
            <>
            <div className={s.comments}>
              <img src={obj.avatar} alt={obj.name}/>
              <div>
                <h4>{obj.name}</h4>
                <p>{obj.comment}</p>
 
              {
                boolean 
                &&
                <div>
                <button value={obj.id} onClick = {handleDeleteComment}>X</button>
                <button value={obj.id} 
                // onClick = {handleActualId}
                >Responder</button>
                </div>
              }
              </div>
            </div>
            {/* {
              obj.sellerResponse.response ?
              <div>
                <img src={obj.sellerResponse.avatar}/>
              <div>
                <h4>{obj.sellerResponse.name}</h4>
                <p>{obj.sellerResponse.comment}</p>
              </div>
              </div>
              :
              <div>
                <form onSubmit = {handleResponseSubmit}>
                <input value = {sellerResponse.comment} onChange = {handleSellerResp}/>
                <button type = 'submit'>Enviar</button>
                </form>
              </div>
            } */}
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