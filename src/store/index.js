import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    tableData: [],
    filterTableData: [],
  },
  getters: {
    tableData(state) {
      return state.tableData;
    },
    filterTableData(state) {
      return state.filterTableData;
    },
  },
  mutations: {
    setTableData: (state, data) => {
      state.tableData = data;
    },
    setFilterTableData: (state, data) => {
      state.filterTableData = data;
    },
    setFilterTableDataDefault: (state) => {
      state.filterTableData = state.tableData;
    },
  },
  actions: {
    GET_TABLE_DATA_FROM_API({ commit }) {
      return axios("http://localhost:3000/comments", {
        method: "GET",
      }).then((response) => {
        commit("setTableData", response.data);
        commit("setFilterTableData", response.data);
      });
    },
  },
  modules: {},
});
