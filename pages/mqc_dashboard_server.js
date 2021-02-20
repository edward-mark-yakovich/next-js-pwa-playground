import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Nav from '../components/nav/nav';
import {isLoggedIn, request, isEmptyObj} from '../components/utils/helpers';

const DashboardServer = ({ devicesHealth, deviceTimeseries, gateways }) => {
  const router = useRouter();
  const handleLogout = () => router.push('/mqc_logout');

  useEffect(() => {
    if (!isLoggedIn()) handleLogout();
  }, []);

  return (
    <div className="page page--dashboard-server">
      <Head>
        <title>Dashboard Server</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav type="mqc" />

      <div className="page__content">
        <div className="page__heading">
          <h1>Dashboard Server</h1>
        </div>

        <div className="page__copy">

          <div className="page__section">
            <h2>Device Health</h2>

            {!isEmptyObj(devicesHealth)
              ? <ul>
                  <li>Good = {devicesHealth.Good}</li>
                  <li>Fair = {devicesHealth.Fair}</li>
                  <li>Poor = {devicesHealth.Poor}</li>
                  <li>Offline = {devicesHealth.Offline}</li>
                </ul>
              : <p>No data available.</p>
            }
          </div>

          <div className="page__section">
            <h2>Device Timeseries</h2>

            {deviceTimeseries.length > 0
              ? <div className="comp-data-list">
                  <ul className="comp-data-list__ul">
                    {deviceTimeseries.map(device => {
                      return (
                        <li key={device.Time} className="comp-data-list__item">
                          <span>{device.Time}</span>
                          <span>{device.Good}</span>
                          <span>{device.Fair}</span>
                          <span>{device.Poor}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              : <p>No data available.</p>
            }
          </div>

          <div className="page__section">
            <h2>Gateways</h2>

            {gateways.length > 0
              ? <ul>
                  <li>Total gateways = {gateways.length}</li>
                </ul>
              : <p>No data available.</p>
            }
          </div>

        </div>

      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie || null;
  let authKey = null;
  let props = {
    devicesHealth: {},
    deviceTimeseries: [],
    gateways: []
  };

  if (cookie) authKey = cookie.split('; ').find(row => row.startsWith('_mq_myAppName_authToken')).split('=')[1] || null;

  if (authKey) {
    let [
      dataDeviceHealthCall,
      dataDeviceTimeseriesCall,
      dataGatewaysCall
    ] = await Promise.all([
      request('https://slam2.dev.machineq.net/v1/devices/healthcount', authKey),
      request('https://slam2.dev.machineq.net/v1/timeseries/devices/health/span/24/Hour/chunksize/4/Hour/timezone/America/New_York', authKey),
      request('https://slam2.dev.machineq.net/v1/gateways', authKey)
    ]);

    props = {
      devicesHealth: dataDeviceHealthCall || {},
      deviceTimeseries: dataDeviceTimeseriesCall?.Data || [],
      gateways: dataGatewaysCall?.Gateways || []
    };
  }

  return { props }
}

export default DashboardServer;
