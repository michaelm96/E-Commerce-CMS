<template>
  <div class="table-responsive">
    <table class="table table-bordered" v-if="!editTable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Image url</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      <listProduct
        v-for="(item,index) in this.$store.state.products"
        :key="index"
        :item="item"
        :index="index"
        @hideTrue="editTable = $event"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import listProduct from '../components/listProduct.vue';

export default {
  data() {
    return {
      items: this.$store.state.products,
      editTable: false,
    };
  },
  created() {
    this.$store.dispatch('getProduct');
  },
  components: {
    listProduct,
  },
};
</script>

<style scoped>

</style>
