import React from 'react';
import * as styles from './../../styleSheets/filterOptions.module.css';

function MultipleSelect(props) {
  return (
    <>
      <ul>
        {props.selectedList.map((curr, index) => {
          const handleClick = () => {
            // Create a copy of the filterValues array
            let currArr = {...props.filterValues};

            // Check if we're in search mode and handle accordingly
            const itemName = curr;

            if (currArr[props.idx].includes(itemName)) {
              // If item is already selected, remove it
              currArr[props.idx] = currArr[props.idx].filter((e) => e !== itemName);
            } else {
              // Otherwise, add the item
              currArr[props.idx].push(itemName);
            }

            // Call the parent function to update the filter values
            props.changeFilterValues(currArr);

            // Log to confirm the updated state
            console.log(currArr[props.idx]);
          };

          // Determine item label based on search prop
          const itemName = props.search ? curr[0] : curr;
          const isSelected = props.filterValues[props.idx].includes( curr);
          console.log(isSelected)
          return (
            <li key={index} onClick={handleClick}>
              <div className={styles.filterValueContainer}>
                <div {...(isSelected && {style: {opacity: 100,backgroundColor: 'orange', borderColor: 'orange'}})} className={styles.circleSelect}></div>
                <span {...(isSelected && {style:{opacity: 100 ,color: 'orange'}})}>{itemName}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MultipleSelect;
