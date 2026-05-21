import { motion } from 'framer-motion';

const CodeSnippet = () => (
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
      <span className="text-xs text-muted-foreground ml-2">main.tf</span>
    </div>

    {/* Code Content */}
    <div className="code-content text-xs sm:text-sm space-y-1">
      <div>
        <span className="code-keyword">resource </span>
        <span className="code-string">"aws_ecs_service"</span>
        <span className="code-string"> "api"</span>
        <span className="text-muted-foreground"> {'{'}</span>
      </div>
      <div className="pl-4">
        <span className="code-variable">cluster</span>
        <span className="text-muted-foreground"> = </span>
        <span className="code-function">aws_ecs_cluster</span>
        <span className="text-muted-foreground">.</span>
        <span className="code-variable">main.arn</span>
      </div>
      <div className="pl-4">
        <span className="code-variable">launch_type</span>
        <span className="text-muted-foreground"> = </span>
        <span className="code-string">"FARGATE"</span>
      </div>
      <div className="pl-4">
        <span className="code-variable">desired_count</span>
        <span className="text-muted-foreground"> = </span>
        <span className="code-keyword">3</span>
      </div>
      <div className="pl-4 pt-1">
        <span className="code-function">network_configuration</span>
        <span className="text-muted-foreground"> {'{'}</span>
      </div>
      <div className="pl-8">
        <span className="code-variable">assign_public_ip</span>
        <span className="text-muted-foreground"> = </span>
        <span className="code-keyword">false</span>
      </div>
      <div className="pl-4">
        <span className="text-muted-foreground">{'}'}</span>
      </div>
      <div>
        <span className="text-muted-foreground">{'}'}</span>
      </div>
    </div>
  </motion.div>
);

export default CodeSnippet;
