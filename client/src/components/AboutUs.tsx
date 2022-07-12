import React from 'react'
import s from './Styles/AboutUs.module.css';
import angel from '../media/AboutUsImg/angel.png'
import lauti from '../media/AboutUsImg/lauti.png'
import mati from '../media/AboutUsImg/mati.png'
import nico from '../media/AboutUsImg/nico.png'
import tobias from '../media/AboutUsImg/tobias.png'
import santi from '../media/AboutUsImg/santi.png'
import Nico from '../media/AboutUsImg/Nico.jpeg'
import Angel from '../media/AboutUsImg/Angel.jpeg'
import Mati from '../media/AboutUsImg/Mati.jpeg'
import Lauti from '../media/AboutUsImg/Lauti.jpeg'
import Tobias from '../media/AboutUsImg/Tobias.jpeg'
import Santi from '../media/AboutUsImg/Santi.jpeg'


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
        imageFront: Lauti,   
        description : "aca tu description" ,
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Mati",
        age:  20,
        imageBack: mati,
        imageFront: Mati,   
        description : "Me gustan los jueguitos de computadora",
        linkedIn: "https://www.linkedin.com/in/matias-jesus-contreras-fullstack-developer/",
        gitHub: "https://github.com/OriusMJC"
    },
    {
        name: "Nicolás Rojo",
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
        imageFront: Tobias,    
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Angel",
        age:  1980,
        imageBack: angel,
        imageFront: Angel,   
        description : "aca tu description",
        linkedIn: "mi linkedin",
        gitHub: "mi git"
    },
    {
        name: "Santi",
        age:  1980,
        imageBack: santi,
        imageFront: Santi,   
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
                                  <p>Edad: {user.age}</p>
                                  <p>{user.description}</p>
                                  <div className={s.redes}>
                                  <a  href={user.linkedIn} target='_blank'><i className='fa fa-linkedin-square' ></i></a>                                  
                                  <a href={user.gitHub} target='_blank'><i className='fa fa-github-square'></i></a>                                
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
