import { TipoTransacao } from "./tipo-transacao.js";
export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}
