import { Box, Typography } from "@mui/material";
import TopAppBar from "./TopAppBar";
import BottomBar from "./BottomBar";
import Container from "./Container";
import { useEffect, useRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";


export default function WebGL(props: {handleThemeChange: any}) {

    const {handleThemeChange} = props;

    const webgl = () => {
        return (
            <canvas></canvas>
        )
    }

    function Canvas() {
        const canvasRef = useRef<HTMLCanvasElement>(null);
      
        useEffect(() => {
          const canvas = canvasRef.current;
          if (canvas == null) return;
          const context = canvas.getContext("2d");
          //Our first draw
          if (context == null) return;
          context.fillStyle = "#000000";
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);

          

          let img = new Image();
      
          img.src = "https://i.imgur.com/vzGhITt.jpeg";
      
          img.onload = () => {
            context.drawImage(img, 0, 0, 300, 200);
          };
        }, []);
      
        return <canvas ref={canvasRef} />;
      }

      const canvas = Canvas();


    
    // in gl-react you need to statically define "shaders":
    const shaders = Shaders.create({
      helloGL: {
    // This is our first fragment shader in GLSL language (OpenGL Shading Language)
    // (GLSL code gets compiled and run on the GPU)
        frag: GLSL`
    precision highp float;
    varying vec2 uv;
    void main() {
      gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
    }`
    // the main() function is called FOR EACH PIXELS
    // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
    // we set in output the pixel color using the vec4(r,g,b,a) format.
    // see GLSL_ES_Specification_1.0.17
      }
    });

    const web = () => {
      return(
        <Surface width={300} height={300}>
          <Node shader={shaders.helloGL}/>
        </Surface>
      );
    }

    return(
        <Container handleThemeChange={handleThemeChange} title="webgl" page={web}/>
    )
}