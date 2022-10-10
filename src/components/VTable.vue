<template>
  <div class="v-table">
    <VTableFilter :propTableData="this.tableData" />
    <div class="v-table__header">
      <p
        @click="sortByDate"
        :class="{ 'sort-selected': activeSort[0] == 'date' }"
      >
        Дата
        <UnfoldMoreHorizontal />
      </p>
      <p
        @click="sortByName"
        :class="{ 'sort-selected': activeSort[0] == 'name' }"
      >
        Название
        <UnfoldMoreHorizontal />
      </p>
      <p
        @click="sortByTotal"
        :class="{ 'sort-selected': activeSort[0] == 'total' }"
      >
        Количество
        <UnfoldMoreHorizontal />
      </p>
      <p
        @click="sortByDistance"
        :class="{ 'sort-selected': activeSort[0] == 'distance' }"
      >
        Расстояние
        <UnfoldMoreHorizontal />
      </p>
    </div>
    <div class="v-table__body">
      <VTableRow v-for="row in paginatedItems" :key="row.id" :rowData="row" />
    </div>
    <div class="v-table__pagination">
      <div
        class="page"
        v-for="page in pages"
        :key="page"
        @click="pageClick(page)"
        :class="{ selected: page === pageNumber }"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import UnfoldMoreHorizontal from "vue-material-design-icons/UnfoldMoreHorizontal";
import VTableRow from "./VTableRow.vue";
import VTableFilter from "./VTableFilter.vue";
export default {
  name: "VTable",
  components: {
    VTableRow,
    UnfoldMoreHorizontal,
    VTableFilter,
  },
  data() {
    return {
      itemsPerPage: 10,
      pageNumber: 1,
      nameSorted: 0,
      totalSorted: 0,
      dateSorted: 0,
      distanceSorted: 0,
      activeSort: 0,
    };
  },
  props: { tableData: Array },
  computed: {
    pages() {
      return Math.ceil(this.tableData.length / 10);
    },
    paginatedItems() {
      let from = (this.pageNumber - 1) * this.itemsPerPage;
      let to = from + this.itemsPerPage;
      return this.tableData.slice(from, to);
    },
  },
  methods: {
    pageClick(page) {
      this.pageNumber = page;
    },
    currentSorted() {
      this.tableData.sort((a, b) => a.id - b.id);
    },
    sortByDate() {
      if (this.activeSort[0] !== "date") this.activeSort = ["date", 0];
      if (this.activeSort[1] === 0) {
        this.activeSort[1] = 1;
        this.tableData.sort((a, b) => {
          return dayjs(a.date).diff(dayjs(b.date));
        });
      } else if (this.activeSort[1] === 1) {
        this.activeSort[1] = -1;
        this.tableData.sort((a, b) => {
          return dayjs(b.date).diff(dayjs(a.date));
        });
      } else {
        this.activeSort = [null, 0];
        this.currentSorted();
      }
    },
    sortByName() {
      if (this.activeSort[0] !== "name") this.activeSort = ["name", 0];
      if (this.activeSort[1] === 0) {
        this.activeSort[1] = 1;
        this.tableData.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (this.activeSort[1] === 1) {
        this.activeSort[1] = -1;
        this.tableData.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else {
        this.activeSort = [null, 0];
        this.currentSorted();
      }
    },
    sortByTotal() {
      if (this.activeSort[0] !== "total") this.activeSort = ["total", 0];
      if (this.activeSort[1] === 0) {
        this.activeSort[1] = 1;
        this.tableData.sort((a, b) => {
          return a.total - b.total;
        });
      } else if (this.activeSort[1] === 1) {
        this.activeSort[1] = -1;
        this.tableData.sort((a, b) => {
          return b.total - a.total;
        });
      } else {
        this.activeSort = [null, 0];
        this.currentSorted();
      }
    },
    sortByDistance() {
      if (this.activeSort[0] !== "distance") this.activeSort = ["distance", 0];
      if (this.activeSort[1] === 0) {
        this.activeSort[1] = 1;
        this.tableData.sort((a, b) => {
          return a.distance - b.distance;
        });
      } else if (this.activeSort[1] === 1) {
        this.activeSort[1] = -1;
        this.tableData.sort((a, b) => {
          return b.distance - a.distance;
        });
      } else {
        this.activeSort = [null, 0];
        this.currentSorted();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-table {
  margin: 0 auto;
}
.v-table__header {
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px #2c3e50;
  font-size: calc(5px + 22 * (100vw / 1280));

  p {
    padding-left: -20px;
    display: flex;
    align-items: center;
    flex-basis: 25%;
    text-align: left;
    cursor: pointer;
    &:hover {
      color: #42b983;
    }
    &:first-child {
      margin-left: 20px;
      flex-basis: 25%;
    }
  }
}
.page {
  padding: 8px;
  border: solid 1px #2c3e50;
  margin: 30px 5px;
  &:hover {
    background: #42b983;
    cursor: pointer;
    color: azure;
  }
}
.v-table__pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.selected {
  background: #42b983;
  cursor: pointer;
  color: azure;
}
.sort-selected {
  color: #42b983;
}
</style>
