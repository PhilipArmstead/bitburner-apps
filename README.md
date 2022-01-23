# Bitburner Apps
When installing, you're free to change the target name and install the apps anywhere you want.

1. [Server list](#server-list)
2. [Macros](#macros)

## Server list
Lists statistics about all available servers with one-click connect, backdoor and nuke functionality. [Screenshot](./docs/server-list.png)

### To install
`wget https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser/master/apps/server-list/dist/main.js server-list.js`  

### To run
`run server-list.js`


## Macros
Configurable terminal commands at the click of a button. [Screenshot](./docs/macros.png)

### To install
`wget https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser/master/apps/macros/dist/main.js macros.js`  

### To run
`run macros.js`

### Config
The following JSON structure needs adding to a `config.txt` file in the same directory as the app.  

The JSON requires a key=>value pair of button labels and an array of terminal commands to execute.  
Buttons can also be grouped by nesting this structure.
```json
{
	"macros": {
		"Show servers": ["home", "run /gui/server-list.js"],
		"Show processes": ["home", "run /gui/process-list.js"],
		"Attacks": {
			"Atack all": ["home", "run /attacks/controller.js"],
			"Batch": ["home", "run batch.js --prompt"],
			"Weaken": ["home", "run /util/server/enslave.js /attacks/weaken-forever.js joesguns"]
		},
		"Buy": {
			"Buy hacks": ["buy BruteSSH.exe", "buy FTPCrack.exe", "buy relaySMTP.exe", "buy HTTPWorm.exe", "buy SQLInject.exe", "home", "run /util/server/root-everything.js"],
			"Buy servers": ["home", "run server-purchase.js --once"]
		}
	}
}
```
