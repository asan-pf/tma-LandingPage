import { motion } from 'framer-motion';
import { MapPin, Github, Scale, CircleDot } from 'lucide-react';

const GITHUB_LINK = 'https://github.com/asan-pf/tma-ofm-react-template';

const footerLinks = [
  { label: 'GitHub', href: GITHUB_LINK, icon: Github },
  { label: 'License', href: `${GITHUB_LINK}/blob/main/LICENSE`, icon: Scale },
  { label: 'Issues', href: `${GITHUB_LINK}/issues`, icon: CircleDot },
];

const Footer = () => {
  return (
    <footer className="relative py-8 sm:py-10 border-t border-border/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-primary" />
            </div>
            <span className="font-display font-bold text-sm">OpenFreeMap</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon className="w-3 h-3" />
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[10px] text-muted-foreground/60 text-center mt-6"
        >
          © {new Date().getFullYear()} OpenFreeMap. MIT License.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
