/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {

        return(
        <>{
            tags.map((item) => (
                <div className='tag' key={item}>{item}</div>
            ))
        }</>
        );
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <div className='tag' key={price}>{(price === 1) ? ('$') : ((price === 2) ? ('$$') : ('$$$'))}</div>
        )
    }

    const days = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
    const getBusiness = (time) => {
        
        return (
            <div className='businessTime'>
            {
                days.map((day) => (
                    <div className='singleDay'>
                        <div className='day'>{day}</div>
                        {(typeof(time["All"]) === typeof('a')) ? 
                        (
                            <div className='time'>{time["All"]}</div>
                        ):(
                            <div className='time'>{(typeof(time[day]) === typeof('a'))  ? 
                            (time[day]):('Closed')}</div>
                        )}  
                        
                    </div>
                ))
                
            }
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information