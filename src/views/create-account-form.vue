<template>
  <form class="create-account-form" @submit.prevent="handleRegister">
    <dx-form :form-data="user" :disabled="loading">
      <dx-item
          data-field="login"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Логин', mode: 'text' }"
      >
        <dx-required-rule message="Введите логин"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item
          data-field="password"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Пароль', mode: 'password' }"
      >
        <dx-required-rule message="Введите пароль"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item
          data-field="confirmedPassword"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Подтвердите пароль', mode: 'password' }"
      >
        <dx-required-rule message="Введите пароль"/>
        <dx-custom-rule
            message="Пароли не совпадают"
            :validation-callback="confirmPassword"
        />
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item
          data-field="firstName"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Имя', mode: 'text' }"
      >
        <dx-required-rule message="Введите имя"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item
          data-field="lastName"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Фамилия', mode: 'text' }"
      >
        <dx-required-rule message="Введите фамилию"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item
          data-field="patronymic"
          editor-type="dxTextBox"
          :editor-options="{ stylingMode: 'filled', placeholder: 'Отчество', mode: 'text' }"
      >
        <dx-required-rule message="Введите отчество"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-item>
        <template #default>
          <!--          <div class='policy-info'>-->
          <!--            By creating an account, you agree to the <router-link to="#">Terms of Service</router-link> and <router-link to="#">Privacy Policy</router-link>-->
          <!--          </div>-->
        </template>
      </dx-item>
      <dx-button-item>
        <dx-button-options
            width="100%"
            type="default"
            template="createAccount"
            :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <dx-item>
        <template #default>
          <div class="login-link">
            Уже есть учетная запись?
            <router-link to="/login-form">Войти</router-link>
          </div>
        </template>
      </dx-item>
      <template #createAccount>
        <div>
          <span class="dx-button-text">
              <dx-loadIndicator v-if="loading" width="24px" height="24px" :visible="true"/>
              <span v-if="!loading">Создать аккаунт</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxForm, {
  DxItem,
  DxLabel,
  DxButtonItem,
  DxButtonOptions,
  DxRequiredRule,
  DxCustomRule,
} from 'devextreme-vue/form';
import DxLoadIndicator from 'devextreme-vue/load-indicator';
import notify from 'devextreme/ui/notify';
import User from "@/models/user";
import store from "@/store";
import router from "@/router";
import {host} from "@/api-config";
import axios from "axios";

export default {
  name: 'register-form',
  data() {
    return {
      user: new User('', '', '', '', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.router.push('/profile-page');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.loading = true;

      store.dispatch('auth/register', this.user).then(
          data => {
            this.message = data.message;
            this.loading = true;
            if (data.id !== undefined) {
              axios.post (host.users, {"id": data.id,
                                          "firstname": data.firstName,
                                          "lastname": data.lastName,
                                          "patronymic": data.patronymic,
              }, {})
            }
            router.push('/profile-page');
          },
          error => {
            this.message = (error.response && error.response.data) || error.message || error.toString();
            if (this.message !== '') {
              notify(this.message, "error", 2000);
            }
            this.loading = false;
          }
      );
    },
   confirmPassword(e) {
      return e.value === this.user.password;
    }
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxRequiredRule,
    DxCustomRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
  }
};

</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.create-account-form {
  .policy-info {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    font-size: 14px;
    font-style: normal;

    a {
      color: rgba($base-text-color, alpha($base-text-color) * 0.7);
    }
  }

  .login-link {
    color: $base-accent;
    font-size: 16px;
    text-align: center;
  }
}
</style>
