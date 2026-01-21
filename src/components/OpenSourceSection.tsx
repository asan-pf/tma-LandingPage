import { motion } from 'framer-motion';
import { Github, GitPullRequest, FileText, MessageSquare, Star, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GITHUB_LINK = 'https://github.com/asan-pf/tma-ofm-react-template';

const contributeCards = [
  { icon: CircleDot, title: 'Issues', link: `${GITHUB_LINK}/issues` },
  { icon: GitPullRequest, title: 'PRs', link: `${GITHUB_LINK}/pulls` },
  { icon: FileText, title: 'Docs', link: `${GITHUB_LINK}#readme` },
  { icon: MessageSquare, title: 'Feedback', link: `${GITHUB_LINK}/issues/new` },
];

const OpenSourceSection = () => {
  return (
    <section id="opensource" className="relative py-16 sm:py-20 md:py-24">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] text-primary uppercase mb-3">
            Community
          </p>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl mb-3">
            OPEN <span className="text-gradient-primary">SOURCE</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Built in public. Contributions welcome.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
          {contributeCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="feature-card group p-4 text-center cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2 mx-auto group-hover:bg-primary/20 transition-colors">
                <card.icon className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-display font-semibold text-sm group-hover:text-primary transition-colors">
                {card.title}
              </h4>
            </motion.a>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button className="btn-primary-gradient gap-2 rounded-full" asChild>
            <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>
          </Button>
          <Button variant="ghost" className="btn-ghost-glass gap-2 rounded-full" asChild>
            <a href={`${GITHUB_LINK}/fork`} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Fork
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
