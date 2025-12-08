import { motion } from 'framer-motion';

const CodeSnippet = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="code-window max-w-sm w-full shadow-card"
    >
      {/* Window Header */}
      <div className="code-header">
        <div className="flex gap-1.5">
          <div className="code-dot bg-red-500/80" />
          <div className="code-dot bg-yellow-500/80" />
          <div className="code-dot bg-green-500/80" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">api.service.ts</span>
      </div>
      
      {/* Code Content */}
      <div className="code-content text-xs sm:text-sm">
        <div className="space-y-1">
          <div>
            <span className="code-keyword">async</span>{' '}
            <span className="code-function">createUser</span>
            <span className="code-variable">(dto: CreateUserDto)</span>
          </div>
          <div className="pl-4">
            <span className="code-keyword">const</span>{' '}
            <span className="code-variable">user</span>{' '}
            <span className="text-muted-foreground">=</span>{' '}
            <span className="code-keyword">await</span>{' '}
            <span className="code-variable">this</span>
            <span className="text-muted-foreground">.</span>
            <span className="code-function">db</span>
            <span className="text-muted-foreground">.</span>
            <span className="code-function">create</span>
            <span className="code-variable">(dto)</span>
          </div>
          <div className="pl-4">
            <span className="code-keyword">return</span>{' '}
            <span className="text-muted-foreground">{'{'}</span>
            <span className="code-variable"> success</span>
            <span className="text-muted-foreground">:</span>{' '}
            <span className="code-keyword">true</span>
            <span className="text-muted-foreground">,</span>
            <span className="code-variable"> user</span>
            <span className="text-muted-foreground"> {'}'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;