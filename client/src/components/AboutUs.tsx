import React from 'react'
import s from './Styles/AboutUs.module.css';
import angel from '../media/AboutUsImg/angel.png'
import lauti from '../media/AboutUsImg/lauti.png'
import mati from '../media/AboutUsImg/mati.png'
import nico from '../media/AboutUsImg/nico.png'
import Nico from '../media/AboutUsImg/Nico.jpeg'
import santi from '../media/AboutUsImg/santi.png'
import tobias from '../media/AboutUsImg/tobias.png'
import { Link } from 'react-router-dom';


interface usData {    
    name: string
    age: number
    imageBack: string
    imageFront: string
    description: string
    linkedIn: string
    gitHub: string
}



const aboutUsDate: Array<usData> =[
    {
        name: "Lauti",
        age:  1980,
        imageBack: lauti,
        imageFront: "",   
        description : "aca tu description" ,
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Mati",
        age:  1980,
        imageBack: mati,
        imageFront: "",   
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Nico",
        age:  35,
        imageBack: nico,
        imageFront: Nico,   
        description : "Me gusta comer milanesas",
        linkedIn: "https://www.linkedin.com/in/nicolasbrojo/",
        gitHub: "https://github.com/Nicostudent"
    },
    {
        name: "Tobias",
        age:  1980,
        imageBack: tobias,
        imageFront: "",    
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Angel",
        age:  1980,
        imageBack: angel,
        imageFront: "",   
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Santi",
        age:  1980,
        imageBack: santi,
        imageFront: "",   
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    }
] 



function AboutUs() {
    return (
        <div className={s.container}>
             <h1>About us</h1>
        <div className={s.gridcontainer}>
           
            {
                aboutUsDate.map(user => {
                    return(
                        <div className={s.card}>
                            <div className={`${s.face} ${s.front}`}>
                                <h3>{user.name}</h3>
                                <img src={user.imageFront} alt="foto caripela"/>
                            </div>
                            <div className={`${s.face} ${s.back}`}>                                
                                  <p>{user.name}</p>
                                  <p>{user.age}</p>
                                  <p>{user.description}</p>
                                  <div className={s.redes}>
                                  <Link  to={user.linkedIn}><i className='fa fa-linkedin-square' ></i></Link>                                  
                                  <Link to={user.gitHub}><i className='fa fa-github-square'></i></Link>                                
                                  </div>
                              <img src={user.imageBack} alt={user.name}/>
                            </div>

                        </div>
                    )
                })
            }
            </div>
         </div>
    )
}


export default AboutUs
