console.log("stdout is writable? " + process.stdout.writable);

process.stdout.write('hello');
process.stdout.write('world!');