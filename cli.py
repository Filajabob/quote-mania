import json
import subprocess


print("Welcome to the Quote Mania Quote Adding Tool! "
      "To stop add quotes and save your changes, press Ctrl+C. "
      "Please note that Git must be installed and you need to have a Github account that has access to Filajabob/quote-mania")

while True:
    try:
        student = input("Student: ").capitalize()
        quote = input("Quote: ")
    except KeyboardInterrupt:
        print("Staging changes...")
        subprocess.run("git add .")
        print("Changes staged.")
        subprocess.run("git commit -m \"Quotes added to assets/game/quotes.json (automatic process)\"")
        print("Changes commited.")
        subprocess.run("git push https://github.com/Filajabob/quote-mania master")
        print("Changes pushed to https://github.com/Filajabob/quote-mania")

        print("Quitting...")
        break

    with open("assets/game/quotes.json", 'r+') as f:
        data = json.load(f)

        if not student in data:
            data[student] = [quote]
        else:
            data[student].append(quote)

        f.seek(0)
        json.dump(data, f, indent=4)
        f.truncate()