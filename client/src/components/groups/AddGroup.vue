<template>
  <div class="add-group flex">
    <form @submit.prevent="create" class="form flex">
      <label for="name" class="label">Name</label>
      <input v-model="name" id="name" class="input-field" type="text">
      <label class="label" for="description">Description</label>
      <textarea
        v-model="description"
        id="description"
        class="txt-area"
        cols="50"
        rows="5">
      </textarea>
      <label class="label">Group Image</label>
      <input
        @change="addImage($event)"
        class="input-field"
        type="file"
        accept="image/*">
      <va-button @click="create" class="btn">
        Add Group
      </va-button>
    </form>
    <div v-if="errors.length">
      <div v-for="error in errors" :key="error" class="errMessage">
        <span>{{ error.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@api/group';

export default {
  data: () => ({
    name: '',
    description: '',
    img: null,
    errors: []
  }),
  methods: {
    async create() {
      this.errors = [];
      const data = {
        group: { name: this.name, description: this.description },
        img: this.img
      }
      try {
        await api.createGroup(data);
        this.$router.back();
      } catch (error) {
        const errorsArr = error.response.data.errors;
        this.errors.push(...errorsArr);
      }
    },
    addImage(e) {
      const img = e.target.files[0];
      if (!img) return;
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        this.img = reader.result;
      }.bind(this);
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-group {
  width: 100%;
  padding: 30px 0px;
}
.input-field:not([type="file"]), .txt-area {
  width: 400px;
  border: 1px solid #2C82E0;
}
.label {
  padding: 10px;
  color: #2C82E0;
}
.btn {
  margin-top: 20px;
  width: 250px;
  height: 50px;
}
.errMessage {
  margin-top: 20px;
  color: brown;
  font-weight: bold;
}
</style>