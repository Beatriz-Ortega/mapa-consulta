import { useState, useEffect } from 'react'
import '../styles/styles.css'
import Mapa from './components/mapa'
import Foto from './components/foto'
import Principal from './components/principal'

function Inicio() {

  //Estados
  const [datos, setDatos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  //consulta API
  const consultarAPI = async () =>{
    try{
    const url = `https://aqh.fitsnr.com/api/aqh/objects`;
    const headers = {
    'X-token': '5Dt4y4fN1Eh8lX1cFKtO',
    };
    const answer = await fetch(url, {
        method: 'GET',
        headers: headers,
    });
    const result = await answer.json();
    setDatos(result?.objetos)
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  }
  
  useEffect(() => {
    consultarAPI()
  }, [])

  //Conseguir valor seleccionado
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
    return(
      <>
        <header className="inicio">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <form>
                            <div className="my-3">
                                <select 
                                    className="form-select tamaño-select" 
                                    aria-label="Default select example"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                >
                                <option value="">Seleccione ubicación</option>
                                {datos.map((option) => (
                                    <option key={option.object_id} value={option.object_id}>
                                        {option.object_name}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
        {selectedOption ? (
          <>
            <Mapa datosMapa={datos} opcionMapa={selectedOption} />
            <Foto datosFoto={datos} opcionFoto={selectedOption} />
          </>
        ) : (<Principal />)}
      </>
        
  )
}
export default Inicio

