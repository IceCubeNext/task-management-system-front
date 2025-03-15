<template>
  <form class="login-form" @submit.prevent="handleLogin">
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
          data-field='password'
          editor-type='dxTextBox'
          :editor-options="{ stylingMode: 'filled', placeholder: 'Пароль', mode: 'password' }"
      >
        <dx-required-rule message="Введите пароль"/>
        <dx-label :visible="false"/>
      </dx-item>
      <dx-button-item>
        <dx-button-options
            width="100%"
            type="default"
            template="signInTemplate"
            :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <dx-button-item>
        <dx-button-options
            text="Создать учетную запись"
            width="100%"
            :on-click="onCreateAccountClick"
        />
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true"/>
            <span v-if="!loading">Войти</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions
} from "devextreme-vue/form";
import notify from 'devextreme/ui/notify';
import router from "@/router";
import store from "@/store";
import User from "@/models/user";

export default {
  name: 'login-form',
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
  created() {
    if (this.loggedIn) {
      this.router.push('/profile-page');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.login && this.user.password) {
        store.dispatch('auth/login', this.user).then(
            () => {
              router.push('/profile-page');
            },
            error => {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
              if (this.message !== '') {
                notify(this.message, "error", 2000);
              }
            }
        );
      }
    },
    onCreateAccountClick() {
      router.push("/sign-up");
    }
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
  }
};
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: rgba($base-text-color, alpha($base-text-color) * 0.7);
  }
}
</style>
