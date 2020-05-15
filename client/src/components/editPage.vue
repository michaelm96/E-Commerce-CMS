<template>
    <div>
    <b-form @submit.prevent="onEdit" class="editForm">
      <label for="name">Name:</label>
      <input v-model="name" type="text" class="form-control" />
      <label for="image">Image url:</label>
      <input v-model="image" type="url" class="form-control" />
      <label for="price">Price:</label>
      <input v-model="price" type="number" class="form-control" />
      <label for="stock">Stock:</label>
      <input v-model="stock" type="number" class="form-control" />
      <br />
      <b-button variant="warning" class="editButton" type="submit">Edit Product</b-button>
    </b-form></div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: null,
      image: null,
      price: null,
      stock: null,
    };
  },
  created() {
    this.$store.dispatch('getDataById', { id: this.id });
    setTimeout(() => {
      this.name = this.$store.state.currentProduct.name;
      this.image = this.$store.state.currentProduct.image_url;
      this.price = this.$store.state.currentProduct.price;
      this.stock = this.$store.state.currentProduct.stock;
    }, 500);
  },
  methods: {
    onEdit() {
      this.$store.dispatch('updateProduct', {
        id: this.id,
        name: this.name,
        image_url: this.image,
        price: this.price,
        stock: this.stock,
      });
      setTimeout(() => {
        this.$router.push('/');
      }, 300);
    },
  },
};
</script>

<style scoped>
.editForm {
  margin: auto 20rem;
}
.editButton {
  margin-left: 82%;
}
</style>
