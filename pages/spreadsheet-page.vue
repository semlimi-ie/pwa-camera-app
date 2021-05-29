<template>
  <div id="app">
    <button @click="getSpreadSheetData">Parse my sheets</button>
    <button @click="logOutResults">Log out results</button>
    <table>
      <thead>
        <tr>
          <th>Col A</th>
          <th>Col C</th>
          <th>Col E</th>
          <th>Col F</th>
          <th>Col H</th>
          <th>Col I</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sheetData, index) in sheetWebResults" :key="index">
          <td>{{ sheetData['FRD No., if any'] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Papa from 'papaparse'
export default {
  data() {
    return {
      sheetWebResults: [],
      sheetCsvResults: [],
    }
  },
  created() {
    this.getSpreadSheetData()
  },
  methods: {
    async getSpreadSheetData() {
      //   const sheetWebUrl =
      //     'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3Z9DWgoXMYGdYZeW83wcXu9q01WgMzyctAxY_2DkdfBejUQ7ba2Kd46atQGZnR2t-pREYJeB8wamY/pubhtml?gid=475614164&single=true'

      const sheetCSVUrl =
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ3Z9DWgoXMYGdYZeW83wcXu9q01WgMzyctAxY_2DkdfBejUQ7ba2Kd46atQGZnR2t-pREYJeB8wamY/pub?gid=475614164&single=true&output=csv'

      await Papa.parse(sheetCSVUrl, {
        download: true,
        header: true,
        complete: async (results) => {
          this.sheetWebResults = await JSON.parse(JSON.stringify(results.data))
          //   this.sheetWebResults = await results.data
          console.log('this.sheetWebResults before', this.sheetWebResults)
        },
      })
      //   await console.log('this.sheetWebResults after', this.sheetWebResults)
      console.log('this.sheetWebResults after', this.sheetWebResults)
    },
    logOutResults() {
      console.log('this.sheetWebResults', this.sheetWebResults)
    },
  },
}
</script>

<style scoped></style>
