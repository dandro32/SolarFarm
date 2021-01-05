import * as RNEP from '@estimote/react-native-proximity';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {ESTIMOTE_APP_ID, ESTIMOTE_APP_TOKEN} from "@env"

const ZONE_OPTIONS = [
  {
    tag: 'kitchen',
    range: 5,
  },
  {
    tag: 'bathroom',
    range: 5,
  },
  {
    tag: 'lobby',
    range: 5,
  },
  {
    tag: 'desk',
    range: 5,
  },
];

const setZones = (cb) => {
  const ZONES = [];
  ZONE_OPTIONS.forEach(({range, tag}) => {
    console.log(range, tag)
    const zone = new RNEP.ProximityZone(range, tag);
    zone.onEnterAction = (context) => {
      console.log('zone1 onEnter', context);
    };
    zone.onExitAction = (context) => {
      console.log('zone1 onExit', context);
    };
    zone.onChangeAction = (contexts) => {
      console.log('zone1 onChange', contexts);
    };

    ZONES.push(zone);
    
  });

  console.log(ZONES)

  RNEP.locationPermission.request().then(
    (permission) => {
      console.log(2, `location permission: ${permission}`);

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
      console.log(1, 'allow and turn on bluetooth', cb);
      setZones(cb);
    }
  }, true);
};

const stopProximityObserver = () => {
  RNEP.proximityObserver.stopObservingZones();
};

export {startProximityObserver, stopProximityObserver};
