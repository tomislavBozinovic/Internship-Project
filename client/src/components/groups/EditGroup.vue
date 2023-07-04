<template>
  <div>
    <div class="edit-group">
      <form @submit.prevent="edit" class="form flex">
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
        <va-button @click="edit" class="btn"> Edit Group </va-button>
      </form>
      <div v-if="errors.length">
        <div v-for="error in errors" :key="error" class="errMessage">
          <span>{{ error.msg }}</span>
        </div>
      </div>
      <div class="list-picker flex">
        <vue-list-picker :left-items="leftItems" :right-items="rightItems" />
      </div>
    </div>
  </div>
</template>

<script>
import apiGroup from '@api/group';
import apiEmployee from '@api/employee';
import { VueListPicker } from 'vue-list-picker';

export default {
  props: {
    groupId: { type: String, default: () => '' },
  },
  data: () => ({
    group: null,
    name: '',
    description: '',
    img: null,
    errors: [],
    allEmployees: [],
    leftItems: [],
    rightItems: [],
  }),
  computed: {
    hasImageChanged() {
      return this.group.imagePublicId !== this.img;
    }
  },
  methods: {
    async fetchGroup() {
      const { data } = await apiGroup.fetchGroup(this.groupId);
      this.group = data;
    },
    async fetchEmployees() {
      const { data } = await apiEmployee.getAllEmployees();
      this.allEmployees = data.employees;
    },
    addImage(e) {
      const img = e.target.files[0];
      if (!img) return;
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = function () {
        this.img = reader.result;
      }.bind(this);
    },
    async edit() {
      const groupEmployees = this.rightItems.map((employee) => employee.key);
      const data = {
        group: {
          name: this.name,
          description: this.description,
          employees: groupEmployees,
        },
      };
      if (this.hasImageChanged) {
        data.img = this.img;
      }
      try {
        await apiGroup.updateGroup(this.group._id, data);
        this.$router.push({ path: '/groups' });
      } catch (error) {
        const errorsArr = error.response.data.errors;
        this.errors.push(...errorsArr);
      }
    },
    setInitValues() {
      this.name = this.group.name;
      this.description = this.group.description;
      this.img = this.group.img;
    },
    setListPickerItems() {
      const employees = this.allEmployees;
      const groupEmployeeIds = this.group.employees;
      const getGroupEmployees = employee => groupEmployeeIds.includes(employee._id);
      const getNonGroupEmployees = employee => !groupEmployeeIds.includes(employee._id);
      const mapListObject = employee => ({ key: employee._id, content: employee.name });
      this.leftItems = employees.filter(getNonGroupEmployees).map(mapListObject);
      this.rightItems = employees.filter(getGroupEmployees).map(mapListObject);
    }
  },
  async mounted() {
    await this.fetchGroup();
    await this.fetchEmployees();
    this.setInitValues();
    this.setListPickerItems();
  },
  components: {
    VueListPicker,
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.edit-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 30px;
}
.form {
  flex: 1;
  margin: 5px;
}
.input-field:not([type='file']),
.txt-area {
  width: 400px;
  border: 1px solid #2c82e0;
}
.label {
  padding: 10px;
  color: #2c82e0;
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
.list-picker {
  flex: 1;
  margin: 0 20px;
}
</style>