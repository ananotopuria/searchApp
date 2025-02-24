import ThemeSelector from './ThemeSelector';
import logo from './../assets/pokemon-1536849_1280.png';

function HeaderComponent() {
  return (
    <header className="flex justify-between items-center">
      <img src={logo} className="w-[5rem] h-[5rem]" alt="pockemon logo" />
      <h1 className="font-bold text-gray-800 font-press sm:text-xl md:text-3xl lg:text-5xl bg-gradient-to-r from-pokemonYellow to-pokemonBlue text-transparent bg-clip-text uppercase">
        Pokémon Search
      </h1>
      <ThemeSelector />
    </header>
  );
}

export default HeaderComponent;
