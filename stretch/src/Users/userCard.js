import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function UserCard() {
    const [people, setPeople] = useState([])
  useEffect(() =>{
    axios.get('http://localhost:5000/api/users')
    .then((res)=>{
        // console.log(res.data)
        setPeople=(res.data);
        console.log(setPeople);
    }, [])
    .catch((error) =>{
        console.log(error)
    })

  })  
 
    return (
        
        <div>
            <h1>yo</h1>
        </div>
    )
}
