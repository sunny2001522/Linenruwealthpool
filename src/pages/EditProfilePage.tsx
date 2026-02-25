import { useState } from "react";
import { ChevronLeft, User, Camera, Mail, Phone, Calendar, Save } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/authContext";
import enruAvatar from "figma:asset/669abba4cb1cf3bf6bffdce61f40edd799d8b2f2.png";

export function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || "vausb6xb0q",
    email: user?.email || "sonia_chen@cmoney.com.tw",
    phone: "+886 912-345-678",
    birthday: "1990-01-15",
    bio: "熱愛投資，追求財富自由",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加实际的保存逻辑
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate("/more");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/more")}
            className="w-10 h-10 rounded-xl bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">編輯個人資料</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={enruAvatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30 shadow-xl"
                />
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5 text-black" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">點擊相機圖示更換頭像</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-5 py-4 border-b border-border/50">
              <h3 className="font-bold text-sm text-muted-foreground">基本資料</h3>
            </div>
            <div className="p-5 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  姓名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入姓名"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  電子信箱
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入電子信箱"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  手機號碼
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="請輸入手機號碼"
                />
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  生日
                </label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

        

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#6BB6FF] hover:shadow-xl py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            儲存變更
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-card border border-border rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">儲存成功！</h3>
            <p className="text-sm text-muted-foreground text-center">
              您的個人資料已更新
            </p>
          </div>
        </div>
      )}
    </div>
  );
}