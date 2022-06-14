"use strict";
let usuariosX = JSON.parse(localStorage.getItem('usuarios') || '{}');
//===============Escutamos o usuario clicar em Criar!
document.getElementById('criar').addEventListener('click', entrarX);
//====================================================================
function entrarX() {
    //Pegamos os campos!
    let cEmail = document.querySelector('#email').value;
    let cSenha = document.querySelector('#senha').value;
    let cConfirma = document.querySelector('#confirma').value;
    let emailValido = validaEmail(cEmail);
    if (cEmail.length < 10) {
        alert('O Email deve ter no minimo 10 caracterers');
        return;
    }
    else if (!emailValido) {
        alert('digite um email válido!');
        return;
    }
    else if (cSenha !== cConfirma) {
        alert("As senhas não conferem!");
        return;
    }
    else if (cSenha.length < 6) {
        alert('A senha deve ter no minimo 6 caracteres');
        return;
    }
    else if (cEmail === '' || cSenha === '' || cConfirma === '') {
        alert('preencha todos os campos!');
        return;
    }
    //Se passamos em todos testes bora criar o novo usuário!
    criarUsuario();
}
function criarUsuario() {
    if (localStorage.getItem('usuarios') == undefined) {
        let usuarios = [];
        let novoUsuario = {
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            recados: []
        };
        //Adicionamos no array!
        usuarios.push(novoUsuario);
        //Salvamos no localstorage na lista usuarios!
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("usuario cadastrado com sucessco!");
        //Localizamos qual a posicao deste usuario na lista!
        let posicao = usuarios.findIndex(el => el.email === document.getElementById('email').value);
        let usTemp = {
            usuario: document.getElementById('email').value,
            posicao: posicao
        };
        // //Criamos a sessao do usuario! 
        sessionStorage.setItem("temp", JSON.stringify(usTemp));
        window.location.href = 'home.html';
    }
    else {
        //Verifica se ja existe este email cadastrado!
        let veriEmail = usuariosX.filter(ex => ex.email === document.getElementById('email').value);
        console.log(veriEmail);
        if (veriEmail.length > 0) {
            alert("Este usuario ja esta cadastrado!");
            return;
        }
        let novoUsuario = {
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            recados: []
        };
        //Adicionamos no array!
        usuariosX.push(novoUsuario);
        //Salvamos no localstorage na lista usuarios!
        localStorage.setItem('usuarios', JSON.stringify(usuariosX));
        alert("usuario cadastrado com sucesso!");
        //Localizamos qual a posicao deste usuario na lista!
        let posicao = usuariosX.findIndex(el => el.email === document.getElementById('email').value);
        let usTemp = {
            usuario: document.getElementById('email').value,
            posicao: posicao
        };
        // //Criamos a sessao do usuario! 
        sessionStorage.setItem("temp", JSON.stringify(usTemp));
        window.location.href = 'home.html';
    }
}
function validaEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}
