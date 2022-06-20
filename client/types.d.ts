// Aqui creamos todas las types a utilizar

//Ejemplos del video de midu para tener en cuenta la manera de construirlos
//para verlo mejor descomenta desde la linea 7 para abajo.


// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
// export type Visibiliy = 'great' | 'good' | 'ok' | 'poor' 

// export interface DiaryEntry {
//     id: number, //le decimos que va a ser de tipo number
//     date: string, //le decimos que va a ser de tipo string
//     weather: Weather, //le decimos que va a ser de tipo Weather qeu creamos arriba
//     visibility: Visibiliy,
//     comment: string
// }

// //Manera de extender el interface agregandole mas variables.

// interface SpecialDiaryEntry extends DiaryEntry{
//     //automaticamente se hace una copia de lo que ya habia en DiaryEntry
//     //y le agregamos lo que querramos a este obj
//     flightNumber: number //Le decimos que va a ser de tipo number
// }

// //Formas de obtener algo en especifico de un Type o Interface
// //todo esto para no tener que crear mas tipos o interface en vano.
// //ej:
// //        con Pick obtenemos     Aca le decimos de donde  y aca lo que tiene que agarrar
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id','date'>


// //        con Omit omitimos     Aca le decimos de donde  y aca lo que tiene que omitir
// export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>


export type PcTypes = 'full' | 'motherboard' | 'procesador' | 'grafica' | 'ram' | 'ssd' | 'hdd' | 'cooler' | 'monitor' | 'mouse' | 'teclado' | 'cables' | 'fuente'
export type PcStatus = 'Nuevo' | 'Usado'
// export type NonSensitiveUserInfo = Pick<User, 'id','name','email','avatar','phone'>
// export type basicProductInfo = Pick<Products, 'id','title','photo','price'>

// export interface User {
//     id:string,
//     name:string,
//     email:string,
//     password:string,
//     phone?:string,
//     avatar?:string,
//     fav?: Array<basicProductInfo>,
//     buy?: Array<basicProductInfo>,
//     sell?: Products[]
// }

export interface Products{
    id:string,
    title:string,
    photo:string,
    price:number,
    type: PcTypes,
    description?:string,
    likes:number,
    comments?: Array<{
        name:string,
        avatar?:string,
        comment:string
    }>,
    status: PcStatus,
    // sellerInfo: NonSensitiveUserInfo
}