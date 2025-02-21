import Head from "next/head"
import { Navbar, Container, Nav } from "react-bootstrap"
import type React from "react"
import styles from "@/styles/Layout.module.css"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "@/context/ThemeContext"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme()

  return (
    <div className={theme} style={{ overflowX: 'hidden' }}>
      <Head>
        <title>WG Portfolio</title>
        <meta name="description" content="My personal portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <Navbar bg={theme} variant={theme} expand="lg" sticky="top" className={styles.navbar}>
        <Container fluid className="px-3" style={{ maxWidth: "1200px" }}>
          <Navbar.Brand href="/" className={styles.navbarBrand}>
            WG Portfolio
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/webgl" className={styles.navLink}>WebGL</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about" className={styles.navLink}>
                About
              </Nav.Link>
              <Nav.Link href="#projects" className={styles.navLink}>
                Projects
              </Nav.Link>
              <Nav.Link href="#contact" className={styles.navLink}>
                Contact
              </Nav.Link>
            </Nav>
            <ThemeToggle />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className={`${styles.main} container-fluid w-100`} style={{ maxWidth: "1200px" }}>
        {children}
      </main>

      <footer className={`bg-${theme} text-${theme === "dark" ? "light" : "dark"} text-center py-4 ${styles.footer}`}>
        <Container fluid className="px-3" style={{ maxWidth: "1200px" }}>
          <p className="fw-bold mb-0">2025 Will G.</p>
        </Container>
      </footer>
    </div>
  )
}

