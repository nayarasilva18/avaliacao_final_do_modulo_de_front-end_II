(document.getElementById('emailUser') as HTMLSpanElement).innerHTML = (JSON.parse(sessionStorage.getItem('temp') || '{}')).usuario;

let posicaoX = JSON.parse(sessionStorage.getItem('temp') || '{}').posicao;

let usuariosY = JSON.parse(localStorage.getItem('usuarios') || '{}');
let totalMsg = usuariosY[posicaoX].recados.length;
(document.getElementById('totalMsg') as HTMLSpanElement).innerHTML = totalMsg;


for (let p1 in usuariosY[posicaoX].recados) {


  let idRecado = (document.createElement('tr') as HTMLTableRowElement);

  idRecado.innerHTML = `<td>${p1}</td>
                            <td>${usuariosY[posicaoX].recados[p1].descricao}</td>
                            <td>${usuariosY[posicaoX].recados[p1].recado}</td>
                            <td>
                              <button class='btn-sm btn-danger' onclick='apagar(${p1})'>APAGAR</button> 
                              <button class='btn-sm btn-primary' onclick='editar(${p1})'>EDITAR</button>  
                            </td>
                           `;

  (document.querySelector('#corpo') as HTMLTableElement).appendChild(idRecado);

}

(document.querySelector('#adicionar') as HTMLButtonElement).addEventListener('click', adicionar);
(document.querySelector('#sair') as HTMLButtonElement).addEventListener('click', sair);

function sair() {
  let respx = confirm('Você realmente deseja sair do sistema?');

  if (respx) {
    sessionStorage.removeItem('temp');
    location.href = 'index.html';
  }
}

function editar(id: string) {

  let desOld = usuariosY[posicaoX].recados[id].descricao;
  let recOld = usuariosY[posicaoX].recados[id].recado;

  (document.querySelector('#nId') as HTMLSpanElement).innerHTML = id;
  (document.querySelector('#descricaoEditado') as HTMLInputElement).value = desOld;
  (document.querySelector('#recadoEditado') as HTMLInputElement).value = recOld;

  let editarModal = new bootstrap.Modal(document.querySelector('#editaRecado') as HTMLSpanElement).show();

}


function salvarEditado() {
  
  let pegaId = parseFloat((document.querySelector('#nId') as HTMLSpanElement).innerHTML);

  let novaDescricao = (document.querySelector('#descricaoEditado') as HTMLInputElement).value;
  let novoRecado = (document.querySelector('#recadoEditado') as HTMLInputElement).value;

  usuariosY[posicaoX].recados[pegaId].descricao = novaDescricao;
  usuariosY[posicaoX].recados[pegaId].recado = novoRecado;

  localStorage.setItem('usuarios', JSON.stringify(usuariosY));

  location.reload();
}

function excluir() {
  
  let pegaxId = parseFloat((document.querySelector('#eId') as HTMLSpanElement).innerHTML);

  usuariosY[posicaoX].recados.splice(pegaxId, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuariosY));
  location.reload();
}

function apagar(id: string) {

  (document.querySelector('#eId') as HTMLSpanElement).innerHTML = id;

  let editarModal = new bootstrap.Modal((document.querySelector('#excluir') as HTMLDivElement)).show();

}

function adicionar() {

  let descricao = (document.querySelector('#descricao') as HTMLInputElement).value;
  let recado = (document.querySelector('#recado') as HTMLInputElement).value;


  if (descricao === '' || recado === '') {
    alert('Por favor preencha todos os campos para cadastrar os recados!');
    return;
  }

  let novoRecado = {
    descricao: descricao,
    recado: recado

  }

  usuariosY[posicaoX].recados.push(novoRecado);

  localStorage.setItem('usuarios', JSON.stringify(usuariosY));
  alert("recado adicionado!");

  location.reload();

}

