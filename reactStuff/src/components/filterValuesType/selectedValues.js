import React, { useEffect, useState } from 'react';
import * as styles from './../../styleSheets/selectedValues.module.css';
function SelectedValues(props){
    var currArr = {...props.filterValues}
    function handleClick(curr)
    {
       currArr[props.idx] = currArr[props.idx].filter(e => e !== curr)
       props.changeFilterValues(currArr)

    }
    return(
    <>{ (currArr[props.idx].length > 0) && <><ul className={styles.valuesList}>
        {currArr[props.idx].map((curr,idx) =>
           {
              return <li style={{display: "flex", borderStyle:"solid", borderWidth:"2px", borderColor:"grey", borderRadius:"0.5rem", padding:"1px 5px 1px 5px"}} onClick={()=>{handleClick(curr)}}><svg style={{width: "1rem", height:"1rem", display:"inline-flex", justifyContent: "center"}} strokeWidth={2} strokeLinecap='round' strokeLinejoin='round' stroke='orange'  viewBox='0 0 24 24'  fill='none' > <path d='M18 6 6 18M6 6l12 12'></path></svg><span style={{fontSize:".875rem", lineHeight:"1.25rem"}}>{curr[0]}</span></li>
           }
           )}
       </ul> <hr></hr> </>}</>
)
}
export default SelectedValues