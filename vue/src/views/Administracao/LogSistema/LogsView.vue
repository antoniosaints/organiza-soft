<template>
    <div class="rounded-lg p-4 editorjs-container" ref="logEditorMessageJs"></div>
</template>
<script setup lang="ts">
import EditorJS, { OutputData } from '@editorjs/editorjs';
import ListTool from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Table from '@editorjs/table'
import { onMounted, onUnmounted, ref, watch } from 'vue';

const logEditorMessageJs = ref<HTMLElement | null>(null);
const props = defineProps<{
    modelValue: OutputData;
    placeholder: string;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: OutputData): void;
}>();

let editor: EditorJS | null = null;
let updatingModel = false;

function modelToView(): void {
    if (!editor || !props.modelValue) return;

    if (typeof props.modelValue === 'string') {
        editor.blocks.renderFromHTML(props.modelValue);
    } else {
        editor.render(props.modelValue);
    }
}

function viewToModel(): void {
    updatingModel = true;
    editor?.save().then((outputData: OutputData) => {
        emit('update:modelValue', outputData);
    }).catch((error: Error) => {
        console.error('Saving failed:', error);
    }).finally(() => {
        updatingModel = false;
    });
}

onMounted((): void => {
    editor = new EditorJS({
        holder: logEditorMessageJs.value!,
        autofocus: true,
        placeholder: props.placeholder || 'Descreva algo ou use "/" para mostrar as opções',
        inlineToolbar: ['bold', 'italic', 'link'],
        tools: {
            list: ListTool,
            image: ImageTool,
            table: Table
        },
        minHeight: 300,
        data: props.modelValue,
        onReady: modelToView,
        onChange: viewToModel,
    });
});

watch(() => props.modelValue, () => {
    if (!updatingModel) {
        modelToView();
    }
});

onUnmounted((): void => {
    editor?.destroy();
});
</script>

<style scoped>
/* Estilos customizados para o modo escuro com Tailwind */
.editorjs-container {
    @apply bg-white text-black border border-gray-300;
}

.dark .editorjs-container {
    @apply bg-gray-800 text-gray-100 border-gray-600;
}

/* Estilos internos dos blocos EditorJS */
.editorjs-container .ce-block__content {
    @apply bg-transparent text-inherit;
}

/* Estilizando a barra de ferramentas */
.editorjs-container .ce-toolbar__content {
    @apply bg-gray-700 text-gray-100;
}

.dark .editorjs-container .ce-toolbar__content {
    @apply bg-gray-900 text-white;
}
.dark .editorjs-container .ce-toolbar__settings-btn {
    @apply bg-gray-900 text-white;
}
</style>