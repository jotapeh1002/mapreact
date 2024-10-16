import ubsImage from './assets/habitantes.png'
import valorImage from './assets/valor.png'
import contratoImage from './assets/contrato.png'
import cnpjImage from './assets/cpnj.png'
import popuImage from './assets/ubs.png'
import marquesImage from './assets/marques.png'
import { Cards } from './components/cards/Cards'
import { MapPe } from './components/mapPe/MapPe'
import { Navbar } from './components/navbar/Navbar'
import { useEffect, useRef, useState } from 'react'

export function App() {

  const [dadosUbs, setDadosUbs] = useState(8)
  const [dadosPopulacao, setDadosPopulacao] = useState(5300)
  const [dadosContrato, setDadosContrato] = useState(5300)
  const [dadosValorAnual, setDadosValorAnual] = useState(5300)
  const [dadosEmpresa, setDadosEmpresa] = useState('MARQUES CONSULT')
  const [dadosDescricao, setDadosDescricao] = useState('e-SUS BPA ONLINE e-SUS ANALYTICS SIGAH 2.0')
  const [nomes, setNome] = useState()

  function receberDados(dados) {
    setDadosUbs(dados.ubs)
    setDadosPopulacao(dados.populacao)
    setDadosContrato(dados.fimdocontrato)
    setDadosValorAnual(dados.valoranual)
    setDadosEmpresa(dados.empresa)
    setDadosDescricao(dados.descricao)
    // alert(dados.populacao)
    return dados
  }
  function atualizarDados(dados) {
    setNome(dados)
    // alert(dados)
    return dados
  }

  return (
    <div className="h-screen bg-slate-500" >
      <Navbar cidadeSelecionada={atualizarDados} />
      <div className='m-5 gap-5 justify-center flex'>
        <div className="w-1/2">
          <div className='flex gap-5 my-2 '>
            <Cards title={'UBS'} cardImages={popuImage} width='w-1/2' result={dadosUbs} />
            <Cards title={'População'} cardImages={ubsImage} width='w-1/2' result={dadosPopulacao} />
          </div>
          <MapPe dadosOBJ={receberDados}  recDados={nomes} />
        </div>
        <div>
          <div className="mt-5 w-[50vw] h-full flex flex-col ">
            <div className="flex-nowrap items-center py-10 mb-5 rounded-xl bg-slate-600 font-bold overflow-x-hidden text-slate-300 flex justify-center text-2xl  border-slate-500 w-full">
              {dadosEmpresa}
            </div>
            <div className="bg-slate-600 bg-opacity-40 flex justify-center border-slate-600 h-full border-y  rounded-xl shadow-lg">
              <div className=" mt-5 items-center flex flex-col text-slate-200 text-2xl font-bold"> DESCRIÇÃO
                <div className=" px-6 mt-5 text-lg font-normal text-slate-300 overflow-scroll">
                  {dadosDescricao}
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-5">
              <div className='flex my-2 flex-col '>
                <Cards title={'Fim do Contrato'} result={dadosContrato} cardImages={contratoImage} width='w-[25vw]' />
                <Cards title={'Valor Anual'} result={dadosValorAnual} cardImages={valorImage} width='' />
                <Cards title={'CNPJ'} cardImages={cnpjImage} width='' result={'00000-0'} />
              </div>
              <div className='border-gray-600 border-y shadow-md bg-slate-600 w-1/2 rounded-xl shadoe-md my-5 bg-opacity-40 flex justify-center items-center'>
                <img src={marquesImage} className='' width={350} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
