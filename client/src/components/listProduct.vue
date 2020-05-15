<template>
  <tr>
    <td>{{ index+1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.image_url }}</td>
    <td>{{ item.price }}</td>
    <td>{{ item.stock }}</td>
    <td>
      <b-button variant="danger" @click.prevent="deleteProduct(item.id)"
      class="buttonSpace">Delete</b-button>
      <router-link :to="{ path: `/product/${ item.id }/edit`}">
      <b-button variant="primary" >Edit</b-button>
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['index', 'item'],
  data() {
    return {
      editTrue: false,
    };
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', { id });
    },
    hideTable() {
      this.$emit('hideTable', true);
    },
  },
};
</script>

<style scoped>
.buttonSpace {
  margin-right: 1rem;
}
</style>
