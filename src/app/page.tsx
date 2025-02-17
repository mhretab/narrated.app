import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const data = {
    hero: {
      title: "Next.js Starter Kit",
      description: "Build modern, scalable web applications with an amazing tech stack.",
    },
    techcards: [
      {
        title: "TypeScript",
        description: "Strongly typed programming language",
        imageUrl: "https://www.typescriptlang.org/icons/icon-48x48.png",
        details: "TypeScript adds additional syntax to JavaScript to support a tighter integration with your editor.",
        index: 0,
      },
      {
        title: "Next.js",
        description: "React framework for production",
        imageUrl: "https://avatars.githubusercontent.com/u/126103961?s=200&v=4",
        details: "Next.js gives you the best developer experience with all the features you need for production.",
        index: 1,
      },
      {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework",
        imageUrl: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
        details: "Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need.",
        index: 2,
      },
      {
        title: "Turbopack",
        description: "Modern front-end build tool",
        imageUrl: "https://turbo.build/images/docs/pack/turbopack-hero-logo-dark.svg",
        details: "Turbopack is a Rust-based incremental bundler optimized for JavaScript and TypeScript, written by the creators of Webpack.",
        index: 3,
      },
      {
        title: 'shadcn/ui',
        description: 'Consistent UI components',
        imageUrl: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4',
        details: 'Beautifully designed components that you can copy and paste into your apps.',
        index: 4,
      },
      {
        title: "better-auth",
        description: "Secure authentication library",
        imageUrl: "https://avatars.githubusercontent.com/u/108468352?v=4",
        details: "Simple, secure, and extendable authentication for Next.js applications.",
        index: 5,
      },
      {
        title: "Drizzle ORM",
        description: "TypeScript-first ORM for PostgreSQL",
        imageUrl: "https://avatars.githubusercontent.com/u/108468352?v=4",
        details: "Drizzle ORM is a TypeScript ORM that feels like writing SQL, but with type safety and auto-completion.",
        index: 6,
      },
      {
        title: "PostgreSQL",
        description: "Robust relational database system",
        imageUrl: "https://www.postgresql.org/favicon.ico",
        details: "PostgreSQL is a powerful, open source object-relational database system.",
        index: 7,
      },
      {
        title: "Zod",
        description: "Schema validation and type safety",
        imageUrl: "https://raw.githubusercontent.com/colinhacks/zod/main/logo.svg",
        details: "Zod is a TypeScript-first schema declaration and validation library.",
        index: 8,
      }
    ],
  }

  return (
    <div className="dark min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background animate-gradient-xy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80 animate-text-shimmer">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in">
              {data.hero.description}
            </p>
            <Button 
              size="lg" 
              className="animate-bounce-subtle hover:animate-none transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            Powerful Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.techcards.map((tech, i) => (
              <div
                key={tech.index}
                className="group relative bg-card rounded-lg p-6 transition-all duration-500 hover:shadow-xl border border-border/40 hover:border-primary/20 animate-fade-up"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                <div className="flex items-start space-x-4 relative">
                  <div className="relative w-12 h-12 flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={tech.imageUrl}
                      alt={tech.title}
                      width={48}
                      height={48}
                      className="rounded-lg object-contain bg-secondary shadow-sm"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-2 truncate group-hover:text-primary transition-colors duration-300">
                      {tech.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 transition-colors duration-300">
                      {tech.description}
                    </p>
                    <p className="text-sm text-foreground/80 transition-colors duration-300">
                      {tech.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-8">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Next.js Starter Kit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
