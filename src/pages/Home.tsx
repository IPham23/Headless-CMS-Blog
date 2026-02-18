import Blog from "./Blog";

export default function Home(){
    return(
    <>
    <div className="py-10 px-5 lg:px-20">
        <h1 className="text-5xl font-bold text-center">Welcome to my Blog</h1>
        
        <Blog />
    </div>
    </>
    )
    
}