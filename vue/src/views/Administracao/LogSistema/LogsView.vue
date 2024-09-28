<template>
    <div class="rounded-lg p-4 editorjs-container" ref="logEditorMessageJs"></div>
</template>
<script setup lang="ts">
import EditorJS, { OutputData } from '@editorjs/editorjs';
import ListTool from '@editorjs/list';
import SimpleImage from "@editorjs/simple-image";
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist'
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
            header: {
                class: Header as any,
                inlineToolbar: true,
                config: {
                    placeholder: 'Escreva um título',
                    levels: [2, 3, 4],
                    defaultLevel: 3
                }
            },
            list: ListTool,
            image: SimpleImage,
            table: {
                class: Table as any,
                inlineToolbar: true
            },
            code: CodeTool,
            checklist: Checklist,
        },
        i18n: {
            messages: {
                ui: {
                    "toolbox": {
                        "add": "Adicionar bloco",
                        "delete": "Deletar bloco",
                    },
                    "blockTunes": {
                        "toggler": {
                            "clickToTune": "Clique para ajustar",
                            "clickToDelete": "Clique para deletar"
                        }
                    },
                    "inlineToolbar": {
                        "converter": {
                            "convertTo": "Converter para"
                        }
                    },
                    "toolbar": {
                        "toolbox": {
                            "add": "Adicionar bloco"
                        }
                    }
                },
                toolNames: {
                    "Text": "Texto",
                    "Heading": "Cabeçalho",
                    "List": "Lista",
                    "Checklist": "Lista de Tarefas",
                    "Quote": "Citação",
                    "Code": "Código",
                    "Link": "Link",
                    "Table": "Tabela",
                    "Bold": "Negrito",
                    "Italic": "Itálico",
                    "Image": "Imagem",
                },
                blockTunes: {
                    "delete": {
                        "title": "Deletar",
                        "text": "Tem certeza que deseja deletar este bloco?"
                    },
                    "moveUp": {
                        "title": "Mover para cima"
                    },
                    "moveDown": {
                        "title": "Mover para baixo"
                    }
                },
            }
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

<style>
.dark .ce-popover,
.dark .ce-popover-item,
.dark .ce-popover-item__icon,
.dark .ce-popover-items,
.dark .ce-popover__container .dark .ce-popover-item:hover {
    --color-background-item-hover: hsl(var(--background));
    background-color: hsl(var(--background));
    border-color: hsl(var(--border-editorjs));
    background: hsl(var(--background));
}

.dark .ce-popover__container, .ce-code__textarea {
    background: hsl(var(--background));
    border-color: hsl(var(--border-editorjs));
    color: hsl(var(--foreground));
}

.dark .ce-popover--opened>.ce-popover__container {
    border: 1px solid hsl(var(--border-editorjs));
}

.dark .ce-popover-item-separator__line {
    border: 1px solid hsl(var(--border-editorjs));
}

.dark .ce-toolbar__plus,
.dark .ce-toolbar__settings-btn,
.dark .ce-popover-item__title,
.dark .ce-inline-tool .dark .ce-inline-tool--link .dark .ce-popover-item__icon {
    color: hsl(var(--foreground));
}

.dark .cdx-search-field.ce-popover__search {
    background-color: hsl(var(--muted) / 0.3);
    border-color: hsl(var(--border-editorjs));
}

.dark .cdx-search-field__input,
.ce-inline-tool-input--showed,
.cdx-checklist__item-checkbox-check {
    color: hsl(var(--foreground));
    background-color: hsl(var(--background));
    border-color: hsl(var(--border-editorjs));
}

.dark .ce-popover-item .ce-popover-item--confirmation {
    color: hsl(var(--foreground));
    background-color: hsl(var(--destructive) / 0.2);
}

.dark .cdx-block,
.dark .ce-block {
    color: hsl(var(--foreground));
}

.dark .ce-inline-toolbar,
.dark .ce-conversion-tool__icon,
.dark .ce-popover-item__icon,
.dark .tc-popover__item-icon {
    color: hsl(var(--foreground));
    background-color: hsl(var(--background));
    border-color: hsl(var(--border-editorjs));
}

.dark .ce-popover,
.dark .ce-conversion-toolbar,
.dark .ce-inline-toolbar,
.dark .tc-popover {
    background-color: hsl(var(--popover));
    border-color: hsl(var(--border-editorjs));
    box-shadow: 0 3px 15px -3px hsl(var(--border-editorjs) / 0.2);
}

.dark .ce-inline-tool {
    color: hsl(var(--foreground));
}

.dark .ce-inline-tool:hover,
.dark .ce-inline-toolbar__dropdown:hover,
.dark .ce-toolbar__plus:hover,
.dark .ce-toolbar__settings-btn:hover,
.dark .ce-conversion-tool:hover,
.dark .ce-popover-item:hover {
    background-color: hsl(var(--accent) / 0.2);
}

.dark *::selection,
.dark .ce-block.ce-block--selected .ce-block__content {
    background-color: hsl(var(--primary) / 0.5);
}

.dark .ce-popover__items {
    scrollbar-color: hsl(var(--border-editorjs)) hsl(var(--background));
}

/* table class wrapper */
.dark .tc-wrap,
.dark .tc-wrap * {
    --color-border: hsl(var(--border-editorjs));
    --color-text-secondary: hsl(var(--foreground));
    --color-background: hsl(var(--accent) / 0.2);
    --toggler-dots-color: hsl(var(--accent) / 0.2);
    --toggler-dots-color-hovered: hsl(var(--foreground));
}

@media (max-width: 650px) {

    .dark .ce-toolbar__settings-btn,
    .dark .ce-toolbar__plus {
        background-color: hsl(var(--popover));
        border-color: hsl(var(--border-editorjs));
        box-shadow: 0 3px 15px -3px hsl(var(--border-editorjs) / 0.2);
    }
}
</style>