/**
 * @fozikio/tools-reasoning — reasoning and cognitive tools plugin for cortex-engine.
 *
 * Provides 7 tools: abstract, contradict, surface, intention, notice, resolve, query_explain.
 * These tools use LLM for cognitive operations, store signals, and manage observations.
 */

import type { ToolPlugin } from 'cortex-engine';
import { abstractTool } from './tools/abstract.js';
import { contradictTool } from './tools/contradict.js';
import { surfaceTool } from './tools/surface.js';
import { intentionTool } from './tools/intention.js';
import { noticeTool } from './tools/notice.js';
import { resolveTool } from './tools/resolve.js';
import { queryExplainTool } from './tools/query-explain.js';

const plugin: ToolPlugin = {
  name: '@fozikio/tools-reasoning',
  tools: [
    abstractTool,
    contradictTool,
    surfaceTool,
    intentionTool,
    noticeTool,
    resolveTool,
    queryExplainTool,
  ],
};

export default plugin;

// Named re-exports for direct use
export { abstractTool } from './tools/abstract.js';
export { contradictTool } from './tools/contradict.js';
export { surfaceTool } from './tools/surface.js';
export { intentionTool } from './tools/intention.js';
export { noticeTool } from './tools/notice.js';
export { resolveTool } from './tools/resolve.js';
export { queryExplainTool } from './tools/query-explain.js';
