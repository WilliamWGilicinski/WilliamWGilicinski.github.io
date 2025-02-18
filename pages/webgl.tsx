/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/layout"
import { Card, Container } from "react-bootstrap"
import styles from "@/styles/Home.module.css"
import { useTheme } from "@/context/ThemeContext"

export default function WebGL() {
  const { theme } = useTheme()

  return (

    
    <Layout>
      <Container fluid className={`py-5 ${styles.section} border-2`} style={{ maxWidth: "100vw", height: "50vh" }}>
        <iframe width="100%" height="100%" src="WebGL/index.html"></iframe>
      </Container>
      <Container className={`py-3 ${styles.section}`}>
          <Card className={`${styles.projectCard} bg-${theme} text-${theme === "dark" ? "light" : "dark"}`}>
            <Card.Body>
              <Card.Title style={{fontWeight: "bold"}}>WebGL Controls</Card.Title>
              <Card.Text>
              To Use the program press the 'r', 'y', 'p' to change the camera orientation
                <br/>
                To move the camera use 'v', 'c', 'f'
                <br/>
                To move the objects use 'w', 'a', 's', 'd'
                <br/>
                To move the objets orientation use 'b', 'n', 'm'
                <br/>
                To move the light use 1-6. I did this on a keypad keyboard so 5, 1, 2, 3 are like w, a, s, d and 4 and 6 move the light up and down<br/>
                <br/>
                Start the camera spinning around with 'z', and the objects spinning with 'x'
                <br/>
                Note: Capital inputs determine which direction orientation inputs move
                <br/>
                Chrome works the best so other browsers may have problems
              </Card.Text>
            </Card.Body>
          </Card>
      </Container>
    </Layout>
  )
} 