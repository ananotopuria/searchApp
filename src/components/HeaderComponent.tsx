import ThemeSelector from './ThemeSelector';
import logo from './../assets/pokemon-1536849_1280.png';
import { Link } from 'react-router-dom';

function HeaderComponent() {
  return (
    <header className="flex justify-between items-center">
      <img src={logo} className="w-[5rem] h-[5rem]" alt="pockemon logo" />
      <h1 className="font-bold text-gray-800 font-press sm:text-xl md:text-3xl lg:text-5xl bg-gradient-to-r from-pokemonYellow to-pokemonBlue text-transparent bg-clip-text uppercase">
        Pokémon Search
      </h1>
      <div className="flex items-center gap-4">
        <Link
          to="/favorites"
          className="px-3 py-2 rounded bg-pokemonBlue text-white hover:bg-pokemonYellow transition font-bold uppercase"
        >
          💖 Favorites
        </Link>
        <ThemeSelector />
      </div>
    </header>
  );
}

export default HeaderComponent;
