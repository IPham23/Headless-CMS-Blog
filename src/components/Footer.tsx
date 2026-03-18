import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";


export default function Footer() {
    return(
        <>
            <div className="py-5 px-5 lg:px-20 grid grid-cols-1 
                            max-md:gap-5 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex max-md:justify-center gap-10 text-(--text)">
                    <a href="https://www.linkedin.com/in/christian-coladilla-86494a264/"
                       target="_blank"
                       className="transition-scale duration-300 ease-in-out hover:scale-110
                                  transition-filter hover:brightness-120"
                       aria-label="LinkedIn profile">
                        <FaLinkedin size={36} />
                    </a>
                    <a href="https://github.com/IPham23/"
                       target="_blank"
                       className="transition-scale duration-300 ease-in-out hover:scale-110
                                  transition-filter hover:brightness-120"
                       aria-label="Github profile">
                        <FaGithub size={36} />
                    </a>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=iancoladilla23@gmail.com&su=Website%20Inquiry&body=Hi%20Christian,"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="transition-scale duration-300 ease-in-out hover:scale-110
                                  transition-filter hover:brightness-120"
                       aria-label="Gmail">
                        <SiGmail size={36} />
                    </a>
                    <a href="https://coladilla-portfolio.vercel.app/"
                       target="_blank"
                       className="transition-scale duration-300 ease-in-out hover:scale-110
                                  transition-filter hover:brightness-120"
                       aria-label="My portfolio">
                        <CgWebsite size={36} />
                    </a>
                </div>
                <div className="flex items-center justify-center">
                    <p className="text-(--text)">© {new Date().getFullYear()} Christian Coladilla</p>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}