var workStartTime;  // Tracks the work timer's start time
var workInterval;   // Controls the work timer interval
var elapsedWorkTime = 0;  // Stores the current session's elapsed work time
var cumulativeWorkTime = 0;  // Tracks the total work time across sessions
var breakInterval;  // Controls the break timer interval

function startWorkTimer() {
    if (!workInterval) {
        // If the work timer isn't running, calculate start time considering paused time
        workStartTime = new Date().getTime() - elapsedWorkTime;
        workInterval = setInterval(updateWorkTimer, 1000);  // Update every second
    }
}

function stopWorkTimer() {
    clearInterval(workInterval);  // Stop the interval
    elapsedWorkTime = new Date().getTime() - workStartTime;  // Calculate elapsed work time
    workInterval = null;  // Clear the interval reference
}

function resetWorkTimer() {
    stopWorkTimer();  // Stop the timer
    elapsedWorkTime = 0;  // Reset the elapsed time for the current session
    document.getElementById("workStopwatch").innerHTML = "00:00:00";  // Reset work timer display
}

function updateWorkTimer() {
    var currentTime = new Date().getTime();
    var elapsedTime = currentTime - workStartTime;
    var seconds = Math.floor(elapsedTime / 1000) % 60;
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("workStopwatch").innerHTML = displayTime;
}

// Function to accumulate work time and start break timer
function startBreakTimer() {
    stopWorkTimer();  // Stop the work timer when the break starts

    // Add the current session's work time to cumulative time
    cumulativeWorkTime += elapsedWorkTime;
    displayCumulativeWorkTime();  // Update the cumulative work time display

    clearInterval(breakInterval);  // Clear any previous break intervals

    // Calculate total work time in seconds
    var totalWorkTime = Math.floor(elapsedWorkTime / 1000);
    var breakTime = Math.floor(totalWorkTime / 1);  // 1/10th of the work time

    // Start the countdown for the break timer
    var remainingBreakTime = breakTime;
    breakInterval = setInterval(function () {
        if (remainingBreakTime <= 0) {
            clearInterval(breakInterval);
            document.getElementById("breakStopwatch").innerHTML = "00:00:00";  // Reset break timer display when done
        } else {
            remainingBreakTime--;
            var seconds = remainingBreakTime % 60;
            var minutes = Math.floor(remainingBreakTime / 60) % 60;
            var hours = Math.floor(remainingBreakTime / 60 / 60);
            var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
            document.getElementById("breakStopwatch").innerHTML = displayTime;
        }
    }, 1000);  // Update every second
    resetWorkTimer();
}

// Function to display the cumulative work time
function displayCumulativeWorkTime() {
    var totalCumulativeTime = cumulativeWorkTime / 1000;  // Convert cumulative time to seconds
    var seconds = Math.floor(totalCumulativeTime) % 60;
    var minutes = Math.floor(totalCumulativeTime / 60) % 60;
    var hours = Math.floor(totalCumulativeTime / 60 / 60);
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("cumulativeWork").innerHTML = displayTime;
}

// Utility function to pad numbers with leading zeros
function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

// Event listeners for buttons
document.getElementById("start").addEventListener("click", startWorkTimer);
document.getElementById("stop").addEventListener("click", stopWorkTimer);
document.getElementById("reset").addEventListener("click", resetWorkTimer);
document.getElementById("break").addEventListener("click", startBreakTimer);
