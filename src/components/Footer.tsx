import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";


export default function Footer() {
    return(
        <>
            <div className="py-5 px-5 lg:px-20 grid grid-cols-3">
                <div className="flex gap-10">
                    <FaLinkedin size={36} />
                    <FaGithub size={36} />
                    <SiGmail size={36} />
                    <CgWebsite size={36} />
                </div>
                <div className="flex items-center justify-center">
                    <p>© {new Date().getFullYear()} Christian Coladilla</p>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}