const accessKey = "V3OHT-pWLosrQIRx11StkePwW96DlIlCRIDM8YAZJsk"
//here we have created a access key variable so that we can store our api key

const formele=document.querySelector("form")
//we have created form element variable so that we can store our form 
//DOM: created by browser as the html load into the browser
//querySelector: returns "first element" that matches the css selector 
//access element with class: ('.form), id: ('#form') tagname: ('form')
const inputele = document.getElementById("search-input")
//getElementById:(returns an element with a specified value) similar to queryselector but forEach is not applicable for getelementbyid
const searchResults = document.querySelector(".search-results")
const showmore = document.getElementById("show-more-button")


let inputData = "";
//we have created a input data so that we can store our all the input data which our user is writing here 
let page=1;
//bydefault page no. =1

async function searchImages(){
    //now we are using async function because we are going to use response and the fetch 
    
    inputData = inputele.value;
    //inputdata will hold the values from our this input section 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    //and have to create a dynamic url based on that input data.

    const response = await fetch(url) 
    ///yha hmne await ka use kiya kyuki jb tk sari promises resolve nhi ho jate hm execute nhi krenge wait krenge
    const data = await response.json()

    const results = data.results

    if(page===1){
        //agar page no. =1 aaya then search result will be 3 default container
        searchResults.innerHTML = ""
    }

    // results variable ke andr bht sare data hai we have to map each of these data 
    //map: create new array by calling a specific function , non mutating, length of new array = length of original array
    results.map((result) => {

        //after getting result we have to push those results inside a container or a box
        //if i go to our index.html template alredy created so only we have to create a duplicate container inside our script file
        //we have to first create image wrapper 
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image=document.createElement('img')
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        //after creating this div image and the anchor tag now we have to append those things inside our web page

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });

    page++;

    if(page>1){
        showmore.style.display = "block"
    }
}

///eventlistner: that waits for an event to occur then responds to it.
formele.addEventListener("submit", (event) =>{
    //agar koi button pr click krega to submit ho jaega
    event.preventDefault()
    page=1;
    ///agar koi showmore pr click krega to function phirse call hojaegi
    searchImages()
})

showmore.addEventListener("click", () =>{
    
    searchImages()
})