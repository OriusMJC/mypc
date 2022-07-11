import React from 'react'
import s from './Styles/AboutUs.module.css';
import angel from '../media/AboutUsImg/angel.png'
import lauti from '../media/AboutUsImg/lauti.png'
import mati from '../media/AboutUsImg/mati.png'
import nico from '../media/AboutUsImg/nico.png'
import santi from '../media/AboutUsImg/santi.png'
import tobias from '../media/AboutUsImg/tobias.png'



interface usData {    
    name: string
    date: number
    image: string
}



const aboutUsDate: Array<usData> =[
    {
        name: "Lauti",
        date:  1980,
        image: lauti    
    },
    {
        name: "Mati",
        date:  1980,
        image:  mati          
    },
    {
        name: "Nico",
        date:  1980,
        image: nico   
    },
    {
        name: "Tobias",
        date:  1980,
        image: tobias   
    },
    {
        name: "Angel",
        date:  1980,
        image: angel    
    },
    {
        name: "Santi",
        date:  1980,
        image: santi  
    }
] 



function AboutUs() {
    return (
        <div className={s.container}>
            <h1> About us</h1>
        <div className={s.gridcontainer}>
            {
                aboutUsDate.map(user => {
                    return(
                        <div className={s.eachOfUs}>
                            <p>{user.name}</p>
                            <p>{user.date}</p>
                            <img src={user.image} alt={user.name}/>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}


export default AboutUs
