import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Eye, EyeOff, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "vikaskharb00007@gmail.com";
const ADMIN_PASS = "miku@03love";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: bigint;
}

interface BlogManagementTabProps {
  actor: any;
}

const emptyForm = { title: "", content: "", author: "" };

export default function BlogManagementTab({ actor }: BlogManagementTabProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadPosts = async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const result = await actor.adminGetAllPosts(ADMIN_EMAIL, ADMIN_PASS);
      setPosts(result);
    } catch {}
    setLoading(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    loadPosts();
  }, [actor]);

  const formatDate = (time: bigint) => {
    const ms = Number(time / BigInt(1_000_000));
    return new Date(ms).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openNew = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content, author: post.author });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPost(null);
    setForm(emptyForm);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSaving(true);
    try {
      if (editingPost) {
        await actor.adminUpdatePost(
          ADMIN_EMAIL,
          ADMIN_PASS,
          editingPost.id,
          form.title,
          form.content,
          form.author,
        );
      } else {
        await actor.adminCreatePost(
          ADMIN_EMAIL,
          ADMIN_PASS,
          form.title,
          form.content,
          form.author,
        );
      }
      closeForm();
      await loadPosts();
    } catch {}
    setSaving(false);
  };

  const handleTogglePublish = async (post: BlogPost) => {
    if (!actor) return;
    setToggling(post.id);
    try {
      await actor.adminPublishPost(ADMIN_EMAIL, ADMIN_PASS, post.id);
      await loadPosts();
    } catch {}
    setToggling(null);
  };

  const handleDelete = async (post: BlogPost) => {
    if (!actor || !confirm(`Delete "${post.title}"?`)) return;
    setDeleting(post.id);
    try {
      await actor.adminDeletePost(ADMIN_EMAIL, ADMIN_PASS, post.id);
      await loadPosts();
    } catch {}
    setDeleting(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-amber-800">
          Blog Posts
        </h3>
        <Button
          type="button"
          onClick={openNew}
          className="bg-amber-700 hover:bg-amber-800 text-white text-sm"
          data-ocid="blog_mgmt.primary_button"
        >
          <Plus size={14} className="mr-1" />
          New Post
        </Button>
      </div>

      {showForm && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h4 className="font-semibold text-amber-800 mb-4 text-sm">
            {editingPost ? "Edit Post" : "New Post"}
          </h4>
          <form
            onSubmit={handleSave}
            className="space-y-3"
            data-ocid="blog_mgmt.modal"
          >
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Post title"
                required
                data-ocid="blog_mgmt.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Author
              </Label>
              <Input
                value={form.author}
                onChange={(e) =>
                  setForm((p) => ({ ...p, author: e.target.value }))
                }
                placeholder="Author name"
                required
                data-ocid="blog_mgmt.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Content
              </Label>
              <textarea
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Write your post content..."
                rows={6}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-400 resize-y"
                data-ocid="blog_mgmt.textarea"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                disabled={saving}
                className="bg-amber-700 hover:bg-amber-800 text-white"
                data-ocid="blog_mgmt.submit_button"
              >
                {saving ? (
                  <Loader2 size={14} className="animate-spin mr-1" />
                ) : null}
                {editingPost ? "Save Changes" : "Create Post"}
              </Button>
              <button
                type="button"
                onClick={closeForm}
                className="text-sm text-gray-500 hover:text-gray-700"
                data-ocid="blog_mgmt.cancel_button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2
            className="animate-spin text-amber-600"
            size={28}
            data-ocid="blog_mgmt.loading_state"
          />
        </div>
      ) : posts.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="blog_mgmt.empty_state"
        >
          No posts yet. Create your first post!
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-xl gap-4"
              data-ocid={`blog_mgmt.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-serif font-semibold text-gray-800 truncate text-sm">
                    {post.title}
                  </h4>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className={`text-xs shrink-0 ${
                      post.published
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400">
                  By {post.author} &middot; {formatDate(post.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {post.content}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => openEdit(post)}
                  className="p-2 text-gray-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                  data-ocid={`blog_mgmt.edit_button.${i + 1}`}
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePublish(post)}
                  disabled={toggling === post.id}
                  className="p-2 text-gray-400 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {toggling === post.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : post.published ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  disabled={deleting === post.id}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  data-ocid={`blog_mgmt.delete_button.${i + 1}`}
                  title="Delete"
                >
                  {deleting === post.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
