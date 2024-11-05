export function generateUniqueId(prefix: string) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
function generateRandomLetters() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }

    return result;
}
export function generateUniqueIdWithPrefix(prefix: string) {
    const datePart = new Date().toISOString().replace(/[-:.T]/g, ''); 
    return `${prefix}_${datePart}_${generateRandomLetters()}`;
}