import { OpenIndustrialEaC } from '../types/OpenIndustrialEaC.ts';
import { EaCAzureIoTHubDataConnectionDetails } from '@o-industrial/common/eac';

export const SimulatedOIEaC: OpenIndustrialEaC = {
  DataConnections: {
    iotHubIngest: {
      Enabled: true,
      SimulatorLookup: 'sim_iot',
      Details: <EaCAzureIoTHubDataConnectionDetails> {
        Type: 'AzureIoTHub',
        Name: 'IoT Hub Ingest',
        Description: 'Primary Azure IoT Hub connection',
        MultiProtocolIngest: ['MQTT'],
      },
    },
    // iotHubBackup: {
    //   Enabled: true,
    //   SimulatorLookup: 'sim_iot_backup',
    //   Details: <EaCAzureIoTHubDataConnectionDetails>{
    //     Type: 'AzureIoTHub',
    //     Name: 'Backup IoT Hub',
    //     Description: 'Secondary IoT Hub for failover',
    //     MultiProtocolIngest: ['MQTT'],
    //   },
    // },
    // webhookEvents: {
    //   Enabled: true,
    //   SimulatorLookup: 'sim_http',
    //   Details: <EaCHTTPDataConnectionDetails>{
    //     Type: 'HTTP',
    //     Name: 'Event Webhook',
    //     Description: 'POST endpoint for external event payloads',
    //     MultiProtocolIngest: ['HTTP'],
    //   },
    // },
  },
  // Simulators: {
  //   sim_iot: {
  //     Enabled: true,
  //     Details: <EaCAzureDockerSimulatorDetails>{
  //       Type: 'AzureDocker',
  //       Name: 'IoT Simulator A',
  //       Description: 'Simulates primary device traffic using Dockerized IoT simulator',
  //       DeviceCount: 5,
  //       DevicePrefix: 'iot-a-',
  //       DeviceIndexOffset: 1,
  //       MessageIntervalMS: 3000,
  //       MessageCountPerDevice: 100,
  //       Variables: {
  //         location: 'lab1',
  //       },
  //       MessageTemplate: {
  //         temperature: '${random:20,25}',
  //         humidity: '${random:40,60}',
  //         deviceId: '${deviceId}',
  //         timestamp: '${timestamp}',
  //       },
  //     },
  //   },
  //   sim_iot_backup: {
  //     Enabled: true,
  //     Details: <EaCAzureDockerSimulatorDetails>{
  //       Type: 'AzureDocker',
  //       Name: 'IoT Simulator B',
  //       Description: 'Backup stream simulator using same image',
  //       DeviceCount: 3,
  //       DevicePrefix: 'iot-b-',
  //       DeviceIndexOffset: 100,
  //       MessageIntervalMS: 5000,
  //       MessageCountPerDevice: 50,
  //       Variables: {
  //         location: 'lab2',
  //       },
  //       MessageTemplate: {
  //         temperature: '${random:19,24}',
  //         humidity: '${random:38,58}',
  //         deviceId: '${deviceId}',
  //         timestamp: '${timestamp}',
  //       },
  //     },
  //   },
  //   sim_http: {
  //     Enabled: true,
  //     Details: <EaCAzureDockerSimulatorDetails>{
  //       Type: 'AzureDocker',
  //       Name: 'Webhook Simulator',
  //       Description: 'POSTs synthetic payloads to HTTP endpoints',
  //       DeviceCount: 1,
  //       DevicePrefix: 'webhook-',
  //       MessageIntervalMS: 10000,
  //       MessageCountPerDevice: 10,
  //       MessageTemplate: {
  //         alert: true,
  //         source: 'test-runner',
  //         timestamp: '${timestamp}',
  //       },
  //     },
  //   },
  // },

  // Surfaces: {
  //   dashboardOps: {
  //     Enabled: true,
  //     Details: {
  //       Name: 'Operations Dashboard',
  //       Description: 'Shows incoming data and alerts',
  //     },
  //     DataConnections: {
  //       iotHubIngest: {
  //         Enabled: true,
  //         TumblingWindow: 30,
  //       },
  //       iotHubBackup: {
  //         Enabled: true,
  //         TumblingWindow: 60,
  //       },
  //       webhookEvents: {
  //         Enabled: true,
  //         DelayTolerance: 5,
  //       },
  //     },
  //   },
  // },
};
