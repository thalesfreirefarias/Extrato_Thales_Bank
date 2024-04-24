import Conta from "../types/conta.js";
import { FormatoData } from "../types/formatoData.js";
import { GrupoTransacao } from "../types/grupoTransacao.js";
import { formatarMoeda, formatarData } from "../uteis/formatadores.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();

function renderizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacao: string = "";

    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem: string = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `;
        }

        htmlRegistroTransacao += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }

    if (htmlRegistroTransacao === "") {
        htmlRegistroTransacao = "<div> Não há transações registradas </div>";
    }

    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacao;


}

const ExtratoComponente ={
    atualizar(): void{
        renderizarExtrato();

    }
}

export default ExtratoComponente 
