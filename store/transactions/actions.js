export default {
    getTransactions(contex, filter = {}) {
        return this.$axios.$get('transactions', {
         params: {
            _expand: 'category',
            ...filter
         }
        });
    }, 
    addTransaction(context, data) {
        return this.$axios.$post('transactions', data);
    },
    updateTransaction(context, {id, data}) {
        return this.$axios.$put(`transactions/${id}`, data);
    }
}
