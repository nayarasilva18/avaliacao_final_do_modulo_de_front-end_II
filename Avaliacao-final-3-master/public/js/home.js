"use strict";
//Pegamos dados do usuario do sessionStorage
document.getElementById('emailUser').innerHTML = (JSON.parse(sessionStorage.getItem('temp') || '{}')).usuario;
//Pegamos a posicao do usuario do session e ja deixamos como variavel global
let posicaoX = JSON.parse(sessionStorage.getItem('temp') || '{}').posicao;
//Pegamos o numero de recados ja deste usuario!
let usuariosY = JSON.parse(localStorage.getItem('usuarios') || '{}');
let totalMsg = usuariosY[posicaoX].recados.length;
document.getElementById('totalMsg').innerHTML = totalMsg;
//=================================================================== 
//  Listamos todos os recados daquele usuario quando este conectou! \\
//===================================================================
for (let p1 in usuariosY[posicaoX].recados) {
    let idRecado = document.createElement('tr');
    idRecado.innerHTML = `<td>${p1}</td>
                            <td>${usuariosY[posicaoX].recados[p1].descricao}</td>
                            <td>${usuariosY[posicaoX].recados[p1].recado}</td>
                            <td>
                              <button class='btn-sm btn-danger' onclick='apagar(${p1})'>APAGAR</button> 
                              <button class='btn-sm btn-primary' onclick='editar(${p1})'>EDITAR</button>  
                            </td>
                           `;
    document.querySelector('#corpo').appendChild(idRecado);
}
//================================================================== 
// Escutando todos os clicks!
//==================================================================
document.querySelector('#adicionar').addEventListener('click', adicionar);
document.querySelector('#sair').addEventListener('click', sair);
// //================================================================== 
// // Funções!
// //==================================================================
function sair() {
    let respx = confirm('Você realmente deseja sair do sistema?');
    if (respx) {
        sessionStorage.removeItem('temp');
        location.href = 'index.html';
    }
}
function editar(id) {
    let desOld = usuariosY[posicaoX].recados[id].descricao;
    let recOld = usuariosY[posicaoX].recados[id].recado;
    //colocamos o id no modal
    document.querySelector('#nId').innerHTML = id;
    document.querySelector('#descricaoEditado').value = desOld;
    document.querySelector('#recadoEditado').value = recOld;
    //Abrimos o modal 
    let editarModal = new bootstrap.Modal(document.querySelector('#editaRecado')).show();
}
function salvarEditado() {
    //Pegamos o id do modal
    let pegaId = parseFloat(document.querySelector('#nId').innerHTML);
    let novaDescricao = document.querySelector('#descricaoEditado').value;
    let novoRecado = document.querySelector('#recadoEditado').value;
    //pegamos a lista de ususarios
    usuariosY[posicaoX].recados[pegaId].descricao = novaDescricao;
    usuariosY[posicaoX].recados[pegaId].recado = novoRecado;
    //Salvamos no storage!
    localStorage.setItem('usuarios', JSON.stringify(usuariosY));
    location.reload();
}
function excluir() {
    //Pegamos o id do modal
    let pegaxId = parseFloat(document.querySelector('#eId').innerHTML);
    usuariosY[posicaoX].recados.splice(pegaxId, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuariosY));
    location.reload();
}
function apagar(id) {
    //colocamos o id no modal
    document.querySelector('#eId').innerHTML = id;
    //Abrimos o modal 
    let editarModal = new bootstrap.Modal(document.querySelector('#excluir')).show();
}
function adicionar() {
    let descricao = document.querySelector('#descricao').value;
    let recado = document.querySelector('#recado').value;
    if (descricao === '' || recado === '') {
        alert('Por favor preencha todos os campos para cadastrar os recados!');
        return;
    }
    //Salvando o recado do usuario Atual
    let novoRecado = {
        descricao: descricao,
        recado: recado
    };
    usuariosY[posicaoX].recados.push(novoRecado);
    localStorage.setItem('usuarios', JSON.stringify(usuariosY));
    alert("recado adicionado!");
    location.reload();
}
