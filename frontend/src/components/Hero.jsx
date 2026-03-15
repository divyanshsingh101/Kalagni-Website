import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const containerRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableDistance = container.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / totalScrollableDistance, 0), 1);

      const maxMove = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxMove}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ height: "600vh", backgroundColor: "#f4f1ea" }}>
      <div style={{ position: "sticky", top: 0, overflow: "hidden", height: "100vh" }}>
        <div ref={trackRef} style={{ display: "flex", height: "100%", width: "400vw" }}>
          
          {/* FRAME 1 */}
          <Section>
            <h2 style={styles.hugeText}>THE<br/>KALAGNI</h2>
            <ParallaxBox 
                speed={0.3} top="60%" left="62%" zIndex={5}
                width="320px" height="700px" color="#d98c8c" 
                label="OUR STORY" stopLimit={250} bigLetter="K"
            />
            <ParallaxBox 
                speed={0.3} top="50%" left="80%" zIndex={5}
                width="320px" height="700px" color="#e8c382" 
                label="ARTISTS" stopLimit={250} bigLetter="A"
            />
          </Section>

          {/* FRAME 2 */}
          <Section>
            <div style={{ maxWidth: "500px", marginLeft: "50vw", zIndex: 6 }}>
              <h2 style={styles.titleText}>STORIES THAT FIND YOU</h2>
              <p style={styles.subText}>A hybrid concept. Part art gallery and part experiential environment.</p>
            </div>
            <ParallaxBox 
                speed={0.5} top="40%" left="-2%" zIndex={5}
                width="300px" height="800px" color="#eb5e28" 
                label="GALLERY" stopLimit={250} bigLetter="L"
            />
            <ParallaxBox 
                speed={0.5} top="60%" left="10%" zIndex={1}
                width="300px" height="800px" color="#7da3a1" 
                label="EVENTS" stopLimit={500} bigLetter="A"
            />
          </Section>

          {/* FRAME 3 */}
          <Section>
             <ParallaxBox 
                speed={0.4} top="70%" left="15%" zIndex={2}
                width="400px" height="500px" color="#8d3b3b" 
                label="COMMUNITY" stopLimit={350} bigLetter="L"
             />
             <h2 style={{...styles.titleText, marginLeft: "10vw"}}>ART OF<br/>GIVING</h2>
          </Section>

          {/* FRAME 4 */}
          <Section>
            <ParallaxBox 
                speed={0.6} top="80%" left="30%" zIndex={10}
                width="400px" height="600px" color="#264653" 
                label="PROJECTS" stopLimit={450} bigLetter="A"
            />
            <h1 style={{...styles.hugeText, fontSize: '10vw'}}>FREEDOM</h1>
          </Section>
        </div>
      </div>
    </div>
  );
}

const ParallaxBox = ({ localProgress = 0, speed, top, left, width, height, color, label, zIndex = 2, stopLimit = 500, bigLetter = "" }) => {
  const movement = Math.max(0, localProgress) * 1000 * speed;
  const clampedY = Math.min(movement, stopLimit);

  return (
    <div style={{
      position: "absolute",
      top, left, width, height, zIndex,
      backgroundColor: color,
      transform: `translateY(-${clampedY}px)`,
      display: "flex",
      padding: "20px",
      boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
      transition: "transform 0.1s ease-out",
      overflow: "hidden" 
    }}>
      {label && <span style={styles.boxLabel}>{label}</span>}
      
      {/* VERTICALLY STRETCHED LETTER */}
      {bigLetter && (
        <span style={{
          position: "absolute",
          bottom: "30%",
          right: "10%",   
          fontSize: "400px", 
          fontWeight: "900",
          color: "rgba(0, 0, 0, 0.9)",
          lineHeight: "0.7",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "sans-serif", 
          
        
          display: "inline-block",
          transform: "scaleY(1.3) scaleX(0.60)", 
          transformOrigin: "bottom right" 
        }}>
          {bigLetter}
        </span>
      )}
    </div>
  );
};
const Section = ({ children }) => {
  const sectionRef = useRef();
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const calculateLocalProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = (window.innerWidth - rect.left) / (window.innerWidth + rect.width);
      setLocalProgress(progress);
    };

    window.addEventListener("scroll", calculateLocalProgress);
    calculateLocalProgress();
    return () => window.removeEventListener("scroll", calculateLocalProgress);
  }, []);

  return (
    <div ref={sectionRef} style={styles.sectionStyle}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === ParallaxBox) {
          return React.cloneElement(child, { localProgress });
        }
        return child;
      })}
    </div>
  );
};

const styles = {
  sectionStyle: {
    width: "100vw", height: "100vh", position: "relative",
    display: "flex", alignItems: "center", flexShrink: 0, overflow: "hidden"
  },
  hugeText: { fontSize: "12vw", lineHeight: "0.9", fontWeight: "900", color: "#1a1a1a", marginLeft: "5vw", zIndex: 5 },
  titleText: { fontSize: "5vw", fontWeight: "800", textTransform: "uppercase", zIndex: 6 },
  subText: { fontSize: "1.2rem", lineHeight: "1.6", color: "#444", marginTop: "10px" },
  boxLabel: { writingMode: "vertical-rl", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px", zIndex: 3 }
};

export default Hero;