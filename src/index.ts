/**  Inspired by this article which talked about how to make programming language from the scratch 
*	https://ruslanspivak.com/lsbasi-part1/ 

	and 
	
	Michael-L.-Scott-Programming-Language-Pragmatics-Morgan-Kaufmann-2016 book for step by step on how to create own language
*	
*/

import readline from 'readline'
import Runner from './lexer/Runner'


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})


const recursiveAsyncReadLine = function () {
	rl.question('PuC++ >>> ', function (input) {
		if (input == 'exit')
			return rl.close()

		let result = new Runner('index.js', input).start();

		if (result.error) console.error(result.error.errorString())
		else console.log(result.tokens)

		recursiveAsyncReadLine()
	})
}

recursiveAsyncReadLine()

// let len = "Length".length

// console.log("Length".length