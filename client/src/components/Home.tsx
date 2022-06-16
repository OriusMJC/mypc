import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllComponents} from '../redux/actions';
import { Products, PcTypes } from '../../types';
import { useAppDispatch  } from '../config/config';

// type Components = {
//     c: string | number | PcTypes
// }

function Home(){
    const dispatch = useAppDispatch();
    const allComponents = useSelector((state: any) => state.components);

    useEffect(() => {
        dispatch(getAllComponents());
    }, [dispatch]);


    return (
        <div>
            <h1>Home</h1>
        </div>
    )

}


export default Home;