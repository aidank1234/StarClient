import Starfield from 'react-starfield';
import React, { useEffect, useState } from 'react';
import './App.css';
import Lottie from 'react-lottie';
import animationData from './rocketAnimation.json';
import buttonAnimationData from './starsAnimation.json';
import { useMediaQuery } from 'react-responsive'
import { TypeAnimation } from 'react-type-animation';
import AnimatedCanvas from './AnimatedCanvas';
import html2canvas from 'html2canvas';

function App() {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const buttonLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const inputStyle = {
    height: '30px',
    width: '250px',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid #4285f4', // Your blue color
    color: '#4285f4', // Text color
    outline: 'none',
    fontSize: '18px', // Adjust as needed
    fontFamily: 'Orbitron',
    '::placeholder': { // Placeholder text color
      color: '#4285f4',
      opacity: 1 // Make sure placeholder text is fully visible
    }
  };

  const isTabletOrMobile = useMediaQuery({ maxWidth: 667 })

  const [starsTapped, setStarsTapped] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isShared, setIsShared] = useState(false);

  const clickStars = () => {
    if (inputText) {
      setStarsTapped(true);
    }
  }

  const shareConstellation = () => {
    setIsShared(true);
  };

  useEffect(() => {
    if (isShared) {
      // Assuming the div you want to capture has an id="shareConstellationBox"
      const element = document.getElementById('shareConstellationBox');
      if (element) {
        // Temporarily change the background to black
        const originalBackground = element.style.backgroundColor;
        element.style.backgroundColor = 'black';
  
        html2canvas(element)
          .then((canvas) => {
            // Create an image and trigger a download
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement('a');
            link.download = `${inputText || 'constellation'}.png`;
            link.href = image;
            link.click();
  
            // Reset the background color after the capture
            element.style.backgroundColor = originalBackground;
          })
          .catch(err => console.error('Failed to capture the canvas:', err))
          .finally(() => {
            // Reset shared state and any temporary styles if needed
            setIsShared(false);
            // You might also want to reset the background color here again, 
            // in case the .then() block didn't execute due to errors.
          });
      }
    }
  }, [isShared, inputText]);

  return (
    <div className="App">
      <Starfield
        starCount={2000}
        starColor={[66, 133, 244]}
        speedFactor={0.1}
        backgroundColor="black"
      />

      <div className='pageContents'>
        <div className='horizontallyCentered'>
          <div className='logoBox'>
          <img src="starNoBg.png" alt="Logo" style={{ height: '100px' }} /> {/* Adjust logo size as needed */}
          <p style={{color: "#4285f4", fontWeight: '600', fontSize: '30px'}}>$STAR</p>
          </div>
        </div>
        <div className='horizontallyCentered'>
          <div className='subtitleBox'>
            <p style={{color: "#39ff14", fontWeight: '400', fontSize: isTabletOrMobile ? "25px" : "40px"}}>Lets go to the $STARs, together</p>
          </div>
        </div>
        <div className='socials'>
          <div className='socialBox'>
            <img src="x.png" alt="X" style={{ height: '40px' }} /> {/* Adjust logo size as needed */}
          </div>
          <div className='socialBox'>
            <img src="telegram.png" alt="Telegram" style={{ height: '100px' }} /> {/* Adjust logo size as needed */}
          </div>
        </div>
        <div className='horizontallyCentered'>
          <div className='caBox'>
              <Lottie 
                options={lottieOptions}
                height={50}
                width={50}
                isClickToPauseDisabled={true}
              />
              <p style={{color: "#4285f4", fontWeight: '500', fontSize: isTabletOrMobile ? "8px" : "13px"}}>0x0000000000000000000000000000000000000000</p>
          </div>
        </div>
        <div className='horizontallyCentered'>
          <div className='descriptionBox'>
          <TypeAnimation
              style={{ whiteSpace: 'pre-line', height: '380px', display: 'block', color: "#39ff14", fontSize: '20px' }}
              sequence={[
                `$STAR...
                
            is a fair launch token with liquidity burnt
            
            has a total supply allocation of:\n
            LP 85%
            Airdrop 9%
            Team / Marketing 6%
                
            To the $STARs we go.` // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
              ]}
              repeat={0}
            />
          </div>
        </div>
        <div className="horizontallyCentered">
          {!starsTapped &&
            <div className='drawConstellationBox'>
            <div>
              <p style={{color: "#39ff14", fontWeight: '400', fontSize: "18px"}}>Generate a constellation in the $STARs...</p>
            </div>
            <div className="inputBox">
              <input  style={inputStyle} type="text" placeholder="Constellation name..." value={inputText} // Controlled input
                onChange={(e) => setInputText(e.target.value)}/>
              <div onClick={clickStars} style={{ cursor: "pointer", marginLeft: '10px', height: '40px', width: '40px', backgroundColor: 'transparent', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Lottie options={buttonLottieOptions} height={50} width={50} isClickToPauseDisabled={true} />
              </div>
          </div>
          </div>
          }
          {starsTapped &&
            <div id='shareConstellationBox' className="shareConstellationBox">
              <div>
                <p style={{color: "#39ff14", fontWeight: '400', fontSize: "18px"}}>{inputText}</p>
              </div>
              <div className='horizontallyCentered'>
              <div style={{width: '100px', height: '100px'}}>
                <AnimatedCanvas />
              </div>
                </div>
                {!isShared &&
                  <button onClick={shareConstellation} style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    fontFamily: 'Orbitron',
                    fontSize: '18px',
                    borderRadius: '10px',
                    border: 'none',
                    color: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)', // Semi-transparent blue
                    cursor: 'pointer',
                    outline: 'none'
                  }}>Share Constellation</button>
                }
                {isShared && 
                  <div className='horizontallyCentered'>
                  <div className='logoBoxMini'>
                  <img src="starNoBg.png" alt="Logo" style={{ height: '50px' }} /> {/* Adjust logo size as needed */}
                  <p style={{color: "#4285f4", fontWeight: '500', fontSize: '18px'}}>$STAR</p>
                  </div>
                </div>
                }
            </div>
          }
          
      </div>
      </div>
    </div>
  );
}

export default App;
