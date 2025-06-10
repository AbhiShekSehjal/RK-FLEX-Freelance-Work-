import "./Navbar.css"

function Navbar() {

    // const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const handleHamburger = () => {
        let line2 = document.getElementById("line2");
        let line1 = document.getElementById("line1");
        let line3 = document.getElementById("line3");
        let sidebar = document.getElementById("sidebar");

        if (sidebar.style.display == "flex") {
            line2.style.width = "40px";
            line1.style.width = "28px";
            line3.style.width = "15px";
            sidebar.style.display = "none";
        } else {
            line2.style.width = "10px";
            line1.style.width = "20px";
            line3.style.width = "35px";
            sidebar.style.display = "flex";
        };
    }

    const closeSideNavabr = () => {
        let sidebar = document.getElementById("sidebar");

        if (sidebar.style.display == "flex") {
            sidebar.style.display = "none"
        } else {
            sidebar.style.display = "flex"
        }

        console.log("btn clicked");

    }

    return (
        <nav className="navbar" id="navbar">
            <div className="logo animate__animated animate__slideInLeft" id="logo">
                Rk FleX
            </div>

            <div className="search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search" className="search" />
            </div>

            {window.innerWidth > 500 &&
                <ul className="nav-links" id="navLinks">
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/about/about.html">About</a></li>
                    <li><a href="#ourworks">Our works</a></li>
                    <li><a href="#joinus">Join us</a></li>
                </ul>
            }


            {window.innerWidth < 500 &&
                <div className="hamburger animate__animated animate__slideInRight" onClick={handleHamburger}>
                    <span className="line1" id="line1"></span>
                    <span className="line2" id="line2"></span>
                    <span className="line3" id="line3"></span>
                </div>

            }

            <div className="sidebar" id="sidebar">
                <ul className="sidebar-nav-links">
                    <li><a href="#home" id="link">Home</a></li>
                    <li><a href="#about" id="link">About</a></li>
                    <li><a href="#ourworks" id="link">Our works</a></li>
                    <li><a href="#joinus" id="link">Join us</a></li>
                </ul>

                <div className="crossbtn" id="crossbtn" onClick={closeSideNavabr}>
                    <i className="fa-solid fa-xmark"></i>
                </div>

            </div>

        </nav>
    )
}

export default Navbar
