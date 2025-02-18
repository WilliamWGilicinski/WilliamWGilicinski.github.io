/* eslint-disable react/no-unescaped-entities */
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import Layout from "@/components/layout"
import styles from "@/styles/Home.module.css"
import { useTheme } from "@/context/ThemeContext"
import Image from "next/image"

export default function Home() {
  const { theme } = useTheme()

  const MePic = "/me.png"
  const CutOut = "/cut_out.png"
  const March1 = 'IMG_9183.jpg'
  const March2 = 'IMG_9182.jpg'


  return (
    <Layout>
      <section className={`${styles.hero} bg-${theme}`}>
        <Container fluid className="px-3" style={{ maxWidth: "1200px" }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className={styles.heroTitle}>Hi, I'm William Gilicinski</h1>
              <p className={styles.heroSubtitle}>
                I'm a current computer science graduate from The Ohio State University and a software developer.
              </p>
              <div className={styles.buttonGroup}>
                <Button
                  variant="outline-primary"
                  size="lg"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.heroButton}
                >
                  View Resume
                </Button>
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
            <Image 
                src={CutOut}
                alt="Me and my roomates cat" 
                className={styles.heroImage} 
                width={1000}
                height={1000}
                priority
                loading="eager"
                unoptimized={true}  // Add this to prevent optimization issues
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Container fluid className="px-3" style={{ maxWidth: "1200px" }}>

      <section id="projects" className={`py-5 ${styles.section}`}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <Row>
          {projects.map((project) => (
              <Col key={project.title} md={4} className="mb-4">
                <Card onClick={() => window.open(project.link, "_blank")} border={project.title === "Marching Band Motion Capture" ? "warning" : "light"} className={`${styles.projectCard} bg-${theme} text-${theme === "dark" ? "light" : "dark"}`}>
                  <Card.Img 
                    className={styles.projectImage}
                    variant="top" 
                    src={project.image}
                    style={{ height: '200px', objectFit: 'cover' }}  /* Consistent image height */
                  />
                  <Card.Body className={styles.projectBody}>
                    <Card.Title style={{fontWeight: "bold"}}>{project.title}</Card.Title>
                    <Card.Text className={styles.projectText}>
                      {project.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        <hr className={styles.divider}></hr>
        <section id="about" className={`py-5 ${styles.section}`}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <div className={`${styles.aboutCard} bg-${theme}`}>
                <p className={styles.aboutText}>
                  I'm a software developer mostly experienced in web development with React and Node.js. This website, for example, is a static website created with Node.JS.
                  I also have experience with ASP.NET and C# for backend development. I also have experience with C, Java, Python, SQL, Unity, and more.
                </p>
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <Image 
                src={MePic}
                alt="Profile" 
                className={`rounded-circle ${styles.profileImage}`}
                width={800}
                height={800}
                priority
                loading="eager"
                unoptimized={true}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <div className={styles.imageContainer}>
                <Image 
                    src={March1}
                    alt="Me performing ramp" 
                    className={`${styles.transitionImage} ${styles.primaryImage}`}
                    width={1000}
                    height={1000}
                    priority
                    loading="eager"
                    unoptimized={true}
                />
                <Image 
                    src={March2}  // Your second image
                    alt="Also me performing ramp" 
                    className={`${styles.transitionImage} ${styles.secondaryImage}`}
                    width={1000}
                    height={1000}
                    priority
                    loading="eager"
                    unoptimized={true}
                />
              </div>
            </Col>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <div className={`${styles.aboutCard} bg-${theme}`}>
                <p className={styles.aboutText}>
                  I've spent three seasons in the Ohio State Marching Band or THE Best Damn Band In The Land (TBDBITL) playing Flugelhorn in C-Row. My last year I was the assistant squad leader.
                </p>
                <a href="https://youtu.be/pNUZEmnG8NQ?si=vRnUYGXrCbPg9rmZ&t=12">I even made a full face appearence on the Tennessee recap video </a>
              </div>
            </Col>
          </Row>
        </section>

        <section id="contact" className={`py-5 ${styles.section}`}>
          <h2 className={styles.sectionTitle}>Contact Me</h2>
          <Row>
            <Col md={6} className="mx-auto">
              <p className={styles.contactText}>
                Feel free to reach out to me for any inquiries or collaboration opportunities.
              </p>
              <ul className={styles.contactList}>
                <li style={{fontWeight: "bold"}}>Email: william.gilicinski@gmail.com</li>
                <a href="https://github.com/WilliamWGilicinski">
                  <img src="github.svg" style={{height: "100px", width: "100px"}}/>
                </a>
                <a href="https://www.linkedin.com/in/william-gilicinski/">
                  <img src="linkedin.svg" style={{height: "100px", width: "100px"}}/>
                </a>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    </Layout>
  )
}

class Project {
  title: string;
  description: string;
  image: string;
  link: string;

  constructor(title: string, description: string, image: string, link: string) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.link = link;
  }
}

const projects = [
  new Project("Marching Band Motion Capture", "In my motion capture class my final project was for me to perform every fundamental the marching band uses and then use that data to create a motion capture of me doing the fundamentals and put it on a website.", "/guide.png", "https://tbdbitlsummersessions.github.io/Trumpet/"),
  new Project("Final Bounty", "Final Bounty is a 2D top-down shooter game I made in Unity. It is a rouge lite game where you traverse a procedurally generated solar system and shoot different enemies. Along the way you can pick up power ups that change the way you play and deafeat bosses.", "/FinalBounty.png", "https://youtu.be/x0xJkJ7ULi0"),
  new Project("WebGL Scene", "I created a scene in raw WebGL that allows the user to move the camera around and apply transformations with different object.", "/Webgl.png", "/webgl")
];
