import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/config/config';
import { getAllDetails } from 'src/redux/actions';
import MapView from '../Map/MapView';
import s from '../Styles/Direction.module.css'


function DirectionOrder() {
  
  let {id} = useParams();
  let dispatch = useAppDispatch()
  let product = useSelector((state:any) => state.productDetails);

  useEffect(() => {
    dispatch(getAllDetails(id))
  }, [])
  if(product.id) {
    return (
      <div className={s.directionContainer}>
        <h1>Localizaciones de los vendedores</h1>
        <MapView user={[product.sellerInfo]}/>  
      </div>
    )
  }
}

export default DirectionOrder