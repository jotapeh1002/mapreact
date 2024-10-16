import Mapasvg from '../../svg/mapa-pr.svg'
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

                        let regioes = {
                            metropolitana: ['Recife', 'Olinda', 'Jaboatão dos Guararapes', 'Paulista',
                                'Cabo de Santo Agostinho', 'Camaragibe', 'São Lourenço da Mata',
                                'Abreu e Lima', 'Igarassu', 'Ipojuca', 'Araçoiaba', 'Moreno',
                                'Itapissuma', 'Ilha de Itamaracá', 'São Lourenço da Mata'],
                            agreste: ['Agrestina', 'Alagoinha', 'Altinho', 'Barra de Guabiraba',
                                'Belo Jardim', 'Bezerros', 'Bonito', 'Brejo da Madre de Deus',
                                'Cachoeirinha', 'Camocim de São Felix', 'Caruaru', 'Cupira',
                                'Gravatá', 'Ibirajuba', 'Jatáuba', 'Lagoa dos Gatos',
                                'Panelas', 'Pesqueira', 'Poção', 'Pombos', 'Riacho das Almas',
                                'Sairé', 'Sanharó', 'São Bento do Una', 'São Caitano',
                                'São Joaquim do Monte', 'Tacaimbó',
                                'Águas Belas', 'Angelim', 'Bom Conselho', 'Brejão',
                                'Buíque', 'Caetés', 'Calçado', 'Canhotinho', 'Capoeiras',
                                'Correntes', 'Garanhuns', 'Iati', 'Itaíba', 'Jucatí',
                                'Jupi', 'Jurema', 'Lagoa do Ouro', 'Lajedo', 'Palmeirina',
                                'Paranatama', 'Pedra', 'Saloá', 'São João', 'Terezinha',
                                'Tupanatinga', 'Venturosa', 'Bom Jardim', 'Casinhas',
                                'Cumaru', 'Feira Nova', 'Frei Miguelinho', 'João Alfredo',
                                'Limoeiro', 'Machados', 'Orobó', 'Passira', 'Salgadinho',
                                'Santa Cruz do Capibaribe', 'Santa Maria do Cambucá',
                                'São Vicente Férrer', 'Surubim', 'Taquaritinga do Norte',
                                'Toritama', 'Vertente do Lério', 'Vertentes', 'Jucati', 'Camocim de São Félix', 'Jataúba'],
                            zonadamata: ['Aliança', 'Buenos Aires', 'Camutanga', 'Carpina',
                                'Chã de Alegria', 'Condado', 'Ferreiros', 'Glória do Goitá',
                                'Goiana', 'Itambé', 'Itaquitinga', 'Lagoa do Carro',
                                'Lagoa de Itaenga', 'Macaparana', 'Nazaré da Mata',
                                'Paudalho', 'Timbaúba', 'Tracunhaém',
                                'Água Preta', 'Amaraji', 'Barreiros', 'Belém de Maria',
                                'Catende', 'Chã Grande', 'Cortes', 'Escada',
                                'Gameleira', 'Jaqueira', 'Joaquim Nabuco', 'Maraial',
                                'Palmares', 'Primavera', 'Quipapá', 'Ribeirão',
                                'Rio Formoso', 'São Benedito do Sul', 'Sirinhaém',
                                'São José da Coroa Grande', 'Tamandaré', 'Vitória de Santo Antão',
                                'Xexéu'],
                            sertao: ['Cedro', 'Mirandiba', 'Parnamirim', 'Salgueiro',
                                'São José do Belmonte', 'Serrita', 'Terra Nova', 'Verdejante',
                                'Belém de São Francisco', 'Carnaubeira da Penha', 'Floresta',
                                'Itacuruba', 'Jatobá', 'Petrolândia', 'Tacaratu',
                                'Araripina', 'Bodocó', 'Exu', 'Granito', 'Ipubi',
                                'Moreilândia', 'Ouricuri', 'Santa Cruz', 'Santa Filomena',
                                'Trindade', 'Arcoverde', 'Betânia', 'Custódia', 'Ibimirim',
                                'Inajá', 'Manari', 'Sertânia', 'Petrolina', 'Lagoa Grande',
                                'Santa Maria da Boa Vista', 'Dormentes', 'Afrânio', 'Cabrobó', 'Orocó']
                        }
                        if (selectValue) {
                            // paths.forEach((items) => items.style.fill = '#fefee9')
                            if (selectValue === 'metropolitana') {
                                paths.forEach(items => {
                                    if (!regioes.metropolitana.includes(items.id.trim())) {
                                        // items.style.fill = 'red'
                                        items.style.opacity = '0.1'
                                    }
                                })
                            }
                            else if (selectValue === 'agreste') {
                                paths.forEach(items => {
                                    if (!regioes.agreste.includes(items.id.trim())) {
                                        // items.style.fill = 'black'
                                        items.style.opacity = '0.1'
                                    }
                                })
                            }
                            else if (selectValue === 'sertao') {
                                paths.forEach(items => {
                                    if (!regioes.sertao.includes(items.id.trim())) {
                                        // items.style.fill = 'green'
                                        items.style.opacity = '0.1'
                                    }
                                })
                            }
                            else if (selectValue === 'zonadamata') {
                                paths.forEach(items => {
                                    if (!regioes.zonadamata.includes(items.id.trim())) {
                                        // items.style.fill = 'purple'
                                        items.style.opacity = '0.1'
                                    }
                                })
                            }
                        }

                        function dadosCity() {
                            let ar = path.getAttribute('id').trim()
                            setpathMap(ar)
                            fetch('./src/json/populacao.json')
                                .then(response => response.json())
                                .then(data => {
                                    if (Array.isArray(data.municipio)) {
                                        let nomes = data.municipio.find((muni) => {
                                            if (muni !== null) { return muni.city == ar }
                                        })

                                        let dadospopu = nomes.populacao.toLocaleString('pt-BR')

                                        let dadosvalorFor = parseFloat(nomes.valoranual.replace(/\./g, '').replace(',', '.'))

                                        let dadosvalor = dadosvalorFor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

                                        dadosOBJ({
                                            municipio: nomes.city,
                                            populacao: dadospopu,
                                            empresa: nomes.empresa,
                                            descricao: nomes.descricao,
                                            valoranual: dadosvalor,
                                            fimdocontrato: nomes.fimdocontrato,
                                            ubs: nomes.ubs
                                        })
                                        setpathMap(nomes.city)

                                    } else {
                                        console.log('Não foi possível encontrar a lista de municípios.')
                                    }
                                })
                                .catch(error => console.error('Erro ao carregar o json:', error))
                        }

                        if (path.id.trim() === recDados) {

                            function search() {
                                // paths.forEach((items) => items.style.fill = '#fefee9')
                                setRecDados(recDados)
                                path.style.fill = 'red'
                                // alert(recDados)
                                dadosCity()
                            }

                            if (selectValue !== 'zonadamata' && selectValue !== 'metropolitana' &&
                                selectValue !== 'agreste' && selectValue !== 'sertao') {
                                search()
                            }
                            else {
                                if (selectValue === 'metropolitana' && regioes.metropolitana.includes(recDados)) {
                                    search()
                                }
                                else if (selectValue === 'agreste' && regioes.agreste.includes(recDados)) {
                                    path.style.fill = 'red'
                                    search()
                                }
                                else if (selectValue === 'sertao' && regioes.sertao.includes(recDados)) {
                                    path.style.fill = 'red'
                                    search()
                                }
                                else if (selectValue === 'zonadamata' && regioes.zonadamata.includes(recDados)) {
                                    path.style.fill = 'red'
                                    search()
                                }
                            }
                        }

                        path.addEventListener('click', () => {
                            paths.forEach((items) => items.style.fill = '#fefee9')
                            if (selectValue !== 'zonadamata' && selectValue !== 'metropolitana' &&
                                selectValue !== 'agreste' && selectValue !== 'sertao') {
                                path.style.fill = 'red'
                                dadosCity()
                            }
                            else {
                                if (selectValue === 'metropolitana' && regioes.metropolitana.includes(path.id.trim())) {
                                    path.style.fill = 'red'
                                    dadosCity()
                                }
                                else if (selectValue === 'agreste' && regioes.agreste.includes(path.id.trim())) {
                                    path.style.fill = 'red'
                                    dadosCity()
                                }
                                else if (selectValue === 'sertao' && regioes.sertao.includes(path.id.trim())) {
                                    path.style.fill = 'red'
                                    dadosCity()
                                }
                                else if (selectValue === 'zonadamata' && regioes.zonadamata.includes(path.id.trim())) {
                                    path.style.fill = 'red'
                                    dadosCity()
                                }
                            }
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