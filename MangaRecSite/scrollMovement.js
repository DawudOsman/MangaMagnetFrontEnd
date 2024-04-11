const sliders =  document.querySelectorAll(".slider")
let isDown = false;
let startX;
let scrollLeft;
function assignListeners(curr)
{
   curr.addEventListener('mousedown',(e) => {
        isDown = true;
        startX = e.pageX -curr.offsetLeft;
        scrollLeft = curr.scrollLeft;
    });
    curr.addEventListener('mouseleave',() =>
    {
        isDown = false;
    });
    curr.addEventListener('mouseup',() =>
    {
        isDown = false;
    });
    curr.addEventListener('mousemove',(e) =>
    {
        if(!isDown) return;
        e.preventDefault()
        let x = e.pageX - curr.offsetLeft;
        console.log()
        let walk = (x-startX) * 3;
        curr.scrollLeft = scrollLeft - walk;
        
    })
}
for (var i = 0; i < sliders.length; i++)
{

    assignListeners(sliders[i])

    
}