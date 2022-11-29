/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {
        // TODO Part I-3-b: get information of restaurants from DB
        const priceFilter = state.priceFilter;
        const mealFilter = state.mealFilter;
        const typeFilter = state.typeFilter;
        const sortBy = state.sortBy;

        console.log(priceFilter, mealFilter, typeFilter, sortBy);


        const {
            data: { message, contents},
        } = await axios.get('http://localhost:4000/api/getSearch', 
        {params: {
            priceFilter, mealFilter, typeFilter, sortBy
          }});
        
        if(message === 'success'){
            console.log('success!');
            setRestaurant(contents);
        }else{
            console.log('error');
        }
        // console.log(contents[0].name);

    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        console.log('to restaurant');
        navigate('/restaurant/'+id);
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    const mergeTags = (tags) => {
        let output_string = ""
        for (let i=0; i<tags.length; i++){
            if (i===0){
                output_string += tags[i];
            }else{
                output_string += (', ' + tags[i]);
            }
        }
        return output_string;
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map(({id, name, tag, img, time, distance, price}) => (
                    // TODO Part I-2: search page front-end
                    <div className='resBlock' id={id} key={id} onClick={() => ToRestaurant(id)}>
                        <div className='resImgContainer'>
                            <img className='resImg' src={img}></img>
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{name}</p>
                                <p className='price'>{getPrice(price)}</p>
                                <p className='distance'>{distance/1000} km</p>
                            </div>
                            <p className='description'>{mergeTags(tag)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default SearchPage