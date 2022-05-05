import json


while True:
    with open("assets/game/quotes.json", 'r+') as f:
   
        data = json.load(f)

        student = input("Student: ").capitalize()
        quote = input("Quote: ")

        if not student in data:
            data[student] = [quote]
        else:
            data[student].append(quote)

        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()