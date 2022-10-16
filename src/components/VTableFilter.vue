<template>
  <div class="v-table__filter">
    <select class="input" @change="this.onSearch" v-model="collumn">
      <option value="date">Дата</option>
      <option value="name">Название</option>
      <option value="total">Количество</option>
      <option value="distance">Расстояние</option>
    </select>
    <select class="input" @change="this.onSearch" v-model="type">
      <option value="=">=</option>
      <option value="includes">Содержит</option>
      <option value=">">></option>
      <option value="<">&lt;</option>
    </select>
    <input
      class="input"
      v-model="searchInputValue"
      @input="onSearch"
      :type="inputType"
      name="searchInput"
      placeholder="Введите текст..."
      id=""
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: { propTableData: Array },
  data() {
    return {
      searchInputValue: "",
      collumn: "name",
      type: "includes",
    };
  },
  methods: {
    ...mapMutations(["setFilterTableData", "setFilterTableDataDefault"]),
  },
  computed: {
    ...mapState(["tableData"]),
    inputType() {
      return this.collumn === "date" ? "date" : "search";
    },
    onSearch() {
      let filteTableData = this.tableData.filter((el) => {
        switch (this.type) {
          case "=":
            if (this.collumn == "date") {
              return el[this.collumn].includes(
                this.searchInputValue.toLowerCase()
              );
            } else return el[this.collumn] == this.searchInputValue;
          case "includes":
            let element = el[this.collumn].toLowerCase();
            return element.includes(this.searchInputValue.toLowerCase());
          case ">":
            return el[this.collumn] > this.searchInputValue;
          case "<":
            return el[this.collumn] < this.searchInputValue;
        }
      });
      return this.setFilterTableData(filteTableData);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-table__filter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 479px) {
    flex-direction: column;
  }
}
.input {
  width: 20vw;
  @media (max-width: 479px) {
    width: 100%;
  }
}
</style>
