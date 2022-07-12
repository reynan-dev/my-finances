<template>
  <div>
    <TopNavBar />
    <div class="max-w-7xl mx-auto p-4">
      <div class="mt-4">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import TopNavBar from '~/components/Ui/TopNavBar.vue';
export default {
  name: '',

  components: {
    TopNavBar,
  },

  data() {
    return {
    };
  },

  methods: {},
};
</script>
