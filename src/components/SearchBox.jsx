import React, { useEffect, useState } from 'react';
import "../styles/SearchBox.css";
import { UniversityCard } from './UniversityCard';
// import { UniversityCard } from './UniversityCard';

export const SearchBox = () => {

    const hideText = (event) => {
        event.target.placeholder = "";
    }
    const showText = (event) => {
        event.target.placeholder = "Country Name";
    }

    const [country, setCountry] = useState("");
    const [countryArr, setCountryArr] = useState([]);
    const [stateArr, setStateArr] = useState([]);
    const [stateValue, setStateValue] = useState("");
    const [universityArr, setUniversityArr] = useState([]);
    const [universityValue, setUniversityValue] = useState("");
    const [updatedArray, setUpdatedArray] = useState([]);

    useEffect(() => {

        const getState = (arr) => {
            let st = new Set();
            arr.map((currCountry) => {
                if(currCountry["state-province"] !== null)
                st.add(currCountry["state-province"]);
            })
            let array1 = [...st];
            return array1;  
        }

        const getApiData = async () => {
            try {
                console.log(country);
                let response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
                let countryArray = await response.json();
                let stateArray = getState(countryArray);
                setStateArr(stateArray);
                setCountryArr(countryArray);
                setUpdatedArray(countryArray);
            }
            catch(error) {
                console.log("Error = ", error);
            }
        }
        getApiData();
    }, [country]);
    
    const handleInput = (event) => {
        setCountry(event.target.value);
    }

    const inputEvent = (event) => {
        if(event.target.name === "state") {
            if(event.target.value !== "Select All") {
                setUniversityArr(countryArr.filter((currCountry) => {
                    return (currCountry["state-province"] === event.target.value);
                }))
                setUpdatedArray(countryArr.filter((currCountry) => {
                    return (currCountry["state-province"] === event.target.value);
                }));
                console.log(updatedArray);
            }
            else {
                setUniversityArr(countryArr);
                setUpdatedArray(countryArr);
            }
            setStateValue(event.target.value);
        }
        else {
            if(event.target.value !== "Select All") {
                setUpdatedArray(countryArr.filter((currELe) => {
                    return (currELe.name === event.target.value);
                }))
            }
            setUniversityValue(event.target.value);
        }
    }
    
    return (
        <>
            <div className="container-fluid searchBox py-5">
                <div className="row justify-content-evenly align-items-center text-center">
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            placeholder="Country Name" 
                            onFocus={hideText} 
                            onBlur={showText} 
                            value={country}
                            onChange={() => {handleInput(event)}}
                         />
                    </div>
                    <div className='col-md-3 py-md-0 py-3'>
                        <select name="state" value={stateValue} onChange={inputEvent}>
                            <option selected disabled>Select State</option>
                            <option > Select All </option>
                            {
                                stateArr.map((currState, index) => {
                                    return <>
                                        <option value={currState} key={index}> {currState} </option>
                                    </>
                                })
                            }
                        </select>
                    </div>
                    <div className='col-md-3 py-md-0 pb-3'>
                        <select name="university" value={universityValue} onChange={inputEvent}>
                            <option disabled selected>Select University</option>
                            <option > Select All </option>
                            {
                                universityArr.map((currCountry, index) => {
                                    return <>
                                        <option value={currCountry.name} key={index}> {currCountry.name} </option>
                                    </>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <UniversityCard 
                newArr={updatedArray}
            />
        </>
    );
}
