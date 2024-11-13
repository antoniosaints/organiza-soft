import { ref } from "vue";
import { z } from "zod";

const errors = ref<any>({
    contaId: null,
    categoriaId: null
})

const createTransacao = z.object({
  contaId: z.number({
    required_error: "A conta é obrigatória",
    invalid_type_error: "A conta deve ser um ID válido",
  }),
  categoriaId: z.number({
    required_error: "A categoria é obrigatória",
    invalid_type_error: "A categoria deve ser um ID válido",
  })
});

const checkDataLancamento = (data: unknown) => {
    const result = createTransacao.safeParse(data)
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

export { errors, checkDataLancamento }