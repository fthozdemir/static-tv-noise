# Static TV Noise
electron.js TV Noise Desktop Application for infinia interview.

### Notes...

#### Level 1
For only the web application try branch [Level-1](https://github.com/fthozdemir/static-tv-noise/tree/level-1)
or live https://fthozdemir.github.io/static-tv-noise/
#### Level 2 

I used electron-forge as packager.  Releases are to big to upload them to github. For the packing the app, run the following code **after the installation**

```
npm run package
```
this  will release the app according to your operating system.
Then checkout  *out/* folder to run. 

#### Level 3

I could not figure it out performance issues of writing the json file, so that I add a button switch it out the logging on / off.

log file will be locate at the main directory of the app  as *logs.json*
 
## How to install & Run

*git 0.1.5 is a partial implementation of access to git object database; for other not implemented things it requires native git command line.*

download the git clone zip and extract or clone it

```
git clone https://github.com/fthozdemir/static-tv-noise.git
```

go into the static-tv-noise folder from terminal

intall packages

```
npm install
```

 & run

```
npm run start
```
