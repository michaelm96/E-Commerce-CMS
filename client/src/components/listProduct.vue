<template>
  <tr class="fontStyle">
    <td>{{ index+1 }}</td>
    <td class="nameProduct">{{ item.name }}</td>
    <td class="imageUrlSize">{{ item.image_url }}</td>
    <td>Rp.{{ item.price }}</td>
    <td>{{ item.stock }}</td>
    <td class="buttonSpace">
      <router-link :to="{ path: `/product/${ item.id }/edit`}">
      <b-button variant="primary" >Edit</b-button>
      </router-link>
      <b-button variant="danger" class="spaceButtons"
      @click.prevent="deleteProduct(item.id)">Delete</b-button>
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
  min-width: 5rem;
}
.spaceButtons{
  margin:  0.5rem;
}
.imageUrlSize{
  max-width: 30rem;
  overflow: auto;
}
.nameProduct{
  max-width: 10rem;
}
.fontStyle{
  font-family: 'Cantata One', serif;
}
</style>
