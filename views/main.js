

let socket = io.connect();

socket.on("messages", function (data) {
    console.log(data)
    render(data)
})


function render(data){
    let html = data.map(function (elem, index)  {
        return (`
        <div>
        <strong> ${elem.author}</strong>
        <em style="color: blue"> ${elem.fecha}</em>:
        <em> ${elem.text}</em>
        <hr>
        </div`)
    }).join(" ")
    document.getElementById("messages").innerHTML = html;

}

function addMessage(e){
    let date = new Date();

    let mensaje = {
        author: document.getElementById('username').value,
        fecha: date,
        texto: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);

    document.getElementById('texto').value = ''
    document.getElementById('texto').focus()

    return false;
}



