document.addEventListener("DOMContentLoaded", () => {
    var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius =100;

    var data = [{name: "Break", share: 5}, 
                {name: "Study", share: 25},
            ];

    var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var ordScale = d3.scaleOrdinal()
                        .domain(data)
                        .range(["#00d1b2", "#ddd"]);
    var pie = d3.pie().value(function(d) { 
            return d.share; 
        });

    var arc = g.selectAll("arc")
            .data(pie(data))
            .enter();

    var path = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);

    arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.name); });

    var label = d3.arc()
                .outerRadius(radius)
                .innerRadius(0);
        
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.2")
        .attr("x", "-0.5")
    .attr("y", "-0.7")
    .classed("has-text-weight-semibold has-text-primary", true)
    .text("Break");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.15")
        .attr("x", "-0.5")

    .attr("y", "-0.5")
    .classed("has-text-primary", true)
    .text("5");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.2")
    .attr("y", "0.5")
    .classed("has-text-weight-semibold has-text-primary", true)
    .text("Study");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.15")
    .attr("y", "0.7")
    .classed("has-text-primary", true)
    .text("25"); var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius =100;

    var data = [{name: "Break", share: 5}, 
            {name: "Study", share: 25},
        ];

    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var ordScale = d3.scaleOrdinal()
                    .domain(data)
                    .range(["#00d1b2", "#ddd"]);
    var pie = d3.pie().value(function(d) { 
        return d.share; 
    });

    var arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    var path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

    arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return ordScale(d.data.name); });

    var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.2")
    .attr("x", "-0.5")
    .attr("y", "-0.7")
    .classed("has-text-weight-semibold has-text-primary", true)
    .text("Break");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.15")
    .attr("x", "-0.5")

    .attr("y", "-0.5")
    .classed("has-text-primary", true)
    .text("5");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.2")
    .attr("y", "0.5")
    .classed("has-text-weight-semibold has-text-primary", true)
    .text("Study");

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("font-size", "0.15")
    .attr("y", "0.7")
    .classed("has-text-primary", true)
    .text("25");
});
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