import React, { Fragment, useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Nav from '../components/nav/nav';
import { AppContext } from '../components/AppContext';
import {isLoggedIn, request} from '../components/utils/helpers';

const Devices = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const appDevices = appContext.devices;
  const [devicesData, setDevicesData] = useState([]);
  const [opData, setOpData] = useState([]);
  const handleLogout = () => router.push('/mqc_logout');

  const getDeviceData = async () => {
    const devicesCall = await request('https://slam2.dev.machineq.net/v1/devices');
    const devices = devicesCall?.response?.Devices || [];

    setDevicesData(devices);
    appContext.setDevices(devices);
  };

  const getOpData = async () => {
    const outputProfilesCall = await request('https://slam2.dev.machineq.net/v1/outputprofiles');
    const outputProfiles = outputProfilesCall?.response?.OutputProfiles || [];

    setOpData(outputProfiles);
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      handleLogout();
    } else {
      if (appDevices.length > 0) setDevicesData(appDevices);

      getDeviceData();
      getOpData();
    }
  }, []);

  return (
    <div className="page page--devices">
      <Head>
        <title>Devices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav type="mqc" />

      <div className="page__content">
        <div className="page__heading">
          <h1>Devices</h1>
        </div>

        <div className="grid">

          <div className="page__copy">
            <h2>Device List</h2>

            <div className="comp-data-list">
              <ul className="comp-data-list__ul">
                {devicesData.length > 0
                  ? <Fragment>
                      {devicesData.map(device => {
                        const statistics = device?.Statistics || null;

                        return (
                          <li key={device.DevEUI} className="comp-data-list__item">
                            <span>{device.Name}</span>
                            <span>{device.DevEUI}</span>

                            {statistics &&
                              <Fragment>
                                <span>{statistics.HealthState}</span>
                                <span>{statistics.BatteryLevel}</span>
                              </Fragment>
                            }
                          </li>
                        )
                      })}
                    </Fragment>
                  : <p>No data available.</p>
                }
              </ul>
            </div>

          </div>

          <div className="page__copy">
            <h2>Output Profile List</h2>

            <div className="comp-data-list">
              <ul className="comp-data-list__ul">
                {opData.length > 0
                  ? <Fragment>
                      {opData.map(op => {
                        return (
                          <li key={op.Id} className="comp-data-list__item">
                            <span>{op.Name}</span>
                            <span>{op.Id}</span>
                          </li>
                        )
                      })}
                    </Fragment>
                  : <p>No data available.</p>
                }
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Devices;
