# Flexible Pomodoro Timer
import time 
def main():
    exit = False
    totalWork = 0 
    while exit == False:
        print("******************* Welcome To My Pomodoro Timer *******************")
        print("1. Start Work")
        print("2. Exit")
        choice = input("Enter your choice: ")
        if choice == "1":
            totalWork += start_work()
            
            mins, secs = divmod(int(totalWork), 60) 
            timer = '{:02d}:{:02d}'.format(mins, secs) 
            print("Work Done so far ", timer, "!")
        if choice == "2":
            exit = True


def start_work():
    exit = False
    print("Starting Work in !!")
    time.sleep(1)
    print("3")
    time.sleep(1)
    print("2")
    time.sleep(1)
    print("1")
    time.sleep(1)
    print("Work Started!!\n\n\n")

    start = time.time()
    while exit == False:
        quit = input("Press q to stop working!\n\n")
        if quit == "q":
            end = time.time()
            mins, secs = divmod(int(end-start), 60) 
            timer = '{:02d}:{:02d}'.format(mins, secs) 
            print("Time worked of ", timer, "!")
            takeBreak = input("Take a break? (y/n): ")
            if takeBreak == "y":
                start_break(end - start)
                exit = True
    return ((end - start))

            


def stop_work():
    print("TODO")

def start_break(workDone):
    breakLength = int(0.1 * workDone)
    mins, secs = divmod(breakLength, 60) 
    timer = '{:02d}:{:02d}'.format(mins, secs) 
    print("Break of ", timer, "!")
    print("Starting Break in!!")
    time.sleep(1)
    print("3")
    time.sleep(1)
    print("2")
    time.sleep(1)
    print("1")
    time.sleep(1)
    print("Break Started!!\n\n\n")

    while breakLength: 
        mins, secs = divmod(breakLength, 60) 
        timer = '{:02d}:{:02d}'.format(mins, secs) 
        print(timer, end="\r") 
        time.sleep(1) 
        breakLength -= 1

def reset():
    print("TODO")

main()