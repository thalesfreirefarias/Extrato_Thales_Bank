import { Transacao } from "./Transacao.js";
import { GrupoTransacao } from "./grupoTransacao.js";
import { TipoTransacao } from "./tipo-transacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;

const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key === "data") {
        return new Date(value);
    }
    return value;
}) || [];

function debitar(valor: number): void {
    if (valor <= 0) {
        throw Error("O valor a ser debitado deve ser maior que zero");
    }
    if (valor > saldo) {
        throw Error("Saldo Insuficiente");
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number): void {
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
    getDataAcesso(): Date {
        return new Date();
    },
    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const transacoesOrdenadas: Transacao[] = transacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());

        let grupoAtual: GrupoTransacao | null = null;

        for (let transacao of transacoesOrdenadas) {
            const labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });

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
    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === "Depósito") {
            depositar(novaTransacao.valor);
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } else {
            throw new Error("Tipo de Transação é inválido!");
        }
        transacoes.push(novaTransacao);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

export default Conta;