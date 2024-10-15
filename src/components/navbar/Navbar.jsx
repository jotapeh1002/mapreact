import './Navbar.module.css';
import { useEffect, useState } from 'react';
import logoMarques from '../../assets/marques.png';

export function Navbar({ handleSuggestionClick: handleClick }) {
    const [suggestionsData, setSuggestionsData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

   
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

        if (value.length === 0) {
            setFilteredSuggestions([]);
            return;
        }

        const filtered = suggestionsData.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion); 
        setFilteredSuggestions([]); 
        handleClick(suggestion); 
    };

    return (
        <div>
            <nav className="flex items-center justify-between px-1 py-2 shadow-lg bg-gray-700 w-full">
                <img src={logoMarques} alt="Logo" width="150px" />
                <div className="flex-col flex items-center">
                    <div className="search-container" style={{ position: 'relative', width: '300px' }}>
                        <input
                            className="text-gray-600 z-50 outline-none rounded-full h-8 w-60 bg-opacity-30 mx-11 px-4"
                            type="text"
                            value={inputValue}
                            onChange={(e) => showSuggestions(e.target.value)}
                            placeholder="Pesquisar..."
                        />
                        {filteredSuggestions.length > 0 && (
                            <div className="text-sm min-w-52 max-w-52 overflow-hidden absolute bg-white border translate-x-[60px] rounded-b-xl">
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
