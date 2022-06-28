import { useState, useEffect } from "react";
import Image from "next/image";
import tee1 from '../images/kolekat_doodle_tshirt.jpg'

const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

function PullJson() {
    return fetch(apiUrl)
        .then(response => response.json)
        .then(responseData => {
            console.log(responseData)
        })
       
    useEffect(() => {
        PullJson()
    }, [])
}

export default PullJson;
