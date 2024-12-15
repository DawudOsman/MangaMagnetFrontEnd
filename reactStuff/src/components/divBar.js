import React,{Component} from 'react';
import img from './../Assets/Images/LogoWhite.svg';
import darkImg from './..//Assets/Images/mangamagnet-favicon-black.svg';
import blackIconBar from './..//Assets/Images/blackIconBar.png';
import sunIcon from './../Assets/Images/sunIcon.png';
import moonIcon from './../Assets/Images/moonIcon.png';
import whiteIconBar from './../Assets/Images/whiteIconBar.png';
import * as  styles from './../styleSheets/navBar.module.css';
import { Link } from 'react-router-dom';
import './../styleSheets/colors.css'


class Divbar extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            toggleNavIcon: true,
            darkMode: props.darkMode,
            isMobile:props.isMobile,
            mobileAnim: false
        }
    }

    updateState = (() =>
    {
        console.log("toggleStatecalled")
        this.setState(
            {
                toggleNavIcon: !this.state.toggleNavIcon
            })
    })

    // toggle Color Mode
    enbaleMobileAnim = (() =>
        {
           this.setState({mobileAnim:true})
        })

    toggleMode = ( () =>
    {

        this.setState(        {
            darkMode: !this.state.darkMode
            
        })
        this.props.toggleDark(!this.props.darkMode)
    })
    // change color
    toggleIsMobile = ((mobile) => 
        {
            this.setState(
                {
                    isMobile: mobile
                })
        })
    changeModeVals()
    {
        document.documentElement.style.setProperty('--bgColor', this.props.darkMode ? `var(--bgBlack)` : "var(--bgWhite)");
        document.documentElement.style.setProperty('--fontColor', this.props.darkMode ? `var(--fontWhite)` : "var(--fontBlack)");
    }
    componentDidMount()
    {
        let handleResize =( () => 
            {
                if(window.innerWidth <= 900)
                    {
                        this.props.toggleMobile(true);
                    }
                else
                {
                    this.props.toggleMobile(false)
                    this.setState({toggleNavIcon:true})
                    this.setState({mobileAnim:false})
                }
            })
        window.addEventListener('resize',handleResize)
    }
    render()
    {
        console.log(this.state.mobileAnim);
        return <><div className={styles.navbar}  >
            <div id={styles.logosDiv} >
            <div>
                <Link className={styles.links}to="/"><img src={ this.props.darkMode ?darkImg : img} id={styles.logoImg}></img></Link>
                
                </div>
                {this.props.isMobile &&             <img id={styles.colorModeIcon}  src={this.props.darkMode? moonIcon : sunIcon} onClick={() => 
                        {
                            this.toggleMode();
                            this.changeModeVals()
                        }}></img>}
                <div ><img onClick=
                {() => {this.updateState();
                    this.enbaleMobileAnim();

                }} src={ this.props.darkMode ? blackIconBar: whiteIconBar} id={styles.iconImgBar}></img></div>
        </div>
            <div style={{position: this.state.toggleNavIcon && this.props.isMobile ? "absolute" : "static",top: (this.state.toggleNavIcon  && this.props.isMobile) ? "-1000px" : "50px", transition: (this.state.mobileAnim) ? "all 0.8s ease" : "none 0.8s ease" }} id={styles.navbarContents}>
                <ul style={{top: (this.state.toggleNavIcon  && this.props.isMobile) ? "-1000px" : "0", transition: (this.state.mobileAnim) ? "all 0.8s ease" : "none 0.8s ease"}  }>
                    <li><input placeholder='Search' id={styles.navbarSearch} /></li>
                    <li><p style={{color: "var(--fontColor)"}}><Link className={styles.links} to="/random">Random Manga</Link></p></li>
                    <li><p style={{color: "var(--fontColor)"}}><Link className={styles.links} to="/advancedSearch">Advanced Search</Link></p></li>
  
                </ul>
            </div>
            {!this.props.isMobile &&             <img id={styles.colorModeIcon}  src={this.state.darkMode? moonIcon : sunIcon} onClick={() => 
                        {
                            this.toggleMode();
                            this.changeModeVals()
                        }}></img>}
                </div>
                </>
    }
}
export default Divbar;