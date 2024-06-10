import { ValidationError } from "../utils/http/lancar_erro";

const validateSchema = (schema: any, data: any) => {
    const validated: any = schema.safeParse(data);
    if (!validated.success) throw new ValidationError(validated.error.issues[0].message);
    return validated.data;
};

export default validateSchema