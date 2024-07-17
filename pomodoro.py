# Flexible Pomodoro Timer
def main():
    exit = False
    while exit == False:
        print("Welcome to the Pomodoro Timer")
        print("1. Start Work")
        print("2. Stop")
        print("3. Start Break")
        print("4. Reset")
        print("5. Exit")
        choice = input("Enter your choice: ")
        if choice == "1":
            print("Starting Work!!")
            start_work()
        if choice == "2":
            print("Stopping Work!!")
            stop_work()
        if choice == "3":
            print("Starting Break!!")
            start_break()
        if choice == "4":
            print("Resetting!!")
            reset()
        if choice == "5":
            exit = True


def start_work():
    print("TODO")

def stop_work():
    print("TODO")

def start_break():
    print("TODO")

def reset():
    print("TODO")