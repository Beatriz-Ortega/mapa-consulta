import { useState, useEffect} from 'react';
import '../../styles/styles.css';
import PropTypes from 'prop-types';

function Foto({datosFoto, opcionFoto}) {

  //Estados
  const [imagen, setImagen] = useState('');

  //Conseguir URL de la imagen
  useEffect(() => {
    const arbolSeleccionado = datosFoto.find((arbol) => arbol.object_id === opcionFoto);
    const foto= arbolSeleccionado.image_url;
    console.log(foto)
    if (foto) {
    setImagen(foto);
    }
  }, [datosFoto, opcionFoto]);

  return(
    <>    
      <section className="foto">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center mb-5">
              <div id="foto">
                {imagen && <img src={imagen} className="card-img" alt="Imagen de árbol" />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>    
  )
}

Foto.propTypes = {
  datosFoto: PropTypes.array.isRequired,
  opcionFoto: PropTypes.string.isRequired,
};

export default Foto


