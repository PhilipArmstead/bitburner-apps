/**
 * @param {String} command
 * @return {Boolean}
 **/
export const inputTerminalCommand = (command) => {
	const terminalInput = document.getElementById('terminal-input')
	if (!terminalInput) {
		window.appNotifier?.toast('The terminal must be visible', 'warn')
	} else if (terminalInput.hasAttribute('disabled')) {
		window.appNotifier?.toast('The terminal must not be in use', 'warn')
	} else {
		terminalInput.value = command
		const handler = Object.keys(terminalInput)[1]
		terminalInput[handler].onChange({ target: terminalInput })
		terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null })

		return true
	}

	return false
}


/**
 * @param {String[]} command
 * @return {Boolean}
 **/
export const inputTerminalCommands = (command) => inputTerminalCommand(command.join('; '))
