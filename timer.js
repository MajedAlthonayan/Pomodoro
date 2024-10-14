var workStartTime = null;  // Tracks the work timer's start time
var workInterval = null;   // Controls the work timer interval
var elapsedWorkTime = 0;  // Stores the current session's elapsed work time
var cumulativeWorkTime = 0;  // Tracks the total work time across sessions
var breakInterval = null;  // Controls the break timer interval
var isWorkTimerRunning = false;  // Tracks if the work timer is running

// Load the state from localStorage on page load
window.onload = function () {
    // Retrieve saved state from localStorage
    elapsedWorkTime = parseInt(localStorage.getItem("elapsedWorkTime")) || 0;
    cumulativeWorkTime = parseInt(localStorage.getItem("cumulativeWorkTime")) || 0;
    workStartTime = parseInt(localStorage.getItem("workStartTime")) || null;
    isWorkTimerRunning = localStorage.getItem("isWorkTimerRunning") === "true";

    // If the work timer was running, continue it
    if (isWorkTimerRunning && workStartTime) {
        startWorkTimer(true);  // Resume work timer without resetting
    }

    displayCumulativeWorkTime();  // Update cumulative work time display
};

// Save the timer state to localStorage
function saveTimerState() {
    localStorage.setItem("elapsedWorkTime", elapsedWorkTime);
    localStorage.setItem("cumulativeWorkTime", cumulativeWorkTime);
    localStorage.setItem("workStartTime", workStartTime || 0);
    localStorage.setItem("isWorkTimerRunning", isWorkTimerRunning);
}

// Start work timer
function startWorkTimer(resume = false) {
    if (!workInterval) {
        isWorkTimerRunning = true;

        if (!resume) {
            // If not resuming, calculate workStartTime using Date.now()
            workStartTime = Date.now();
        } else if (workStartTime) {
            // If resuming, calculate how much time has already passed and adjust elapsedWorkTime
            elapsedWorkTime += Date.now() - workStartTime;
            workStartTime = Date.now();
        }

        // Set the interval to update the timer every second
        workInterval = setInterval(updateWorkTimer, 1000);
        saveTimerState();  // Save the current state
    }
}

// Stop work timer
function stopWorkTimer() {
    clearInterval(workInterval);  // Stop the interval
    workInterval = null;
    isWorkTimerRunning = false;

    if (workStartTime) {
        // Update elapsedWorkTime when the timer is stopped
        elapsedWorkTime += Date.now() - workStartTime;
        workStartTime = null;
    }

    saveTimerState();  // Save the state
}

// Reset work timer
function resetWorkTimer() {
    stopWorkTimer();  // Stop the timer
    elapsedWorkTime = 0;  // Reset the elapsed time for the current session
    workStartTime = null;
    document.getElementById("workStopwatch").innerHTML = "00:00:00";  // Reset work timer display
    saveTimerState();  // Save reset state
}

// Update the work timer display
function updateWorkTimer() {
    var currentTime = Date.now();
    var elapsedTime = elapsedWorkTime;

    if (isWorkTimerRunning && workStartTime) {
        // Add the time since the timer started
        elapsedTime += currentTime - workStartTime;
    }

    var seconds = Math.floor(elapsedTime / 1000) % 60;
    var minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    var hours = Math.floor(elapsedTime / 1000 / 60 / 60);
    var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
    document.getElementById("workStopwatch").innerHTML = displayTime;
}

// Start the break timer
function startBreakTimer() {
    stopWorkTimer();  // Stop the work timer when the break starts

    // Add the current session's work time to cumulative time
    cumulativeWorkTime += elapsedWorkTime;
    displayCumulativeWorkTime();  // Update the cumulative work time display
    saveTimerState();  // Save the updated state

    clearInterval(breakInterval);  // Clear any previous break intervals

    // Calculate total work time in seconds
    var totalWorkTime = Math.floor(elapsedWorkTime / 1000);
    var breakTime = Math.floor(totalWorkTime / 10);  // Break is 1/10th of the work time

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
    }, 1000);

    resetWorkTimer();
}

// Display cumulative work time
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
document.getElementById("start").addEventListener("click", function () {
    startWorkTimer();
});
document.getElementById("stop").addEventListener("click", stopWorkTimer);
document.getElementById("reset").addEventListener("click", resetWorkTimer);
document.getElementById("break").addEventListener("click", startBreakTimer);
