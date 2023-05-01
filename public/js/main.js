$(function(){
    $("#link-box").on("keyup keypress", function(event){
        if (event.which == 13){
            event.preventDefault()
            $(this).blur()
            getLinkInput()
        }
    })

})

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
        document.getElementById("customize-wallpaper").style.visibility = "visible"
        document.getElementById("signup/logout").href = "main.html"
        document.getElementById("signup/logout").innerText = "Log Out"
        document.getElementById("signup/logout").onclick = endSession
        //restorePreviousVideo()
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

// function restorePreviousVideo(){
//     let lV = sessionStorage.getItem("latest-video")
//     console.log(lV)

//     if (lV){
//         document.getElementById("link-box").innerText == sessionStorage.getItem("latest-video")
//         document.getElementById("yt").src = lV
//     } else {
//         restorePreviousVideo()
//     }
    
    
// }


function endSession(){
    sessionStorage.removeItem("logged-in")
    sessionStorage.removeItem("customWallpaper")
    sessionStorage.removeItem("wallpaper")
    sessionStorage.removeItem("todo")
    sessionStorage.removeItem("latest-video")
}





//get link
function getLinkInput(){
    //alert(document.getElementById("link-box").innerText)
    // alert("Changing link!")
    //currently no check if text is compatible
    let url1 = 'url("'
    let link = document.getElementById("link-box").innerText
    let url2 = '")'
    
    sessionStorage.removeItem("wallpaper")
    sessionStorage.setItem("wallpaper", 'url("' + document.getElementById("link-box").innerText + '")')
    document.getElementById("background-img").style.backgroundImage = (url1.concat(link)).concat(url2)


}