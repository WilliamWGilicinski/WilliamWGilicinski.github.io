const input = document.querySelector('input')
const submit = document.querySelector('button')

console.log(input)

//Super duper secret unhackable password don't tell the mossad shhhhhh!
const superSecretPassword = 'bingus'

submit.onclick = () => {
    let attempt = input.value;
    if (attempt === superSecretPassword) {
        input.style.backgroundColor = "green"
        location.replace('./party.html')
    } else {
        input.style.backgroundColor = "darkRed"
    }
}

input.onkeydown = () => {
    input.style.backgroundColor = "black"
}
