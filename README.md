# @fozikio/tools-reasoning

Cognitive reasoning plugin for cortex-engine. Higher-order thinking tools for abstraction, contradiction detection, signal surfacing, prospective memory, and explained retrieval.

## Install

```
npm install @fozikio/tools-reasoning
```

## Tools

| Tool | Description |
|------|-------------|
| `abstract` | Propose a higher-level concept that subsumes 2-10 memories using LLM reasoning |
| `contradict` | Record a contradiction between an observation and an existing belief or memory |
| `surface` | List unresolved cognitive signals -- contradictions, tensions, and gaps |
| `intention` | Set prospective memory reminders that surface when a trigger condition occurs |
| `notice` | Fast-path observation recording without embedding (embedded in next batch job) |
| `resolve` | Mark a cognitive signal as resolved with an optional note |
| `query_explain` | Semantic search over memory with LLM-generated relevance explanations |

## Usage

```yaml
# cortex-engine config
plugins:
  - package: "@fozikio/tools-reasoning"
```

```typescript
import reasoningPlugin from "@fozikio/tools-reasoning";
import { CortexEngine } from "@fozikio/cortex-engine";

const engine = new CortexEngine({
  plugins: [reasoningPlugin],
});
```

## Documentation

- **[Wiki](https://github.com/Fozikio/cortex-engine/wiki)** — Guides, architecture, and full tool reference
- **[Plugin Authoring](https://github.com/Fozikio/cortex-engine/wiki/Plugin-Authoring)** — Build your own plugins
- **[Contributing](https://github.com/Fozikio/.github/blob/main/CONTRIBUTING.md)** — How to contribute

## License

MIT
