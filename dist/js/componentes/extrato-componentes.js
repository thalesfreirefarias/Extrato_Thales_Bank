import Conta from "../types/conta.js";
import { FormatoData } from "../types/formatoData.js";
import { formatarMoeda, formatarData } from "../uteis/formatadores.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const gruposTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacao = "";
    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem = "";
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
const ExtratoComponente = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponente;
