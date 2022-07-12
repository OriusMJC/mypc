import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllComponents } from "../../redux/actions";
import { useAppDispatch } from "../../config/config";
import Pages from "../ProductPage/Pages";
import s from "../Styles/Home.module.css";
import { userData } from "src/services/userFirebase";
import NavFilter from '../NavFilter'
import Slider from "./Slider";
import FavedProducts from './FavedProducts'
import RelationatedProducts from './RelationatedProducts'

// import { Link } from 'react-router-dom';
// import { Products } from '../../types'
// import ProductsCards from './ProductsCards';


//seteo de estados
// interface AppState {
//   currentPage: number;
//   productsPerPage: number;
// }

//tipos
// type ProductsCards = Products;

export default function Home() {
  const dispatch = useAppDispatch();
  const allComponents = useSelector((state: any) => state.components);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [refresh, setRefresh] = useState(1);
  // const isUserLogin= async()=>{
  //   let resId = await userData()
  //   if(resId){
  //     dispatch(loginUser(resId))
  //   }
  // }
  useEffect(() => {
    let res = userData();
    // isUserLogin()
    dispatch(getAllComponents());
  }, []);

  return (
    <div className={s.homeContainer}>
      <div>       
        <NavFilter refresh={refresh} setRefresh={setRefresh} setProductsPerPage={setProductsPerPage} products={true} lengthAll={allComponents?.length}/>
        <Slider/>
        <FavedProducts/>
        <RelationatedProducts/>
        <Pages
          productsPerPage={productsPerPage}
          allComponents={allComponents}
          refresh={refresh}
        />
      </div>
    </div>
  );
}
