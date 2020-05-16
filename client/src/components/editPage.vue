<template>
    <div>
    <b-form @submit.prevent="onEdit" class="editForm">
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
      errMsg: '',
    };
  },
  async created() {
    await this.$store.dispatch('getDataById', { id: this.id });
    this.name = this.$store.state.currentProduct.name;
    this.image = this.$store.state.currentProduct.image_url;
    this.price = this.$store.state.currentProduct.price;
    this.stock = this.$store.state.currentProduct.stock;
  },
  methods: {
    async onEdit() {
      await this.$store.dispatch('updateProduct', {
        id: this.id,
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
.editForm {
  margin: auto 20rem;
}
.editButton {
  margin: 0 10rem;
}
.error{
    color: red;
}
</style>
