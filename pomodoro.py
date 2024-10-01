# Flexible Pomodoro Timer
import time 
from pynput import mouse, keyboard

def main():
    test()
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

def test():
    # with keyboard.Listener(
    #         on_press=on_press) as listener:
    #     listener.join()

    # ...or, in a non-blocking fashion:
    listener = keyboard.Listener(
        on_press=on_press)
    listener.start()

def on_press(key):
    try:
        if key.char == 'q':
            print("q!!!")
            return False
        else:
            return True
    except AttributeError:
        pass

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
    work = True
    while exit == False:
        currentLength = 0
        while work == True:
            with keyboard.Events() as events: 
                mins, secs = divmod(currentLength, 60) 
                timer = '{:02d}:{:02d}'.format(mins, secs) 
                print(timer, end="\r") 
                time.sleep(1) 
                currentLength += 1
                for event in events:
                    if event.key == keyboard.Key.esc:
                        work = False
                        print("workkkkk")
                    break


        takeBreak = input("Take a break? (y/n): ")
        if takeBreak == "y":
            start_break(currentLength)
        exit = True
    return(currentLength)



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


main()