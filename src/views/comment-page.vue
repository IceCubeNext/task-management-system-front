<template>
  <h2>Комментарии</h2>
  <div class="app-container">
    <DxDataGrid :data-source="commentsStore"
                :allow-column-resizing="true"
                :column-auto-width="true"
                :allow-column-reordering="true">
      <DxColumn data-field="title" caption="Название"></DxColumn>
      <DxColumn data-field="description" caption="Описание"></DxColumn>
      <DxColumn data-field="author.id" caption="Автор">
        <DxLookup
            :data-source="usersStore"
            value-expr="id"
            display-expr="firstname"
        />
      </DxColumn>
      <DxFilterRow :visible="true" />
      <DxSearchPanel :visible="true" />
      <DxEditing
          mode="popup"
          :allow-updating="true"
          :allow-adding="true"
          :allow-deleting="true"
      />
      <DxToolbar>

        <DxItem name="addRowButton"/>
        <DxItem name="searchPanel" show-text="always"/>
      </DxToolbar>
    </DxDataGrid>
  </div>
</template>


<script>
import {
  DxDataGrid,
  DxLookup,
  DxColumn,
  DxFilterRow,
  DxSearchPanel,
  DxEditing,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/data-grid';
import {usersStore} from "@/store/users-store";
import CustomStore from "devextreme/data/custom_store";
import api from "@/services/api";
import EventBus from "@/common/EventBus";
import {host} from "@/api-config";
import {useRoute} from "vue-router";

export default {
  name: "tasks-list-page",
  computed: {
  },
  components: {
    DxDataGrid,
    DxLookup,
    DxColumn,
    DxFilterRow,
    DxSearchPanel,
    DxEditing,
    DxToolbar,
    DxItem,
  },
  mounted() {
    const route = useRoute();
    this.id = route.params.id
    const url = host.tasks + '/' + `${this.id}` + "/comments"
    this.commentsStore = new CustomStore({
      load: () => {
        return api.get(url, {})
            .then(response => {
              return response.data
            }).catch(error => {
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            })
      },
      insert: (item) => {
        return api.post(url, item, {})
            .then(response => {
              return response.data;
            }).catch(error => {
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            })
      },
      update: (id, item) => {
        return api.patch(url + '/' + id, item, {})
            .then(response => {
              return response.data;
            }).catch(error => {
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            })
      },
      remove: (id) => {
        return api.delete(url + '/' + id, {})
            .then(response => {
              return response.data;
            }).catch(error => {
              if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
              }
            })
      }
    })
  },
  data() {
    return {
      usersStore,
      commentsStore: {}
    }
  }
}
</script>
<style lang="scss">

h2 {
  margin-left: 15px;
  padding: 0;
}

.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
</style>
