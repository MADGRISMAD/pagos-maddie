<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro de Semanas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>Semana:</ion-label>
        <ion-select v-model="tipoSemana">
          <ion-select-option value="corta">Semana Corta</ion-select-option>
          <ion-select-option value="larga">Semana Larga</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Días Asistidos:</ion-label>
        <ion-input v-model.number="diasAsistidos" type="number"></ion-input>
      </ion-item>

      <ion-button @click="calcularPago()">Calcular Pago</ion-button>

      <ion-item v-if="totalPagar !== null">
        <ion-label>Total a Pagar:</ion-label>
        <ion-text>{{ totalPagar }} pesos</ion-text>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
export default {
  data() {
    return {
      tipoSemana: 'corta', // Valor por defecto: semana corta
      diasAsistidos: 0,
      totalPagar: null
    };
  },
  methods: {
    calcularPago() {
      if (this.tipoSemana === 'larga') {
        // Calcula el total a pagar para una semana larga (4 días)
        switch (this.diasAsistidos) {
          case 4:
            this.totalPagar = 500; // Asistió todos los días
            break;
          case 3:
            this.totalPagar = 400;
            break;
          case 2:
            this.totalPagar = 300;
            break;
          case 1:
            this.totalPagar = 200;
            break;
          default:
            this.totalPagar = 100; // No asistió a ningún día
        }
      } else if (this.tipoSemana === 'corta') {
        // Calcula el total a pagar para una semana corta (3 días)
        switch (this.diasAsistidos) {
          case 3:
            this.totalPagar = 500; // Asistió todos los días
            break;
          case 2:
            this.totalPagar = 400;
            break;
          case 1:
            this.totalPagar = 300;
            break;
          default:
            this.totalPagar = 200; // No asistió a ningún día
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilos CSS personalizados aquí */
</style>
