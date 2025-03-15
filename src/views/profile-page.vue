<template>
  <div>
    <h2 class="content-block">Профиль</h2>

    <div class="content-block dx-card responsive-paddings">
      <div class="form-avatar">
        <img :src="imageSrc" alt=""/>
      </div>
    </div>

    <div class="content-block dx-card responsive-paddings">
      <dx-form
          id="form"
          label-location="top"
          :form-data="formData"
          :col-count="1">
        <dx-group-item caption="Пользователь" :col-count="4">
          <dx-simple-item data-field="ID"></dx-simple-item>
          <dx-simple-item data-field="Имя"></dx-simple-item>
          <dx-simple-item data-field="Фамилия"></dx-simple-item>
          <dx-simple-item data-field="Отчество"></dx-simple-item>
        </dx-group-item>
        <dx-group-item caption="Токен" :col-span="4">
          <dx-simple-item data-field="AccessToken"></dx-simple-item>
          <dx-simple-item data-field="RefreshToken"></dx-simple-item>
        </dx-group-item>
      </dx-form>
    </div>
  </div>
</template>

<script>
import {DxForm, DxSimpleItem, DxGroupItem} from "devextreme-vue/form";
import store from "@/store";
import router from "@/router";
import imageSrc from '@/assets/avatar.png'

export default {
  name: "profile-page",
  setup() {
    const currentUser = store.state.auth.user;
    if (!currentUser) {
      router.push('/sign-in');
    }
    const formData = {
      ID: currentUser.id,
      Имя: currentUser.username,
      Фамилия: currentUser.surname,
      Отчество: currentUser.patronymic,
      AccessToken: currentUser.accessToken,
      RefreshToken: currentUser.refreshToken,
    };

    return {
      imageSrc,
      formData,
    };
  },
  components: {
    DxForm, DxSimpleItem, DxGroupItem
  }
};
</script>

<style lang="scss">
.form-avatar {
  float: left;
  height: 120px;
  width: 120px;
  margin-right: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  overflow: hidden;

  img {
    height: 120px;
    display: block;
    margin: 0 auto;
  }
}
</style>
