<template>
  <div class="home">
    <VTable :tableData="this.filterTableData" />
  </div>
</template>

<script>
// @ is an alias to /src

import VTable from "@/components/VTable.vue";
import { mapGetters } from "vuex";
export default {
  name: "TableView",
  computed: {
    ...mapGetters(["filterTableData"]),
  },
  components: {
    VTable,
  },
};
</script>
