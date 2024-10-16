import Mapasvg from '../../svg/mapa-pr.svg'
import Regioes from '../../json/regioes.json'
import { useEffect, useRef, useState } from 'react'

export function MapPe({ dadosOBJ, recDados }) {

    const svgRef = useRef(null)
    const selectRef = useRef(null)
    const [pathMap, setpathMap] = useState('')
    const [recDadosValue, setRecDados] = useState(null)
    const [selectValue, setSelectValue] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [popupContent, setPopupContent] = useState('');

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

                        if (path.id.trim() == 'Limoeiro' && pathMap === '') {
                            path.style.fill = 'red';
                            setpathMap('Limoeiro')
                        }
                        if (selectValue) {
                            fetch('./src/json/regioes.json')
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    Object.entries(data).forEach(([regiao, cidades]) => {
                                        console.log('Região: ' + regiao);
                                        cidades.forEach(cidade => {
                                            console.log('Cidade: ' + cidade)
                                        })
                                        if (regiao === selectValue) {
                                            paths.forEach(items => {
                                                if (!cidades.includes(items.id.trim())) {
                                                    items.style.opacity = '0.1'
                                                } else {
                                                    items.style.opacity = '1'
                                                }
                                            })
                                        }
                                    })
                                })
                        }
                        function dadosCity() {
                            let ar = path.getAttribute('id').trim()
                            setpathMap(ar)
                            fetch('./src/json/populacao.json')
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Erro na resposta da rede: ' + response.statusText)
                                    }
                                    return response.json()
                                })
                                .then(data => {
                                    if (Array.isArray(data.municipio)) {
                                        let nomes = data.municipio.find(muni => muni && muni.city === ar)
                                        if (nomes) {
                                            let dadospopu = nomes.populacao.toLocaleString('pt-BR')
                                            let dadosvalorFor = parseFloat(nomes.valoranual.replace(/\./g, '').replace(',', '.'))
                                            let dadosvalor = dadosvalorFor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                            dadosOBJ({
                                                municipio: nomes.city,
                                                populacao: dadospopu,
                                                empresa: nomes.empresa,
                                                descricao: nomes.descricao,
                                                valoranual: dadosvalor,
                                                fimdocontrato: nomes.fimdocontrato,
                                                ubs: nomes.ubs,
                                                cnpj: nomes.cnpj
                                            })
                                            setpathMap(nomes.city);
                                        } else {
                                            console.log('Município não encontrado na lista.')
                                        }
                                    } else {
                                        console.log('Não foi possível encontrar a lista de municípios.')
                                    }
                                })
                                .catch(error => console.error('Erro ao carregar o JSON:', error))
                        }
                        function iVery(very) {
                            if (selectValue !== 'zonadamata' && selectValue !== 'metropolitana' &&
                                selectValue !== 'agreste' && selectValue !== 'sertao') {
                                path.style.fill = 'red'
                                setRecDados(recDados)
                                dadosCity()
                            }
                            else {
                                if (selectValue === 'metropolitana' && regioes.metropolitana.includes(very)) {
                                    path.style.fill = 'red'
                                    setRecDados(recDados)
                                    dadosCity()
                                }
                                else if (selectValue === 'agreste' && regioes.agreste.includes(very)) {
                                    path.style.fill = 'red'
                                    setRecDados(recDados)
                                    dadosCity()
                                }
                                else if (selectValue === 'sertao' && regioes.sertao.includes(very)) {
                                    path.style.fill = 'red'
                                    setRecDados(recDados)
                                    dadosCity()
                                }
                                else if (selectValue === 'zonadamata' && regioes.zonadamata.includes(very)) {
                                    path.style.fill = 'red'
                                    setRecDados(recDados)
                                    dadosCity()
                                }
                            }
                        }

                        if (path.id.trim() === recDados) {
                            iVery(recDados)
                        }

                        path.addEventListener('click', () => {
                            paths.forEach((items) => items.style.fill = '#fefee9')
                            iVery(path.id.trim())
                        })

                        path.addEventListener('mousemove', (event) => {
                            setMousePosition({ x: event.pageX, y: event.pageY });
                            setPopupContent(path.id.trim());
                        });
                        path.addEventListener('mouseleave', () => {
                            setPopupContent('');
                        });
                        //ta funcionando por um milagre divino
                    })
                })
                .catch(error => console.error('Erro ao carregar o SVG:', error))
        }
    }, [selectValue, recDados])
    const eventSelect = (event) => {
        setSelectValue(event.target.value);
    };
    return (
        <div className='bg-slate-600 bg-opacity-40  overflow-hidden border-y flex flex-col border-slate-600 rounded-xl shadow-lg '>
            <div ref={svgRef} className='mx-5 py-36' > </div>
            {popupContent && (
                <div className=' bg-slate-300  absolute border border-slate-700 text-slate-800 shadow-sm rounded-full px-1 text-sm bg-opacity-90'
                    style={{
                        left: mousePosition.x + 20,
                        top: mousePosition.y + 20,
                        pointerEvents: 'none'
                    }}>
                    {popupContent}
                </div>)}
            <div className="flex  bg-slate-600 justify-between items-center">
                <p className=" w-full text-2xl pt-2 p-3 font-bold text-slate-300" id="cidade"> {pathMap} </p>
                <div className="mx-4  text-sm w-60 -mb-2 mt-2">
                    <select ref={selectRef} onChange={eventSelect}
                        className="text-center bg-transparent text-slate-300 font-bold rounded p-2 mb-4 w-full">
                        <option value="defined">Todas as regiões</option>
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