import Mapasvg from '../../svg/mapa-pr.svg'
import { useEffect, useRef, useState } from 'react'

export function MapPe({ dadosOBJ, recDados }) {

    const svgRef = useRef(null)
    const selectRef = useRef(null)
    const [pathMap, setpathMap] = useState(null)
    const [recDadosValue, setRecDados] = useState(null)
    const [selectValue, setSelectValue] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [popupContent, setPopupContent] = useState('');

    useEffect(() =>{
        setRecDados(recDados) //ta guardando o valor antigo
        alert(recDadosValue)
    },[recDados])

    useEffect(() => {

        if (svgRef.current) {
            fetch(Mapasvg)
                .then(response => response.text())
                .then(dataSvg => {

                    svgRef.current.innerHTML = dataSvg
                    let svgElement = svgRef.current.querySelector('svg')
                    svgElement.style.width = '100%'

                    const paths = svgRef.current.querySelectorAll('path')
                    paths.forEach((path) => {

                        if (path.id.trim() === 'Limoeiro') {
                            setpathMap(path.id.trim());
                            path.style.fill = 'red';  // Aplicando o estilo aqui
                        }

                        if (selectValue) {
                            paths.forEach((items) => items.style.fill = '#fefee9')

                            if (selectValue === 'metropolitana') {

                            }
                            else if (selectValue === 'agreste') {


                            }
                            else if (selectValue === 'sertao') {

                            }
                            else if (selectValue === 'zonadamata') {

                            }
                        }

                        path.addEventListener('click', () => {

                            paths.forEach((items) => items.style.fill = '#fefee9')
                            path.style.fill = 'red'
                            let ar = path.getAttribute('id').trim()

                            setpathMap(ar)

                            fetch('./src/json/populacao.json')
                                .then(response => response.json())
                                .then(data => {

                                    if (Array.isArray(data.municipio)) {
                                        let nomes = data.municipio.find((muni) => {
                                            if (muni !== null) { return muni.city == ar }
                                        })

                                        dadosOBJ(nomes.Column6)

                                    } else {
                                        console.log('Não foi possível encontrar a lista de municípios.');
                                    }
                                })
                                .catch(error => console.error('Erro ao carregar o json:', error));
                        })
                        path.addEventListener('mousemove', (event) => {
                            setMousePosition({ x: event.pageX, y: event.pageY });
                            setPopupContent(path.id.trim());
                        });
                        path.addEventListener('mouseleave', () => {
                            setPopupContent('');
                        });

                        //quem pegou se fudeu kkkkkkkkkkkkkkkkkkkkkk 
                        //eu desisti de fazer aaquui kkkkkkkk boa sorte companhero abs: lula 9 dedos

                    })
                })
                .catch(error => console.error('Erro ao carregar o SVG:', error))
        }

    }, [selectValue])

    const eventSelect = (event) => {
        setSelectValue(event.target.value);
    };

    return (

        <div className=' overflow-hidden border-y flex flex-col border-slate-500 rounded-xl shadow-lg '>
            <div ref={svgRef} className='mx-3' > </div>

            {popupContent && (
                <div className=' bg-slate-300 absolute border border-slate-700 text-slate-800 shadow-sm rounded-full px-1 text-sm bg-opacity-90'
                    style={{
                        left: mousePosition.x + 20,
                        top: mousePosition.y + 20,
                        pointerEvents: 'none'
                    }}
                >
                    {popupContent}
                </div>
            )}

            <div className="flex  bg-slate-500 justify-between items-center">
                <p className=" w-full text-2xl pt-2 p-3 font-bold text-slate-300" id="cidade"> {pathMap} </p>
                <div className="mx-4  text-sm w-60 -mb-2 mt-2">
                    <select ref={selectRef} onChange={eventSelect}
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