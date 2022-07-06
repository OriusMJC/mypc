import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/config/config';
import { getAllDetails } from 'src/redux/actions';
import MapView from '../Map/MapView';

function DirectionOrder() {
  
  let {id} = useParams();
  let dispatch = useAppDispatch()
  let product = useSelector((state:any) => state.productDetails);

  useEffect(() => {
    dispatch(getAllDetails(id))
  }, [])
  if(product.id) {
    return (
      <MapView user={[product.sellerInfo]} />  
    )
  }
}

export default DirectionOrder