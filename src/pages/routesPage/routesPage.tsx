import { YMaps, Map, Clusterer, Placemark} from '@pbe/react-yandex-maps';

const RoutesPage = () => {
    const clusterPoints = [[53.90, 27.56]]
    return  (
    <YMaps>
        <div>
        <Map  width={800} height={800} defaultState={{ center: [  53.90, 27.56,], zoom: 12 }} />
        <Clusterer
            options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
            }}
            >
            {clusterPoints.map((coordinates, index) => (
                <Placemark  key={index} geometry={coordinates} />
            ))}
         </Clusterer> 
        </div>
  </YMaps>
  )
}
export {RoutesPage}