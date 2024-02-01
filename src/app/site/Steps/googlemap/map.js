import "./style.css";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Circle
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "500px",
  height: "500px"
};
const center = {
  lat: -26.8533,
  lng: 133.2751
};
const options = {
  disableDefaultUI: true,
  zoomControl: true
};

export default function App(props) {
  console.log(props)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAsOiVFoj7et2Q8qKfbyPy-_nwVOCGpITg",
    libraries
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // useEffect(() => {
  //   console.log(distance(23.0225, 72.5714, 21.1702, 72.8311, "K"));
  // }, [lnti, leti]);

  const panTo = React.useCallback(({ lat, lng }) => {
    console.log(lat, 'inpu lati')
    props.setLnti(lat, lng);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) {
    return "Error loading maps";
  }
  if (!isLoaded) {
    return "Loading Maps";
  }

  const place = {
    id: 1,
    name: "Park Slope",
    latitude: "40.6710729",
    longitude: "-73.9988001",
    circle: {
      radius: 3000,
      options: {
        strokeColor: "#ff0000"
      }
    }
  };

  const initialMapCenter = {
    lat: -0.7893,
    lng: 113.9213
  };
  const mapCenter = { lat: props?.leti, lng: props?.lnti };
  const circleOptions = {
    fillColor: "coral",
    fillOpacity: 0.3,
    strokeWeight: 2,
    strokeColor: "coral",
    clickable: false,
    zIndex: 1,
    draggable: false
  };

  function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
  }
  return (
    <div>
      <Search panTo={panTo} setAddress={props?.setAddress} setName={props?.setName}/>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
        options={options}
        onLoad={onMapLoad}
        isMarkerShown={true}
      >
        <Marker position={{ lat: props?.leti, lng: props?.lnti }} />
        <Circle
          center={mapCenter}
          radius={props.distance}
          options={circleOptions}
          onCenterChanged={() => console.log("onCenterChanged")}
          onRadiusChanged={() => console.log("onRadiusChanged")}
        />
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => null
        );
      }}
    >
      <h2>locate</h2>
    </button>
  );
}

function Search({ panTo, setAddress , setName }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 33.6348792, lng: () => -117.7426695 },
      radius: 200 * 1000
    }
  });
  const [val, setVal] = useState()
  const [datade, setDatade] = useState([])
  useEffect(() => {
    if (data?.length > 0) {
      setDatade(data)
    }
  }, [data])
console.log(datade)
  useEffect(() => {
    datade.map((data) => {
      if (data.structured_formatting.main_text == value) {
        setAddress(data.structured_formatting.main_text + '' + data.structured_formatting.secondary_text)
        setName(data.structured_formatting.main_text)
      }
    })
  }, [val])

  return (
    <div className="search">
      <label className="mb-4"><span className="text-red-500">*</span>Site Name</label>
      <Combobox
        onSelect={async (address) => {
          setVal(address)
          console.log(address)
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error!");
          }
        }}
        className="mt-2"
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            console.log(e)
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map((data) => (
                <>
                  <ComboboxOption key={data.place_id} value={data.structured_formatting.main_text} />
                </>
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
