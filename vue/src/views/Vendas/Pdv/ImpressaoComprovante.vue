<template>
    <div>
        <button @click="connectToQz">Connect to QZ Tray</button>

        <div v-if="printers.length > 0">
            <label for="printers">Select Printer:</label>
            <select v-model="selectedPrinter" @change="onPrinterChange">
                <option v-for="printer in printers" :key="printer" :value="printer">{{ printer }}</option>
            </select>
        </div>

        <button @click="print" :disabled="!selectedPrinter">Print</button>
    </div>
</template>

<script setup lang="ts">
import qzTrayService from '@/services/qzTray/qzTrayService';

const printers: string[] = [];
const selectedPrinter: string | null = null;

const connectToQz = () => {
    qzTrayService.startQz()
        .then(() => {
            qzTrayService.setSignature();
            return qzTrayService.listPrinters();
        })
        .then((p) => {
            printers.push(...p);
        });
};
const onPrinterChange = () => {
    qzTrayService.setPrinter(selectedPrinter!);
};
const print = () => {
    const data = ['^XA', '^FO50,50^ADN,36,20^FDHello World^FS', '^XZ'];
    qzTrayService.printData(data);
}
</script>