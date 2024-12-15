import React,{Component} from 'react';
import './../styleSheets/colors.css';
import * as  styles from './../styleSheets/mangaContent.module.css';

function MangaContent(props){
    return(<>{props.mangaInfo != undefined && <> <div id={styles.contentContainerAndSummary}> <div id={styles.contentContainer}> {props.mangaInfo.url != undefined && <><img id={styles.mangaImg} src={props.mangaInfo.url}></img></>}
    <div id={styles.mangaTittleKeysValues}>
    {props.mangaInfo.title != undefined && <><h1>{props.mangaInfo.title}</h1></>}
    <div id={styles.mangaKeyValues}>
    {props.mangaInfo.authors != undefined && <div><h2>Authors</h2><div class={styles.mangaValues}>{props.mangaInfo.authors.map((author,idx) => {return <p>{author}</p>})}</div></div>}
    {props.mangaInfo.artists != undefined && <div><h2>Artists</h2><div class={styles.mangaValues}>{props.mangaInfo.artists.map((artist,idx) => {return <p>{artist}</p>})}</div></div>}
    {props.mangaInfo.genres != undefined && <div><h2>Genre</h2><div class={styles.mangaValues}>{props.mangaInfo.genres.map((genre,idx) =>{return <p>{genre}</p>})}</div></div>}
    {props.mangaInfo.themes != undefined && <div><h2>Themes</h2><div class={styles.mangaValues}>{props.mangaInfo.themes.map((theme,idx)=>{return <p>{theme}</p>})}</div></div>}
    </div>
    </div>
    
    </div>
    {props.mangaInfo.summary != undefined && <><div dangerouslySetInnerHTML={{__html:props.mangaInfo.summary}} /></>}</div>
        </>}
        </>)
}
export default MangaContent