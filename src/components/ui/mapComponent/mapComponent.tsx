import React from "react";
import { Map, YMaps, withYMaps } from "react-yandex-maps";

export function MapComponent() {
  const PositionedMap = React.memo(({ ymaps }: any) => {
    const [loadedCoords, setLoading] = React.useState(false);
    const [coords, setCoords] = React.useState([55.751574, 37.573856]);

    const onLoad = () => {
      ymaps.geolocation.geocode
        .get({
          mapStateAutoApply: true,
          provider: "browser",
        })
        .then((res) => {
          setCoords(res.geoObjects.position);
          setLoading(true);
        });
    };

    React.useEffect(() => {
      onLoad();
    }, []);

    return (
      loadedCoords && (
        <Map
          state={{
            center: coords,
            zoom: 10,
          }}
        />
      )
    );
  });

  const ConnectedMap = React.useMemo(() => {
    return withYMaps(PositionedMap, true, [["geolocation", "geocode"]]);
  }, [PositionedMap]);

  return (
    <div className={"App"}>
      <YMaps query={{ apikey: "d5883247-a328-4578-9718-374d0e4c0f42" }}>
        <ConnectedMap />
      </YMaps>
    </div>
  );
}
