import React, {Component, useEffect, useState} from 'react';

import { Link } from 'react-router-dom';
import * as styles from './../styleSheets/searchContainer.module.css'
import FilterOption from './filterOption';
function SearchContainer(props)
{
    const [showFilters,toggleFitlers] = useState(true);
    const [currFilter,changeFilterShown] = useState(-1)
    const title = props.title
    const changeTitle = props.changeTitle
    const filterValues = props.filterValues
    const changeFilterValues = props.changeFilterValues
    const fitlerDict = props.fitlerDict
    const filterName = props.filterName
    const filterObj = props.filterObj
    let idx = 0
    return(<><div id={styles.SearchInputContainer}><input  id={styles.SearchInput} placeholder={"Search"} onChange={(e) => {changeTitle(e.target.value)}}></input><button className={styles.FilterBtns} onClick={()=>{props.changeUrlParams(props.searchUrl) ; props.changeSuffix(props.searchUrl)}}>Search</button><button onClick={()=>{toggleFitlers(!showFilters); changeFilterShown(-1)}} id={styles.FilterBtn}>{showFilters ? "Hide Filters" : "Show Filters"}<svg width={24} height={24} fill='none' stroke='Black' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} viewBox='0 0 24 24' ><path d={showFilters? "m6 9 6 6 6-6" : "m18 15-6-6-6 6"}></path></svg></button></div>
    <div id={styles.SearchTransitionContainer} style={{gridTemplateRows: showFilters? "0fr": "1fr"}}>
    <div id={styles.FilterOptionsContainer} style={{overflow:  "hidden"}}>
    {filterObj.map((curr,index) => 
        {
            let filterComponent = <FilterOption obj={curr} selected={idx == currFilter} idx={idx}  filterValues={filterValues}  changeFilterValues={changeFilterValues} changeFilterShown={changeFilterShown}></FilterOption>
            idx = idx + curr.apiNames.length
            return filterComponent

        }
        )}
    </div>
    </div>
</>);
};
export default SearchContainer;