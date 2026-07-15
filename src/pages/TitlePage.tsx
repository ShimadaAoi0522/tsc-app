import "./TitlePage.css"

import hinomaru from "../assets/images/hinomaru.png"
import sakura1mai from "../assets/images/sakura1mai.png"
import sakura2mai from "../assets/images/sakura2mai.png"


function TitlePage() {
    return (
            <div className= "title-page">
                <div className="title-container">
                    <h1 className="title-logo">
                        <span className="title-black">T</span>
                        <span className="title-red">O</span>
                        <span className="title-black">K</span>
                        <span className="title-black">Y</span>
                        <span className="title-red">O</span>
                    </h1>
                    <div className="title-subtitle">
                        <h3 className="swipe">SWIPE</h3>
                        <h3 className="cultures">CULTURES</h3>
                    </div>
                    <img
                        className="hinomaru"
                        src={hinomaru}
                        alt= "中央の装飾, 日の丸模様"
                    />
                    <img
                        className="sakura1mai"
                        src={sakura1mai}
                        alt= "桜の花びら1枚"
                    />
                    <img
                        className="sakura1mai2"
                        src={sakura1mai}
                        alt= "桜の花びら1枚"
                    />
                    <img 
                        className="sakura2mai"
                        src={sakura2mai}
                        alt="桜の花びら2枚"
                    />
                    <img 
                        className="sakura2mai2"
                        src={sakura2mai}
                        alt="桜の花びら2枚"
                    />
                    <img 
                        className="sakura2mai3"
                        src={sakura2mai}
                        alt="桜の花びら2枚"
                    />
                    <div className="center-line top"></div>
                    <div className="center-line bottom"></div>

                </div>
            </div>
    )
}
export default TitlePage