import { Bodies, Composite, Engine, Runner } from "matter-js";
import { MutableRefObject, createElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import King from "./King";
import Matter from "matter-js";
import Container from "./Container";
import TreeBackground from "./TreeBackground";

export default function Test(props: { handleThemeChange: any }) {
    const { handleThemeChange } = props;


    interface Object {
        x: number;
        y: number;
        rot: number;
    }

    const boxRef = useRef(null) as any;
    const canvasRef = useRef(null) as any;
    const objects = useRef<Object[]>([]);
    var playerObj = useRef<Body>() as any;
    const [, setAnim] = useState(0);

  useEffect(() => {

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    var engine = Engine.create();
    var world = engine.world;

    var render = Render.create({
        element: boxRef.current,
        engine: engine,
        canvas: canvasRef.current,
        options: {
            background: 'transparent',
            wireframes: false
        }
    });

    Render.run(render);

    var runner = Runner.create();
    Runner.run(runner, engine);

    // create two boxes and a ground
    var player = Bodies.rectangle(400, 200, 80, 80, {render: {visible: false}});
    playerObj.current = player;
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(world, [ground, player]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    let unsubscribe: number;

    function animate() {
      let i = 0;
      for (const body of Composite.allBodies(world)) {
        if (body.isStatic) continue;
        

        if(playerObj.current === body){
            objects.current[i] = { x: body.position.x, y: body.position.y, rot: body.angle };
        }
        

        i += 1;
      }

      setAnim((x) => x + 1);

      unsubscribe = requestAnimationFrame(animate);
    }

    unsubscribe = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(unsubscribe);
    };
  }, []);

  var page = () => {
    return (
        <div ref={boxRef}>
            {objects.current.map((position, key) => (
                <King
                key={key}
                style={{ top: position.y + 110, left: position.x + 60, rotate: `${position.rot}rad`}}
                />
            ))};
        </div>
    )

  }

  var testPage = () => {
    return (
        <TreeBackground/>
    )
  }

  return (
    <Container handleThemeChange={handleThemeChange} title="Test" page={page()}/>
  );
}