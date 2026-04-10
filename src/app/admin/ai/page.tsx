'use client';

/**
 * WK_Ai Intelligence Panel
 * /admin/ai
 *
 * Features:
 *  - Real-time chat interface with WK_Ai (Gemini-backed COO assistant)
 *  - Read-only Ai Audit Log ledger table (TanStack Table)
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Send, Loader2, RefreshCw, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp?: Date;
}

interface AuditLog {
  id: string;
  actor: string;
  actionType: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

// ── Audit Log Table Columns ───────────────────────────────────────────────────
const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Timestamp',
    cell: ({ getValue }) => (
      <span className="text-neutral-400 text-xs font-mono">
        {format(new Date(getValue() as string), 'MMM d, yyyy HH:mm:ss')}
      </span>
    ),
  },
  {
    accessorKey: 'actor',
    header: 'Actor',
    cell: ({ getValue }) => {
      const val = getValue() as string;
      const colorMap: Record<string, string> = {
        WK_AI: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
        ADMIN_LENNY: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        ADMIN_BUNNY: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
        SYSTEM_CRON: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
      return (
        <span className={cn('px-2 py-0.5 rounded text-xs font-mono border', colorMap[val] || 'bg-neutral-700 text-neutral-300 border-neutral-600')}>
          {val}
        </span>
      );
    },
  },
  {
    accessorKey: 'actionType',
    header: 'Action',
    cell: ({ getValue }) => {
      const val = getValue() as string;
      const isError = val.includes('ERROR');
      return (
        <Badge variant="outline" className={cn('text-xs font-mono', isError ? 'text-red-400 border-red-500/40' : 'text-emerald-400 border-emerald-500/40')}>
          {val}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'payload',
    header: 'Payload Preview',
    cell: ({ getValue }) => {
      const payload = getValue() as Record<string, unknown>;
      const preview = JSON.stringify(payload).slice(0, 80) + '...';
      return <span className="text-neutral-500 text-xs font-mono">{preview}</span>;
    },
  },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function WKAiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "The systems are live and responsive, Boss. Total talent counts, new applications, and the latest contacts are all loaded into my briefing. What's on the agenda today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const res = await fetch('/api/admin/ai-logs?take=30');
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (e) {
      console.error('Failed to fetch logs:', e);
    } finally {
      setLogsLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          actor: 'ADMIN_LENNY',
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: data.reply || 'No response.', timestamp: new Date() },
      ]);
      // Refresh logs after new chat message
      fetchLogs();
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: 'I encountered a system error. Check network connectivity, Boss.', timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-light tracking-tight">WK_Ai Intelligence</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Your dedicated COO — powered by the Oracle Engine
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full">
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
          <span className="text-violet-300 text-xs font-medium">WK_Ai ONLINE</span>
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="bg-neutral-900/50 border-neutral-800 overflow-hidden">
        <CardHeader className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-violet-900/40">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base font-medium text-white">WK_Ai — Chief Operating Officer</CardTitle>
              <p className="text-neutral-500 text-xs">WhoKnows Models Intelligence Layer</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400/80 text-xs font-mono tracking-wider">v35.0.0 — OPENAI SYNC</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <ScrollArea className="h-[440px] p-6">
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={cn('flex gap-3', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-white text-black rounded-tr-sm'
                        : 'bg-neutral-800 text-neutral-100 rounded-tl-sm'
                    )}
                  >
                    {msg.role === 'model' ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                    {msg.timestamp && (
                      <p className={cn('text-[10px] mt-1.5 font-mono', msg.role === 'user' ? 'text-neutral-500' : 'text-neutral-600')}>
                        {format(msg.timestamp, 'HH:mm:ss')}
                      </p>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-neutral-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-neutral-800 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2 text-neutral-400 text-sm">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Analyzing agency data...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-neutral-800 p-4 flex gap-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Brief WK_Ai on your objective, Boss..."
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-violet-600 hover:bg-violet-500 text-white px-4 transition-all"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Audit Log Table */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader className="border-b border-neutral-800 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-base font-medium text-white">Immutable AI Audit Vault</CardTitle>
                <p className="text-neutral-500 text-xs">Read-only. All AI interactions permanently recorded.</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchLogs}
              disabled={logsLoading}
              className="text-neutral-400 hover:text-white"
            >
              <RefreshCw className={cn('w-4 h-4 mr-2', logsLoading && 'animate-spin')} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {logsLoading ? (
            <div className="flex items-center justify-center h-32 text-neutral-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading vault...
            </div>
          ) : logs.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-neutral-600 text-sm">
              No audit events recorded yet.
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="border-b border-neutral-800 bg-neutral-900/80">
                      {hg.headers.map((header) => (
                        <th key={header.id} className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, idx) => (
                    <tr key={row.id} className={cn('border-b border-neutral-800/60 hover:bg-neutral-800/30 transition-colors', idx % 2 === 0 ? '' : 'bg-neutral-900/30')}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
