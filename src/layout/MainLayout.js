import Header from "components/Header";
import Nav from "common/Nav";
import { useRouter } from "next/router";

const MainLayout = ({children}) => {

    const router = useRouter();

    return (
        <>
            <div className="min-h-full">

                {
                    (router.asPath === "/" || router.asPath === '/login') 
                        ? null
                        : <Header />  
                }
                <Nav /> 

                <main>
                    <div className="max-w-7x1 mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainLayout;
