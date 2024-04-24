import { formatarMoeda } from "../uteis/formatadores.js";
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/tipo-transacao.js";
import Conta from "../types/conta.js";
import saldoComponente from "./saldo-componente.js";
import ExtratoComponente from "./extrato-componentes.js";


const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;


elementoFormulario.addEventListener("submit", function (event) {
    try{

   
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por favor, preencha todos os campos da transação!");
        return;
    }


    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
    const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
    const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;
    
    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;

    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + " 00:00:00");



  

    const novaTransacao: Transacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    }
    
    Conta.registrarTransacao(novaTransacao);
    saldoComponente.atualizar();
    ExtratoComponente.atualizar();
    elementoFormulario.reset(); 

}
catch(erro){
    alert(erro.message);
}
});