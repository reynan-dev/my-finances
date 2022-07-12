<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Transações
      </h1>

      <AppButton @click="isAdding = !isAdding">
        Nova transação
      </AppButton>
    </div>

    <TransactionAddVue v-if="isAdding" @cancel="isAdding = false" @after-add="afterAdd" />

    <div class="mt-6 pb-6 flex items-center space-x-4 border-b border-gray-300">
      <div>
        <AppFormLabel>Descrição</AppFormLabel>
        <AppFormInput />
      </div>

      <div>
        <AppFormLabel>Categoria</AppFormLabel>
        <AppFormSelect :options="[{ name: 'Licença de softwares', id: 1 }]" />
      </div>
    </div>

    <div class="flex items-center px-5 py-6 bg-white rounded-lg shadow">
      {{ index }}

      <div v-for="transaction in group" :key="transaction.id">
        {{ transaction.description }}
      </div>
    </div>

    <div class="mt-4">
      <div class="space-y-8">
        <div>
          <div class="mb-1">
            <div class="font-bold text-sm">
              04 de Jan
            </div>
          </div>
          <!-- ediction -->
          
        </div>

        <div v-for="(group, index) in transactionGrouped" :key="index">
          <div class="mb-1">
            <div class="font-bold text-sm">
              {{ formatDate(index) }}
            </div>
          </div>

          <div class="space-y-3">
            <TransactionVue v-for="transaction in group" :key="transaction.id" :transaction="transaction" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { groupBy, orderBy } from "lodash";

import TransactionAddVue from '~/components/Transactions/TransactionAdd.vue';
import TransactionVue from "~/components/Transactions/Transaction.vue";

import AppButton from '~/components/Ui/AppButton';
import AppFormInput from '~/components/Ui/AppFormInput';
import AppFormLabel from '~/components/Ui/AppFormLabel';
import AppFormSelect from '~/components/Ui/AppFormSelect';

export default {
  name: 'IndexPage',

  components: {
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect,
    TransactionAddVue,
    TransactionVue,
  },

  async asyncData({ store }) {
    return {
      transactions: await store.dispatch('transactions/getTransactions'),
    }
  },

  data() {
    return {
      isAdding: false,
    }
  },

  methods: {
    formatDate(date) {
      return this.$dayjs(date).format('DD MMM')
    },

    afterAdd(transaction) {
      this.transactions.push(transaction);
    }
  },

  computed: {
    transactionGrouped() {
      return groupBy(orderBy(this.transactions, 'date', `desc`), `date`);
    }
  }
}
</script>
