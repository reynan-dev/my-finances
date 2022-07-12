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

    <TransactionAddVue v-if="isAdding" @cancel="isAdding = false" @store="afterAdd" />

  <TransactionFilterVue @filter="onFilter" />

    <div v-for="(group, index) in transactionGrouped" :key="index">
      <br />
      <div class="mb-1">
        <div class="font-bold text-sm">
          {{ formatDate(index) }}
        </div>
      </div>

      <div class="space-y-3">
        <TransactionVue v-for="transaction in group" :key="transaction.id" :transaction="transaction"
          @update="onUpdate" />
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
import TransactionFilterVue from "~/components/Transactions/TransactionFilter.vue";

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
    TransactionFilterVue,
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
    },

    onUpdate(transaction) {
      console.log(`avo`);
      const index = this.transactions.findIndex(obj => obj.id == transaction.id);
      this.transactions.splice(index, 1, transaction);
    },

    onFilter(filter) {
      this.$store.dispatch(`transactions/getTransactions`, filter)
      .then((response) => {
        this.transactions = response;
      })
    }
  },

  computed: {
    transactionGrouped() {
      return groupBy(orderBy(this.transactions, 'date', `desc`), `date`);
    }
  }
}
</script>
