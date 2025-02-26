import type React from "react";
import { Link } from "react-router-dom";
import Header from "../sections/HomePage/Header";
import Footer from "../sections/HomePage/Footer";
import Hero from "../sections/HomePage/Hero";
import Card from "../components/Card/Card";

const components = [
  {
    title: "Tournament Component",
    subtitle: "Interactive Tournament Bracket",
    description: "A flexible tournament bracket component for managing and displaying competition structures.",
    imageUrl: "/react-components/CapturaTournament.PNG",
    imageAlt: "Tournament Bracket",
    tags: ["Interactive", "Sports", "Brackets"],
    path: "/tournament",
  },
  {
    title: "Card Component",
    subtitle: "Versatile Content Display",
    description: "A responsive card component perfect for displaying content in an organized and attractive way.",
    imageUrl: "/placeholder.svg?height=200&width=400",
    tags: ["UI", "Layout", "Content"],
    path: "/card",
  },
]

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <Hero />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Available Components</h2>
            <p className="mt-2 text-gray-600">
              Browse through our collection of components and click to see them in action.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  imageAlt={component.imageAlt}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
            {components.map((component) => (
              <Link key={component.path} to={component.path}>
                <Card
                  title={component.title}
                  subtitle={component.subtitle}
                  description={component.description}
                  imageUrl={component.imageUrl}
                  tags={component.tags}
                  actionLabel="View Component"
                />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

