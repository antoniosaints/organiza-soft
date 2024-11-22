import { ScToastUtil } from "./scToastUtil";

export default class StorageUtil {
    static get(key: string): any {
        if (!key || localStorage.getItem(key) === null) return ScToastUtil.info('Nenhuma informação encontrada com esse identificador');
        const value = localStorage.getItem(key);
        if (value) return JSON.parse(value);
    }

    static set(key: string, value: any) {
        if (!key || !value) return ScToastUtil.info('Informe Chave e Valor');
        if (typeof value === 'object') value = JSON.stringify(value);
        localStorage.setItem(key, value);
    }

    static remove(key: string) {
        if (!key) return ScToastUtil.info('Nenhuma informação encontrada com esse identificador');
        localStorage.removeItem(key);
    }
}