import * as RNEP from '@estimote/react-native-proximity';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {ESTIMOTE_APP_ID, ESTIMOTE_APP_TOKEN} from '@env';

const ZONE_OPTIONS = [
  {
    tag: 'panel1',
    range: 5,
  },
  {
    tag: 'panel2',
    range: 5,
  },
  {
    tag: 'panel3',
    range: 5,
  },
  {
    tag: 'panel4',
    range: 5,
  },
];

export const setZones = (cb) => {
  RNEP.locationPermission.request().then(
    (permission) => {
      if (permission !== RNEP.locationPermission.DENIED) {
        const credentials = new RNEP.CloudCredentials(
          ESTIMOTE_APP_ID,
          ESTIMOTE_APP_TOKEN,
        );

        const config = {
          notification: {
            title: 'Enable tracking panels',
            text: "We'll notify you when you're next to something interesting.",
            channel: {
              id: 'exploration-mode',
              name: 'Exploration Mode',
            },
          },
        };

        const ZONES = [];
        ZONE_OPTIONS.forEach(({range, tag}) => {
          const zone = new RNEP.ProximityZone(range, tag);
          zone.onEnterAction = (context) => {
            cb((prevState) => {
              const alreadyDetectedids = prevState.map((item) => item.id);
              if (alreadyDetectedids.includes(context.deviceIdentifier)) {
                return prevState;
              }

              return [
                ...prevState,
                {id: context.deviceIdentifier, name: context.tag},
              ];
            });
          };
          zone.onExitAction = (context) => {
            cb((prevState) => {
              return prevState.filter(
                (item) => item.id !== context.deviceIdentifier,
              );
            });
          };

          ZONES.push(zone);
        });

        RNEP.proximityObserver.initialize(credentials, config);
        RNEP.proximityObserver.startObservingZones(ZONES);
      }
    },
    (error) => {
      console.error('Error when trying to obtain location permission', error);
    },
  );
};

const startProximityObserver = async (cb) => {
  const bluetoothState = await BluetoothStateManager.getState();

  if (bluetoothState === 'PoweredOff') {
    await BluetoothStateManager.enable();
  }

  BluetoothStateManager.onStateChange(async (bluetoothState) => {
    if (bluetoothState === 'PoweredOn') {
      setZones(cb);
    }
  }, true);
};

const stopProximityObserver = () => {
  RNEP.proximityObserver.stopObservingZones();
};

export {startProximityObserver, stopProximityObserver};
