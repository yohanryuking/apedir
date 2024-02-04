import React from "react";
import { FontBold20px } from "../../styles/styles";
import { useInView } from 'react-intersection-observer';

export default function TituloDeProductos(props) {
  const style = {
    width: "100%",
    marginTop: "60px",
    marginBottom: "30px",
  };

  const [ref, inView] = useInView({
    triggerOnce: false,
    onChange: inView => {
      if (inView) {
        props.onChangeTitle(props.title);
        //console.log(props.title)
      }
    },
   });

   
   
  return (
    <div id={props.title} style={style} className="mb-2" ref={ref}>
      <h2
        style={{
          ...FontBold20px,
          maxWidth: "70ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {" "}
        {props.title}
      </h2>
    </div>
  );
}
