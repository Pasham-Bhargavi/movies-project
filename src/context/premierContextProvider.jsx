// import React,{useState} from "react";
// import PremierContext from "./premierContext";

// const PremierContextProvider = ({children})=>{
//     const [seatIds, setsSeatIds] = useState([])
//     const [classicSeatIds, setclassicSeatIds] = useState([])
//     const [amount1,setAmount1]=useState(0)
//     const [username, setUsername] = useState(''); 
//     const [menuTotalPrice, setMenuTotalPrice] = useState(0);
//     const setsSeatId=(ids)=>{
//         setsSeatIds(ids)
//     }    
//     return (
//         <PremierContext.Provider value={{seatIds, setsSeatId,amount1,setAmount1,classicSeatIds, setclassicSeatIds,username, setUsername,menuTotalPrice, setMenuTotalPrice}}>
//         {children}
//         </PremierContext.Provider>
//     )
// }
// export default PremierContextProvider;


import React, { useState } from "react";
import PremierContext from "./premierContext";

const PremierContextProvider = ({ children }) => {
    const [seatIds, setsSeatIds] = useState([]);
    const [classicSeatIds, setclassicSeatIds] = useState([]);
    const [amount1, setAmount1] = useState(0);
    const [username, setUsername] = useState('');
    const [menuTotalPrice, setMenuTotalPrice] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0); 
    const [movieList, setMovieList] = useState([]);
    


    const setsSeatId = (ids) => {
        setsSeatIds(ids);
    };

    return (
        <PremierContext.Provider value={{
            seatIds, setsSeatId,
            amount1, setAmount1,
            classicSeatIds, setclassicSeatIds,
            username, setUsername,
            menuTotalPrice, setMenuTotalPrice,
            finalAmount, setFinalAmount,
            movieList, setMovieList
            
        }}>
            {children}
        </PremierContext.Provider>
    );
};

export default PremierContextProvider;
