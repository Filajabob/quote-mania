import json


while True:
    student = input("Student: ").capitalize()
    quote = input("Quote: ")

    with open("assets/game/quotes.json", 'r+') as f:
        data = json.load(f)

        if not student in data:
            data[student] = [quote]
        else:
            data[student].append(quote)

        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()