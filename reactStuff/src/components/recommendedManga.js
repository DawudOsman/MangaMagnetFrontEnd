import React, {Component, useEffect, useState} from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as mangaSliderStyle from './../styleSheets/recommendSlider.module.css';
import loadingImg from './../Assets/Images/giphy.gif';
function RecommendedMangas(props)
{
    const [recommend_List,setRecommenList] = useState([])
    useEffect(()=>
        {
            const fetchData = async () =>
                {
                    try
                    {
                        const response = await fetch(`http://localhost:5251/${props.mangaId}`)
                        const data = await response.json()
                        // Use Promise.all to wait for all manga info to be fetched
                const mangaInfoPromises = data['similarMangaIds'].map((x) => getMangaInfo(x));
                const mangaInfo = await Promise.all(mangaInfoPromises);
                setRecommenList(mangaInfo);  
                    console.log(mangaInfo)
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
            fetchData();
        },[props.mangaId])
    return(<div  class={mangaSliderStyle.mangaSliderContainer}>
        {recommend_List.length > 0 && <h2>Similar Manga</h2>}
        <Swiper slidesPerView={"auto"}             spaceBetween={20}
        
        lazyPreloadPrevNext={10}>
        {recommend_List.map((manga,idx) =>
            {
                        const currManga =  <div class={mangaSliderStyle.mangaContainer}><img  class={mangaSliderStyle.sliderImg}src={manga == undefined? loadingImg: `http://localhost:5251/mangaCover?mangaId=${manga.id}&imageId=${manga.CoverId}`}></img><p class={mangaSliderStyle.mangaName}style={{color: "var(--fontColor)"}}>{manga == undefined? "Undefined": manga.title}</p>
                        </div>
                        return <SwiperSlide  className={mangaSliderStyle.sliderContainer} > {manga == undefined? currManga: <Link  onClick={() =>  window.location.href = `/manga/${manga.id}`} className={mangaSliderStyle.links} key={manga.id}to={`/manga/${manga.id}`}>{currManga}</Link>}
                        </SwiperSlide>
            }
            )}
        </Swiper></div>)
}
export default RecommendedMangas