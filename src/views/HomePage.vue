<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro de Semanas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Selección de tipo de semana -->
      <ion-item>
        <ion-label>Semana:</ion-label>
        <ion-select v-model="tipoSemana" @ionChange="limpiarFormulario()">
          <ion-select-option value="corta">Semana Corta</ion-select-option>
          <ion-select-option value="larga">Semana Larga</ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Formulario para calcular el total a pagar -->
      <ion-card v-if="tipoSemana">
        <ion-card-header>
          <ion-card-title>{{ tipoSemana === 'corta' ? 'Semana Corta' : 'Semana Larga' }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-label>Días Asistidos:</ion-label>
            <ion-select v-model="diasAsistidos" @ionChange="calcularPago()">
              <ion-select-option :value="i" v-for="i in 5" :key="i">{{ i }}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button expand="block" @click="calcularPago()">Calcular Pago</ion-button>
          <ion-item v-if="totalPagar !== null" class="total-item">
            <ion-label>Total a Pagar:</ion-label>
            <ion-text class="total-amount">{{ totalPagar }} pesos</ion-text>
          </ion-item>
          <div v-if="totalPagar !== null" class="happy-face">
            <ion-label>{{ mostrarCaritaPorPago(totalPagar) }}</ion-label>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonText
  },
  data() {
    return {
      tipoSemana: 'corta', // Inicialmente semana corta
      diasAsistidos: 0,
      totalPagar: null
    };
  },
  methods: {
    calcularPago() {
      const precios = {
        corta: { 1: 300, 2: 400, 3: 500 },
        larga: { 1: 200, 2: 300, 3: 400, 4: 500, 5: 600 }
      };

      if (this.diasAsistidos > 0) {
        if (this.tipoSemana === 'corta') {
          let tarifaBase = this.diasAsistidos <= 3 ? precios.corta[this.diasAsistidos] : 500 + (this.diasAsistidos - 3) * 100;
          this.totalPagar = tarifaBase;
        } else if (this.tipoSemana === 'larga') {
          this.totalPagar = precios.larga[this.diasAsistidos] || 0;
        }
      } else {
        this.totalPagar = 0;
      }
    },
    mostrarCaritaPorPago(total) {
      if (total <= 300) {
        return '😊 ¡Feliz!';
      } else if (total <= 500) {
        return '😄 ¡Contento!';
      } else {
        return '🤑 ¡Rico!';
      }
    },
    limpiarFormulario() {
      this.diasAsistidos = 0;
      this.totalPagar = null;
    }
  }
});
</script>

<style scoped>
.total-item {
  border-top: 2px solid #007bff;
  padding-top: 15px;
}

.total-amount {
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
  text-align: center;
  margin-top: 10px;
  animation: fadeInUp 0.5s ease;
}

.happy-face {
  text-align: center;
  font-size: 40px;
  margin-top: 20px;
}
</style>
