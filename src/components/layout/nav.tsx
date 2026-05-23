'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { profile } from '@/content/profile';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const scrollDirection = useScrollDirection();
  const mounted = useMounted();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: scrollDirection === 'down' && !mobileMenuOpen ? -100 : 0,
          backgroundColor: isScrolled ? 'rgba(10, 10, 11, 0.8)' : 'rgba(10, 10, 11, 0)'
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 z-50 w-full border-b transition-colors duration-300',
          isScrolled ? 'border-white/10 backdrop-blur-md' : 'border-transparent'
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link 
            href="/" 
            className="group flex items-center gap-2 font-display text-xl font-bold tracking-tight"
          >
            <span className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-accent-foreground group-hover:rotate-12 transition-transform duration-300">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden sm:inline-block">{profile.name}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            <div className="mr-4 flex items-center gap-8 px-6 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Button variant="premium" size="sm" asChild>
              <Link href="#contact">Hire Me</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 rounded-full bg-foreground"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-foreground"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="mt-8"
              >
                <Button variant="glow" size="lg" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="#contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
