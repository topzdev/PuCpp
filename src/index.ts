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
		else console.log('Result', result.result)

		recursiveAsyncReadLine()
	})
}

recursiveAsyncReadLine()

// let len = "Length".length

// class Test {

// 	callback() {
// 		return 'Call back function'
// 	}

// 	parse() {
// 		return this.callMe(this.callback);
// 	}

// 	callMe(func: Function) {
// 		let a = func();

// 		console.log(a);
// 		let i = 4;
// 		while (i != 0) {
// 			let b = func();
// 			console.log(b);

// 			i--;
// 		}
// 		console.log('hello')

// 		return "hello"
// 	}
// }

// const test = new Test

// class TestAgain {
// 	name: any;
// 	bdate: any;
// 	constructor(name: any, bdate: any) {
// 		this.name = name;
// 		this.bdate = bdate;
// 	}

// 	__repr__() {
// 		console.log('Heloo');
// 	}
// }

// let rept = new TestAgain('topz', 'date me');

// console.log(rept);