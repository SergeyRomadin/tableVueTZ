<template>
  <div class="v-table__filter">
    <select v-model="collumn">
      <option value="date">Дата</option>
      <option value="name">Имя</option>
      <option value="total">Количество</option>
      <option value="distance">Расстояние</option>
    </select>
    <select v-model="type">
      <option value="=">=</option>
      <option value="includes">Содержит</option>
      <option value=">">></option>
      <option value="<">&lt;</option>
    </select>
    <input
      v-model="searchInputValue"
      @input="this.onSearch"
      type="search"
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
    onSearch() {
      let filteTableData = this.tableData.filter((el) => {
        switch (this.collumn) {
          case "date":
            let formatDate = dayjs(el.date).format("DD.MM.YYYY hh:mm");
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

<style lang="scss" scoped></style>
