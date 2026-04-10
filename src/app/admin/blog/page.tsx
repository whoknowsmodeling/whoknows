'use client';

/**
 * Blog Engine Admin Panel
 * /admin/blog
 *
 * Features:
 * - TanStack Table showing all blog drafts & published articles
 * - "Generate with Oracle" button → calls /api/cron/generate-blog
 * - Full-screen Markdown Editor Dialog to review/edit before publishing
 * - Status switch: DRAFT → PUBLISHED
 * - Delete blog
 */

import { useState, useEffect, useCallback } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import ReactMarkdown from 'react-markdown';
import {
  FileText, Sparkles, Loader2, RefreshCw, Trash2,
  CheckCircle2, Edit3, X, Eye, EyeOff, ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Blog {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  seoMetadata: {
    title?: string;
    metaDescription?: string;
    targetKeyword?: string;
    openGraphDescription?: string;
  } | null;
}

interface BlogFull extends Blog {
  content: string;
}

// ── Editor Modal ──────────────────────────────────────────────────────────────
function BlogEditorModal({
  blog,
  onClose,
  onSave,
  onPublish,
}: {
  blog: BlogFull;
  onClose: () => void;
  onSave: (id: string, data: Partial<BlogFull>) => Promise<void>;
  onPublish: (id: string) => Promise<void>;
}) {
  const [content, setContent] = useState(blog.content);
  const [title, setTitle] = useState(blog.title);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(blog.id, { title, content });
    setSaving(false);
  }

  async function handlePublish() {
    setPublishing(true);
    await onSave(blog.id, { title, content });
    await onPublish(blog.id);
    setPublishing(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex-shrink-0">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-violet-400" />
          <div>
            <p className="text-sm font-medium text-white">Blog Editor</p>
            <p className="text-xs text-neutral-500 font-mono">{blog.slug}</p>
          </div>
          <Badge variant="outline" className={cn('ml-2 text-xs', blog.status === 'PUBLISHED' ? 'text-emerald-400 border-emerald-500/40' : 'text-amber-400 border-amber-500/40')}>
            {blog.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreview(!preview)}
            className="text-neutral-400 hover:text-white"
          >
            {preview ? <EyeOff className="w-4 h-4 mr-1.5" /> : <Eye className="w-4 h-4 mr-1.5" />}
            {preview ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave} disabled={saving} className="border-neutral-700 text-white">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
            Save Draft
          </Button>
          {blog.status !== 'PUBLISHED' && (
            <Button size="sm" onClick={handlePublish} disabled={publishing} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              {publishing ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <CheckCircle2 className="w-4 h-4 mr-1.5" />}
              Publish
            </Button>
          )}
          <button onClick={onClose} className="ml-2 p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="px-6 py-3 border-b border-neutral-800 bg-neutral-950 flex-shrink-0">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-xl font-serif text-white placeholder:text-neutral-600 outline-none"
          placeholder="Article title..."
        />
        {blog.seoMetadata?.targetKeyword && (
          <p className="text-xs text-violet-400/70 mt-1 font-mono">🎯 Keyword: {blog.seoMetadata.targetKeyword}</p>
        )}
      </div>

      {/* Editor / Preview split area */}
      <div className="flex-1 overflow-hidden flex">
        {!preview ? (
          <ScrollArea className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full min-h-[60vh] bg-transparent text-neutral-300 text-sm leading-relaxed p-6 outline-none resize-none font-mono"
              placeholder="Markdown content..."
            />
          </ScrollArea>
        ) : (
          <ScrollArea className="flex-1 p-8">
            <article className="prose prose-invert prose-neutral max-w-4xl mx-auto prose-headings:text-white prose-h1:text-3xl prose-h1:font-serif prose-p:text-neutral-300 prose-a:text-violet-400 prose-strong:text-white">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </ScrollArea>
        )}

        {/* SEO Sidebar */}
        {blog.seoMetadata && (
          <div className="w-72 border-l border-neutral-800 bg-neutral-950/50 p-5 overflow-y-auto flex-shrink-0 hidden xl:block">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">SEO Metadata</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-neutral-600 mb-1">META TITLE</p>
                <p className="text-xs text-white bg-neutral-800/60 rounded p-2">{blog.seoMetadata.title || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">META DESCRIPTION</p>
                <p className="text-xs text-neutral-300 bg-neutral-800/60 rounded p-2 leading-relaxed">{blog.seoMetadata.metaDescription || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">TARGET KEYWORD</p>
                <p className="text-xs text-violet-300 bg-violet-900/20 border border-violet-800/30 rounded p-2 font-mono">{blog.seoMetadata.targetKeyword || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">OG DESCRIPTION</p>
                <p className="text-xs text-neutral-400 bg-neutral-800/60 rounded p-2 leading-relaxed">{blog.seoMetadata.openGraphDescription || '—'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogEnginePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [editBlog, setEditBlog] = useState<BlogFull | null>(null);
  const [loadingEdit, setLoadingEdit] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  async function generateBlog() {
    setGenerating(true);
    try {
      const res = await fetch('/api/cron/generate-blog');
      const data = await res.json();
      if (data.success) {
        await fetchBlogs();
      } else {
        alert('Oracle error: ' + (data.error || 'Unknown'));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to trigger Oracle engine.');
    } finally {
      setGenerating(false);
    }
  }

  async function openEditor(blogId: string) {
    setLoadingEdit(blogId);
    const res = await fetch(`/api/admin/blog/${blogId}`);
    const data: BlogFull = await res.json();
    setEditBlog(data);
    setLoadingEdit(null);
  }

  async function saveBlog(id: string, updates: Partial<BlogFull>) {
    await fetch(`/api/admin/blog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    await fetchBlogs();
  }

  async function publishBlog(id: string) {
    await fetch(`/api/admin/blog/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'PUBLISHED' }),
    });
    await fetchBlogs();
  }

  async function deleteBlog(id: string) {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    await fetchBlogs();
  }

  // ── TanStack Table Columns ─────────────────────────────────────────────────
  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <p className="text-sm font-medium text-white truncate max-w-xs">{row.original.title}</p>
          <p className="text-xs text-neutral-600 font-mono mt-0.5 truncate max-w-xs">/{row.original.slug}</p>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge variant="outline" className={cn('text-xs', status === 'PUBLISHED' ? 'text-emerald-400 border-emerald-500/40' : 'text-amber-400 border-amber-500/40')}>
            {status === 'PUBLISHED' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'seoMetadata',
      header: 'Target Keyword',
      cell: ({ getValue }) => {
        const meta = getValue() as { targetKeyword?: string } | null;
        return <span className="text-violet-400/80 text-xs font-mono">{meta?.targetKeyword || '—'}</span>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ getValue }) => (
        <span className="text-neutral-500 text-xs font-mono">
          {format(new Date(getValue() as string), 'MMM d, yyyy')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 justify-end">
          {row.original.status === 'PUBLISHED' && (
            <a href={`/blog/${row.original.slug}`} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-neutral-400 hover:text-white"
            onClick={() => openEditor(row.original.id)}
            disabled={loadingEdit === row.original.id}
          >
            {loadingEdit === row.original.id
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <Edit3 className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500/70 hover:text-red-400 hover:bg-red-500/10"
            onClick={() => deleteBlog(row.original.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({ data: blogs, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="space-y-8">
      {editBlog && (
        <BlogEditorModal
          blog={editBlog}
          onClose={() => setEditBlog(null)}
          onSave={saveBlog}
          onPublish={publishBlog}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-light tracking-tight">Blog Engine</h1>
          <p className="text-neutral-500 text-sm mt-1">Oracle-powered programmatic SEO content pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchBlogs} disabled={loading} className="border-neutral-700 text-neutral-400 hover:text-white">
            <RefreshCw className={cn('w-4 h-4 mr-2', loading && 'animate-spin')} />
            Refresh
          </Button>
          <Button
            onClick={generateBlog}
            disabled={generating}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/30"
          >
            {generating
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Oracle is generating...</>
              : <><Sparkles className="w-4 h-4 mr-2" /> Generate with Oracle</>
            }
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Articles', value: blogs.length, color: 'text-white' },
          { label: 'Published', value: blogs.filter(b => b.status === 'PUBLISHED').length, color: 'text-emerald-400' },
          { label: 'Drafts', value: blogs.filter(b => b.status === 'DRAFT').length, color: 'text-amber-400' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-neutral-900/50 border-neutral-800">
            <CardContent className="p-5">
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</p>
              <p className={cn('text-3xl font-serif mt-1', stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles Table */}
      <Card className="bg-neutral-900/50 border-neutral-800">
        <CardHeader className="border-b border-neutral-800 pb-4">
          <CardTitle className="text-base font-medium text-white">All Articles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-neutral-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Loading articles...
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-neutral-600 gap-3">
              <FileText className="w-8 h-8" />
              <p className="text-sm">No articles yet. Click "Generate with Oracle" to start.</p>
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id} className="border-b border-neutral-800 bg-neutral-900/80">
                      {hg.headers.map((header) => (
                        <th key={header.id} className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, idx) => (
                    <tr key={row.id} className={cn('border-b border-neutral-800/60 hover:bg-neutral-800/30 transition-colors', idx % 2 === 0 ? '' : 'bg-neutral-900/20')}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-4">
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
