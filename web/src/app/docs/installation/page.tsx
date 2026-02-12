import Link from "next/link";
import { Callout } from "@/components/mdx";

export const metadata = {
  title: "Installation | Copilot Kit",
  description: "Get started with Copilot Kit in under a minute.",
};

export default function InstallationPage() {
  return (
    <div className="max-w-3xl">
      <nav className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
        <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-50">Docs</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-50">Installation</span>
      </nav>

      <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Installation
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Get started with Copilot Kit in under a minute.
        </p>
      </div>

      <section id="quick-start" className="mb-12 scroll-mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Quick Start
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          The fastest way to install Copilot Kit is using <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono">npx</code> in root project:
        </p>

        <pre className="p-4 rounded-lg bg-zinc-950 overflow-x-auto mb-4 text-sm font-mono text-zinc-100">
          npx @sk-labs/copilot-kit init
        </pre>

        <Callout type="info">
          <strong>Note:</strong> This command will create a <code>.github</code> folder in your current directory containing all agent, skill, and prompt templates.
        </Callout>
      </section>

      <section id="global-install" className="mb-12 scroll-mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Global Installation
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          Install the CLI globally to use <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono">copilot-kit</code> command anywhere:
        </p>

        <pre className="p-4 rounded-lg bg-zinc-950 overflow-x-auto mb-2 text-sm font-mono text-zinc-100">
          npm install -g @sk-labs/copilot-kit
        </pre>

        <pre className="p-4 rounded-lg bg-zinc-950 overflow-x-auto mb-4 text-sm font-mono text-zinc-100">
          cd your-project && copilot-kit init
        </pre>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Read other commands in <Link className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" href="/docs/cli">CLI commands</Link> documentation.
        </p>
      </section>

      <section id="structure" className="mb-12 scroll-mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          What Gets Installed
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          After running the installation command, you'll have the following structure:
        </p>

        <pre className="p-4 rounded-lg bg-zinc-950 overflow-x-auto mb-4 text-sm font-mono text-zinc-100">
{`.github/
├── agents/          # 16+ Custom Agents (.agent.md)
├── skills/          # 40+ Agent Skills (SKILL.md)
├── prompts/         # 11+ Prompt Workflows (.prompt.md)
├── instructions/    # Path-specific Instructions
├── copilot-instructions.md  # Global behavior rules
└── AGENTS.md        # Cross-agent documentation`}
        </pre>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">agents/</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Contains 16+ custom agent definitions as <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">.agent.md</code> files with YAML frontmatter for tools, handoffs, and model preferences
            </p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">skills/</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              40+ domain-specific skill modules following the <a href="https://agentskills.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">agentskills.io</a> open standard, loaded progressively by agents
            </p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">prompts/</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              11+ reusable prompt files (<code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">.prompt.md</code>) accessible as slash commands in Copilot Chat
            </p>
          </div>
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">instructions/</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Path-specific instruction files (<code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">*.instructions.md</code>) with <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">applyTo</code> glob patterns for targeted guidance
            </p>
          </div>
        </div>
      </section>

      <section id="requirements" className="mb-12 scroll-mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          System Requirements
        </h2>
        <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 mb-6">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>VS Code with GitHub Copilot extension</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Node.js 16.0 or later</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>npm or yarn package manager</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-green-600 dark:text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Git (for updates and version control)</span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
          Next Steps
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-6">
          Now that you have Copilot Kit installed, learn about the core concepts:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/agents"
            className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Agents →</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Learn about specialist AI agents
            </p>
          </Link>
          <Link
            href="/docs/skills"
            className="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
          >
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Skills →</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Discover 40+ domain-specific skills
            </p>
          </Link>
        </div>
      </section>

      <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Link
          href="/docs"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Introduction
        </Link>
        <Link
          href="/docs/agents"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:underline flex items-center gap-1"
        >
          Agents
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
