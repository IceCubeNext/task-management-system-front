<template>
  <h2>Задачи</h2>
  <p>*Двойной клик по задаче - открыть комментарии</p>
  <div class="app-container">
    <DxDataGrid :data-source="tasksStore"
                :allow-column-resizing="true"
                :column-auto-width="true"
                :allow-column-reordering="true"
                :on-row-dbl-click="toCommentsPage">
      <DxColumn data-field="title" caption="Название"></DxColumn>
      <DxColumn data-field="description" caption="Описание"></DxColumn>
      <DxColumn data-field="status" caption="Статус">
        <DxLookup
            :data-source="statusStore"
            value-expr="nameEn"
            display-expr="nameRu"
        />
      </DxColumn>
      <DxColumn data-field="priority" caption="Приоритет">
        <DxLookup
            :data-source="priorityStore"
            value-expr="nameEn"
            display-expr="nameRu"
        />
      </DxColumn>
      <DxColumn data-field="author.fullName" caption="Автор" :allow-editing="false"/>
      <DxColumn data-field="performer.id" caption="Исполнитель">
        <DxLookup
            :data-source="usersStore"
            value-expr="id"
            display-expr="fullName"
        />
      </DxColumn>
      <DxFilterRow :visible="true"/>
      <DxSearchPanel :visible="true"/>
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
import {tasksStore} from "@/store/tasks-store";
import {usersStore} from "@/store/users-store";
import {statusStore} from "@/store/status-store";
import {priorityStore} from "@/store/priority-store";
import router from "@/router";

export default {
  name: "tasks-list-page",
  computed: {},
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
  methods: {
    toCommentsPage(e) {
      router.push("/tasks/" + e.data.id + "/comments");
    },
  },
  data() {
    return {
      tasksStore,
      usersStore,
      statusStore,
      priorityStore
    }
  }
}
</script>
<style lang="scss">

h2, p {
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
