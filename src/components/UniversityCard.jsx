import { useEffect, useState } from "react";
import "../styles/Card.css";


export const UniversityCard = (props) => {

    const { newArr } = props;
    
    return (
        <>
            <div className="container-fluid universityCard py-2">
                <div className="row justify-content-around">
                {
                    newArr.map((currCountry, index) => {
                        return (<>
                            <div className="col-md-3 countryCard my-5 mx-5" key={index}>
                                <img className='img-fluid' src={`https://countryflagsapi.netlify.app/flag/${currCountry.alpha_two_code}.svg`} alt="countryFlag" />
                                <h2 className='py-4'>Country Name : {currCountry.country} </h2>
                                <h3 className='pb-4'>State Name : {currCountry["state-province"]}  </h3>
                                <h3 className='pb-4'>University Name : {currCountry.name} </h3>
                                {
                                    currCountry.web_pages.map((currEle, ind) => {
                                        return (<>
                                            <h4 className='pb-3' key={ind}>University Link : <a href={currEle}> Link </a> </h4>
                                        </>)
                                    })
                                }
                            </div>
                        </>)
                    })
                }
                </div>
            </div>
        </>
    )
}
