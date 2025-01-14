import cluster from "cluster";
import os from "os";
import env from "./env";

const PORT = env.PORT || 6000;
const numCPUs = os.cpus().length;

export const bootstrap = {
    init: (app: any) => {
        if (cluster.isPrimary) {
            console.log(`Master process ${process.pid} is running`);
            for (let i = 0; i < numCPUs; i++) cluster.fork();
            cluster.on("exit", (id) => {
                console.log(`Worker ${id.process.pid} died`);
                cluster.fork();
            });
        } 
        else app.listen(PORT, () => {
            console.log(`Worker ${process.pid} started running on port ${PORT}`);
        })
    }
};