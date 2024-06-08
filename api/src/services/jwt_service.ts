import JWT from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;
class JwtService {
    static encode(payload: object, time: string) {
            if (!SECRET) {
                throw new Error("Secret not found");
            }
            return JWT.sign(payload, SECRET, { expiresIn: time });
    }

    static decode(token: string) {
        if (!SECRET) {
            throw new Error("Secret not found");
        }
        return JWT.decode(token);
    }

    static verify(token: string) {
        if (!SECRET) {
            throw new Error("Secret not found");
        }
        return JWT.verify(token, SECRET);
    }
}

export default JwtService