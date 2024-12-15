import React, {Component, useState, useEffect} from 'react';
import * as styles from './../styleSheets/filterOptions.module.css'
import SingleSelect from './filterValuesType/singleSelect';
import MultipleSelect from './filterValuesType/multipleSelect';
import MultipleFilter from './filterValuesType/multipleFilter';
import MiniSearch from './miniSearch';
import SelectedValues from './filterValuesType/selectedValues';
function FilterOption(props)
{
    //console.log(props.filterOptions)
    //console.log(props.default)
    //console.log(props.idx)
    //console.log(props.obj)
    const [selectedOptions,changeSelectedOptions] = useState(props.obj.values);
    const[searchVal,changeSearchVal] = useState("")
    const[apiSearch,changeApiSearch] = useState("")
    const[displaySelected, changeSelected] = useState(props.obj.defaultValue)
    useEffect(()=>
        {
            async function getApiResult(params) {
                if(apiSearch == "")
                    {
                        return
                    }
                
                let url =  `http://localhost:5251/Authors?authorName=` + apiSearch
                let response = await fetch(url)
                let getApiResult = await response.json()
                changeSelectedOptions(getApiResult['data'].map((curr,idx) =>
                    {
                        return [curr['attributes']['name'],curr['id']]
                    }))
                //console.log(getApiResult)
            }
            getApiResult()
            if(props.obj.optionType == 4 )
                {
                    changeSelectedOptions([])
                }
        },[apiSearch])
    useEffect(()=>
        {
            function updateDisplayNames()
            {
                var str = ""
                let idxLength = props.obj.apiNames.length
                for ( let i = 0; i < idxLength; i++)
                    {
                        //console.log(props.idx)
                        let currArr = props.filterValues[props.idx+i]
                        if(currArr.length > 0)
                            {
                                var values = ""
                                for(let j = 0;j < currArr.length; j++)
                                    {
                                        if((values === ""))
                                            {
                                                if(props.obj.search == true)
                                                    {
                                                        values =   currArr[j][0]
                                                    }
                                               else{values =   currArr[j]} 
                                            }
                                        else
                                        {
                                            if(props.obj.search == true)
                                                {
                                                    values = values +  ", " + currArr[j][0]
                                                }
                                            else
                                            {
                                                values = values +  ", " + currArr[j]
                                            }
                                            
                                        }
                                    }
                                if(idxLength > 1)
                                    {
                                        str = str + " " + props.obj.apiNames[i] + ": " + values
                                    }
                                else
                                {
                                    str = values
                                }

                              
                            }

                    }
                //console.log(str)
                if(str === "" && displaySelected !== props.obj.defaultValue)
                    {
                        changeSelected(props.obj.defaultValue)
                    }
                else if(  !(str===""))
                    {
                        changeSelected(str)
                    }
                //console.log("NEW DISPLAY VALUES IS " + str)

                
                
            }
            updateDisplayNames()
        },[props.filterValues])

    return(<div><p>{props.obj.filterName}</p><div><button onClick={()=>{
        if(props.selected)
            {
                props.changeFilterShown(-1) 
            }
        else
        {
            props.changeFilterShown(props.idx)
        }
        }
    } class={styles.filterBtn}><p style={{whiteSpace:"nowrap", overflow: "hidden", textOverflow:"ellipsis"}}>{displaySelected}</p><svg width={24} height={24} fill='none' stroke='Black' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}><path d="m8 9l4-4l4 4m0 6l-4 4l-4-4"></path></svg></button></div>
    {  props.selected && <div style={{backgroundColor: "var(--bgColor)"}} className={styles.filterValues} >
        {

            (props.obj.optionType == 1 ) && <SingleSelect idx ={props.idx} selected ={props.selected} filterValues={props.filterValues} changeFilterValues={props.changeFilterValues} obj = {props.obj}  selectedList = {selectedOptions} changeSelectedList = {changeSelectedOptions}></SingleSelect>
        }
        {
            (props.obj.optionType == 2 ) && <><MiniSearch  changeApiSearch={changeApiSearch} searchVal = {searchVal} search={props.obj.search} changeSearchVal = {changeSearchVal}></MiniSearch><MultipleFilter  idx ={props.idx} selected ={props.selected}  filterValues={props.filterValues} changeFilterValues={props.changeFilterValues} searchVal={searchVal} obj = {props.obj}></MultipleFilter></>
        }
        {
            (props.obj.optionType == 3 ) && <MultipleSelect idx ={props.idx} selected ={props.selected}  filterValues={props.filterValues} changeFilterValues={props.changeFilterValues} obj = {props.obj} selectedList = {selectedOptions} changeSelectedList = {changeSelectedOptions}></MultipleSelect>
        }
        {
            (props.obj.optionType == 4 )  && <><MiniSearch changeApiSearch={changeApiSearch} searchVal = {searchVal} search={props.obj.search} changeSearchVal = {changeSearchVal}></MiniSearch><SelectedValues changeFilterValues={props.changeFilterValues}  filterValues={props.filterValues} idx={props.idx}></SelectedValues><MultipleSelect idx ={props.idx} selected ={props.selected}   filterValues={props.filterValues} changeFilterValues={props.changeFilterValues}search={props.obj.search} obj = {props.obj} searchVal={searchVal} selectedList = {selectedOptions} changeSelectedList = {changeSelectedOptions}></MultipleSelect></>
        }

        </div>}
    </div>)
}
export default FilterOption