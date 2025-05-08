import React from 'react';
import * as styles from './../../styleSheets/filterOptions.module.css';

function SingleSelect({ selectedList, filterValues, idx, changeFilterValues }) {
    const handleClick = (curr) => {
        const updatedFilterValues = {...filterValues};
        
        if (updatedFilterValues[idx].includes(curr)) {
            updatedFilterValues[idx] = updatedFilterValues[idx].filter(e => e !== curr);
        } else {
            updatedFilterValues[idx] = [curr];
        }

        changeFilterValues(updatedFilterValues);
        //console.log(updatedFilterValues[idx]);
    };

    return (
        <ul>
            {selectedList.map((curr, index) => {
                const isSelected = filterValues[idx].includes(curr);
                return <li key={index} onClick={() => handleClick(curr)}>
                    <div className={styles.filterValueContainer}>
                        <div {...(isSelected && {style:{backgroundColor:'orange'}})} className={styles.singleSelect}></div>
                        <span {...(isSelected && {style:{color:'orange'}})}>{curr}</span>
                    </div>
                </li>
})}
        </ul>
    );
}

export default SingleSelect;