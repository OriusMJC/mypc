import React from 'react';
import s from './Styles/Types.module.css';
import { useAppDispatch } from '../config/config';
import { filterComponentsByCategory } from '../redux/actions'
import motherboard from '../media/motherboard.png'
import graphic from '../media/graphic.png'

function Types({types, spanish, refresh, setRefresh}) {
    const dispatch = useAppDispatch();

    function value(e){
        console.log(e.target.value)
        return e.target.value
    }

    function handleFilter (e) {
        dispatch(filterComponentsByCategory(value(e)))
        setRefresh(refresh+1)
    }

    if(types && types.length){
        return (
            <div className = {s.container}>
                {/* TODO */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,0" />
                <button value = 'All' key = 'All' onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                apps
                </span>
                {spanish ? 'Todo' : 'All'}
                </button>
        
                {/* full */}
                <button value={types[0]} key = {types[0]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                computer
                </span>
                {types[0]}
                </button>
        
                {/* motherboard */}
                <button value={types[1]} key = {types[1]} onClick={handleFilter} className = {s.buttonsImg}>
                <img src = {motherboard} width = '20px'/>
                {types[1]}
                </button>
        
                {/* procesador */}
                <button value={types[2]} key = {types[2]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                developer_board
                </span>
                {types[2]}
                </button>
        
                {/* grafica */}
                <button value={types[3]} key = {types[3]} onClick={handleFilter} className = {s.buttons}>
                <img src={graphic} width = '20px'/>
                {types[3]}
                </button>
        
                {/* ram */}
                <button value={types[4]} key = {types[4]} onClick={handleFilter} className = {s.buttons}>
                <i className="fas fa-memory"></i>
                {types[4]}
                </button>
        
                {/* ssd */}
                <button value={types[5]} key = {types[5]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                save
                </span>   
                {types[5]}
                </button>
        
                {/* hdd */}
                <button value={types[6]} key = {types[6]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                save
                </span>  
                {types[6]}
                </button>
        
                {/* cooler */}
                <button value={types[7]} key = {types[7]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                mode_fan
                </span>
                {types[7]}
                </button>
        
                {/* monitor */}
                <button value={types[8]} key = {types[8]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                desktop_windows
                </span>
                {types[8]}
                </button>
        
                {/* Mouse */}
                <button value={types[9]} key = {types[9]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                mouse   
                </span>
                {types[9]}
                </button>
        
                {/* teclado */}
                <button value={types[10]} key = {types[10]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                keyboard
                </span>
                {types[10]}
                </button>
        
                {/* cables */}
                <button value={types[11]} key = {types[11]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                cable
                </span>
                {types[11]}
                </button>
        
                {/* fuente */}
                <button value={types[12]} key = {types[12]} onClick={handleFilter} className = {s.buttons}>
                <span className="material-symbols-outlined">
                bolt
                </span>
                {types[12]}
                </button>
            
            </div>
          )
    }
}

export default Types