<template>
  <div class="auth">
    <form class="form_container" @submit.prevent="register">
      <div class="title">Register</div>
      <br />
      <label class="input_label">First Name</label>
      <div class="input-container">
        <input
          type="text"
          placeholder="First Name"
          v-model="register_form.firstName"
          class="input"
        />
      </div>
      <label class="input_label">Last Name</label>
      <div class="input-container">
        <input
          type="text"
          placeholder="Last Name"
          v-model="register_form.lastName"
          class="input"
        />
      </div>
      <label class="input_label">Email</label>
      <div class="input-container">
        <input
          v-model="register_form.email"
          placeholder="name@mail.com"
          type="email"
          class="input"
        />
      </div>
      <label class="input_label">Password</label>
      <div class="input-container">
        <input
          v-model="register_form.password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          type="password"
          class="input"
        />
      </div>
      <button type="submit" class="login-button">Register</button>
    </form>

    <form class="form_container" @submit.prevent="login">
      <div class="title">Login</div>
      <br />
      <label for="bandName">Email</label>
      <div class="input-container">
        <input
          v-model="login_form.email"
          placeholder="name@mail.com"
          type="email"
          class="input"
        />
      </div>
      <label class="input_label">Password</label>
      <div class="input-container">
        <input
          v-model="login_form.password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          type="password"
          class="input"
        />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    const register = () => {
      // Pass the registration data to the store action
      store.dispatch("register", {
        email: register_form.value.email,
        password: register_form.value.password,
        firstName: register_form.value.firstName,
        lastName: register_form.value.lastName,
      });
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style>
.auth {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 600px;
}

.form_container {
  height: 80%;
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 50px 40px 20px 40px;
  box-shadow: 0px 106px 42px rgba(0, 0, 0, 0.01),
    0px 59px 36px rgba(0, 0, 0, 0.05), 0px 26px 26px rgba(0, 0, 0, 0.09),
    0px 7px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title {
  font-size: x-large;
  color: black;
  justify-self: end;
}

.input-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
}

.input_label {
  font-size: 0.75rem;
  color: grey;
}

.input {
  height: 40px;
  width: 100%;
  border-radius: 7px;
  outline: none;
  border: 1px solid #e5e5e5;
  filter: drop-shadow(0px 1px 0px #efefef)
    drop-shadow(0px 1px 0.5px rgba(239, 239, 239, 0.5));
  transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.login-button {
  width: 100%;
  height: 40px;
  border: 0;
  background-color: var(--primary);
  color: var(--text);
  border-radius: 6px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #d89868;
}
</style>
