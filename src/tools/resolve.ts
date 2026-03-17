/**
 * resolve — mark a signal as resolved with an optional note.
 */

import type { ToolDefinition, ToolContext } from '@fozikio/cortex-engine';

const SIGNALS_COLLECTION = 'signals';

export const resolveTool: ToolDefinition = {
  name: 'resolve',
  description: 'Mark a signal as resolved with an optional note explaining how it was addressed.',
  inputSchema: {
    type: 'object',
    properties: {
      signal_id: { type: 'string', description: 'Signal document ID' },
      note: { type: 'string', description: 'How the signal was resolved' },
      namespace: { type: 'string', description: 'Namespace (defaults to default)' },
    },
    required: ['signal_id'],
  },

  async handler(args: Record<string, unknown>, ctx: ToolContext): Promise<Record<string, unknown>> {
    const signalId = typeof args['signal_id'] === 'string' ? args['signal_id'] : '';
    if (!signalId) return { error: 'signal_id is required' };

    const note = typeof args['note'] === 'string' ? args['note'] : '';
    const namespace = typeof args['namespace'] === 'string' ? args['namespace'] : undefined;

    const store = ctx.namespaces.getStore(namespace);

    const doc = await store.get(SIGNALS_COLLECTION, signalId);
    if (!doc) {
      return { error: `Signal ${signalId} not found` };
    }

    const now = new Date().toISOString();
    await store.update(SIGNALS_COLLECTION, signalId, {
      resolved: true,
      resolution_note: note,
      resolved_at: now,
    });

    return { action: 'resolved', signal_id: signalId, note };
  },
};
