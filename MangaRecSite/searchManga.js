let clicked = false
let filterDiv = document.getElementById('Filter')
let filterArrow = document.getElementById('arrFilter')
let wrapperDiv = document.getElementById('wrapperDiv')
let searchSection = document.getElementsByClassName('searchSection')[0]
let filterContents = document.getElementsByClassName('filterType')
let listItems = document.getElementsByClassName('contentLists')
let arrUp = 'm18 15-6-6-6 6'
let arrDown = 'm6 9 6 6 6-6'
let currentSelected = null
let onlyOption = null
function toggleFilter()
{
    console.log("called")
    if(currentSelected != null)
    {
        currentSelected.classList.remove('selectedClass')
        currentSelected = null
    }
    if(clicked)
    {
        clicked = false
        filterArrow.childNodes[0].setAttribute('d',arrDown)
        wrapperDiv.style.gridTemplateRows = "0fr"
        searchSection.classList.add('overflowClass')

    }
    else{
        clicked = true
        filterArrow.childNodes[0].setAttribute('d',arrUp)
        wrapperDiv.style.gridTemplateRows = "1fr"
    }
}
let transitioned = false
function toggleHidden()
{
    console.log("this is called")
    if(transitioned)
    {
        transitioned = false
    }
    else
    {
        searchSection.classList.remove('overflowClass')
        transitioned = true
    }
}

function getSelectedOption()
{
    if(this.classList.contains('selectedCircle'))
    {
        this.classList.remove('selectedCircle')
    }
    else
    {
        this.classList.add('selectedCircle')
    }
    parent = this.parentElement
    optionsName(parent)
}
function optionsName(selectedArray)
{
    res = ""
    console.log("newCall")
    bigParent = selectedArray.parentElement.parentElement
    console.log(bigParent.children[1].children[0].dataset.current)
    for(var i = 0; i < selectedArray.children.length;i++)
    {
        if(selectedArray.children[i].classList.contains('selectedCircle'))
        {
            newName = selectedArray.children[i].children[0].childNodes[1].textContent
            if(res == "")
            {
               res = newName
            }
            else
            {
               res = res + ", " + newName
            }
        }
    }
    if(res == "")
    {
        res = bigParent.children[1].children[0].dataset.default
       
    }
    bigParent.children[1].children[0].dataset.current = res
    console.log(bigParent.children[1].children[0].dataset.current)
    bigParent.children[1].children[0].innerHTML = res
    console.log(res)
}

function getOnlyOption()
{
    if(onlyOption == null){
        this.classList.add('selectedCircle')
        onlyOption = this
    }
    else if (onlyOption != this)
    {
        onlyOption.classList.remove('selectedCircle')
        onlyOption = this
        this.classList.add('selectedCircle')
    }
    parent = this.parentElement
    optionsName(parent)

}
function getSelectedListener(curr)
{
    if(curr.parentElement.id =="onlyOne")
    {
       curr.addEventListener('click',getOnlyOption)
    }
    else
    {
        curr.addEventListener('click',getSelectedOption)
    }
}
function chooseSelectedClass()
{
    if(currentSelected == null){
        this.parentElement.classList.add('selectedClass')
        currentSelected = this.parentElement
    }
    else if (currentSelected != this.parentElement)
    {
        currentSelected.classList.remove('selectedClass')
        currentSelected = this.parentElement
        this.parentElement.classList.add('selectedClass')
    }
    else{
        currentSelected.classList.remove('selectedClass')
        currentSelected = null
    }
}
function selectedEventListener(curr)
{
    curr.addEventListener('click',chooseSelectedClass)
}
for (var i = 0; i < filterContents.length; i++)
{
    
    selectedEventListener(filterContents[i].children[1])   
}
for (var i = 0; i < listItems.length; i++)
{

    for(var j = 0; j < listItems[i].children.length ; j++)
    {
        getSelectedListener(listItems[i].children[j])
    }
    
}
console.log(listItems)
wrapperDiv.addEventListener('transitionend',toggleHidden)
filterDiv.addEventListener("click",toggleFilter)