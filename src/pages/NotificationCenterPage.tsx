import { ChevronLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  avatar: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "林恩如 在討論區發了最新文章",
    body: "台積電站上週20MA，恩如三部曲三顆星，長線佈局正是時候...",
    time: "Mar 19",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    title: "林恩如 在討論區發了最新文章",
    body: "鴻海評分提升至2顆星，量能放大訊號明確，值得持續關注...",
    time: "Mar 18",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    title: "林恩如 在討論區發了最新文章",
    body: "「選股不是猜漲跌，是找到趨勢明確的標的」本週精選三檔...",
    time: "Mar 17",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    title: "林恩如 在討論區發了最新文章 (加權指數)",
    body: "大盤回測季線支撐，短線震盪不改長線多方格局...",
    time: "Mar 15",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    title: "林恩如 在討論區發了最新文章",
    body: "聯發科型態突破，庸中佼佼策略選入，週均量放大至3,200張...",
    time: "Mar 14",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    id: "6",
    title: "林恩如 在討論區發了最新文章",
    body: "廣達被選入後起新秀策略，近5日成交量較前期均量成長180%...",
    time: "Mar 12",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
];

export function NotificationCenterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-base font-bold">通知</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Bell className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">目前沒有通知</p>
          </div>
        ) : (
          <div>
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className="px-4 py-5 border-b border-border"
              >
                <div className="flex gap-3">
                  <img
                    src={notification.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                      {notification.body}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
