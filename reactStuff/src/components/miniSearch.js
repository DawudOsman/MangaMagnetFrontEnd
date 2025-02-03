import React, {Component, useState, ReactComponent, useEffect} from 'react';
import useDebounce from '../Hooks/Debounce';
import * as styles from './../styleSheets/miniSearch.module.css'
function MiniSearch(props)
{
    const searchIcon = <svg fill="#1A1A1A" version="1.1" id="Layer_1"  x="0px" y="0px"
    viewBox="0 0 48 48"  enableBackground={"new 0 0 48 48"} >
   
<circle fill='none' stroke='#000000' strokeWidth={3} strokeMiterlimit={10} cx="20.5" cy="20.5" r="13"/>
<line  fill='none' stroke='#000000' strokeWidth={3} strokeMiterlimit={10} x1="29.692" y1="29.692" x2="40.5" y2="40.5"/>
</svg>
    const debounceSearchTerm = useDebounce(props.searchVal,500);
   useEffect(()=>{
    if(props.search == true)
    {
        if(debounceSearchTerm)
        {
            console.log(`API WORD IS ${debounceSearchTerm} `)
            props.changeApiSearch(debounceSearchTerm)
        }
        else
        {
            props.changeSearchVal("")
            props.changeApiSearch("")
        }
    }

   },[debounceSearchTerm])
    return(<>
    <div className={styles.filterSearch}>
        <div className={styles.searchContainer}>
        <button onClick={()=>
            {
                if(props.search == true)
                    {
                        props.changeApiSearch(props.searchVal)
                    }
            }}>{searchIcon}</button>
        <input className={styles.searchInput} value={props.searchVal} onChange={(e) =>{props.changeSearchVal(e.target.value)}}></input>
        </div>
        <button onClick={()=>{props.changeSearchVal(""), props.changeApiSearch("")}}>Reset</button>
    </div>
    </>)
}
export default MiniSearch