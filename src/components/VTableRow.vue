<template>
  <div class="v-table-row">
    <div class="row row__date">{{ this.date }}</div>
    <div class="row row__name">{{ rowData.name }}</div>
    <div class="row row__total">{{ rowData.total }} шт.</div>
    <div class="row row__distance">{{ rowData.distance }} м.</div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "VTableRow",
  data() {
    return {
      date: dayjs(this.rowData.date).format("DD.MM.YYYY hh:mm"),
    };
  },
  props: {
    rowData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.v-table-row {
  display: flex;
  justify-content: space-around;
}
.row {
  flex-basis: 25%;
  padding: 8px 16px;
  text-align: left;
}
</style>
