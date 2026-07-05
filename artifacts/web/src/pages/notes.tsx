import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useListNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
  getListNotesQueryKey,
} from "@workspace/api-client-react";
import type { Note } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, StickyNote, X, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Notes() {
  const queryClient = useQueryClient();
  const queryKey = getListNotesQueryKey();

  const { data: notes = [], isLoading } = useListNotes({ query: { queryKey } });

  // New note form state
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = useCreateNote({
    mutation: {
      onSuccess: (note) => {
        queryClient.invalidateQueries({ queryKey });
        setCreating(false);
        setNewTitle("");
        setNewContent("");
        toast.success(`Note "${note.title}" created`);
      },
      onError: () => toast.error("Failed to create note"),
    },
  });

  const updateMutation = useUpdateNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        setEditingId(null);
        toast.success("Note saved");
      },
      onError: () => toast.error("Failed to save note"),
    },
  });

  const deleteMutation = useDeleteNote({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success("Note deleted");
      },
      onError: () => toast.error("Failed to delete note"),
    },
  });

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    createMutation.mutate({ data: { title: newTitle.trim(), content: newContent } });
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleUpdate = () => {
    if (!editingId || !editTitle.trim()) return;
    updateMutation.mutate({ id: editingId, data: { title: editTitle.trim(), content: editContent } });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate({ id: deleteId });
    setDeleteId(null);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notes</h1>
          <p className="text-muted-foreground mt-1">Your personal notes, always in sync.</p>
        </div>
        {!creating && (
          <Button onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        )}
      </div>

      {/* New note form */}
      {creating && (
        <Card className="shadow-sm border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
            />
            <Textarea
              placeholder="Write your note here..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => { setCreating(false); setNewTitle(""); setNewContent(""); }}
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newTitle.trim() || createMutation.isPending}
              >
                <Check className="h-4 w-4 mr-1" />
                {createMutation.isPending ? "Saving..." : "Save Note"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes list */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground border-2 border-dashed rounded-lg">
          <StickyNote className="h-10 w-10 mb-3 opacity-40" />
          <p className="font-medium">No notes yet</p>
          <p className="text-sm mt-1">Click "New Note" to create your first one.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <Card key={note.id} className="shadow-sm group">
              {editingId === note.id ? (
                <CardContent className="pt-4 space-y-3">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleUpdate}
                      disabled={!editTitle.trim() || updateMutation.isPending}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {updateMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">{note.title}</CardTitle>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(note)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => setDeleteId(note.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {note.content ? (
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
                        {note.content}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground/50 italic">No content</p>
                    )}
                    <p className="text-xs text-muted-foreground/60 mt-3">
                      Updated {format(new Date(note.updatedAt), "MMM d, yyyy")}
                    </p>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete note?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
