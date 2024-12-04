import { ZodSchema, infer as Infer } from "zod";
import { ValidationError } from "../../utils/http/lancar_erro";

const validateSchema = <T extends ZodSchema>(schema: T, data: unknown): Infer<T> => {
    const validated = schema.safeParse(data);
    if (!validated.success) throw new ValidationError(validated.error.issues[0].message);
    return validated.data;
};

export default validateSchema