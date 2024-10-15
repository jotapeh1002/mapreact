import Mapasvg from '../../svg/mapa-pr.svg'
import { useEffect, useRef } from 'react';

export function MapPe() {

    const svgRef = useRef(null)
    useEffect(() => {
        if (svgRef.current) {
            fetch(Mapasvg)
                .then(response => response.text())
                .then(dataSvg => {

                    svgRef.current.innerHTML = dataSvg

                    let svgElement = svgRef.current.querySelector('svg')
                    if (svgElement) {
                        svgElement.style.width = '100%'
                    }

                    const paths = dataSvg.querySelectorAll('path')

                    paths.forEach((path) => {
                        console.log(path.getAttribute('id'));
                      });

                })
                .catch(error => console.error('Erro ao carregar o SVG:', error))
        }
    }, [])

return (

    <div className=" overflow-hidden border-y flex flex-col border-slate-500 rounded-xl shadow-lg ">
        <div ref={svgRef} className='p-4'></div>
        <div className="flex  bg-slate-500 justify-between items-center">
            <p className=" w-full text-2xl pt-2 p-3 font-bold text-slate-300" id="cidade">Limoeiro</p>
            <div className="mx-4  text-sm w-60 -mb-2 mt-2">
                <select id="regiao"
                    className="text-center bg-transparent text-slate-300 font-bold rounded p-2 mb-4 w-full">
                    <option value="">Todas as regiões</option>
                    <option value="metropolitana">Região Metropolitana</option>
                    <option value="agreste">Agreste</option>
                    <option value="sertao">Sertão</option>
                    <option value="zonadamata">Zona da Mata</option>
                </select>
            </div>
        </div>
    </div>
)
}