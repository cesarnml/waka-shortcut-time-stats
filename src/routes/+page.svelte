<script lang="ts">
  import { onMount } from 'svelte'
  import * as echarts from 'echarts'

  export let data

  onMount(() => {
    // Initialize the echarts instance based on the prepared dom
    const chartElement = document.getElementById('example-chart')
    if (chartElement) {
      const myChart = echarts.init(chartElement)

      // Specify the configuration items and data for the chart
      const option = {
        title: {
          text: 'ECharts',
        },
        tooltip: {},
        legend: {
          data: ['sales'],
        },
        xAxis: {
          data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks'],
        },
        yAxis: {},
        series: [
          {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      }

      // Display the chart using the configuration items and data just specified.
      myChart.setOption(option)
    }
  })
</script>

<svelte:head>
  <title>WakaStats</title>
</svelte:head>

<div>
  <div id="example-chart" style="width: 600px;height:400px;border: 1px solid red" />
  <h2 class="text-4xl">Grand Total</h2>
  <pre>{JSON.stringify(data.allTimeSinceToday, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Iterations</h2>
  <pre>{JSON.stringify(data.iterations, null, 2)}</pre>
  <hr />
  <h2 class="text-4xl">Summaries</h2>
  <pre>{JSON.stringify(data.summaries, null, 2)}</pre>
</div>
