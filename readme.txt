+Welcome to our Study Site! Here are the instructions on how to run it:

1. Open CMD and navigate to "public/js".
2. Run "node server.js".
3. The main page will appear. This allows you to navigate to other pages.
4. On the pomodoro page:
    - Click on "Study" or "Break" to start the timer (recommend starting with the timer button).
    - Click "Play" to start the timer, "Pause" to pause it, and "Reset" to reset it.
    - In the settings, you can change the values of the timer. You can choose the timer, short break or long break.
    - To test the audio when the timer ends, change any value of the timer to 1 or change the "timeDisplay" in pomodoro.js to "0:03" to check it quicker.
    - The "Reset" button in the settings will reset each value to default values.
    - The stats button on the top right shows the pomodoro graphs.
5. On the video page:
    - Click "Hide" to hide the video player.
    - Paste a video link from YouTube in the input box to play that specific video.
    - The question mark is the help pop-up.
6. On the to-do list page:
    - Add new tasks using the input box.
    - Errors will pop up if a field is blank.
    - Delete and complete items as you wish.
    - Items are saved in the database.
7. The Flatpickr is a new library that has been integrated.
    - It prevents the user from choosing a day prior to today, which is shown in minDate and disableDate.