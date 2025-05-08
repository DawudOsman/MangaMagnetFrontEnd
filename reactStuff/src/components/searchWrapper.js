import React, {Component, useEffect, useState, useRef} from 'react';
import SearchContainer from './searchContainer';
import { Navigate, useParams, useSearchParams } from "react-router-dom";
function SearchWrapper(props)
{

    // initialise Param Varaible and  api prefix
    const [searchUrl, changeSearchUrl] = useState("?limit=32&")
    const[urlParams, changeUrlParams] = useSearchParams();
    const prefix = "https://api.mangadex.org/manga"


    // Initialise Filter Option Details
    const [title, changeTitle] = useState("")
    let idx = 0
    const [filterValues,changeFilterValues] = useState([[],[],[],[],[],[],[],[],[]]);
    const fitlerDict = ["Order","includedTags","excludedTags","contentRating","publicationDemographic","authors","artists","year","status"]
    const filterName = ["Sort By","Filter Tags","Content Rating","Magazine Demographic","Authors","Artists","Publication Year","Publication Status"]

    const filterObj = [
        { apiNames: ["Order"], filterName : "Sort By", defaultValue: "None", multipleValues: false, values: ["Best Match","Latest Upload","Oldest Upload","Title Ascending","Title Descending","Highest Rating","Lowest Rating","Most Follows","Fewest Follows","Recently Added","Oldest Added","Year Ascending","Year Descending"]
          , search: false, apiSearch: "", valuesMap: {
          "Best Match": "order[relevance]=desc",
          "Latest Upload": "order[latestUploadedChapter]=desc",
          "Oldest Upload": "order[latestUploadedChapter]=asc",
          "Title Ascending": "order[title]=asc",
          "Title Descending": "order[title]=desc",
          "Highest Rating": "order[rating]=desc",
          "Lowest Rating": "order[rating]=asc",
          "Most Follows": "order[followedCount]=desc",
          "Fewest Follows": "order[followedCount]=asc",
          "Recently Added": "order[createdAt]=desc",
          "Oldest Added": "order[createdAt]=asc",
          "Year Ascending": "order[year]=asc",
          "Year Descending": "order[year]=desc"
        },
        optionType: 1
      },
         { apiNames: ["Included","Excluded"], filterName : "Filter Tags", defaultValue: "Include Any", multipleValues: true, values:{
            "Format": [
              "Oneshot",
              "Award Winning",
              "Official Colored",
              "Long Strip",
              "Anthology",
              "Fan Colored",
              "Self-Published",
              "4-Koma",
              "Doujinshi",
              "Web Comic",
              "Adaptation",
              "Full Color"
            ],
            "Theme": [
              "Reincarnation",
              "Time Travel",
              "Genderswap",
              "Loli",
              "Traditional Games",
              "Monsters",
              "Demons",
              "Ghosts",
              "Animals",
              "Ninja",
              "Incest",
              "Survival",
              "Zombies",
              "Reverse Harem",
              "Martial Arts",
              "Samurai",
              "Mafia",
              "Virtual Reality",
              "Office Workers",
              "Video Games",
              "Post-Apocalyptic",
              "Crossdressing",
              "Magic",
              "Harem",
              "Military",
              "School Life",
              "Villainess",
              "Vampires",
              "Delinquents",
              "Monster Girls",
              "Shota",
              "Police",
              "Aliens",
              "Cooking",
              "Supernatural",
              "Music",
              "Gyaru"
            ],
            "Genre": [
              "Thriller",
              "Sci-Fi",
              "Historical",
              "Action",
              "Psychological",
              "Romance",
              "Comedy",
              "Mecha",
              "Boys' Love",
              "Crime",
              "Sports",
              "Superhero",
              "Magical Girls",
              "Adventure",
              "Girls' Love",
              "Wuxia",
              "Isekai",
              "Philosophical",
              "Drama",
              "Medical",
              "Horror",
              "Fantasy",
              "Slice of Life",
              "Mystery",
              "Tragedy"
            ]
          }, search: false, apiSearch: "", valuesMap:{
            "Oneshot": "0234a31e-a729-4e28-9d6a-3f87c4966b9e",
            "Thriller": "07251805-a27e-4d59-b488-f0bfbec15168",
            "Award Winning": "0a39b5a1-b235-4886-a747-1d05d216532d",
            "Reincarnation": "0bc90acb-ccc1-44ca-a34a-b9f3a73259d0",
            "Sci-Fi": "256c8bd9-4904-4360-bf4f-508a76d67183",
            "Time Travel": "292e862b-2d17-4062-90a2-0356caa4ae27",
            "Genderswap": "2bd2e8d0-f146-434a-9b51-fc9ff2c5fe6a",
            "Loli": "2d1f5d56-a1e5-4d0d-a961-2193588b08ec",
            "Traditional Games": "31932a7e-5b8e-49a6-9f12-2afa39dc544c",
            "Official Colored": "320831a8-4026-470b-94f6-8353740e6f04",
            "Historical": "33771934-028e-4cb3-8744-691e866a923e",
            "Monsters": "36fd93ea-e8b8-445e-b836-358f02b3d33d",
            "Action": "391b0423-d847-456f-aff0-8b0cfc03066b",
            "Demons": "39730448-9a5f-48a2-85b0-a70db87b1233",
            "Psychological": "3b60b75c-a2d7-4860-ab56-05f391bb889c",
            "Ghosts": "3bb26d85-09d5-4d2e-880c-c34b974339e9",
            "Animals": "3de8c75d-8ee3-48ff-98ee-e20a65c86451",
            "Long Strip": "3e2b8dae-350e-4ab8-a8ce-016e844b9f0d",
            "Romance": "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
            "Ninja": "489dd859-9b61-4c37-af75-5b18e88daafc",
            "Comedy": "4d32cc48-9f00-4cca-9b5a-a839f0764984",
            "Mecha": "50880a9d-5440-4732-9afb-8f457127e836",
            "Anthology": "51d83883-4103-437c-b4b1-731cb73d786c",
            "Boys' Love": "5920b825-4181-4a17-beeb-9918b0ff7a30",
            "Incest": "5bd0e105-4481-44ca-b6e7-7544da56b1a3",
            "Crime": "5ca48985-9a9d-4bd8-be29-80dc0303db72",
            "Survival": "5fff9cde-849c-4d78-aab0-0d52b2ee1d25",
            "Zombies": "631ef465-9aba-4afb-b0fc-ea10efe274a8",
            "Reverse Harem": "65761a2a-415e-47f3-bef2-a9dababba7a6",
            "Sports": "69964a64-2f90-4d33-beeb-f3ed2875eb4c",
            "Superhero": "7064a261-a137-4d3a-8848-2d385de3a99c",
            "Martial Arts": "799c202e-7daa-44eb-9cf7-8a3c0441531e",
            "Fan Colored": "7b2ce280-79ef-4c09-9b58-12b7c23a9b78",
            "Samurai": "81183756-1453-4c81-aa9e-f6e1b63be016",
            "Magical Girls": "81c836c9-914a-4eca-981a-560dad663e73",
            "Mafia": "85daba54-a71c-4554-8a28-9901a8b0afad",
            "Adventure": "87cc87cd-a395-47af-b27a-93258283bbc6",
            "Self-Published": "891cf039-b895-47f0-9229-bef4c96eccd4",
            "Virtual Reality": "8c86611e-fab7-4986-9dec-d1a2f44acdd5",
            "Office Workers": "92d6d951-ca5e-429c-ac78-451071cbf064",
            "Video Games": "9438db5a-7e2a-4ac0-b39e-e0d95a34b8a8",
            "Post-Apocalyptic": "9467335a-1b83-4497-9231-765337a00b96",
            "Sexual Violence": "97893a4c-12af-4dac-b6be-0dffb353568e",
            "Crossdressing": "9ab53f92-3eed-4e9b-903a-917c86035ee3",
            "Magic": "a1f53773-c69a-4ce5-8cab-fffcd90b1565",
            "Girls' Love": "a3c67850-4684-404e-9b7f-c69850ee5da6",
            "Harem": "aafb99c1-7f60-43fa-b75f-fc9502ce29c7",
            "Military": "ac72833b-c4e9-4878-b9db-6c8a4a99444a",
            "Wuxia": "acc803a4-c95a-4c22-86fc-eb6b582d82a2",
            "Isekai": "ace04997-f6bd-436e-b261-779182193d3d",
            "4-Koma": "b11fda93-8f1d-4bef-b2ed-8803d3733170",
            "Doujinshi": "b13b2a48-c720-44a9-9c77-39c9979373fb",
            "Philosophical": "b1e97889-25b4-4258-b28b-cd7f4d28ea9b",
            "Gore": "b29d6a3d-1569-4e7a-8caf-7557bc92cd5d",
            "Drama": "b9af3a63-f058-46de-a9a0-e0c13906197a",
            "Medical": "c8cbe35b-1b2b-4a3f-9c37-db84c4514856",
            "School Life": "caaa44eb-cd40-4177-b930-79d3ef2afe87",
            "Horror": "cdad7e68-1419-41dd-bdce-27753074a640",
            "Fantasy": "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
            "Villainess": "d14322ac-4d6f-4e9b-afd9-629d5f4d8a41",
            "Vampires": "d7d1730f-6eb0-4ba6-9437-602cac38664c",
            "Delinquents": "da2d50ca-3018-4cc0-ac7a-6b7d472a29ea",
            "Monster Girls": "dd1f77c5-dea9-4e2b-97ae-224af09caf99",
            "Shota": "ddefd648-5140-4e5f-ba18-4eca4071d19b",
            "Police": "df33b754-73a3-4c54-80e6-1a74a8058539",
            "Web Comic": "e197df38-d0e7-43b5-9b09-2842d0c326dd",
            "Slice of Life": "e5301a23-ebd9-49dd-a0cb-2add944c7fe9",
            "Aliens": "e64f6742-c834-471d-8d72-dd51fc02b835",
            "Cooking": "ea2bc92d-1c26-4930-9b7c-d5c0dc1b6869",
            "Supernatural": "eabc5b4c-6aff-42f3-b657-3e90cbd00b75",
            "Mystery": "ee968100-4191-4968-93d3-f82d72be7e46",
            "Adaptation": "f4122d1c-3b44-44d0-9936-ff7502c39ad3",
            "Music": "f42fbf9e-188a-447b-9fdc-f19dc1e4d685",
            "Full Color": "f5ba408b-0e7a-484d-8d49-4e9125ac96de",
            "Tragedy": "f8f62932-27da-4fe4-8ee1-6779a8c5edba",
            "Gyaru": "fad12b5e-68ba-460e-b933-9ae8318f5b65"
          },
          optionType: 2
        },
          
          { apiNames: ["contentRating"], filterName : "Content Rating", defaultValue: "None", multipleValues: true, values: ['safe','suggestive','erotica','pornographic'], search: false, apiSearch: "", optionType: 3},
           { apiNames: ["publicationDemographic"], filterName : "Magazine Demographic", defaultValue: "None", multipleValues: true, values:['shounen','shoujo','josei','seinen','none'], search: false, apiSearch: "", optionType: 3},
        {apiNames: ["authors"], filterName: "Authors",defaultValue: "None", multipleValues: true, values:[], search: true, apiSearch: "http://localhost:5251/Authors?authorName=", optionType: 4},
         {apiNames: ["artists"], filterName: "Artists", defaultValue: "None", multipleValues: true, values:[], search: true, apiSearch: "http://localhost:5251/Authors?authorName=", optionType: 4},
          {apiNames: ["year"], filterName: "Publication Year",defaultValue: "None", multipleValues: false, values:[], search: false, apiSearch: "", optionType: 5},
           {apiNames: ["status"], filterName: "Publication Status",defaultValue: "None", multipleValues: true, values:['ongoing','completed','hiatus','cancelled'], search: false, apiSearch: "", optionType: 3}   
    ]


  // Updating and verfiying Params
  function convertSearchUrlToParams ()
  {

  }
    // updating Api suffix
    useEffect(()=>
      {
        var str = "?limit=32&"
        var idx = 0
        for(var i = 0; i < filterObj.length; i++)
        {
          for (var j = 0; j < filterObj[i]["apiNames"].length; j++)
          {
            //console.log(filterObj[i]["apiNames"][j])
            //console.log(filterValues[idx])
            var temp = ""
            for(var k = 0; k < filterValues[idx].length; k = k + 1)
            {
              var curr = ""
              if(Array.isArray(filterValues[idx][k]))
              {
                curr = filterValues[idx][k][1]
              }
              else if(filterObj[i]["valuesMap"])
              {
                curr = filterObj[i]["valuesMap"][filterValues[idx][k]]
              }
              else
              {
                curr = filterValues[idx][k]
              }
             if(idx == 0)
             {
              temp = temp + curr + "&"
             }
             else{
              temp = temp + fitlerDict[idx] + "[]=" + curr + "&"
             }

            }
            if(temp !== "")
            {
              str = str + temp
            }
            idx = idx+1
          }
        }
        console.log("title is")
        console.log(title)
        if(title !== "")
        {
          str = str + "title=" + title + "&"
        }
        console.log(str)
        if(str !== "?limit=32&")
        {
          changeSearchUrl(str)
        }
        else
        {
            changeSearchUrl(str)
        }
      }
  ,[filterValues,title])

  function convertParamsToSearchUrl()
  {
    var params = {}
    console.log(prefix + searchUrl)
    console.log("seach Params are")
    for (const [key, value] of urlParams.entries()) {
      if (params[key]) {
          // If the key already exists, push to the array
          params[key] = Array.isArray(params[key]) ? params[key] : [params[key]];
          params[key].push(value);
      } else {
          // Otherwise, just set it
          params[key] = value;
      }
    console.log(params)
  }
  }
  useEffect(()=>
    {
      convertParamsToSearchUrl()
    },[]
)
  useEffect(()=>{
        console.log("url params are")
        console.log(searchUrl)
        changeUrlParams(props.suffix)
  },[props.suffix])



  return(<><SearchContainer changeOffset={props.changeOffset} title={title} changeUrlParams={changeUrlParams} changeTitle={changeTitle} changeSuffix={props.changeSuffix} filterValues={filterValues} changeFilterValues={changeFilterValues} fitlerDict={fitlerDict} filterName={filterName} filterObj={filterObj} urlParams={urlParams } searchUrl={searchUrl} changeSearchUrl={changeSearchUrl}></SearchContainer></>)
};
export default SearchWrapper;