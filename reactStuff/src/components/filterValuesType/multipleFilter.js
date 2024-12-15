import React, { useEffect, useState } from 'react';
import * as styles from './../../styleSheets/filterOptions.module.css';

function MultipleFilter(props) {
  // Helper function to check if a tag contains the search string
  function hasString(ele, searchString) {
    return searchString ? ele.toLowerCase().includes(searchString.toLowerCase()) : false;
  }

  // Initialize state to hold border style and color for each tag
  const initialBorderStyles = {}; 
  Object.keys(props.obj.values).forEach((curr) => {
    props.obj.values[curr].forEach((tag) => {
      let borderStyle;
      if(props.filterValues[props.idx].includes(tag))
        {
          borderStyle = { offset: 0, borderStyle: 'solid', borderColor: 'green' };
        }
      else if(props.filterValues[props.idx+1].includes(tag))
        {borderStyle = { offset: 1, borderStyle: 'dashed', borderColor: 'red' };

        }
      else{
        borderStyle = { offset: 2,borderStyle: 'dotted', borderColor: 'transparent' };
      }
      initialBorderStyles[tag] = borderStyle;
    });
  });

  const [borderStyles, setBorderStyles] = useState(initialBorderStyles);

  // Toggle function to update the style of a specific tag

  const handleItemSelect  = (tag, newStyles) =>
    {
      const value = newStyles[tag]
      
        let currArr = {...props.filterValues};
        if (value.offset > 0) {
          // If item is already selected, remove it
          currArr[props.idx+value.offset-1] = currArr[props.idx+value.offset-1].filter((e) => e !== tag);
        } 
        if(value.offset < 2)
          {

            currArr[props.idx+value.offset].push(tag);
          }
        
        props.changeFilterValues(currArr);

        // Log to confirm the updated state

        
    }
  const toggleTag = (tag) => {
          var previousStyle = { ...borderStyles };
          let currentStyle = previousStyle[tag]
          let newStyle;
          if (currentStyle.borderStyle === 'dotted') {
            newStyle = { offset: 0, borderStyle: 'solid', borderColor: 'green' };
          } else if (currentStyle.borderStyle === 'solid') {
            newStyle = { offset: 1, borderStyle: 'dashed', borderColor: 'red' };
          } else {
            newStyle = { offset: 2,borderStyle: 'dotted', borderColor: 'transparent' };
          }
          previousStyle[tag] = newStyle
          handleItemSelect(tag,previousStyle)
          setBorderStyles(previousStyle)
  };

  return (
    <>
      {Object.keys(props.obj.values).map((curr) => {
        let found = false;

        const subDiv = (
          <div key={curr}>
            <div className={styles.tagSection}>
              <span>{curr}</span>
              <hr />
            </div>
            <ul className={styles.tagList}>
              {props.obj.values[curr].map((tag, index) => {
                if (props.searchVal === '' || hasString(tag, props.searchVal)) {
                  found = true;

                  return (
                    <li
                      key={index}
                      onClick={() => {toggleTag(tag); console.log(props.filterValues)}}
                      style={{
                        borderStyle: borderStyles[tag].borderStyle,
                        borderColor: borderStyles[tag].borderColor,
                        borderWidth: '2px',
                        padding: '5px',
                      }}
                      className={borderStyles[tag].borderStyle === 'solid' ? 'include' : 'exclude'}
                    >
                      {tag}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        );

        return found ? subDiv : null;
      })}
    </>
  );
}

export default MultipleFilter;