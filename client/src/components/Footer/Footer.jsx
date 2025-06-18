import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <footer className="footer">

            <div className="imageForFooter"></div>
            <div className="footerImageFade"></div>

            <div className="socialMediaLinks">
                <div className="insta">
                    <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="fb">
                    <i className="fa-brands fa-facebook"></i>
                </div>
                <div className="twitter">
                    <i className="fa-brands fa-twitter"></i>
                </div>
            </div>
            
            <div className="haedingTextForMobile"><span>Mobile no</span>+22511 5555</div>
            <div className="haedingTextForEmail"><span>Email address</span>rk44@gmail.com</div>
        </footer>
    )
}

export default Footer
