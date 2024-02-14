//var socket= io('http://5.189.175.37:9030');
console.log('algo')
document.querySelector('#submit').addEventListener('click',(function(){
    var username = document.querySelector('#username').value
    var password = document.querySelector('#password').value
    console.log(username, password)
    socket.emit("sendLogin",{
        "username": username,
        "password": password
    })
}))