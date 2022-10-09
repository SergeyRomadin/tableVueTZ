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
import dayjs from "dayjs";
import { mapMutations, mapGetters } from "vuex";
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
    ...mapGetters(["tableData"]),
    inputType() {
      return this.collumn === "date" ? "date" : "search";
    },
    onSearch() {
      let filteTableData = this.tableData.filter((el) => {
        switch (this.collumn) {
          case "date":
            let formatDate = dayjs(el.date).format("YYYY.MM.DD");
            switch (this.type) {
              case "=":
                return formatDate == this.searchInputValue;
              case "includes":
                return formatDate.includes(this.searchInputValue);
              case ">":
                return formatDate > this.searchInputValue;
              case "<":
                return formatDate < this.searchInputValue;
            }
            break;
          case "name":
            switch (this.type) {
              case "=":
                return el.name == this.searchInputValue;
              case "includes":
                return el.name.includes(this.searchInputValue);
              case ">":
                return el.name > this.searchInputValue;
              case "<":
                return el.name < this.searchInputValue;
            }
            break;
          case "total":
            switch (this.type) {
              case "=":
                return el.total == this.searchInputValue;
              case "includes":
                let total = el.total + "";
                return total.includes(this.searchInputValue);
              case ">":
                return el.total > this.searchInputValue;
              case "<":
                return el.total < this.searchInputValue;
            }
            break;
          case "distance":
            switch (this.type) {
              case "=":
                return el.distance == this.searchInputValue;
              case "includes":
                let distance = el.distance + "";
                return distance.includes(this.searchInputValue);
              case ">":
                return el.distance > this.searchInputValue;
              case "<":
                return el.distance < this.searchInputValue;
            }
            break;
        }
      });
      return this.setFilterTableData(filteTableData);
    },
  },
  watch: {
    searchInputValue(val) {
      if (val == "") this.setFilterTableDataDefault();
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
