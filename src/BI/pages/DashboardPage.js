import React from 'react';
import { Col } from 'antd';
import ChartRenderer from '../components/ChartRenderer';
import Dashboard from '../components/Dashboard';
import DashboardItem from '../components/DashboardItem';
const DashboardItems = [
  {
    id: 0,
    name: 'Recapitulatif des revenues du mois courant',
    vizState: {
      query: {
        measures: ['Devis.totalSum'],
        timeDimensions: [
          {
            dimension: 'Devis.date',
            granularity: 'day',
          },
        ],
        order: {
          'Devis.date': 'asc',
        },
      },
      chartType: 'line',
    },
  },
  {
    id: 1,
    name: 'Recapitulatif des ventes',
    vizState: {
      query: {
        measures: ['Devis.count'],
        timeDimensions: [
          {
            dimension: 'Devis.date',
            granularity: 'day',
          },
        ],
        order: {
          'Devis.date': 'asc',
        },
      },
      chartType: 'line',
    },
  },
  {
    id: 2,
    name: 'Analyse des ventes par produit',
    vizState: {
      query: {
        measures: ['ElementsDevis.quantity'],
        dimensions: ['ElementsDevis.produit'],
        timeDimensions: [],
        order: {
          'ElementsDevis.quantity': 'desc',
        },
        limit: 50,
      },
      chartType: 'pie',
    },
  },
  {
    id: 3,
    name: 'Classement des clients les plus actifs',
    vizState: {
      query: {
        order: [['Devis.totalSum', 'desc']],
        limit: 50,
        dimensions: ['Devis.client'],
        measures: ['Devis.totalSum'],
      },
      chartType: 'table',
    },
  },
  {
    id: 4,
    name: 'Evolution du panier moyen',
    vizState: {
      query: {
        measures: ['Devis.totalMoyen'],
        timeDimensions: [
          {
            dimension: 'Devis.date',
            granularity: 'week',
          },
        ],
        order: {
          'Devis.date': 'asc',
        },
      },
      chartType: 'area',
    },
  },

  {
    id: 5,
    name: 'Conversion des visiteurs en clients type B2B',
    vizState: {
      query: {
        limit: 50,
        measures: ['Users.count'],
        timeDimensions: [
          {
            dimension: 'Users.createdAt',
            granularity: 'day',
          },
        ],
        order: {
          'Users.createdAt': 'asc',
        },
        filters: [
          {
            member: 'Users.role',
            operator: 'contains',
            values: ['B2B'],
          },
        ],
      },
      chartType: 'line',
    },
  },
  {
    id: 6,
    name: 'Conversion des visiteurs en clients type B2C',
    vizState: {
      query: {
        limit: 50,
        measures: ['Users.count'],
        timeDimensions: [
          {
            dimension: 'Users.createdAt',
            granularity: 'day',
          },
        ],
        order: {
          'Users.createdAt': 'asc',
        },
        filters: [
          {
            member: 'Users.role',
            operator: 'contains',
            values: ['B2C'],
          },
        ],
      },
      chartType: 'line',
    },
  },
];

const DashboardPage = () => {
  const dashboardItem = (item) => (
    <Col
      span={24}
      lg={12}
      key={item.id}
      style={{
        marginBottom: '24px',
      }}
    >
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: 'center',
        padding: 12,
      }}
    >
      <h2>
        There are no charts on this dashboard. Use Playground Build to add one.
      </h2>
    </div>
  );

  return DashboardItems.length ? (
    <Dashboard dashboardItems={DashboardItems}>
      {DashboardItems.map(dashboardItem)}
    </Dashboard>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
