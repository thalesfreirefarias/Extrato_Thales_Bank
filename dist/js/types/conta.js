import { TipoTransacao } from "./tipo-transacao.js";
let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];
function debitar(valor) {
    if (valor <= 0) {
        throw Error("O valor a ser debitado deve ser maior que zero");
    }
    if (valor > saldo) {
        throw Error("Saldo Insuficiente");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor) {
    if (valor <= 0) {
        throw Error("O valor a ser depositado deve ser maior que zero");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}
const Conta = {
    getSaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const transacoesOrdenadas = transacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let grupoAtual = null;
        for (let transacao of transacoesOrdenadas) {
            const labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (!grupoAtual || grupoAtual.label !== labelGrupoTransacao) {
                grupoAtual = {
                    label: labelGrupoTransacao,
                    transacoes: []
                };
                gruposTransacoes.push(grupoAtual);
            }
            grupoAtual.transacoes.push(transacao);
        }
        return gruposTransacoes;
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === "Depósito") {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
};
export default Conta;
