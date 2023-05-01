const app = Vue.createApp({
    data() {
        return {
            twentyFiveMinutes: "25:00",
            fiveMinutes: "5:00",
            tenMinutes: "10:00",

            studyTimeSelected: true,
            shortTimeSelected: false,
            longTimeSelected: false,

            timeDisplay: "25:00",

            minutePlaceHolder: ":00",

            userPomodoro: "",
            userShortBreak: "", 
            userLongBreak: "",

            timeEnded: false,

            rotation: 0,

            settingsMenuShown: false,
            paused: true,
        }
    }, 
    methods: {
        pomodoroTimerClicked(){
            if (this.userPomodoro != ""){
                this.timeDisplay = this.userPomodoro + this.minutePlaceHolder;
            } else {
                this.timeDisplay = this.twentyFiveMinutes;
            }
            [this.studyTimeSelected, this.paused] = [true, true];
            [this.shortTimeSelected, this.longTimeSelected] = [false, false];
            // console.log(`study: ${this.studyTimeSelected}, short: ${this.shortTimeSelected}, long: ${this.longTimeSelected}`)
        },
        shortBreakClicked(){
            if (this.userShortBreak != ""){
                this.timeDisplay = this.userShortBreak + this.minutePlaceHolder;
            } else {
                this.timeDisplay = this.fiveMinutes;
            }
            [this.shortTimeSelected, this.paused] = [true, true];
            [this.studyTimeSelected, this.longTimeSelected] = [false, false];
            // console.log(`study: ${this.studyTimeSelected}, short: ${this.shortTimeSelected}, long: ${this.longTimeSelected}`)
        },
        longBreakClicked(){
            if (this.userLongBreak != ""){
                this.timeDisplay = this.userLongBreak + this.minutePlaceHolder;
            } else {
                this.timeDisplay = this.tenMinutes; 
            }
            [this.longTimeSelected, this.paused] = [true, true];
            [this.studyTimeSelected, this.shortTimeSelected] = [false, false];
            // console.log(`study: ${this.studyTimeSelected}, short: ${this.shortTimeSelected}, long: ${this.longTimeSelected}`)
        },
        resetRotation(){
           $("#reset").animate({
                rotate: '360deg'
            }, 600, "linear", "infinite")
            setTimeout(() => {
                $("#reset").css("rotate", "")
            }, 1000);
        },
        settingsRotation(){
            $("#settings").animate({
                rotate: '360deg'
            }, 600, "linear", "infinite")
            setTimeout(() => {
                $("#settings").css("rotate", "")
            }, 1000); 
        },
        changeDisplay(){
            if (this.paused){
                // console.log("Timer paused")
            } else {
                var minAndSec = this.timeDisplay.split(":")
                var totalSeconds = Number(minAndSec[0] * 60) + Number(minAndSec[1])
                if (totalSeconds != 0){
                    totalSeconds --;
                    var minutesDisplay = String(Math.floor(totalSeconds / 60))
                    var secondsDisplay = String(totalSeconds % 60) 
                    if (secondsDisplay < 10){
                        secondsDisplay = "0" + secondsDisplay
                    } 
                    this.timeDisplay = minutesDisplay + ":" + secondsDisplay
                    // console.log(this.timeDisplay)
                    setTimeout(this.changeDisplay, 1000)
                    if (this.timeDisplay == "0:00"){
                        this.timeEnded = !this.timeEnded;
                        // console.log(this.timeEnded)
                        this.playAudio();
                    }
                } else {
                    this.paused = true;
                }
            }
        },
        startClicked(){ 
            this.timeEnded = false;
            this.paused = !this.paused;
            this.changeDisplay();
        }, 
        pauseClicked(){
            this.paused = !this.paused;
        },
        resetClicked(){
            if (this.studyTimeSelected){
                if (this.userPomodoro != ""){
                    this.timeDisplay = this.userPomodoro + this.minutePlaceHolder
                } else {
                    this.timeDisplay = this.twentyFiveMinutes
                }
                this.oneMinuteReached = false;
            } else if (this.shortTimeSelected){
                if (this.userShortBreak != ""){
                    this.timeDisplay = this.userShortBreak + this.minutePlaceHolder
                } else {
                    this.timeDisplay = this.fiveMinutes
                }
                this.oneMinuteReached = false;
            } else if (this.longTimeSelected){
                if (this.userLongBreak != ""){
                    this.timeDisplay = this.userLongBreak + this.minutePlaceHolder
                } else {
                    this.timeDisplay = this.tenMinutes
                }
                this.oneMinuteReached = false;
            } 
            this.resetRotation() 
        },
        settingsClicked(){
            this.settingsMenuShown = !this.settingsMenuShown
            this.settingsRotation()
        },    
        playAudio(){
            var audio = new Audio ("../music/oneMinute.mp3")
            audio.play();
        }, 
        saveUserTime(){
            // console.log(this.userPomodoro, this.userShortBreak, this.userLongBreak)
            if (this.studyTimeSelected && this.userPomodoro != ""){
                this.timeDisplay = this.userPomodoro + this.minutePlaceHolder
            } else if (this.shortTimeSelected && this.userShortBreak != ""){
                this.timeDisplay = this.userShortBreak + this.minutePlaceHolder
            } else if (this.longTimeSelected && this.userLongBreak != ""){
                this.timeDisplay = this.userLongBreak + this.minutePlaceHolder
            }
        }, 
        resetUserTime(){
            this.userPomodoro = ""
            this.userShortBreak = ""
            this.userLongBreak = ""
            if (this.studyTimeSelected){
                this.timeDisplay = this.twentyFiveMinutes
            } else if (this.shortTimeSelected){
                this.timeDisplay = this.fiveMinutes
            } else if (this.longTimeSelected){
                this.timeDisplay = this.tenMinutes
            }
        }
    },
}).mount("#app")

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