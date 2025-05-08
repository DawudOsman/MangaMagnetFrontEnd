import React, { useEffect, useState } from "react";
import * as styles from './../styleSheets/mangaCardList.module.css';
import loadingImg from './../Assets/Images/giphy.gif';
import PaginationWithInput from "./paginationWithInput";
import { Link } from "react-router-dom";
function MangaCardList(props)
{
    
    const [mangaList,setMangaList] = useState(new Array(32).fill(undefined))
    const [total,setTotal] = useState(32)
    useEffect(()=>{
         async function getMangaList()
         {
            try
            {
                console.log("Call Is")
                var url = props.prefix + props.suffix + `offset=${props.offset}`
                console.log(url)
                let response = await fetch(url)
                for(const [key,value] of response.headers)
                {
                    console.log(`${key} : ${value}`)
                }
                let data = await response.json()
                console.log(Math.floor(Math.min(data['total'], 10000) / 32))
                console.log(data)
                const mangaInfoPromises = data['data'].map((x) => getMangaInfo(x['id']));
                const mangaInfo = await Promise.all(mangaInfoPromises);
                console.log(mangaInfo)
                setMangaList(mangaInfo)
                if(Math.min(data['total'], 10000) == 10000)
                    {
                        setTotal(Math.floor(Math.min(data['total'], 10000) / 32))
                    }
                else
                {
                    setTotal(Math.ceil(Math.min(data['total'], 10000) / 32))
                }

            }
            catch (error) {console.error("Error fetching data: ",error)}
            
         }
         const getMangaInfo = async (idx) =>
                
            { try
                {
                    const response = await fetch(`http://localhost:5251/Manga?mangaId=${idx}`)
                    const currData = await response.json()
                    return currData
                }
                catch (error) {
                    console.log("aaaah")
                    console.error("Error fetching data: ",error)}
            }
         console.log("NEW FILTER SEARCH "+ props.prefix+props.suffix)
         setMangaList(new Array(32).fill(undefined))
         getMangaList()

    },[props.suffix,props.offset])
    return(<><div className={styles.mangaListContainer}>
        <div className={styles.mangaCardList}>
            {mangaList.map((manga,idx) =>
                {
                    var currManga = <img  src={ manga == undefined? loadingImg:`http://localhost:5251/mangaCover?mangaId=${manga.id}&imageId=${manga.CoverId}`} className={styles.mangaImg} ></img>
                    return( <><div className={styles.mangaContainer}> {manga == undefined ? currManga: <Link className={styles.links} key={manga.id}to={`/manga/${manga.id}`}> { currManga}</Link>  }      <p className={styles.mangaName}>{ manga != undefined && manga.title}</p> </div></>)
                }
                )}
        </div>
    <div className={styles.mangaListNavBar}><PaginationWithInput suffix = {props.suffix} totalPages={total || 1} onPageChange={(page) => props.setOffset((page - 1) * 32)} /></div>   </div></>)
}
export default MangaCardList