<template>
  <div>
  <h1 class="title">Add Product</h1>
    <b-form @submit.prevent="onAdd" class="addForm">
      <label for="name">Name:</label>
      <input v-model="name" type="text" class="form-control" />
      <p class="error" v-if="errMsg.name">
          {{ this.errMsg.name }}
      </p>
      <label for="image">Image url:</label>
      <input v-model="image" type="url" class="form-control" />
      <p class="error" v-if="errMsg.image_url">
          {{ this.errMsg.image_url }}
      </p>
      <label for="price">Price:</label>
      <input v-model="price" type="number" class="form-control" />
      <p class="error" v-if="errMsg.price">
          {{ this.errMsg.price }}
      </p>
      <label for="stock">Stock:</label>
      <input v-model="stock" type="number" class="form-control" />
      <p class="error" v-if="errMsg.stock">
          {{ this.errMsg.stock }}
      </p>
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
      errMsg: '',
    };
  },
  methods: {
    async onAdd() {
      await this.$store.dispatch('toAddProduct', {
        name: this.name,
        image_url: this.image,
        price: this.price,
        stock: this.stock,
      });
      if (this.$store.state.errMsg) {
        this.errMsg = this.$store.state.errMsg;
      } else {
        this.$router.push('/');
      }
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
.error{
    color: red;
}
</style>
