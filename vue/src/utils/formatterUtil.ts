export const formatFirstLetterUpper = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const formatJustFirstname = (str: string) => {
    return str.split(' ')[0]
}
export const formatDateToPtbr = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',          // Define o timezone para UTC
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour12: false
    });
};


export const formatRealValue = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}