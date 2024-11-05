export function gerarCodigoEAN13() {
    const codigo = [];
    for (let i = 0; i < 12; i++) {
        codigo.push(Math.floor(Math.random() * 10));
    }
    const digitoVerificador = calcularDigitoVerificador(codigo);
    codigo.push(digitoVerificador);
    return codigo.join('');
}

function calcularDigitoVerificador(digitos: number[]): number {
    let soma = 0;
    digitos.forEach((numero, index) => {
        soma += numero * (index % 2 === 0 ? 1 : 3);
    });
    const resto = soma % 10;
    return resto === 0 ? 0 : 10 - resto;
}