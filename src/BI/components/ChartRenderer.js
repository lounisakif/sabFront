import React from 'react';
import PropTypes from 'prop-types';
import { useCubeQuery } from '@cubejs-client/react';
import { Spin, Row, Col, Statistic, Table } from 'antd';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { useDeepCompareMemo } from 'use-deep-compare';
const COLORS_SERIES = [
  '#2209eb',
  '#f7f023',
  '#5e7092',
  '#6493ed',
  '#4a04cc',
  '#02b1f7',
  '#9607fa',
  '#fa790f',
  '#2dbdbb',
  '#f7237b',
];
const PALE_COLORS_SERIES = [
  '#fff30a',
  '#f7f023',
  '#5e7092',
  '#6493ed',
  '#4a04cc',
  '#02b1f7',
  '#9607fa',
  '#fa790f',
  '#2dbdbb',
  '#f7237b',
];
const commonOptions = {
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        padding: 12,
        minRotation: 0,
      },
    },
  },
};

const useDrilldownCallback = ({
  datasets,
  labels,
  onDrilldownRequested,
  pivotConfig,
}) => {
  return React.useCallback(
    (elements) => {
      if (elements.length <= 0) return;
      const { datasetIndex, index } = elements[0];
      const { yValues } = datasets[datasetIndex];
      const xValues = [labels[index]];

      if (typeof onDrilldownRequested === 'function') {
        onDrilldownRequested(
          {
            xValues,
            yValues,
          },
          pivotConfig
        );
      }
    },
    [datasets, labels, onDrilldownRequested]
  );
};

const LineChartRenderer = ({ resultSet, onDrilldownRequested }) => {
  const datasets = useDeepCompareMemo(
    () =>
      resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        yValues: [s.key],
        borderColor: COLORS_SERIES[index],
        pointRadius: 1,
        tension: 0.1,
        pointHoverRadius: 1,
        borderWidth: 2,
        tickWidth: 1,
        fill: false,
      })),
    [resultSet]
  );
  const data = {
    labels: resultSet.categories().map((c) => c.x),
    datasets,
  };
  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    onDrilldownRequested,
  });
  return (
    <Line
      type="line"
      data={data}
      options={commonOptions}
      getElementAtEvent={getElementAtEvent}
    />
  );
};

const BarChartRenderer = ({ resultSet, pivotConfig, onDrilldownRequested }) => {
  const datasets = useDeepCompareMemo(
    () =>
      resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        yValues: [s.key],
        backgroundColor: COLORS_SERIES[index],
        fill: false,
      })),
    [resultSet]
  );
  const data = {
    labels: resultSet.categories().map((c) => c.x),
    datasets,
  };
  const stacked = !(pivotConfig.x || []).includes('measures');
  const options = {
    ...commonOptions,
    scales: {
      x: { ...commonOptions.scales.x, stacked },
      y: { ...commonOptions.scales.y, stacked },
    },
  };
  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    onDrilldownRequested,
    pivotConfig,
  });
  return (
    <Bar
      type="bar"
      data={data}
      options={options}
      getElementAtEvent={getElementAtEvent}
    />
  );
};

const AreaChartRenderer = ({ resultSet, onDrilldownRequested }) => {
  const datasets = useDeepCompareMemo(
    () =>
      resultSet.series().map((s, index) => ({
        label: s.title,
        data: s.series.map((r) => r.value),
        yValues: [s.key],
        pointRadius: 1,
        pointHoverRadius: 1,
        backgroundColor: PALE_COLORS_SERIES[index],
        borderWidth: 0,
        fill: true,
        tension: 0,
      })),
    [resultSet]
  );
  const data = {
    labels: resultSet.categories().map((c) => c.x),
    datasets,
  };
  const options = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        stacked: true,
      },
    },
  };
  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    onDrilldownRequested,
  });
  return (
    <Line
      type="area"
      data={data}
      options={options}
      getElementAtEvent={getElementAtEvent}
    />
  );
};

const PieChartRenderer = ({ resultSet, onDrilldownRequested }) => {
  const data = {
    labels: resultSet.categories().map((c) => c.x),
    datasets: resultSet.series().map((s) => ({
      label: s.title,
      data: s.series.map((r) => r.value),
      yValues: [s.key],
      backgroundColor: COLORS_SERIES,
      hoverBackgroundColor: COLORS_SERIES,
    })),
  };
  const getElementAtEvent = useDrilldownCallback({
    datasets: data.datasets,
    labels: data.labels,
    onDrilldownRequested,
  });
  return (
    <Pie
      type="pie"
      data={data}
      options={commonOptions}
      getElementAtEvent={getElementAtEvent}
    />
  );
};

const formatTableData = (columns, data) => {
  function flatten(columns = []) {
    return columns.reduce((memo, column) => {
      if (column.children) {
        return [...memo, ...flatten(column.children)];
      }

      return [...memo, column];
    }, []);
  }

  const typeByIndex = flatten(columns).reduce((memo, column) => {
    return { ...memo, [column.dataIndex]: column };
  }, {});

  function formatValue(value, { type, format } = {}) {
    if (value == undefined) {
      return value;
    }

    if (type === 'boolean') {
      if (typeof value === 'boolean') {
        return value.toString();
      } else if (typeof value === 'number') {
        return Boolean(value).toString();
      }

      return value;
    }

    if (type === 'number' && format === 'percent') {
      return [parseFloat(value).toFixed(2), '%'].join('');
    }

    return value.toString();
  }

  function format(row) {
    return Object.fromEntries(
      Object.entries(row).map(([dataIndex, value]) => {
        return [dataIndex, formatValue(value, typeByIndex[dataIndex])];
      })
    );
  }

  return data.map(format);
};

const TableRenderer = ({ resultSet, pivotConfig }) => {
  const [tableColumns, dataSource] = useDeepCompareMemo(() => {
    const columns = resultSet.tableColumns(pivotConfig);
    return [
      columns,
      formatTableData(columns, resultSet.tablePivot(pivotConfig)),
    ];
  }, [resultSet, pivotConfig]);
  return (
    <Table pagination={false} columns={tableColumns} dataSource={dataSource} />
  );
};

const TypeToChartComponent = {
  line: ({ resultSet, onDrilldownRequested }) => {
    return (
      <LineChartRenderer
        resultSet={resultSet}
        onDrilldownRequested={onDrilldownRequested}
      />
    );
  },
  bar: ({ resultSet, pivotConfig, onDrilldownRequested }) => {
    return (
      <BarChartRenderer
        resultSet={resultSet}
        pivotConfig={pivotConfig}
        onDrilldownRequested={onDrilldownRequested}
      />
    );
  },
  area: ({ resultSet, onDrilldownRequested }) => {
    return (
      <AreaChartRenderer
        resultSet={resultSet}
        onDrilldownRequested={onDrilldownRequested}
      />
    );
  },
  pie: ({ resultSet, onDrilldownRequested }) => {
    return (
      <PieChartRenderer
        resultSet={resultSet}
        onDrilldownRequested={onDrilldownRequested}
      />
    );
  },
  number: ({ resultSet }) => {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{
          height: '100%',
        }}
      >
        <Col>
          {resultSet.seriesNames().map((s) => (
            <Statistic value={resultSet.totalRow()[s.key]} />
          ))}
        </Col>
      </Row>
    );
  },
  table: ({ resultSet, pivotConfig }) => {
    return <TableRenderer resultSet={resultSet} pivotConfig={pivotConfig} />;
  },
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart =
  (Component) =>
  ({ resultSet, error }) =>
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) || <Spin />;

const ChartRenderer = ({ vizState }) => {
  const { query, chartType } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);
  return component && renderChart(component)(renderProps);
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object,
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null,
};
export default ChartRenderer;
