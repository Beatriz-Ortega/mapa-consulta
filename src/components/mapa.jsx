import { useState, useEffect, useRef } from 'react'
import '../../styles/styles.css'
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import PropTypes from 'prop-types';

function Mapa({datosMapa, opcionMapa}) {

  //Estados
  const mapRef = useRef(null);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  //validacion de entradas
  console.log(datosMapa)
  console.log(opcionMapa)

  //cargar mapa según ubicación
  useEffect(() => {
    const arbolSeleccionado = datosMapa.find((arbol) => arbol.object_id === opcionMapa);
    const nuevaLatitud = Number(arbolSeleccionado.lat);
    const nuevaLongitud = Number(arbolSeleccionado.lon);

    setLatitud(nuevaLatitud);
    setLongitud(nuevaLongitud);

    if(!mapRef.current){
        mapRef.current = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([nuevaLongitud, nuevaLatitud]),
          zoom: 5, 
        }),
      });
    }

    // Crear una superposición para el ícono de FontAwesome
    const iconOverlayElement = document.createElement('div');
    iconOverlayElement.className = 'fa-icon-overlay';
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-tree';
    iconOverlayElement.appendChild(icon);

    // Crear la superposición
    const overlay = new Overlay({
      element: iconOverlayElement,
      position: fromLonLat([nuevaLongitud, nuevaLatitud]),
      positioning: 'center-center',
      offset: [0, 0],
    });

    // Agregar la superposición al mapa
    mapRef.current.addOverlay(overlay);

    //resetear mapRef
    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(null);
        mapRef.current = null;
      }
    };

  }, [datosMapa, opcionMapa]);

  return(
  <>
  <section className="mapa">
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
        </div>
        <div className="col-12 d-block d-md-flex justify-content-center align-items-center my-2 text-center">
          <p className="texto">Latitud:{latitud}</p>
          <p className="texto ms-0 ms-md-3">Longitud:{longitud}</p>
        </div>

      </div>
    </div> 
  </section>
  
  </>
        
  )
}

Mapa.propTypes = {
  datosMapa: PropTypes.array.isRequired,
  opcionMapa: PropTypes.string.isRequired,
};

export default Mapa
