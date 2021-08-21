# MSPet.js
Node.js app to automatically gain xp in MovieStarPlanet by petting pets.

## Demo
[Video](https://www.youtube.com/watch?v=prrJxgqTvkQ)

## Usage
Requires [Node.js](https://nodejs.org/en/) v12+

1. Clone the project
```bash
git clone https://github.com/LiterallyFabian/midi-osu.git
cd MSPet.js
npm install
```

2. Create a file called credentials.txt with this content:
```
username
password
userId
```

3. Start the program
```bash
npm start
```

### Finding your userId
1. Open the Chrome network tab (Ctrl+Shift+I)
2. Open your profile in MSP (click your character)
3. Click the first request `achievements`, and copy the string after `profiles/` in the Request URL field
![Network](https://i.imgur.com/zYOprVC.png)
