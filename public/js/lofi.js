// $(function(){
    
// })

window.onload = checkLogin
function checkLogin(){
    console.log("Checking if logged in")
    console.log(sessionStorage.getItem("logged-in") == "true")
    if (sessionStorage.getItem("logged-in") == "true"){

        
        console.log(sessionStorage.getItem("customWallpaper"))
        if (sessionStorage.getItem("customWallpaper") == "true"){
            setWallpaper()
            console.log("Custom wp true!")

        }
        document.getElementById("login").style.visibility = "hidden"
        document.getElementById("signup/logout").href = "main.html"
        document.getElementById("signup/logout").innerText = "Log Out"
        document.getElementById("signup/logout").onclick = endSession
        restorePreviousVideo()
    }
}


function setWallpaper(){

    let wallpaper = sessionStorage.getItem("wallpaper")
    console.log(sessionStorage.getItem("wallpaper"))
    if (wallpaper) {
        let url1 = "url('"
        let url2 = "')"
        let wp = (url1.concat(wallpaper)).concat(url2)
        document.getElementById("background-img").style.backgroundImage = wp
    } else {
        setWallpaper()
    }

}

function restorePreviousVideo(){
    let lV = sessionStorage.getItem("latest-video")
    console.log(lV)

    if (lV){
        document.getElementById("link-box").innerText == sessionStorage.getItem("latest-video")
        document.getElementById("yt").src = lV
    } else {
        restorePreviousVideo()
    }
    
    
}


function endSession(){
    sessionStorage.removeItem("logged-in")
    sessionStorage.removeItem("customWallpaper")
    sessionStorage.removeItem("wallpaper")
    sessionStorage.removeItem("todo")
    sessionStorage.removeItem("latest-video")
}




// window.focus()
// //can track if iframe element has been clicked on (for the first click)
// window.addEventListener('blur', function(){
//     if (this.document.activeElement.id == "yt"){
//         click_count++
//         console.log(click_count)
//         let current = new Date()
//         console.log((current - date)/1000)
//     }
// })

//Jquery for preventing newlines and exiting output after pressing enter
//For link box
$(function(){
    $("#link-box").on("keyup keypress", function(event){
        if (event.which == 13){
            event.preventDefault()
            $(this).blur()
            getLinkInput()
        }
    })

    $("body, #yt").click(function(){
        //alert("Body clicked!")
        click_count++
        console.log(click_count)
        let current = new Date()
        console.log((current - date)/1000)
    })

})


//get link
function getLinkInput(){
    //alert(document.getElementById("link-box").innerText)
    alert("Changing link!")
    //currently no check if text is compatible
    let yt_code = convertLink(document.getElementById("link-box").innerText)
    alert(yt_code)
    let yt_link = " https://www.youtube.com/embed/"+ yt_code +"?autoplay=1&mute=1&loop=1"
    //document.getElementById("yt").src = document.getElementById("link-box").innerText
    document.getElementById("yt").src = yt_link


}





//turn normal YouTube link from a computer to video url code
function convertLink(link){
    //splits link
    let code = link.split('=')
    return code[1]
}


//Toggles video visibility
function toggleVideo(){
    let value = document.getElementById("videoToggle").innerText
    if (value == "Hide"){
        document.getElementById("videoToggle").innerText = "Show"
        document.getElementById("yt").style.visibility = "hidden"
    } else {
        document.getElementById("videoToggle").innerText = "Hide"
        document.getElementById("yt").style.visibility = "visible"
    }
}





//Temp function for testing 
function checkInput(){
    let u = "Test"
    let p = "pass123"
    $.getJSON("public/user/account_details.json", function(data){
        console.log(data)
    })
    $.getJSON("../user/account_details.json", function(data){
        var users = data;


        //dumb method of searching (best to implement some searching algorithm if users were to grow)
        for (let account of users.user) {
            if ((account.username == u) && (account.password == p)){
                console.log("User has logged in!\n")
                setCustomizations(users.details, account.id)
                break;
            }
        }

   })

}

function setCustomizations(details, id){

    //dumb method of searching (best to implement some searching algorithm if users were to grow)
    console.log("Running!")
    for (let custom of details) {
        console.log(custom.todo)
        if (custom.id == id){
            sessionStorage.setItem("logged-in", true)
            sessionStorage.setItem("customWallpaper", custom.customWallpaper)
            sessionStorage.setItem("wallpaper", custom.wallpaper)
            sessionStorage.setItem("todo", JSON.stringify(custom.todo))
            sessionStorage.setItem("latest-video", custom["latest-video"])
            console.log("Custom details stored in session storage!\n")

            //change destination (video.html as current default)
            //document.location.href = "video.html"
        }

    }

}