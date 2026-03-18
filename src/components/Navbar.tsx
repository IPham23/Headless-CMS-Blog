import {useTheme} from "./ThemeContext";


export default function Navbar() {

    const {toggleTheme, isDark} = useTheme();

    return(
        <>
            <header className="py-5 px-5 lg:px-20 flex justify-center max-lg:flex-col-reverse">
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-center text-(--text)">Welcome to my Blog</h1>

                {/*THEME BUTTOM */}
                <div className="absolute max-lg:relative max-lg:self-end right-0 top-0 px-5 lg:px-20 py-5">
                    <div className="w-22 h-12 bg-(--toggle-bg) rounded-full flex justify-between items-center cursor-pointer!"
                        onClick={toggleTheme}
                    >
                        <div className="text-2xl pl-1">🌙</div>
                        <div className={`w-12 h-12 bg-(--toggle-icon) rounded-full absolute 
                                         transition-all duration-300 ease-in-out
                                        ${isDark ? "translate-x-10" : "translate-x-0"}`}>                

                        </div>
                        <div className="text-2xl pr-1">☀️</div>
                    </div>
                </div>
            </header>
        </>
    )
}