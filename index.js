const searchInput = document.querySelector('#searchInput');
const ara = document.querySelector('.ara');
const temizle = document.querySelector('.temizle');
const imageListWrapper = document.querySelector('.image-list-wrapper');

runEventListener()

function runEventListener (){
    ara.addEventListener("click", search)
    temizle.addEventListener("click", clear)
}

function search (e) {
   const getValue = searchInput.value.trim();
   
   fetch(`https://api.unsplash.com/search/photos?query=${getValue}`,{
    method : "GET",
    headers : {
        Authorization : "Client-ID 8wrqxq7hHmJ0Mv_i4BIClRONSsRC3HFi_KYYc6tT0wQ" 
    }
   })
   .then((res) => res.json())
   .then((data) => {
    const newDatas = data.results;
     newDatas.map((newData) =>{
        return  addImageToUI(newData.urls.small);
     })
   })
   .catch((err) => console.log(err));



   e.preventDefault();
}

function addImageToUI(url){
    const div = document.createElement("div")
    div.className= "card";
   
    const img = document.createElement("img");
    img.className= "card-img";
    img.src = url;
    img.setAttribute("src",url);
    img.setAttribute("height","400px");
    img.setAttribute("width","400px");


    imageListWrapper.appendChild(div);
    div.appendChild(img);

}

function clear(){
    searchInput.value = "";
    Array.from(imageListWrapper.children).forEach((child) =>{
        return child.remove();
    })
}