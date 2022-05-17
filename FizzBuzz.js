//Original untouched and preserved code
// for (let i = 0; i<3000; i++){
//     let output = "";
//     if (i%3 === 0) output += "fizz"
//     if (i%5 === 0) output += "buzz"
//     if (output === "") output = i
//     console.log(output)
// }
function runFizzBuzz() {
    document.getElementById("fizzBuzzOut").insertAdjacentHTML("beforeend", "Running FizzBuzz... <br/>")
    for (let i = 0; i < 3000; i++) {
        let output = "";
        if (i % 3 === 0) output += "fizz"
        if (i % 5 === 0) output += "buzz"
        if (output === "") output = i
        document.getElementById("fizzBuzzOut").insertAdjacentHTML("beforeend", output + "<br/>")
    }
}