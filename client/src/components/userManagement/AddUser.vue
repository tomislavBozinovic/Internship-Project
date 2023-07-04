<template>
  <div>
    <form @submit.prevent="create" class="add-user-form">
      <input v-model="name" placeholder="Employee name...">
      <input v-model="age" type="number" placeholder="Employee age...">
      <input v-model="email" type="email" placeholder="Employee email...">
      <input v-model="phone" type="text" placeholder="Employee phone...">
      <input v-model="pet" type="text" placeholder="Employee pet...">
      <input ref="image" @change="addImage($event)" type="file" accept="image/*">
      <va-button @click="create" class="add-button">
        Add Employee
      </va-button>
      <br><br>
    </form>
    <div v-if="errors.length" class="errContainer">
      <div v-for="error in errors" :key="error" class="errMessage">
        <span>{{ error.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api/employee";

export default {
  data: () => ({
    name: '',
    age: '',
    email: '',
    phone: '',
    pet: '',
    img: null,
    errors: []
  }),
  methods: {
    create() {
      this.errors = [];
      const data = {
        employee: {
          name: this.name,
          age: this.age,
          email: this.email,
          phone: this.phone,
          pet: this.pet,
        },
        img: this.img
      }
      api
        .addEmployee(data)
        .then(() => {
          this.$emit('created');
          this.clearInput();
        })
        .catch((err) => {
            this.errors.push(...err.response.data.errors);
        });
    },
    addImage(e) {
      const imgFile = e.target.files[0];
      if (!imgFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = function() {
        this.img = reader.result;
      }.bind(this);
    },
    clearInput() {
      this.name = '',
      this.age = '',
      this.email = '',
      this.phone = '',
      this.pet = '',
      this.$refs.image.value = null
    }
  },
};
</script>

<style scoped>
.add-button {
  height: 50px;
}
.add-user-form {
  margin-top: 20px;
  display: grid;
  justify-content: center;
}
.add-user-form input {
  height: 50px;
  width: 450px;
  margin: 5px;
}

.errContainer {
  text-align: center;
  margin: 5px;
}

.errMessage {
  padding: 5px;
  color: #550404;
  font-weight: bold;
}
</style>