import fs from "fs"
import path from "path"

const renameFileService = (oldFileName: any, newFileName: any, callback: any) => {
    const basePath = 'uploads/';
    const oldFilePath = path.join(basePath, oldFileName);
    const newFilePath = path.join(basePath, newFileName); // Aqui estava `newFilePath` duas vezes

    fs.access(oldFilePath, (err) => {
        if (err) {
            console.log('Arquivo inexistente: ' + err);
            callback(err);
            return;
        }

        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.log("Erro ao renomear o arquivo: " + err);
                callback(err);
                return;
            }

            console.log(`Arquivo renomeado de ${oldFilePath} para ${newFilePath}`);
            callback(null);
        });
    });
};


const deleteFileService = (fileName: string, callback: Function) => {
    const basePath = 'uploads/'
    const filePath = path.join(basePath, fileName)
    fs.access(filePath, (err) => {
        if (err) {
            console.log('Arquivo inexistente: ' + err)
            callback(err)
            return;
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Erro ao excluir o arquivo: " + err)
                callback(err)
                return;
            }

            console.log(`Arquivo excluído: ${filePath}`)
            callback(null)
        });
    });
}

export { renameFileService, deleteFileService }