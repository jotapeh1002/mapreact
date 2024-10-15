import ubsImage from './assets/habitantes.png'
import { Cards } from './components/cards/Cards'
import { MapPe } from './components/mapPe/MapPe'
import { Navbar } from './components/navbar/Navbar'

import { useEffect, useRef, useState } from 'react'

export function App() {

  const [nomesMunicipios, setNomesMunicipios] = useState('56.100')
  const [nomes, setNome] = useState('56.100')

  function receberDados(dados) {
    setNomesMunicipios(dados)
    return dados
  }
  function atualizarDados (dados){
    setNome(dados)
    return dados
  }
  
  return (

    <div className="h-full" >

      <Navbar cidadeSelecionada={atualizarDados}/>
      
      <div className=' flex'>
        <Cards title={'q'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'População'} cardImages={ubsImage} result={nomesMunicipios}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
      </div> 

      <div className='w-1/2 m-5'>
        <MapPe dadosOBJ={receberDados} recDados={nomes} />
      </div>

    </div >
  )

}
