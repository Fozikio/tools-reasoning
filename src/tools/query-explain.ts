/**
 * query_explain — semantic search over memory with LLM-generated relevance explanations.
 * Performs embedding-based retrieval then explains each result.
 */

import type { ToolDefinition, ToolContext } from 'cortex-engine';

export const queryExplainTool: ToolDefinition = {
  name: 'query_explain',
  description:
    'Semantic search over memory with one-sentence relevance explanations. Returns each result plus a "why" string explaining why that memory is relevant to the query.',
  inputSchema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: 'The query text' },
      top_k: { type: 'number', description: 'Number of results (default: 5)' },
      namespace: { type: 'string', description: 'Namespace (defaults to default)' },
    },
    required: ['text'],
  },

  async handler(args: Record<string, unknown>, ctx: ToolContext): Promise<Record<string, unknown>> {
    const text = typeof args['text'] === 'string' ? args['text'] : '';
    if (!text) return { error: 'text is required' };

    const topK = typeof args['top_k'] === 'number' ? args['top_k'] : 5;
    const namespace = typeof args['namespace'] === 'string' ? args['namespace'] : undefined;

    const store = ctx.namespaces.getStore(namespace);

    // Embed the query and find nearest memories
    const embedding = await ctx.embed.embed(text);
    const searchResults = await store.findNearest(embedding, topK);

    // Add LLM-generated relevance explanations
    const resultsWithWhy = await Promise.all(
      searchResults.map(async (r) => {
        const prompt = `In one sentence, why is this memory relevant to the query: ${text}? Memory: ${r.memory.name}: ${r.memory.definition ?? ''}.`;
        const why = await ctx.llm.generate(prompt, { temperature: 0.2 });
        return {
          id: r.memory.id,
          name: r.memory.name,
          definition: r.memory.definition,
          category: r.memory.category,
          score: r.score,
          why: why.trim(),
        };
      })
    );

    return {
      query: text,
      results: resultsWithWhy,
    };
  },
};
