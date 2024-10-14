import './Navbar.module.css'
import logoMarques from '../../assets/marques.png'

export function Navbar() {
    
    return (
        <div className=''>
            <nav class="flex items-center justify-between px-1 py-2 shadow-lg bg-gray-700 w-full">
                <img src={logoMarques} alt="" width="150px" />
                <div class="flex-col flex items-center">
                    <input type="text" className="text-gray-600 outline-none rounded-full h-8 w-60 bg-opacity-30 mx-3 px-4"
                        placeholder="Pesquise sua cidade..." name="search" id="search" />
                    <div className="relative flex w-full justify-center mt-1 " />
                    <div id="suggestions" className="suggestions w-60 rounded-b-lg hidden"></div>
                </div>
            </nav>
        </div>
    )
}
