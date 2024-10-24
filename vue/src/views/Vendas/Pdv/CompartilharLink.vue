<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePontoDeVendasStore } from '@/stores/vendas/pdv/pontoVendasStore'
import { ScToastUtil } from '@/utils/scToastUtil'
import { Copy } from 'lucide-vue-next'
const storePdv = usePontoDeVendasStore();
const copiarLinkPagamento = () => {
  navigator.clipboard.writeText(storePdv.linkPagamento);
  ScToastUtil.success("Link copiado com sucesso!")
}
</script>

<template>
  <Dialog v-model:open="storePdv.openCompartilharLink">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Compartilhar link de pagamento</DialogTitle>
        <DialogDescription>
          Qualquer pessoa com esse link pode realizar o pagamento!
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link de pagamento
          </Label>
          <Input
            id="link"
            v-model="storePdv.linkPagamento"
            read-only
          />
        </div>
        <Button @click="copiarLinkPagamento" type="submit" size="sm" class="px-3">
          <span class="sr-only">Copiar</span>
          <Copy class="w-4 h-4" />
        </Button>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>