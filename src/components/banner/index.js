import React from "react";

const Banner = () => {
  return (
    <div
      style={{
        paddingLeft: 50,
        paddingRight: 50,
        zIndex: -99999,
        position: 'relative',
        marginTop: -15,
        // left: 30,
      }}
    >
      {/* <div id="logo" style={{ width: "100%", height: 400, borderRadius: 20, overflow: 'hidden'  }}> */}
      <img
        src="https://trueman-react.vercel.app/img/banner2.jpg"
        style={{ width: "100%", height: 400, borderRadius: 20, objectFit: 'cover'}}
        
        alt="banner_image"
      />
      {/* </div> */}
    </div>
  );
};

export default Banner;
