import JWT from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;
const NOTFOUNDSECRET = "SECRET não foi informado nas variáveis de ambiente";
class JwtService {
    static encode(payload: object, time: string) {
        if (!SECRET) throw new Error(NOTFOUNDSECRET);
        return JWT.sign(payload, SECRET, { expiresIn: time });
    }

    static decode(token: string): any {
        if (!SECRET) throw new Error(NOTFOUNDSECRET);
        return JWT.decode(token);
    }

    static verify(token: string) {
        if (!SECRET) throw new Error(NOTFOUNDSECRET);
        return JWT.verify(token, SECRET);
    }
}

export default JwtService