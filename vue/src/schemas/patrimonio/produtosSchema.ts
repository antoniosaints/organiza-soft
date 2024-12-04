import { ref } from "vue";
import { z } from "zod";

const errors = ref<any>({
    categoriaId: null
})

const createProduto = z.object({
  categoriaId: z.number({
    required_error: "A categoria é obrigatória",
    invalid_type_error: "A categoria deve ser um ID válido",
  })
});

const checkDataProduto = (data: unknown) => {
    const result = createProduto.safeParse(data)
    if (!result.success) {
      result.error.errors.forEach(error => {
        errors.value[error.path[0]] = error.message
      })
    } else {
      Object.keys(errors.value).forEach(key => {
        errors.value[key] = ''
      })
    }
    return result.success
}

export { errors, checkDataProduto }