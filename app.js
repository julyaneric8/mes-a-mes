// BANCO DE DADOS LOCAL
// carrega itens salvos ou cria lista vazia
let itens = JSON.parse(localStorage.getItem("itens")) || [];

// SALVAR DADOS NO NAVEGADOR

function salvarDados(){
    localStorage.setItem("itens", JSON.stringify(itens));
}

// ADICIONAR ITEM

function adicionarItem(){

    const nome = document.getElementById("produto").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if(nome === "" || quantidade <= 0 || preco <= 0){
        alert("Preencha todos os campos corretamente");
        return;
    }

    const total = quantidade * preco;

    const item = {
        nome: nome,
        quantidade: quantidade,
        preco: preco,
        total: total
    };

    itens.push(item);

    salvarDados();
    atualizarLista();
    limparCampos();
}

// ATUALIZAR LISTA NA TELA

function atualizarLista(){

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let somaTotal = 0;

    itens.forEach((item, index) => {

        const linha = document.createElement("p");

        linha.innerHTML =
        `${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)} = 
        <strong>R$ ${item.total.toFixed(2)}</strong>
        <button onclick="removerItem(${index})">❌</button>`;

        lista.appendChild(linha);

        somaTotal += item.total;
    });

    const totalElemento = document.getElementById("total");
    totalElemento.textContent = "Total: R$ " + somaTotal.toFixed(2);

    verificarOrcamento(somaTotal);
}

// REMOVER ITEM

function removerItem(index){

    itens.splice(index,1);

    salvarDados();
    atualizarLista();
}


// LIMPAR LISTA

function limparLista(){

    itens = [];

    salvarDados();
    atualizarLista();
}

// LIMPAR CAMPOS DO FORMULÁRIO

function limparCampos(){

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
}

// VERIFICAR ORÇAMENTO

function verificarOrcamento(total){

    const orcamento = Number(document.getElementById("orcamento").value);

    if(orcamento > 0){

        const restante = orcamento - total;

        const totalElemento = document.getElementById("total");

        if(restante >= 0){

            totalElemento.textContent += 
            ` | Restante: R$ ${restante.toFixed(2)}`;

        }else{

            totalElemento.textContent += 
            ` | Estourou: R$ ${Math.abs(restante).toFixed(2)}`;
        }
    }
}

// CARREGAR LISTA AO ABRIR O SITE

window.onload = function(){
    atualizarLista();
};