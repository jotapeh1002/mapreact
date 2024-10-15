import ubsImage from './assets/habitantes.png'
import { Cards } from './components/cards/Cards'
import { MapPe } from './components/mapPe/MapPe'
import { Navbar } from './components/navbar/Navbar'
// import viteLogo from '/vite.svg' assim que se importa uma imagem ou outro arquivo

export function App() {

  return (

    <div div className="h-full" >

      <Navbar />
      
      <div className=' flex'>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
        <Cards title={'exemplo'} cardImages={ubsImage} result={'10'}/>
      </div> 

      <div className='w-1/2 m-5'>
        <MapPe />
      </div>

    </div >
  )

}
