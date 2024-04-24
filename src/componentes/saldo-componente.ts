import Conta from "../types/conta.js";
import { FormatoData } from "../types/formatoData.js";
import { formatarMoeda } from "../uteis/formatadores.js";
import { formatarData } from "../uteis/formatadores.js";

let saldo: number = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;



if (elementoSaldo !== null) {
  elementoSaldo.textContent = formatarMoeda(saldo);
}

if (elementoDataAcesso !== null){
    const dataAcesso : Date = new Date();
   elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

export function getSaldo(): number {
  return saldo;
}

renderizarSaldo();

function renderizarSaldo():void { 
    if (elementoSaldo != null) {
  elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
}
}

const saldoComponente ={
  atualizar(){
    renderizarSaldo();
  }
}

export default saldoComponente;