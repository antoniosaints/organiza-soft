export function generateUniqueId(prefix: string) {
    return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function generateUniqueIdWithPrefix(prefix: string) {
    const datePart = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14); 
    return `${prefix}-${datePart}`;
}