import CommentsDashboard from '@/components/admin/CommentsDashboard';

export const metadata = {
  title: 'Comments Moderation - Admin',
  description: 'Moderate user comments'
};

export default function CommentsPage() {
  return <CommentsDashboard />;
}
