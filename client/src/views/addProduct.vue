<template>
  <div>
  <h1 class="title">Add Product</h1>
    <b-form @submit.prevent="onAdd" class="addForm">
      <label for="name">Name:</label>
      <input v-model="name" type="text" class="form-control" />
      <label for="image">Image url:</label>
      <input v-model="image" type="url" class="form-control" />
      <label for="price">Price:</label>
      <input v-model="price" type="number" class="form-control" />
      <label for="stock">Stock:</label>
      <input v-model="stock" type="number" class="form-control" />
      <br />
      <b-button variant="success" class="addButton" type="submit">Add Product</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      image: null,
      price: null,
      stock: null,
    };
  },
  methods: {
    onAdd() {
      console.log(this.name);
      this.$store.dispatch('toAddProduct', {
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
.title{
    text-align: center;
}
.addForm {
  margin: auto 20rem;
}
.addButton {
  margin-left: 82%;
}
</style>
