import React, {Component} from 'react';
import { Swiper,SwiperSlide } from 'swiper/react';
import sunIcon from './../Assets/Images/sunIcon.png';
import img from './../Assets/Images/LogoWhite.svg';
import loadingImg from './../Assets/Images/giphy.gif';
import * as mangaSliderStyle from './../styleSheets/slider.module.css';
import { Link } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './../styleSheets/colors.css'
class MangaSlider extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
           mangaList: Array(10).fill(undefined)
        }

    }
    getCoverId(cover)
{
    let coverId = cover.filter(obj => {return obj['type'] == 'cover_art'})
    return coverId[0]['attributes']['fileName']
}
    fetchMangaList() {
        fetch(`http://localhost:5251/TopManga?order=${this.props.sortBy}`)
        .then((res) => 
                {
                    res.json().then( async(data) => {
                        //console.log(data)
                        let arr = data['data'].map((x) => 
                            {
                                
                                return {id:x['id'],coverLink:this.getCoverId(x['relationships']),name:x['attributes']['title']['en']}
                            })
            
                        this.setState(
                            {
                                mangaList: arr
                            })    
            
                        //let copyMangaList = Array(10)
                        //for (let i = 0; i < arr.length; i++) {
                        //        copyMangaList[i] = this.getCoverLink(arr[i].id,arr[i].coverLink)
                        //      }
                        //let newList = await Promise.all(copyMangaList)
                        //this.setState({mangaList:newList})
                    })
                    .catch((error)=> console.log(error));
                }
            )
        .catch((error) => console.log(error))

    }
    getCoverLink = (async (id,coverLink) => 
        
        {
            const res = await fetch(`http://localhost:5251/mangaCover?mangaId=${id}&imageId=${coverLink}`)
            return res['url'];
        }
)
    componentDidMount()
    {
        this.fetchMangaList();
    }
    render()
    {
       
        return <div  class={mangaSliderStyle.mangaSliderContainer}>
            <h1 style={{color: "var(--fontColor)"}}>{this.props.sortBy == "rating"? "Highest Rating":"Latest Updates"}</h1>
            <Swiper
              loop={true}
              
            spaceBetween={20}
            slidesPerView={"auto"}
            lazyPreloadPrevNext={10}
            

            
  
            className={mangaSliderStyle.mangaSlider}
            
           
            
            
            
            >
                {this.state.mangaList.map((manga,idx) =>
                    {
                        
                        const currManga =  <div class={mangaSliderStyle.mangaContainer}><img  class={mangaSliderStyle.sliderImg}src={manga == undefined? loadingImg: `http://localhost:5251/mangaCover?mangaId=${manga.id}&imageId=${manga.coverLink}`}></img><p class={mangaSliderStyle.mangaName}style={{color: "var(--fontColor)"}}>{manga == undefined? "Undefined": manga.name}</p>
                        </div>
                        return <SwiperSlide  className={mangaSliderStyle.sliderContainer} > {manga == undefined? currManga: <Link className={mangaSliderStyle.links} key={manga.id}to={`/manga/${manga.id}`}>{currManga}</Link>}
                        </SwiperSlide>
                    })}
            </Swiper></div>
    }
}
export default MangaSlider;
