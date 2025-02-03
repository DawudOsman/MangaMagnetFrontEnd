import React, { useEffect } from "react";
function MangaCardList(props)
{
    var offset = 0;
    useEffect(()=>{
         async function getMangaList()
         {
            var url = props.prefix + props.suffix + `offset=${offset}`
            let response = await fetch(url)
            for(const [key,value] of response.headers)
            {
                console.log(`${key} : ${value}`)
            }
            let getApiResult = await response.json()
            console.log(getApiResult)
         }
         console.log("NEW FILTER SEARCH "+ props.prefix+props.suffix)
         getMangaList()

    },[props.suffix])

    return(<></>)
}
export default MangaCardList