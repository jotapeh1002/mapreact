import './Navbar.module.css';
import { useEffect, useState, useRef } from 'react';
import logoMarques from '../../assets/marques.png';

export function Navbar({ cidadeSelecionada }) {
    const [suggestionsData, setSuggestionsData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const refInput = useRef();
    const refDiv = useRef();

    useEffect(() => { 
        const fetchData = async () => { 
            try {
                const response = await fetch('./src/json/populacao.json');
                const data = await response.json();

                console.log(data);

                if (Array.isArray(data.municipio)) {

                    const municipios = data.municipio
                        .filter(item => item && item.city)
                        .map(item => item.city);

                    setSuggestionsData(municipios);
                } else {
                    console.error("A propriedade 'municipio' não é um array.");
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);

    const showSuggestions = (value) => {

        setInputValue(value)
        alert
        refDiv.current.classList.remove('hidden')

        if (value.length === 0 ) {
            refDiv.current.className = 'hidden'
            refInput.current.className = 'rounded-full text-gray-600 z-50 outline-none border-2 hover:border-blue-400   h-8 w-60 bg-opacity-30 mx-11 px-4'
            refInput.current.value =''
            setFilteredSuggestions([]);
            return;
        }

        const filtered = suggestionsData.filter(suggestion =>
            suggestion.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(value.toLowerCase())
        )

        setFilteredSuggestions(filtered);
        refInput.current.className = 'rounded-t-xl text-gray-600 z-50 outline-none h-8 w-60 bg-opacity-30 mx-11 px-4' 
        filtered.length < 1  &&( filtered[0] = "Nenhuma Cidade Encontrada")
    };

    const handleSuggestionClick = (suggestion) => {
        refInput.current.className = 'rounded-full text-gray-600 z-50 outline-none border-2 hover:border-blue-400  h-8 w-60 bg-opacity-30 mx-11 px-4'
        setFilteredSuggestions([]);
        cidadeSelecionada(() => cidadeSelecionada(suggestion))
        refInput.current.value = ''
        refDiv.current.className = 'hidden'
    }

    return (
        <div>
            <div onClick={()=> showSuggestions('')} ref={refDiv} className='bg-black h-screen w-screen hidden bg-opacity-0 absolute '></div>
            <nav className="flex items-center justify-between px-1 py-2 shadow-lg bg-gray-700 w-full">
                <img src={logoMarques} alt="Logo" width="150px" />
                <div className="flex-col flex items-center">
                    <div className="search-container" style={{ position: 'relative', width: '300px' }}>
                        <input 
                            className="text-gray-600 border-2 hover:border-blue-400 z-50 outline-none rounded-full h-8 w-60 bg-opacity-30 mx-11 px-4"
                            type="text"
                            ref={refInput}
                            // value={inputValue}
                            onChange={(e) => showSuggestions(e.target.value)}
                            placeholder="Pesquisar..."
                        />
                        {filteredSuggestions.length > 0 && (
                            <div
                            className="text-sm min-w-[240px] max-w-[240px] shadow-md max-h-52 overflow-x-hidden absolute bg-white border translate-x-[44px] rounded-b-xl">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item px-3 py-1 hover:bg-slate-200"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative flex w-full justify-center mt-1" />
                </div>
            </nav>
        </div>
    );
}
